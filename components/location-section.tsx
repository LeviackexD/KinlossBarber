"use client"

import { MapPin, Clock, Phone } from "lucide-react"

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
      </div>
    </section>
  )
}
