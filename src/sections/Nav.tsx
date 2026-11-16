import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { legalPages, nav } from '../content'
import { cx } from '../lib/cx'

export function Nav({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      id="top"
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        scrolled || open
          ? 'border-b border-line bg-white/88 shadow-[0_8px_30px_-24px_rgb(4_60_40/0.4)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/70 backdrop-blur-sm',
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1160px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo home={home} />

        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.links.map((link) => (
            <li key={link.label}>
              <a
                href={home ? link.href : `/${link.href}`}
                className="inline-flex h-9 items-center rounded-[9px] px-3 text-[14px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <Button
            href={nav.demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 rounded-[10px] px-4 text-[13.5px]"
          >
            {nav.demo.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            href={nav.demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 rounded-[10px] px-3.5 text-[13px]"
          >
            {nav.demo.label}
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-[10px] border border-line text-fg transition-colors hover:bg-surface-2"
          >
            {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-4rem)] w-full max-w-[1160px] overflow-y-auto px-5 py-4 sm:px-8">
              <ul className="flex flex-col">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={home ? link.href : `/${link.href}`}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center rounded-[10px] px-3 text-[16px] font-medium text-fg transition-colors hover:bg-surface-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-line pt-2">
                <ul className="flex flex-col">
                  {legalPages.map((page) => (
                    <li key={page.href}>
                      <a
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="flex h-10 items-center rounded-[10px] px-3 text-[14px] text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                      >
                        {page.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 border-t border-line pt-3">
                <Button
                  href={nav.demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {nav.demo.label}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
