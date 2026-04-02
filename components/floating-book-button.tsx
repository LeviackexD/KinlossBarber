"use client"

import { useState, useEffect } from "react"

export function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 80vh)
      const heroHeight = window.innerHeight * 0.8
      setIsVisible(window.scrollY > heroHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

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
