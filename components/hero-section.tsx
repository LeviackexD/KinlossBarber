"use client"

import { useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-barber.jpg"
          alt="Kinloss Barber Studio"
          fill
          className="object-cover"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <svg 
            className="w-16 h-16 mx-auto text-primary-foreground/80" 
            viewBox="0 0 64 64" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M20 12 L32 52 M44 12 L32 52" strokeLinecap="round" />
            <circle cx="32" cy="32" r="28" />
            <path d="M18 28 Q32 20 46 28" strokeLinecap="round" />
          </svg>
        </div>

        <p className="text-primary-foreground/70 tracking-[0.3em] uppercase text-sm mb-4">
          Kinloss, Scotland
        </p>

        <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-primary-foreground mb-4 md:mb-6 tracking-tight text-balance">
          Traditional Cuts
          <br />
          <span className="italic">Scottish Style</span>
        </h1>

        <p className="text-primary-foreground/80 text-base md:text-xl max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed px-2 md:px-0">
          Authentic barbering with traditional blades and modern techniques. 
          Your local barber in the heart of Kinloss.
        </p>

        <button
          onClick={scrollToBooking}
          className="inline-flex items-center gap-2 md:gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-sm text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300"
        >
          Book Now
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
