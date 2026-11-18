import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'

import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { nav } from '../content'
import { cx } from '../lib/cx'

export function Nav({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // One passive scroll listener drives both the compact state and the spy: a
  // section is current once its top has passed under the floating bar.
  useEffect(() => {
    const ids = home ? nav.links.map((link) => link.href.slice(1)) : []
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        // Anchored sections land at 184px (scroll margin + padding), so the
        // spy has to accept a section before it reaches the very top.
        if (el && el.getBoundingClientRect().top <= 200) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [home])

  // The menu's exit animation cancels a native smooth scroll to a distant
  // section, so close the panel first and scroll once it has collapsed.
  const goToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    if (!home || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', href)
    }, 300)
  }

  const solid = scrolled || open

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={cx(
          'mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-3 rounded-[20px] border px-4 backdrop-blur-[14px] transition-[height,background-color,border-color,box-shadow] duration-300 max-[360px]:px-3 sm:rounded-full sm:px-5 min-[769px]:grid-cols-[1fr_auto_1fr]',
          solid
            ? 'h-[60px] border-[rgb(16_185_129/0.26)] bg-[rgb(13_26_20/0.88)] shadow-[0_18px_50px_-24px_rgb(0_0_0/0.9)]'
            : 'h-[68px] border-[rgb(16_185_129/0.18)] bg-[rgb(13_26_20/0.7)] shadow-[0_12px_40px_-22px_rgb(0_0_0/0.8)]',
        )}
      >
        <Logo
          home={home}
          tone="dark"
          className="max-[360px]:gap-2 max-[360px]:[&_img]:h-6 max-[360px]:[&_span]:text-[14px]"
        />

        <ul className="hidden items-center justify-center gap-1 min-[769px]:flex">
          {nav.links.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <li key={link.label}>
                <a
                  href={home ? link.href : `/${link.href}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cx(
                    'group relative inline-flex h-9 items-center px-3 text-[13.5px] font-medium transition-colors duration-200',
                    isActive ? 'text-[#34d399]' : 'text-[#a9bdb2] hover:text-[#f3faf6]',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cx(
                      'pointer-events-none absolute bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-accent transition-[width] duration-200',
                      isActive ? 'w-[calc(100%-22px)]' : 'w-0 group-hover:w-[calc(100%-22px)]',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-end gap-2.5">
          {/* Wrappers rather than a `hidden` class on the button: Button's own
              `inline-flex` would win the display cascade on mobile. */}
          <div className="hidden min-[769px]:block">
            <Button href={nav.demo.href} target="_blank" rel="noopener noreferrer">
              {nav.demo.label}
            </Button>
          </div>

          {/* Mobile keeps the booking CTA in the bar, beside the hamburger.
              Below 360px the label shortens instead of the row wrapping. */}
          <div className="min-[769px]:hidden">
            <Button
              href={nav.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              size="compact"
              aria-label={nav.demo.label}
              className="max-[360px]:px-3"
            >
              <span className="max-[360px]:hidden">{nav.demo.label}</span>
              <span aria-hidden className="hidden max-[360px]:inline">
                Book Demo
              </span>
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 grid size-10 place-items-center rounded-full text-[#e8f4ee] transition-colors hover:bg-white/[0.07] min-[769px]:hidden">
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={cx(
                  'absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300',
                  open ? 'scale-x-0 opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={cx(
                  'absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : '',
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="sheet"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 w-full max-w-[1200px] overflow-hidden rounded-[20px] border border-[rgb(16_185_129/0.2)] bg-[rgb(13_26_20/0.92)] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9)] backdrop-blur-[14px] min-[769px]:hidden"
          >
            <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto p-3">
              <ul className="flex flex-col gap-0.5">
                {nav.links.map((link) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <li key={link.label}>
                      <a
                        href={home ? link.href : `/${link.href}`}
                        onClick={(event) => goToSection(event, link.href)}
                        aria-current={isActive ? 'location' : undefined}
                        className={cx(
                          'flex h-12 items-center rounded-[14px] px-4 text-[15.5px] font-medium transition-colors',
                          isActive
                            ? 'bg-accent/12 text-[#5eead4]'
                            : 'text-[#e8f4ee] hover:bg-white/[0.06]',
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
