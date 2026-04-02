import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Load service account credentials
const getCredentials = () => {
  // In production (Vercel), use environment variable
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
  }
  // In development, read from file
  const credentialsPath = path.join(process.cwd(), 'google-credentials.json')
  if (fs.existsSync(credentialsPath)) {
    return JSON.parse(fs.readFileSync(credentialsPath, 'utf8'))
  }
  throw new Error('Google credentials not found')
}

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
// Use the user's personal calendar ID
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || '7dc5412809da8272d25c321129505e0bafa3bfcdb4cb4c58e6d890b2cc123f66@group.calendar.google.com'

// Business hours
const BUSINESS_HOURS = {
  start: 9, // 9:00 AM
  end: 17,  // 5:00 PM
  slotDuration: 30 // 30 minute slots
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 })
    }

    const credentials = getCredentials()
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Parse date and set time range
    const selectedDate = new Date(date)
    const startOfDay = new Date(selectedDate)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(selectedDate)
    endOfDay.setHours(23, 59, 59, 999)

    // Fetch events for the day
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []

    // Check which time slots are busy
    const busySlots: string[] = []
    
    for (const slot of timeSlots) {
      const [hours, minutes] = slot.split(':').map(Number)
      const slotStart = new Date(selectedDate)
      slotStart.setHours(hours, minutes, 0, 0)
      
      const slotEnd = new Date(slotStart)
      slotEnd.setMinutes(slotEnd.getMinutes() + 45) // 45 min appointment

      // Check if this slot conflicts with any event
      const isBusy = events.some(event => {
        const eventStart = new Date(event.start?.dateTime || event.start?.date || '')
        const eventEnd = new Date(event.end?.dateTime || event.end?.date || '')
        
        // Slot overlaps with event?
        return slotStart < eventEnd && slotEnd > eventStart
      })

      if (isBusy) {
        busySlots.push(slot)
      }
    }

    return NextResponse.json({
      date,
      busySlots,
      allSlots: timeSlots,
      isFullyBooked: busySlots.length === timeSlots.length,
      eventCount: events.length
    })

  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calendar data' },
      { status: 500 }
    )
  }
}
