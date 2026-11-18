import { motion, useInView, useScroll, useSpring } from 'motion/react'
import {
  Check,
  ChevronRight,
  CircleCheck,
  Columns3,
  Eraser,
  Info,
  ListChecks,
  Mail,
  MousePointer2,
  Star,
  Upload,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { Avatar, Stars } from '../components/ui'
import { cleaning, howItWorks } from '../content'
import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

const stageIcons = [Upload, Columns3, Eraser, ListChecks, CircleCheck]
const stepVisuals = [AddCustomersVisual, CleanListVisual, CompleteJobVisual, SendReviewVisual]

export function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 78%', 'end 62%'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="how" className="scroll-mt-24 py-20 sm:py-28">
      {/* Alias so the footer's #how-it-works link lands here too. */}
      <span id="how-it-works" aria-hidden className="block scroll-mt-24" />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">
            {howItWorks.description}
          </p>
        </Reveal>

        <div ref={stepsRef} className="relative mt-14 sm:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-line [mask-image:linear-gradient(to_bottom,transparent,#000_7%,#000_93%,transparent)] lg:left-1/2"
          >
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent/40 via-accent to-accent-deep"
            />
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute -inset-x-[3px] origin-top rounded-full bg-accent/30 blur-[6px]"
            />
          </div>

          <ol className="relative flex flex-col gap-14 sm:gap-20 lg:gap-24">
            {howItWorks.steps.map((step, i) => {
              const Visual = stepVisuals[i]
              const textOnLeft = i % 2 === 0
              return (
                <li key={step.number}>
                  <Reveal>
                    <div className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-5 gap-y-5 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:items-center lg:gap-x-0">
                      <div className="col-start-1 row-start-1 self-start lg:col-start-2 lg:flex lg:justify-center lg:self-center">
                        <span className="round grid size-10 shrink-0 place-items-center bg-gradient-to-br from-accent to-accent-deep text-[15px] font-semibold text-white shadow-[0_0_0_5px_#fff,0_10px_24px_-10px_rgb(5_150_105/0.65)] lg:size-11 lg:text-[16px]">
                          {step.number}
                        </span>
                      </div>

                      <div
                        className={cx(
                          'col-start-2 row-start-1 min-w-0 lg:self-center',
                          textOnLeft ? 'lg:col-start-1 lg:pr-14 lg:text-right' : 'lg:col-start-3 lg:pl-14',
                        )}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-ink">
                          Step {step.number}
                        </p>
                        <h3 className="mt-2 text-balance text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-[25px]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">{step.description}</p>
                      </div>

                      <div
                        className={cx(
                          'col-start-2 row-start-2 min-w-0 lg:row-start-1 lg:self-center',
                          textOnLeft ? 'lg:col-start-3 lg:pl-14' : 'lg:col-start-1 lg:pr-14',
                        )}
                      >
                        <Visual />
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>

        <CleaningPipeline />
      </Container>
    </section>
  )
}

/* ---------- Cleaning pipeline ---------- */

function CleaningPipeline() {
  return (
    <Reveal className="mt-20 sm:mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-balance text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[30px]">
          {cleaning.title}
        </h3>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cleaning.stages.map((stage, i) => {
          const Icon = stageIcons[i]
          return (
            <motion.li
              key={stage.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="relative rounded-[16px] border border-accent/15 bg-white p-4 shadow-soft"
            >
              <span className="round grid size-9 place-items-center bg-mint text-accent-ink">
                <Icon className="size-4" strokeWidth={1.9} />
              </span>
              <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold">
                <span className="text-[10px] font-semibold text-accent-ink">{i + 1}</span>
                {stage.title}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{stage.description}</p>

              {i < cleaning.stages.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-accent/40 lg:block"
                />
              )}
            </motion.li>
          )
        })}
      </ol>

      <div className="mt-6 flex items-start gap-2.5 rounded-[14px] border border-accent/20 bg-mint-2 p-3.5 sm:p-4">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-ink" strokeWidth={2} />
        <p className="text-[12.5px] leading-relaxed text-accent-ink">{cleaning.notice}</p>
      </div>
      <p className="mt-3 text-center text-[12px] text-faint">{cleaning.fileTypes}</p>
    </Reveal>
  )
}

/* ---------- Shared mockup pieces ---------- */

function VisualShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'rounded-[20px] border border-line bg-[radial-gradient(120%_120%_at_20%_0%,#f0fdf6_0%,#ffffff_68%)] p-4 shadow-lift sm:p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

function MockField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cx('rounded-[8px] border border-line bg-surface-2/70 px-2.5 py-2', className)}>
      <p className="text-[8px] font-medium uppercase tracking-[0.1em] text-faint">{label}</p>
      <p className="mt-0.5 truncate text-[10.5px] font-medium text-fg">{value}</p>
    </div>
  )
}

/* Step 1: add customers, manually or by file */
function AddCustomersVisual() {
  const [tab, setTab] = useState<'manual' | 'import'>('manual')

  return (
    <VisualShell>
      <div className="overflow-hidden rounded-[14px] border border-line bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-3.5 py-2.5">
          <p className="text-[11px] font-semibold">Customers</p>
          <span className="rounded-[5px] border border-line bg-white px-1.5 py-0.5 text-[8px] font-medium text-muted">
            New
          </span>
        </div>

        <div className="p-3.5">
          <div className="flex gap-1 rounded-[9px] border border-line bg-surface-2/70 p-1">
            {(
              [
                ['manual', 'Add manually'],
                ['import', 'Import file'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cx(
                  'flex-1 rounded-[7px] px-2 py-1.5 text-[9.5px] font-medium transition-colors',
                  tab === key ? 'bg-white text-fg shadow-soft' : 'text-muted hover:text-fg',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'manual' ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <MockField className="col-span-2" label="Name" value="Sample Customer" />
              <MockField label="Phone" value="(555) 010-0199" />
              <MockField label="Email" value="sample@email.com" />
              <MockField className="col-span-2" label="Service type" value="Kitchen remodel" />
            </div>
          ) : (
            <div className="mt-3 rounded-[10px] border border-dashed border-accent/35 bg-mint-2/60 px-3 py-6 text-center">
              <span className="round mx-auto grid size-8 place-items-center bg-white text-accent-ink shadow-soft">
                <Upload className="size-3.5" strokeWidth={2} />
              </span>
              <p className="mt-2 text-[10px] font-medium text-fg">Drop a CSV or Excel file here</p>
              <p className="mt-0.5 text-[8.5px] text-faint">CSV or Excel</p>
            </div>
          )}
        </div>
      </div>
    </VisualShell>
  )
}

/* Step 2: import preview that matches columns, cleans rows and summarises */
function CleanListVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || step >= 5) return
    const timer = window.setTimeout(() => setStep(step + 1), 500)
    return () => window.clearTimeout(timer)
  }, [inView, step])

  const headers = step >= 1 ? ['Name', 'Phone', 'Email', 'Service'] : ['customer name', 'phone ', 'Email Addr.', 'service type']
  const rows =
    step >= 1
      ? [
          ['Sample Customer', '(555) 010-0199', 'sample@email.com', 'Kitchen remodel'],
          ['Sample Customer 2', '(555) 010-0201', 'sample2@email.com', 'Bathroom renovation'],
          ['Sample Customer 3', '(555) 010-0202', 'sample3@email.com', 'Deck build'],
        ]
      : [
          [' Sample  Customer ', '5550100199', ' sample@email.com', 'Kitchen  remodel'],
          ['Sample Customer 2 ', '(555) 010-0201 ', 'sample2@email.com ', 'Bathroom  renovation'],
          ['Sample  Customer 3', '5550100202', 'sample3@email.com', 'Deck  build'],
        ]

  return (
    <VisualShell>
      <div ref={ref} className="overflow-hidden rounded-[14px] border border-line bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-3.5 py-2.5">
          <p className="text-[11px] font-semibold">Import preview</p>
          <span className="rounded-[5px] bg-mint px-1.5 py-0.5 text-[8px] font-medium text-accent-ink">Sample</span>
        </div>

        <div className="overflow-hidden p-3.5">
          <div className="grid grid-cols-[1.15fr_1fr_1.35fr_1fr_14px] gap-2 border-b border-line pb-1.5">
            {headers.map((header, i) => (
              <span
                key={i}
                className={cx(
                  'truncate text-[7.5px] font-semibold uppercase tracking-[0.06em] transition-colors duration-300',
                  step >= 1 ? 'text-accent-ink' : 'text-faint',
                )}
              >
                {header}
              </span>
            ))}
            <span />
          </div>

          <ul>
            {rows.map((row, i) => {
              const cleaned = step >= i + 2
              return (
                <li
                  key={i}
                  className="grid grid-cols-[1.15fr_1fr_1.35fr_1fr_14px] items-center gap-2 border-b border-line/60 py-1.5 last:border-0"
                >
                  {row.map((cell, j) => (
                    <span key={j} className="truncate text-[8px] text-muted">
                      {cell}
                    </span>
                  ))}
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={cleaned ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="text-accent-deep"
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </motion.span>
                </li>
              )
            })}
          </ul>

        </div>

        <motion.div
          initial={false}
          animate={step >= 5 ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden"
        >
          <div className="border-t border-line bg-surface-2/50 px-3.5 py-3">
            <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-accent-ink">Sample</p>
            <p className="mt-1 text-[9.5px] leading-relaxed text-muted">
              120 rows found · 104 ready · 9 duplicates removed · 7 need attention
            </p>
          </div>
        </motion.div>
      </div>
    </VisualShell>
  )
}

/* Step 3: mark a job completed */
function CompleteJobVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.55 })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer = window.setTimeout(() => setDone(true), 1200)
    return () => window.clearTimeout(timer)
  }, [inView])

  return (
    <VisualShell>
      <div ref={ref} className="overflow-hidden rounded-[14px] border border-line bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-3.5 py-2.5">
          <p className="text-[11px] font-semibold">Jobs</p>
          <span className="text-[8.5px] text-faint">This week</span>
        </div>

        <div className="p-3.5">
          <div
            className={cx(
              'rounded-[12px] border bg-white p-3 transition-colors duration-500',
              done ? 'border-accent/35' : 'border-line',
            )}
          >
            <div className="flex items-start gap-2.5">
              <Avatar initials="SC" tone="mint" className="size-8 text-[10px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium">Sample Customer</p>
                <p className="truncate text-[9px] text-faint">Kitchen remodel · Mar 14, 2026</p>
              </div>
              <span
                className={cx(
                  'inline-flex h-[22px] shrink-0 items-center gap-1 rounded-[7px] px-2 text-[9px] font-medium transition-colors duration-300',
                  done ? 'bg-mint text-accent-ink' : 'bg-surface-2 text-muted',
                )}
              >
                {done && <Check className="size-2.5" strokeWidth={3} />}
                {done ? 'Completed' : 'In Progress'}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
              <span className="text-[9px] text-faint">{done ? 'Completion confirmed' : 'Service finished today'}</span>

              <div className="relative">
                <span
                  className={cx(
                    'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-3 text-[10.5px] font-medium transition-colors duration-300',
                    done ? 'bg-mint text-accent-ink' : 'bg-accent-deep text-white shadow-accent',
                  )}
                >
                  {done && <Check className="size-3" strokeWidth={3} />}
                  {done ? 'Completed' : 'Mark Completed'}
                </span>

                {!done && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.6, duration: 0.35 }}
                    className="pointer-events-none absolute -bottom-2 -right-1"
                  >
                    <MousePointer2 className="size-4 fill-fg text-white" strokeWidth={1.5} />
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* Step 4: SMS, email and a five-star review */
function PhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[240px] rounded-[28px] border-[5px] border-fg bg-fg shadow-lift">
      <div className="relative overflow-hidden rounded-[23px] bg-white">
        <div className="flex items-center justify-between px-3 pt-2 text-[6.5px] font-medium text-faint">
          <span>9:41</span>
          <span aria-hidden className="round h-1 w-9 bg-line-strong" />
          <span>5G</span>
        </div>

        <div className="px-3 pb-3 pt-2">
          <p className="text-center text-[8px] font-medium text-muted">Messages</p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.3, ease }}
            className="mt-2"
          >
            <div className="rounded-[12px] rounded-tl-[3px] border border-line bg-surface-2 p-2.5">
              <p className="text-[10px] leading-relaxed text-fg">
                Hi Sample Customer, thanks for choosing us! Would you leave us a quick review?
              </p>
              <div className="mt-2 grid h-7 place-items-center rounded-[7px] bg-accent-deep text-[9.5px] font-medium text-white">
                Leave a review
              </div>
            </div>
            <p className="mt-1 text-right text-[7px] text-faint">Delivered</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function SendReviewVisual() {
  return (
    <VisualShell className="bg-[radial-gradient(120%_120%_at_80%_0%,#eefdf5_0%,#ffffff_70%)]">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center">
        <PhoneMock />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.55, ease }}
          className="rounded-[12px] border border-line bg-white p-3 shadow-soft"
        >
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-mint text-accent-ink">
              <Mail className="size-3" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium">Review request</p>
              <p className="truncate text-[8.5px] text-faint">to sample@email.com</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] font-medium">How did we do?</p>
          <p className="mt-1 text-[9.5px] leading-relaxed text-muted">
            Hi Sample Customer, thanks for choosing us! Would you leave us a quick review?
          </p>
          <div className="mt-2 grid h-7 place-items-center rounded-[7px] bg-mint text-[9.5px] font-medium text-accent-ink">
            Leave a review
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 1.05, ease }}
        className="mt-3 flex items-center gap-3 rounded-[13px] border border-accent/25 bg-white p-3 shadow-soft"
      >
        <span className="round grid size-9 shrink-0 place-items-center bg-mint">
          <Star className="size-4 fill-accent text-accent" strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold">New 5-star review</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Stars starClassName="size-3" />
            <span className="text-[8.5px] text-faint">Sample Customer · just now</span>
          </div>
        </div>
      </motion.div>
    </VisualShell>
  )
}
