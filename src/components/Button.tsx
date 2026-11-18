import { ArrowRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cx } from '../lib/cx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'invert' | 'onDark'
type Size = 'sm' | 'compact' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-semibold transition-[background-color,color,transform,box-shadow,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 motion-reduce:transition-none'

const variants: Record<Variant, string> = {
  // Emerald gradient with dark ink, a glow that follows the lift, and a shine
  // sweep drawn by `.btn-shine` in styles.css.
  primary:
    'round bg-linear-to-b from-[#10b981] to-[#059669] text-[#04170f] shadow-[0_10px_30px_-12px_rgb(16_185_129/0.55)] hover:-translate-y-0.5 hover:from-[#16c98f] hover:to-[#07a273] hover:shadow-[0_18px_44px_-14px_rgb(16_185_129/0.7)] active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
  // For dark surfaces, like the Replay control under the flow chart.
  secondary: 'round border border-accent/35 bg-transparent text-[#e7f3ed] hover:border-accent/60 hover:bg-accent/12',
  ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
  // For the emerald CTA band: white pill on green, and its outline partner.
  invert: 'bg-white text-accent-ink shadow-[0_10px_24px_-12px_rgb(0_40_28/0.45)] hover:bg-mint',
  onDark: 'border border-white/40 bg-white/5 text-white hover:border-white/60 hover:bg-white/12',
}

// Heights match the inputs they sit beside: sm = 36px, md = 44px, lg = 52px.
const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-full px-3.5 text-[12px]',
  compact: 'h-9 rounded-full px-3.5 text-[13.5px]',
  md: 'h-11 rounded-full px-5 text-[14px]',
  lg: 'h-13 rounded-full px-6 text-[15px]',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }
type ButtonProps = Common & ({ href: string } & ComponentPropsWithoutRef<'a'>) | (Common & { href?: undefined } & ComponentPropsWithoutRef<'button'>)

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cx(base, variants[variant], sizes[size], className)
  const isPrimary = variant === 'primary'

  // The arrow's slot has no width until hover so the label never shifts, and
  // the icon slides in from the right as the slot opens.
  const content = (
    <>
      {isPrimary && <span aria-hidden className="btn-shine" />}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {isPrimary && (
          <span
            aria-hidden
            className="grid w-0 place-items-center overflow-hidden opacity-0 transition-[width,opacity] duration-200 group-hover/btn:w-4 group-hover/btn:opacity-100 motion-reduce:transition-none"
          >
            <ArrowRight className="-translate-x-1 transition-transform duration-200 group-hover/btn:translate-x-0 motion-reduce:transition-none" />
          </span>
        )}
      </span>
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {content}
    </button>
  )
}
