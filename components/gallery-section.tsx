"use client"

import Image from "next/image"

const galleryImages = [
  { src: "/images/studio-1.jpg", alt: "The barbershop interior with vintage leather chair", span: "md:row-span-2 aspect-[3/4] md:aspect-auto" },
  { src: "/images/studio-2.jpg", alt: "Professional barber tools on oak counter", span: "aspect-[4/3]" },
  { src: "/images/studio-3.jpg", alt: "Exterior of the Kinloss barbershop", span: "aspect-[4/3]" },
  { src: "/images/studio-4.jpg", alt: "Precision haircut in progress", span: "aspect-[4/3]" },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            Our Space
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The Studio
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            An intimate space designed for relaxation and precision craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-sm group cursor-pointer ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end">
                <p className="text-background font-medium p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
