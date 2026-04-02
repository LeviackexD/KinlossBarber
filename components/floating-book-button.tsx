"use client"

import { useState, useEffect } from "react"

export function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isInBookingSection, setIsInBookingSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 80vh)
      const heroHeight = window.innerHeight * 0.8
      const scrollY = window.scrollY
      
      setIsVisible(scrollY > heroHeight)
      
      // Check if we're in the booking section
      const bookingElement = document.getElementById("booking")
      const galleryElement = document.getElementById("gallery")
      if (bookingElement && galleryElement) {
        const bookingTop = bookingElement.offsetTop
        const galleryTop = galleryElement.offsetTop
        const viewportMiddle = scrollY + window.innerHeight / 2
        
        // Hide when in booking section, show again after gallery
        setIsInBookingSection(viewportMiddle >= bookingTop && viewportMiddle < galleryTop)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible || isInBookingSection) return null

  return (
    <button
      onClick={scrollToBooking}
      className="fixed bottom-24 right-4 z-50 md:hidden bg-primary text-primary-foreground 
        px-5 py-3 rounded-full shadow-lg shadow-primary/30 
        flex items-center gap-2 font-medium text-sm
        active:scale-95 transition-transform"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Book Now
    </button>
  )
}
