import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Eraser,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  MousePointer2,
  RotateCcw,
  Send,
  Star,
  Upload,
  UserPlus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Container } from '../components/Container'
import { featureFlow } from '../content'
import { cx } from '../lib/cx'

type NodeId = keyof typeof featureFlow.nodes

const TOTAL_STEPS = 10

const icons: Record<NodeId, LucideIcon> = {
  manual: UserPlus,
  upload: Upload,
  cleanup: Eraser,
  added: ClipboardList,
  completed: CircleCheck,
  confirmed: BadgeCheck,
  sms: MessageSquare,
  email: Mail,
  followUp: Send,
  received: Star,
  manage: ListChecks,
  repeat: Megaphone,
}

const lineClass = (on: boolean) =>
  cx('transition-[stroke] duration-500', on ? 'stroke-accent' : 'stroke-white/10')

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
  const tag = id === 'completed' ? featureFlow.manualLabel : id === 'manual' ? null : featureFlow.automaticLabel

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
        {tag && (
          <span
            className={cx(
              'round mt-0.5 shrink-0 px-1.5 py-0.5 font-semibold uppercase',
              compact ? 'text-[8px] tracking-[0.06em]' : 'text-[9px] tracking-[0.08em]',
              id === 'completed'
                ? 'bg-accent text-[#04231a]'
                : 'border border-accent/20 bg-accent/[0.06] text-[#7fd3b0]',
            )}
          >
            {tag}
          </span>
        )}
      </div>

      <h3
        className={cx(
          'mt-2 font-medium leading-snug text-[#eef5f1]',
          compact ? 'text-[11.5px] sm:text-[12px]' : 'text-[13px] sm:text-[13.5px]',
        )}
      >
        {node.title}
      </h3>
      {node.description && (
        <p
          className={cx(
            'mt-1 leading-snug text-[#8fa79c]',
            compact ? 'text-[10.5px]' : 'text-[11.5px]',
          )}
        >
          {node.description}
        </p>
      )}

      {id === 'completed' && <CompletedMock shown={shown} reduce={reduce} />}
      {id === 'received' && <ReviewMock show={nodeState('received', shown).show} reduce={reduce} />}
      {(id === 'sms' || id === 'email') && (
        <BranchBubble
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
    <div aria-hidden className="relative h-6 self-center">
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

/* One SVG path per connector; `on` recolours it as the flow advances. */
function FlowLine({
  d,
  on,
  viewBox = '0 0 100 100',
  className,
  glow = false,
}: {
  d: string
  on: boolean
  viewBox?: string
  className?: string
  glow?: boolean
}) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={cx('absolute left-0 right-0 top-0 w-full', className)}
      fill="none"
    >
      <path
        d={d}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className={lineClass(on)}
        style={glow && on ? { filter: 'drop-shadow(0 0 4px rgb(16 185 129 / 0.55))' } : undefined}
      />
    </svg>
  )
}

/* ---------- Mobile flow ---------- */

function Rail({ lit, dotTop = 'top-2' }: { lit: boolean; dotTop?: string }) {
  return (
    <>
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
          'absolute left-[9px] size-2 rounded-full border transition-colors duration-300',
          dotTop,
          lit ? 'border-accent bg-accent' : 'border-white/25 bg-[#0a1712]',
        )}
      />
    </>
  )
}

/* Two entry paths (manual, or upload then clean-up) that fork off the rail
   and merge back into Job added. */
function MobileEntry({ shown, reduce }: { shown: number; reduce: boolean }) {
  const lit = shown >= 0
  const uploaded = shown >= 1
  const merged = shown >= 2

  return (
    <div className="relative pb-4 pl-11">
      <Rail lit={lit} />

      <div className="relative pt-8">
        {/* Fork from the rail into both columns */}
        <FlowLine
          d="M 0 10 H 75 M 25 10 V 32 M 75 10 V 32"
          on={lit}
          viewBox="0 0 100 32"
          className="h-8"
        />
        <span
          aria-hidden
          className={cx(
            'absolute -left-[31px] top-2.5 h-px w-[31px] transition-colors duration-500',
            lit ? 'bg-accent' : 'bg-white/10',
          )}
        />

        <div className="grid grid-cols-2 items-stretch gap-2.5">
          <div className="flex flex-col">
            <NodeCard id="manual" shown={shown} reduce={reduce} compact />
            <div aria-hidden className="relative min-h-4 flex-1">
              <span
                className={cx(
                  'absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transition-colors duration-500',
                  merged ? 'bg-accent' : 'bg-white/[0.12]',
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <NodeCard id="upload" shown={shown} reduce={reduce} compact />
            <div aria-hidden className="relative flex h-4 items-center justify-center">
              <span
                className={cx(
                  'absolute inset-y-0 w-px transition-colors duration-500',
                  uploaded ? 'bg-accent' : 'bg-white/[0.12]',
                )}
              />
              <ChevronDown
                className={cx(
                  'relative size-3 transition-colors duration-500',
                  uploaded ? 'text-accent' : 'text-white/25',
                )}
              />
            </div>
            <NodeCard id="cleanup" shown={shown} reduce={reduce} compact />
          </div>
        </div>

        {/* Merge both columns into one stem above Job added */}
        {/* Pulled up so the stem meets the Job added card below. */}
        <div className="relative -mb-7 h-10" aria-hidden>
          <FlowLine
            d="M 25 0 V 20 H 75 M 75 0 V 20 M 50 20 V 40"
            on={merged}
            viewBox="0 0 100 40"
            className="h-10"
          />
          <ChevronDown
            className={cx(
              'absolute bottom-0 left-1/2 size-3 -translate-x-1/2 transition-colors duration-500',
              merged ? 'text-accent' : 'text-white/25',
            )}
          />
        </div>
      </div>
    </div>
  )
}

function MobileNode({
  id,
  shown,
  reduce,
}: {
  id: NodeId
  shown: number
  reduce: boolean
}) {
  const show = shown >= featureFlow.nodes[id].step

  return (
    <div className="relative pb-4 pl-11">
      <Rail lit={show} dotTop="top-6" />
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
      <Rail lit={lit} />

      <div className="relative pt-8">
        {/* Split into SMS and email */}
        <FlowLine
          d="M 0 10 H 75 M 25 10 V 32 M 75 10 V 32"
          on={lit}
          viewBox="0 0 100 32"
          className="h-8"
        />
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
          <FlowLine
            d="M 25 0 V 22 M 75 0 V 22 M 0 22 H 75"
            on={merged}
            viewBox="0 0 100 32"
            className="h-8"
          />
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
      setStep(TOTAL_STEPS)
      return
    }

    setStep(-1)
    const timers = Array.from({ length: TOTAL_STEPS }, (_, i) =>
      window.setTimeout(() => setStep(i), 300 + i * 520),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [inView, reduce, run])

  const shown = reduce ? TOTAL_STEPS : step
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
                {/* Two ways in, merging into Job added */}
                <div className="relative max-w-[520px]">
                  <div className="grid grid-cols-[1fr_28px_1fr_28px_1fr] items-stretch">
                    <NodeCard id="manual" shown={shown} reduce={reduce} compact />
                    <div aria-hidden />
                    <NodeCard id="upload" shown={shown} reduce={reduce} compact />
                    <DesktopConnector filled={shown >= 1} />
                    <NodeCard id="cleanup" shown={shown} reduce={reduce} compact />
                  </div>

                  {/* The 520px grid's card centres sit at 77px and 463px. */}
                  <div className="relative h-12" aria-hidden>
                    <FlowLine
                      d="M 77 0 V 48 M 463 0 V 16 H 77"
                      on={shown >= 2}
                      viewBox="0 0 520 48"
                      className="h-full"
                    />
                    <ChevronDown
                      className={cx(
                        'absolute bottom-0 size-3 -translate-x-1/2 transition-colors duration-300',
                        shown >= 2 ? 'text-accent' : 'text-white/25',
                      )}
                      style={{ left: '14.8%' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_28px_1fr_28px_1fr_28px_1.35fr_28px_1fr]">
                  <NodeCard id="added" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 3} />
                  <NodeCard id="completed" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 4} />
                  <NodeCard id="confirmed" shown={shown} reduce={reduce} />

                  <DesktopConnector filled={shown >= 5} />

                  {/* Fork: SMS above email */}
                  <div className="relative px-4">
                    <span
                      aria-hidden
                      className={cx(
                        'absolute left-0 top-[24%] bottom-[24%] w-4 rounded-l-[4px] border-y border-l transition-colors duration-500',
                        shown >= 5 ? 'border-accent/60' : 'border-white/[0.12]',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cx(
                        'absolute right-0 top-[24%] bottom-[24%] w-4 rounded-r-[4px] border-y border-r transition-colors duration-500',
                        shown >= 6 ? 'border-accent/60' : 'border-white/[0.12]',
                      )}
                    />
                    <div className="grid grid-rows-2 gap-3">
                      <NodeCard id="sms" shown={shown} reduce={reduce} compact />
                      <NodeCard id="email" shown={shown} reduce={reduce} compact />
                    </div>
                  </div>

                  <DesktopConnector filled={shown >= 6} />
                  <NodeCard id="followUp" shown={shown} reduce={reduce} />
                </div>

                {/* Curved connector from the end of row one back to row two */}
                <div className="relative h-16" aria-hidden>
                  <FlowLine
                    d="M 90 0 C 90 66, 16 24, 16 94"
                    on={shown >= 7}
                    className="h-full"
                    glow
                  />
                  <ChevronDown
                    className={cx(
                      'absolute bottom-0 size-3 -translate-x-1/2 transition-colors duration-300',
                      shown >= 7 ? 'text-accent' : 'text-white/25',
                    )}
                    style={{ left: '16%' }}
                  />
                </div>

                <div className="grid grid-cols-[1fr_28px_1fr_28px_1fr]">
                  <NodeCard id="received" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 8} />
                  <NodeCard id="manage" shown={shown} reduce={reduce} />
                  <DesktopConnector filled={shown >= 9} />
                  <NodeCard id="repeat" shown={shown} reduce={reduce} />
                </div>
              </div>

              {/* Tablet and mobile: vertical flow with a rail */}
              <div className="mx-auto max-w-[540px] lg:hidden">
                <MobileEntry shown={shown} reduce={reduce} />
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
