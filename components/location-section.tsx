"use client"

import { MapPin, Clock, Phone, Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Callum MacKenzie",
    rating: 5,
    date: "2 weeks ago",
    text: "Best barber in Moray, hands down. James knew exactly what I wanted and the attention to detail was incredible. The shop has a proper old-school feel but with modern techniques. Worth every penny.",
    avatar: "CM"
  },
  {
    id: 2,
    name: "Fiona Campbell",
    rating: 5,
    date: "1 month ago",
    text: "Took my son for his first proper haircut and James was so patient and gentle with him. The kid actually sat still for once! Beautiful little studio and you can tell he genuinely cares about his craft.",
    avatar: "FC"
  },
  {
    id: 3,
    name: "Alasdair Ross",
    rating: 5,
    date: "2 months ago",
    text: "Found Kinloss Barber after my usual place in Inverness closed. Wish I'd discovered it sooner! The hot towel shave is absolutely top tier. Booked my next three appointments already.",
    avatar: "AR"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-32 bg-card overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
              Find Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Visit the Studio
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nestled in the heart of Kinloss, our studio offers a sanctuary from the everyday. 
              Step inside and experience grooming as it should be — unhurried, personal, and precise.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Address</h4>
                  <p className="text-muted-foreground">
                    12 High Street<br />
                    Kinloss, Moray IV36 3UB<br />
                    Scotland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Hours</h4>
                  <p className="text-muted-foreground">
                    Tuesday – Friday: 9:00 – 18:00<br />
                    Saturday: 9:00 – 16:00<br />
                    Sunday & Monday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Contact</h4>
                  <p className="text-muted-foreground">
                    +44 1309 XXX XXX<br />
                    hello@kinlossbarber.co.uk
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-sm overflow-hidden bg-secondary shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8558.447877252146!2d-3.5755!3d57.6433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4885f5d5b8b8b8b7%3A0x0!2sKinloss%2C%20Forres!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kinloss Barber Location"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/20 rounded-sm -z-10" />
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
              What Our Clients Say
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-serif text-3xl text-foreground">5.0</span>
            </div>
            <p className="text-muted-foreground">
              Based on <span className="font-medium text-foreground">47 reviews</span> on Google Maps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-primary text-sm">{review.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{review.name}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground/70">{review.date}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://g.page/r/kinlossbarber/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Leave a review on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
