import { HeroSection } from "@/components/hero-section"
import { BookingSection } from "@/components/booking-section"
import { GallerySection } from "@/components/gallery-section"
import { LocationSection } from "@/components/location-section"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { FloatingBookButton } from "@/components/floating-book-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingSection />
      <GallerySection />
      <LocationSection />
      <Footer />
      <MobileNav />
      <FloatingBookButton />
    </main>
  )
}
