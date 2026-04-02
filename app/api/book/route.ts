import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const getCredentials = () => {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
  }
  const credentialsPath = path.join(process.cwd(), 'google-credentials.json')
  if (fs.existsSync(credentialsPath)) {
    return JSON.parse(fs.readFileSync(credentialsPath, 'utf8'))
  }
  throw new Error('Google credentials not found')
}

const SCOPES = ['https://www.googleapis.com/auth/calendar']
// Use the service account's own calendar ID (client_email)
const getCalendarId = () => {
  // If specific calendar ID is set in env, use that
  if (process.env.GOOGLE_CALENDAR_ID && process.env.GOOGLE_CALENDAR_ID !== 'primary') {
    return process.env.GOOGLE_CALENDAR_ID
  }
  // Otherwise use the service account's email as calendar ID
  const credentials = getCredentials()
  return credentials.client_email
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, peopleCount, contactMethod, contactValue } = body

    console.log('Booking request received:', { date, time, peopleCount, contactMethod, contactValue })

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time required' }, { status: 400 })
    }

    const credentials = getCredentials()
    const calendarId = getCalendarId()
    
    console.log('Using calendar ID:', calendarId)
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Parse date and time
    const [hours, minutes] = time.split(':').map(Number)
    const startDateTime = new Date(date)
    startDateTime.setHours(hours, minutes, 0, 0)
    
    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + 45) // 45 min appointment

    console.log('Creating event:', {
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      calendarId
    })

    // Create event
    const event = {
      summary: `Barber Appointment - ${peopleCount} person(s)`,
      description: `Booking from Kinloss Barber website\nContact: ${contactValue} (${contactMethod})\nPeople: ${peopleCount}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/London',
      },
    }

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    })

    console.log('Event created successfully:', response.data.id, response.data.htmlLink)

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      calendarId: calendarId,
      message: 'Appointment booked successfully'
    })

  } catch (error: any) {
    console.error('Calendar booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment', details: error.message },
      { status: 500 }
    )
  }
}
