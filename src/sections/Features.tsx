import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  MousePointer2,
  RotateCcw,
  Send,
  Star,
  UserPlus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Container } from '../components/Container'
import { featureFlow } from '../content'
import { cx } from '../lib/cx'

type NodeId = keyof typeof featureFlow.nodes

const TOTAL_STEPS = 8
const FINAL_STEP = TOTAL_STEPS

const icons: Record<NodeId, LucideIcon> = {
  added: UserPlus,
  completed: CircleCheck,
  confirmed: BadgeCheck,
  sms: MessageSquare,
  email: Mail,
  followUp: Send,
  received: Star,
  manage: ListChecks,
  repeat: Megaphone,
}

function nodeState(id: NodeId, shown: number) {
  const { step } = featureFlow.nodes[id]
  return {
    show: shown >= step,
    active: shown === step,
    done: shown > step,
  }
}

/* ---------- Node card ---------- */

function NodeCard({
  id,
  shown,
  reduce,
  compact = false,
}: {
  id: NodeId
  shown: number
  reduce: boolean
  compact?: boolean
}) {
  const node = featureFlow.nodes[id]
  const Icon = icons[id]
  const { show, active, done } = nodeState(id, shown)
  const isManual = id === 'completed'

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        'relative flex flex-col rounded-[16px] border bg-[#0a1712] transition-[border-color,box-shadow] duration-500',
        compact ? 'p-2.5 sm:p-3' : 'p-3.5 sm:p-4',
        active
          ? 'border-accent/45 shadow-[0_0_0_1px_rgb(16_185_129/0.25),0_0_38px_-10px_rgb(16_185_129/0.65)]'
          : done
            ? 'border-accent/25'
            : 'border-accent/[0.12]',
      )}
    >
      {active && !reduce && (
        <span aria-hidden className="absolute right-2.5 top-2.5 size-1.5 animate-pulse rounded-full bg-accent" />
      )}

      {done && (
        <motion.span
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-accent text-[#04231a] shadow-[0_0_12px_rgb(16_185_129/0.55)]"
        >
          <Check className="size-2.5" strokeWidth={3.5} />
        </motion.span>
      )}

      <div className="flex flex-wrap items-start justify-between gap-1.5">
        <span
          className={cx(
            'grid shrink-0 place-items-center rounded-full bg-accent/10 text-accent',
            compact ? 'size-6' : 'size-7 sm:size-8',
          )}
        >
          <Icon className={compact ? 'size-3' : 'size-3.5 sm:size-4'} strokeWidth={1.9} />
        </span>
        <span
          className={cx(
            'round mt-0.5 shrink-0 px-1.5 py-0.5 font-semibold uppercase',
            compact ? 'text-[8px] tracking-[0.06em]' : 'text-[9px] tracking-[0.08em]',
            isManual
              ? 'bg-accent text-[#04231a]'
              : 'border border-accent/20 bg-accent/[0.06] text-[#7fd3b0]',
          )}
        >
          {isManual ? featureFlow.manualLabel : featureFlow.automaticLabel}
        </span>
      </div>

      <h3
        className={cx(
          'mt-2 font-medium leading-snug text-[#eef5f1]',
          compact ? 'text-[11.5px] sm:text-[12px]' : 'text-[13px] sm:text-[13.5px]',
        )}
      >
        {node.title}
      </h3>
      <p
        className={cx(
          'mt-1 leading-snug text-[#8fa79c]',
          compact ? 'text-[10.5px]' : 'text-[11.5px]',
        )}
      >
        {node.description}
      </p>

      {id === 'completed' && <CompletedMock shown={shown} reduce={reduce} />}
      {id === 'received' && <ReviewMock show={nodeState('received', shown).show} reduce={reduce} />}
      {(id === 'sms' || id === 'email') && (
        <BranchBubble
          key={id}
          icon={id === 'sms' ? MessageSquare : Mail}
          show={nodeState(id, shown).active}
          reduce={reduce}
        />
      )}
    </motion.article>
  )
}

/* Mouse cursor clicking "Mark Completed", then the status flips. */
function CompletedMock({ shown, reduce }: { shown: number; reduce: boolean }) {
  const made = shown > 1
  const clicking = shown === 1 && !reduce

  return (
    <div className="mt-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-1.5">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[8.5px] uppercase tracking-[0.1em] text-white/35">Status</span>
        <span
          className={cx(
            'round px-1.5 py-0.5 text-[9px] font-medium transition-colors duration-300',
            made ? 'bg-accent/15 text-accent' : 'bg-white/[0.08] text-white/55',
          )}
        >
          {made ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="relative mt-1.5">
        <span
          className={cx(
            'flex h-6 items-center justify-center gap-1 rounded-md text-[9.5px] font-medium transition-colors duration-300',
            made ? 'bg-accent/15 text-accent' : 'bg-accent-deep text-white',
          )}
        >
          {made ? <Check className="size-2.5" strokeWidth={3} /> : 'Mark Completed'}
        </span>

        {clicking && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -right-1 top-0.5 text-white drop-shadow"
            initial={{ opacity: 0, x: -10, y: 4 }}
            animate={{ opacity: 1, x: 0, y: [4, 0, -1, 0], scale: [1, 0.85, 1] }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
          >
            <MousePointer2 className="size-3.5 fill-white" />
          </motion.span>
        )}
      </div>
    </div>
  )
}

/* Five green stars pop into a "New review" card. */
function ReviewMock({ show, reduce }: { show: boolean; reduce: boolean }) {
  return (
    <div className="mt-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-1.5">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[8.5px] uppercase tracking-[0.1em] text-white/35">New review</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: reduce ? 0 : 0.12 + i * 0.07, duration: 0.28, ease: 'backOut' }}
            >
              <Star className="size-2.5 fill-accent text-accent" strokeWidth={1.5} />
            </motion.span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-[9px] text-white/45">Sample Customer</p>
    </div>
  )
}

/* Small message bubble that slides out when a review request sends. */
function BranchBubble({
  icon: Icon,
  show,
  reduce,
}: {
  icon: LucideIcon
  show: boolean
  reduce: boolean
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -8 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.35, delay: reduce ? 0 : 0.2 }}
      className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-accent/20 bg-accent/[0.07] px-1.5 py-0.5 text-[8.5px] text-[#9fc7b5]"
    >
      <Icon className="size-2.5 text-accent" strokeWidth={2} />
      Sent
    </motion.div>
  )
}

/* ---------- Connectors ---------- */

function DesktopConnector({ filled }: { filled: boolean }) {
  return (
    <div aria-hidden className="relative hidden h-6 self-center lg:block">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />
      <span
        className={cx(
          'absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-accent transition-transform duration-500',
          filled ? 'scale-x-100' : 'scale-x-0',
        )}
      />
      <ChevronRight
        className={cx(
          'absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 transition-colors duration-300',
          filled ? 'text-accent' : 'text-white/25',
        )}
      />
    </div>
  )
}

/* ---------- Mobile flow ---------- */

function MobileNode({
  id,
  shown,
  reduce,
}: {
  id: NodeId
  shown: number
  reduce: boolean
}) {
  const { show } = nodeState(id, shown)

  return (
    <div className="relative pb-4 pl-11">
      <span aria-hidden className="absolute left-[13px] top-0 h-full w-px bg-white/10" />
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleY: show ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute left-[13px] top-0 h-full w-px origin-top bg-accent shadow-[0_0_12px_rgb(16_185_129/0.6)]"
      />
      <span
        aria-hidden
        className={cx(
          'absolute left-[9px] top-6 size-2 rounded-full border transition-colors duration-300',
          show ? 'border-accent bg-accent' : 'border-white/25 bg-[#0a1712]',
        )}
      />
      <div className="pt-3">
        <NodeCard id={id} shown={shown} reduce={reduce} />
      </div>
    </div>
  )
}

function MobileFork({ shown, reduce }: { shown: number; reduce: boolean }) {
  const lit = shown >= 3
  const merged = shown >= 4

  return (
    <div className="relative pb-4 pl-11">
      <span aria-hidden className="absolute left-[13px] top-0 h-full w-px bg-white/10" />
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleY: lit ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute left-[13px] top-0 h-full w-px origin-top bg-accent shadow-[0_0_12px_rgb(16_185_129/0.6)]"
      />
      <span
        aria-hidden
        className={cx(
          'absolute left-[9px] top-2 size-2 rounded-full border transition-colors duration-300',
          lit ? 'border-accent bg-accent' : 'border-white/25 bg-[#0a1712]',
        )}
      />

      <div className="relative pt-8">
        {/* Split into SMS and email */}
        <svg
          aria-hidden
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          className="absolute left-0 right-0 top-0 h-8 w-full"
          fill="none"
        >
          <path
            d="M 0 10 H 75 M 25 10 V 32 M 75 10 V 32"
            stroke="rgb(255 255 255 / 0.12)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 10 H 75 M 25 10 V 32 M 75 10 V 32"
            stroke="#10b981"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className={cx('transition-opacity duration-500', lit ? 'opacity-100' : 'opacity-0')}
          />
        </svg>
        <span
          aria-hidden
          className={cx(
            'absolute -left-[31px] top-2.5 h-px w-[31px] transition-colors duration-500',
            lit ? 'bg-accent' : 'bg-white/10',
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <NodeCard id="sms" shown={shown} reduce={reduce} compact />
          <NodeCard id="email" shown={shown} reduce={reduce} compact />
        </div>

        {/* Merge back into the main line */}
        <div className="relative h-8">
          <svg
            aria-hidden
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-0 h-8 w-full"
            fill="none"
          >
            <path
              d="M 25 0 V 22 M 75 0 V 22 M 0 22 H 75"
              stroke="rgb(255 255 255 / 0.12)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 25 0 V 22 M 75 0 V 22 M 0 22 H 75"
              stroke="#10b981"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className={cx('transition-opacity duration-500', merged ? 'opacity-100' : 'opacity-0')}
            />
          </svg>
          <span
            aria-hidden
            className={cx(
              'absolute -left-[31px] top-[22px] h-px w-[31px] transition-colors duration-500',
              merged ? 'bg-accent' : 'bg-white/10',
            )}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

export function Features() {
  const flowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(flowRef, { once: true, amount: 0.15 })
  const reduce = useReducedMotion() ?? false
  const [run, setRun] = useState(0)
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setStep(FINAL_STEP)
      return
    }

    setStep(-1)
    const timers = Array.from({ length: TOTAL_STEPS }, (_, i) =>
      window.setTimeout(() => setStep(i), 300 + i * 520),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [inView, reduce, run])

  const shown = reduce ? FINAL_STEP : step
  const closing = shown >= TOTAL_STEPS - 1

  return (
    <section id="features" className="scroll-mt-24 border-y border-line bg-surface-2 py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#050d0a] px-4 py-12 shadow-[0_50px_120px_-70px_rgb(4_60_40/0.6)] sm:rounded-[28px] sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(16_185_129/0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[720px] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 flex items-center justify-center gap-2.5">
                <span aria-hidden className="h-px w-6 bg-accent/50" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6ee7b7]">
                  {featureFlow.eyebrow}
                </p>
              </div>
              <h2 className="text-balance text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#f4faf7] sm:text-[40px]">
                {featureFlow.title}
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#9fb3a9] sm:text-[17px]">
                {featureFlow.subtitle}
              </p>
            </div>

            <div ref={flowRef} className="mt-10 sm:mt-12">
              {/* Desktop: two rows with a curve between them */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-[1fr_28px_1fr_28px_1fr_28px_1.35fr_28px_1fr] items-center">
                  <NodeCard id="added" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 1} />
                  <NodeCard id="completed" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 2} />
                  <NodeCard id="confirmed" shown={shown} reduce={reduce} />

                  <DesktopConnector filled={shown >= 3} />

                  {/* Fork: SMS above email */}
                  <div className="relative px-4">
                    <span
                      aria-hidden
                      className={cx(
                        'absolute left-0 top-[24%] bottom-[24%] w-4 rounded-l-[4px] border-y border-l transition-colors duration-500',
                        shown >= 3 ? 'border-accent/60' : 'border-white/[0.12]',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cx(
                        'absolute right-0 top-[24%] bottom-[24%] w-4 rounded-r-[4px] border-y border-r transition-colors duration-500',
                        shown >= 4 ? 'border-accent/60' : 'border-white/[0.12]',
                      )}
                    />
                    <div className="grid grid-rows-2 gap-3">
                      <NodeCard id="sms" shown={shown} reduce={reduce} compact />
                      <NodeCard id="email" shown={shown} reduce={reduce} compact />
                    </div>
                  </div>

                  <DesktopConnector filled={shown >= 4} />
                  <NodeCard id="followUp" shown={shown} reduce={reduce} />
                </div>

                {/* Curved connector from the end of row one back to row two */}
                <div className="relative h-16" aria-hidden>
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                    fill="none"
                  >
                    <path
                      d="M 90 0 C 90 66, 16 24, 16 94"
                      stroke="rgb(255 255 255 / 0.12)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path
                      d="M 90 0 C 90 66, 16 24, 16 94"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: shown >= 5 ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      style={{ filter: 'drop-shadow(0 0 4px rgb(16 185 129 / 0.55))' }}
                    />
                  </svg>
                  <ChevronDown
                    className={cx(
                      'absolute bottom-0 size-3 -translate-x-1/2 transition-colors duration-300',
                      shown >= 5 ? 'text-accent' : 'text-white/25',
                    )}
                    style={{ left: '16%' }}
                  />
                </div>

                <div className="grid grid-cols-[1fr_28px_1fr_28px_1fr] items-center">
                  <NodeCard id="received" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 6} />
                  <NodeCard id="manage" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 7} />
                  <NodeCard id="repeat" shown={shown} reduce={reduce} />
                </div>
              </div>

              {/* Tablet and mobile: vertical flow with a rail */}
              <div className="lg:hidden">
                <MobileNode id="added" shown={shown} reduce={reduce} />
                <MobileNode id="completed" shown={shown} reduce={reduce} />
                <MobileNode id="confirmed" shown={shown} reduce={reduce} />
                <MobileFork shown={shown} reduce={reduce} />
                <MobileNode id="followUp" shown={shown} reduce={reduce} />
                <MobileNode id="received" shown={shown} reduce={reduce} />
                <MobileNode id="manage" shown={shown} reduce={reduce} />
                <MobileNode id="repeat" shown={shown} reduce={reduce} />
              </div>
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={closing ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5 }}
              className="mt-2 text-center text-[14.5px] font-medium text-[#cfe2d8] sm:mt-4 sm:text-[15.5px]"
            >
              {featureFlow.closing}
            </motion.p>

            {!reduce && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setRun((value) => value + 1)}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-[12px] font-medium text-[#cfe2d8] transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                >
                  <RotateCcw className="size-3.5" />
                  {featureFlow.replayLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
