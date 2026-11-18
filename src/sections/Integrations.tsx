import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { Container } from '../components/Container'
import { email } from '../content'
import { cx } from '../lib/cx'

// Edit this list. Only keep tools that are truly supported.
const INTEGRATIONS = ["Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "QuickBooks", "Zapier", "Google", "Facebook", "Yelp", "Angi"];

function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={cx(
        'flex h-11 items-center whitespace-nowrap rounded-full border px-5 text-[13.5px] font-medium transition-[transform,border-color,box-shadow,background-color,color] duration-300',
        active
          ? 'scale-105 border-accent/70 bg-accent/[0.08] text-white shadow-[0_0_0_1px_rgb(16_185_129/0.25),0_0_28px_-6px_rgb(16_185_129/0.65)]'
          : 'border-accent/15 bg-[#0a1712] text-[#eef5f1]',
      )}
    >
      {label}
    </span>
  )
}

export function Integrations() {
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % INTEGRATIONS.length),
      1000,
    )
    return () => window.clearInterval(timer)
  }, [reduce, paused])

  return (
    <section id="integrations" className="scroll-mt-24 bg-white pb-0 pt-16 sm:pt-20">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#050d0a] py-12 sm:rounded-[28px] sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative px-5 text-center sm:px-8">
            <h2 className="text-balance text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#f4faf7] sm:text-[38px]">
              Works with the tools you already use
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-[14.5px] leading-relaxed text-[#9fb3a9] sm:text-[16px]">
              RenovReach connects with the software your business already runs on.
            </p>
          </div>

          {reduce ? (
            <div className="relative mt-8 flex flex-wrap justify-center gap-3 px-5 sm:mt-9 sm:px-8">
              {INTEGRATIONS.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          ) : (
            <div
              className="relative mt-8 overflow-hidden sm:mt-9"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
              onTouchCancel={() => setPaused(false)}
            >
              <div
                className={cx(
                  'flex w-max animate-marquee will-change-transform',
                  paused && '[animation-play-state:paused]',
                )}
              >
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1}
                    className="flex shrink-0 items-center gap-3 pr-3"
                  >
                    {INTEGRATIONS.map((item, index) => (
                      <li key={`${copy}-${item}`} className="shrink-0">
                        <Chip label={item} active={active === index} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#050d0a] via-[#050d0a]/75 to-transparent sm:w-20"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050d0a] via-[#050d0a]/75 to-transparent sm:w-20"
              />
            </div>
          )}

          <p className="relative mt-6 px-5 text-center text-[12.5px] leading-relaxed text-[#7f978c] sm:px-8">
            Need another tool? Email{' '}
            <a
              href={`mailto:${email}`}
              className="font-medium text-[#6ee7b7] underline decoration-accent/40 underline-offset-2 transition-colors hover:text-white"
            >
              {email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
