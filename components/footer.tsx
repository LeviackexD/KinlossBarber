"use client"

import { Instagram, Facebook, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background py-16 pb-24 md:pb-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <svg 
              className="w-12 h-12 mx-auto text-background/80" 
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

          <h3 className="font-serif text-2xl mb-4">Kinloss Barber</h3>
          <p className="text-background/60 mb-8 max-w-md mx-auto">
            Traditional craftsmanship meets modern style in the heart of the Scottish Highlands.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <a 
              href="#" 
              className="text-background/60 hover:text-background transition-colors hover:scale-110" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-background/60 hover:text-background transition-colors hover:scale-110" 
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="border-t border-background/10 pt-8">
            <p className="text-background/40 text-sm">
              © {new Date().getFullYear()} Kinloss Barber. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 top-1/2 -translate-y-1/2 md:right-12 bg-background/10 hover:bg-background/20 text-background/80 p-3 rounded-full transition-colors hidden md:flex items-center justify-center"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
