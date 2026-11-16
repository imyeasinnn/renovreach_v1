import { useEffect, type ReactNode } from 'react'

import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { Refunds } from './pages/Refunds'
import { Terms } from './pages/Terms'
import { Cta } from './sections/Cta'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Nav } from './sections/Nav'
import { Pricing } from './sections/Pricing'
import { Problem } from './sections/Problem'
import { Showcase } from './sections/Showcase'

const HOME_TITLE = 'RenovReach | Turn Completed Jobs Into Reviews & Repeat Business'

// Small path map instead of a router dependency: each page is a full
// navigation, and Vercel's rewrite (vercel.json) serves index.html on refresh.
const routes: Record<string, { title: string; page: ReactNode }> = {
  '/terms': { title: 'Terms of Service | RenovReach', page: <Terms /> },
  '/privacy': { title: 'Privacy Policy | RenovReach', page: <Privacy /> },
  '/refund-policy': { title: 'Refund & Cancellation Policy | RenovReach', page: <Refunds /> },
  '/contact': { title: 'Contact | RenovReach', page: <Contact /> },
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/'
}

export function App() {
  const path = normalizePath(window.location.pathname)
  const route = routes[path]

  useEffect(() => {
    document.title = route ? route.title : HOME_TITLE
  }, [route])

  // Section links from a legal page arrive as /#features, after React mounts.
  useEffect(() => {
    if (route) return
    const id = window.location.hash.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [route])

  return (
    <>
      <Nav home={!route} />
      <main>{route ? route.page : <Home />}</main>
      <Footer home={!route} />
    </>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Showcase />
      <Pricing />
      <Faq />
      <Cta />
    </>
  )
}
