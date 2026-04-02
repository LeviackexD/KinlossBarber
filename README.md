# Kinloss Barber

A premium Progressive Web App (PWA) for Kinloss Barber — an artisan barbershop in the Scottish Highlands offering traditional grooming services with modern convenience.

## Features

- **Progressive Web App**: Installable on mobile devices with offline capabilities and service worker support
- **Interactive Booking System**: Multi-step appointment scheduler with date/time selection, people count, and SMS/email confirmation
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Mobile Navigation**: Fixed bottom navigation for easy access on smartphones
- **Image Gallery**: Showcase of the barbershop studio and services
- **Location Section**: Embedded map and contact information
- **Animations**: Smooth transitions and micro-interactions using Framer Motion and GSAP

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16.2](https://nextjs.org/) - React framework with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript |
| **UI Library** | [React 19](https://react.dev/) - Component-based UI library |
| **Styling** | [Tailwind CSS 4.2](https://tailwindcss.com/) - Utility-first CSS framework |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) - Headless, accessible components |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/) - Declarative and timeline animations |
| **Icons** | [Lucide React](https://lucide.dev/) - Beautiful icons |
| **Fonts** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Form handling and validation |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring |
| **Package Manager** | pnpm |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Home page composition
├── components/            # React components
│   ├── ui/               # shadcn/ui components (55+ components)
│   ├── booking-section.tsx    # Multi-step booking flow
│   ├── hero-section.tsx       # Landing hero with CTA
│   ├── gallery-section.tsx    # Image gallery
│   ├── location-section.tsx   # Map and contact info
│   ├── mobile-nav.tsx         # Bottom mobile navigation
│   ├── navbar.tsx             # Desktop navigation
│   ├── footer.tsx             # Site footer
│   └── floating-book-button.tsx # Mobile FAB
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
│   ├── images/          # Studio photos
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
└── styles/               # Additional styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LeviackexD/KinlossBarber.git
cd KinlossBarber
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

## Design System

### Color Palette — "Boutique Heritage"

The design uses a sophisticated moss green and cream palette inspired by Scottish Highlands:

| Role | Color | Value |
|------|-------|-------|
| Primary | Moss Green | `oklch(0.42 0.08 145)` |
| Background | Warm Cream | `oklch(0.97 0.01 90)` |
| Foreground | Deep Forest | `oklch(0.25 0.02 150)` |
| Accent | Lighter Moss | `oklch(0.55 0.10 145)` |

### Typography

- **Display/Headings**: Playfair Display (serif) — elegant, traditional feel
- **Body/UI**: DM Sans (sans-serif) — modern, highly readable

## PWA Configuration

The app is fully installable with:
- Custom manifest with app icons (192x192, 512x512)
- Service worker for offline functionality
- Apple mobile web app support
- Theme color: `#4a6741` (moss green)

## Booking Flow

1. **Select People**: Choose 1-4 people for the appointment
2. **Date & Time**: Interactive calendar with available time slots (09:00-17:00)
3. **Contact Method**: SMS or email confirmation preference
4. **Review & Confirm**: Summary before final submission

## Browser Support

- Chrome/Edge (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- iOS Safari 14+
- Chrome for Android

## License

This project is proprietary — Kinloss Barber.

---

Built with care in the Scottish Highlands.
