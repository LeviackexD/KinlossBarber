"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Check, Users, Calendar, Clock, User, Mail, MessageSquare } from "lucide-react"

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
]

type BookingStep = "people" | "datetime" | "contact" | "confirm" | "success"
type ContactMethod = "sms" | "email" | null

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function LargeCalendar({
  selected,
  onSelect,
  disabled,
  currentMonth,
  onChangeMonth,
}: {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  currentMonth: Date
  onChangeMonth: (date: Date) => void
}) {
  // Generate simulated busy dates
  const busyDates = (() => {
    const busy: string[] = []
    const today = new Date()
    for (let i = 2; i < 15; i++) {
      if (Math.random() > 0.6) {
        const busyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
        busy.push(busyDate.toDateString())
      }
    }
    return busy
  })()

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (Date | null)[] = []
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const goToPreviousMonth = () => {
    onChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    onChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString()
  }

  const isBusy = (date: Date) => {
    return busyDates.includes(date.toDateString())
  }

  const isDisabled = (date: Date) => {
    if (disabled) return disabled(date)
    return isBusy(date)
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goToPreviousMonth}
          className="p-3 hover:bg-secondary rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-3 hover:bg-secondary rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm text-muted-foreground font-medium py-3"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const disabled = isDisabled(date)
          const sel = isSelected(date)
          const today = isToday(date)
          const busy = isBusy(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              className={`
                aspect-square flex items-center justify-center text-lg md:text-xl font-medium rounded-xl
                transition-all duration-200
                ${disabled 
                  ? "text-muted-foreground/30 cursor-not-allowed bg-muted/50 line-through decoration-2 decoration-destructive/50" 
                  : "cursor-pointer hover:bg-secondary hover:scale-105"
                }
                ${sel 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/20" 
                  : ""
                }
                ${today && !sel 
                  ? "font-bold text-primary ring-2 ring-primary/40" 
                  : ""
                }
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-6 md:gap-8 mt-8 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-destructive/50 line-through decoration-destructive/50" />
          <span>Fully Booked</span>
        </div>
      </div>
    </div>
  )
}

export function BookingSection() {
  const [step, setStep] = useState<BookingStep>("people")
  const [peopleCount, setPeopleCount] = useState<number>(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [contactMethod, setContactMethod] = useState<ContactMethod>(null)
  const [contactValue, setContactValue] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleStepChange = (newStep: BookingStep) => {
    setStep(newStep)
    
    // Scroll to top of booking section on mobile when changing steps
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const bookingElement = document.getElementById("booking")
      if (bookingElement) {
        // Small delay to let the step content render first
        setTimeout(() => {
          bookingElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 50)
      }
    }
  }

  const handleConfirm = () => {
    setStep("success")
    setTimeout(() => {
      setStep("people")
      setPeopleCount(1)
      setSelectedDate(undefined)
      setSelectedTime(null)
      setContactMethod(null)
      setContactValue("")
    }, 4000)
  }

  const isValidContact = () => {
    if (!contactMethod || !contactValue) return false
    if (contactMethod === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)
    }
    if (contactMethod === "sms") {
      return contactValue.replace(/\s/g, "").length >= 10
    }
    return false
  }

  const getContactIcon = () => {
    return contactMethod === "email" ? <Mail className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />
  }

  const getContactLabel = () => {
    return contactMethod === "email" ? "Email" : "Phone"
  }

  return (
    <section id="booking" className="py-20 md:py-32 bg-card overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            Reserve Your Visit
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Book an Appointment
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Select how many people, choose your preferred date and time, and how you&apos;d like to receive confirmation.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
          {["people", "datetime", "contact", "confirm"].map((s, i) => {
            const isActive = step === s
            const isCompleted = ["datetime", "contact", "confirm", "success"].includes(step) && 
              i < ["people", "datetime", "contact", "confirm"].indexOf(step) + (step === "success" ? 1 : 0)
            
            return (
              <div key={s} className="flex items-center gap-2 md:gap-4">
                <div 
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg" 
                      : isCompleted
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : i + 1}
                </div>
                {i < 3 && (
                  <div className={`w-8 md:w-16 h-1 rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-accent" : "bg-border"
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Number of People */}
            {step === "people" && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl md:text-2xl font-medium text-center mb-10">
                  How many people?
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      onClick={() => setPeopleCount(count)}
                      className={`flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                        peopleCount === count 
                          ? "border-primary bg-primary/5 shadow-lg scale-105" 
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className={`p-4 rounded-full transition-colors ${
                        peopleCount === count ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}>
                        {count === 1 ? <User className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                      </div>
                      <span className="text-lg font-medium">
                        {count === 1 ? "Just me" : `${count} people`}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => handleStepChange("datetime")}
                    className="px-12 py-6 text-lg rounded-xl"
                  >
                    Continue to Date & Time
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === "datetime" && (
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-medium text-center mb-8">
                  Select Date & Time
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                  {/* Large Calendar */}
                  <div className="bg-background border border-border rounded-2xl p-6 md:p-8 shadow-lg">
                    <LargeCalendar
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      currentMonth={currentMonth}
                      onChangeMonth={setCurrentMonth}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-6">
                    {selectedDate ? (
                      <>
                        <div className="flex items-center gap-3 text-lg text-foreground">
                          <Calendar className="w-6 h-6 text-primary" />
                          <span className="font-medium">
                            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-4 px-2 rounded-xl border-2 text-base font-medium transition-all duration-300 ${
                                selectedTime === time
                                  ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                                  : "border-border hover:border-primary/40 hover:shadow-sm"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                          <Clock className="w-4 h-4" />
                          <span>Each appointment slot is 45 minutes</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Calendar className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg">Select a date from the calendar</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-10">
                  <Button variant="outline" onClick={() => handleStepChange("people")} className="px-8 py-5 text-base">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => handleStepChange("contact")}
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 py-5 text-base"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Method */}
            {step === "contact" && (
              <div className="max-w-xl mx-auto">
                <h3 className="text-xl md:text-2xl font-medium text-center mb-10">
                  How should we confirm your booking?
                </h3>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                  <button
                    onClick={() => { setContactMethod("sms"); setContactValue(""); }}
                    className={`flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                      contactMethod === "sms" 
                        ? "border-primary bg-primary/5 shadow-lg scale-105" 
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`p-4 rounded-full transition-colors ${
                      contactMethod === "sms" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}>
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-medium block">Text Message</span>
                      <span className="text-sm text-muted-foreground">SMS confirmation</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setContactMethod("email"); setContactValue(""); }}
                    className={`flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                      contactMethod === "email" 
                        ? "border-primary bg-primary/5 shadow-lg scale-105" 
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`p-4 rounded-full transition-colors ${
                      contactMethod === "email" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}>
                      <Mail className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-medium block">Email</span>
                      <span className="text-sm text-muted-foreground">Email confirmation</span>
                    </div>
                  </button>
                </div>

                {contactMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                  >
                    <label className="block text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                      {contactMethod === "email" ? "Your Email Address" : "Your Phone Number"}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {contactMethod === "email" ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                      </div>
                      <Input
                        type={contactMethod === "email" ? "email" : "tel"}
                        placeholder={contactMethod === "email" ? "you@example.com" : "+44 XXX XXX XXXX"}
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        className="pl-12 py-6 text-lg rounded-xl border-2"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {contactMethod === "email" 
                        ? "We'll send your booking confirmation here" 
                        : "We'll text you when your booking is confirmed"}
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => handleStepChange("datetime")} className="px-8 py-5 text-base">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => handleStepChange("confirm")}
                    disabled={!isValidContact()}
                    className="px-8 py-5 text-base"
                  >
                    Review Booking
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === "confirm" && selectedDate && contactMethod && (
              <div className="max-w-xl mx-auto">
                <h3 className="text-xl md:text-2xl font-medium text-center mb-8">
                  Review Your Booking
                </h3>
                
                <div className="bg-background rounded-2xl p-8 mb-8 border border-border shadow-lg space-y-6">
                  <div className="flex items-center gap-5 pb-6 border-b border-border">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">People</span>
                      <p className="font-semibold text-lg">
                        {peopleCount === 1 ? "1 person" : `${peopleCount} people`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 pb-6 border-b border-border">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">Date</span>
                      <p className="font-semibold text-lg">
                        {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 pb-6 border-b border-border">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">Time</span>
                      <p className="font-semibold text-lg">{selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-primary/10 rounded-full">
                      {getContactIcon()}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">{getContactLabel()}</span>
                      <p className="font-semibold text-lg">{contactValue}</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-muted-foreground mb-8">
                  Service details will be discussed when you arrive.
                </p>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => handleStepChange("contact")} className="px-8 py-5 text-base">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleConfirm} className="px-10 py-5 text-base bg-primary hover:bg-accent">
                    Confirm Booking
                    <Check className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Success State */}
            {step === "success" && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-serif mb-4">Booking Confirmed!</h3>
                <p className="text-muted-foreground text-lg mb-2">
                  We&apos;ve sent a confirmation to your {contactMethod === "email" ? "email" : "phone"}.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  See you soon at Kinloss Barber.
                </p>
                <div className="inline-flex items-center gap-3 text-base text-muted-foreground">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  Syncing with Google Sheets...
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
