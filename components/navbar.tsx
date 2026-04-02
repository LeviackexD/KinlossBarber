"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { id: "booking", label: "Book" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Find Us" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <svg 
              className={`w-10 h-10 transition-colors ${isScrolled ? "text-primary" : "text-white"}`}
              viewBox="0 0 64 64" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M20 12 L32 52 M44 12 L32 52" strokeLinecap="round" />
              <circle cx="32" cy="32" r="28" />
              <path d="M18 28 Q32 20 46 28" strokeLinecap="round" />
            </svg>
            <span className={`font-serif text-xl transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              Kinloss Barber
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary group cursor-pointer ${
                  isScrolled ? "text-foreground/80" : "text-white/80"
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("booking")}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-accent transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
