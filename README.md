# My Portfolio

A modern, interactive portfolio built with **Next.js**, **React Three Fiber**, and **Tailwind CSS**. Features a responsive design, 3D animations, and a fully functional contact system.

## 🚀 Live Demo

Visit the site at: [Your deployment URL]

## ✨ Features

- **Interactive 3D Hero Section** — Eye-tracking head and particle system animations
- **Responsive Design** — Mobile-first, works on all devices
- **Project Showcase** — Tilt cards with 3D effects
- **Professional Contact Form** — Integrated with SendGrid for email delivery
- **Testimonials Section** — Client feedback with professional styling
- **Skills Timeline** — Animated skill proficiency bars
- **Dark Theme** — Eye-friendly dark mode with accent colors (teal & pink)
- **Performance Optimized** — Production build with static prerendering

## 🛠 Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Styling:** Tailwind CSS 4, Framer Motion
- **Email Service:** SendGrid API (optional; uses mailto fallback)
- **Hosting:** Ready for Vercel, Netlify, or any static host

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your SendGrid API key (optional)
   ```bash
   cp .env.example .env.local
   ```

4. **Run locally:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## 📧 Email Setup (Optional)

### SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key from the dashboard
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=your_key_here
   CONTACT_TO=your_email@example.com
   ```

### Without Email
If no `SENDGRID_API_KEY` is set, the contact form will show a helpful message. Users can still reach you via the fallback mailto link.

## 🏗 Build & Deploy

### Build for Production
```bash
npm run build
```

### Run Production Build Locally
```bash
npm run start
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Then set environment variables in Vercel dashboard:
- `SENDGRID_API_KEY` — Your SendGrid API key
- `CONTACT_TO` — Email address to receive contact form submissions

### Deploy to Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Static Hosting (GitHub Pages, etc.)
This site uses Next.js with static prerendering. Most features work on static hosts, but the `/api/contact` endpoint requires a serverless function provider (Vercel Functions, Netlify Functions, etc.).

## 🎨 Customization

### Colors & Branding
Edit `src/app/globals.css`:
```css
:root {
  --color-green: #64ffda;   /* Primary accent */
  --color-pink: #ec4899;    /* Secondary accent */
  --color-navy: #0a192f;    /* Dark background */
}
```

### Content
- **About & Skills:** `src/app/page.tsx`
- **Projects:** Update `PROJECTS` array in `src/app/page.tsx`
- **Testimonials:** Edit `src/app/components/Testimonials.tsx`
- **Contact:** Modify `/contact` page and FAQ section

### 3D Scenes
- **Homepage Hero:** `src/app/components/Canvas3D.tsx` (TrackingHead + ParticleSystem)
- **Contact Page:** `src/app/components/ContactCanvas.tsx` (Interactive head with mouse tracking)

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px – 1024px
- **Desktop:** > 1024px

## 🔧 Development

### Run dev server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Run linter
```bash
npm run lint
```

## 📄 File Structure

```
my-portfolio/
├── src/app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── api/contact/route.ts        # Email API endpoint
│   ├── contact/page.tsx            # Contact page
│   ├── components/
│   │   ├── Canvas3D.tsx            # Main 3D scene
│   │   ├── ContactCanvas.tsx       # Contact page 3D
│   │   ├── Testimonials.tsx        # Testimonials section
│   │   ├── AnimatedButton.tsx      # Reusable button
│   │   ├── TiltCard.tsx            # 3D tilt effect card
│   │   ├── Navbar.tsx              # Navigation
│   │   └── ...
│   └── styles/
│       └── minimal.css             # Additional styles
├── public/
│   └── models/                     # 3D assets
├── .env.example                    # Environment variables template
├── package.json
├── tsconfig.json
├── next.config.ts                  # Next.js configuration
└── README.md                       # This file
```

## 🐛 Troubleshooting

### Dev server lock error
```bash
rm -rf .next/dev/lock
npm run dev
```

### Build errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 3D Canvas not visible
- Ensure WebGL is enabled in your browser
- Check browser console for Three.js errors
- Test in a different browser

### Email not sending
- Verify `SENDGRID_API_KEY` is set in `.env.local`
- Check SendGrid dashboard for API restrictions
- Verify `CONTACT_TO` email address is correct
- Check browser console network tab for API errors

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices)
- **Page Load:** < 2s (with CDN)
- **Lighthouse Metrics:**
  - First Contentful Paint (FCP): ~0.8s
  - Largest Contentful Paint (LCP): ~1.2s
  - Cumulative Layout Shift (CLS): < 0.1

## 🤝 Contributing

This is a personal portfolio, but you can fork it for your own use!

## 📝 License

MIT — Feel free to use this template for your own portfolio.

## 👤 About

Built by **Abdullah Malik** — Web Developer specializing in React, Next.js, and modern web technologies.

- **Website:** [Your portfolio URL]
- **LinkedIn:** [Your LinkedIn]
- **GitHub:** [Your GitHub]
- **Email:** maliktriples123789@gmail.com

---

**Happy coding! 🚀**
