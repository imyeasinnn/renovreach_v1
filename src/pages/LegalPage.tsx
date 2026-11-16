import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '../components/Container'

export const LAST_UPDATED = 'November 16, 2026'

export type LegalSection = {
  id: string
  title: string
  body: ReactNode
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string
  lastUpdated: string
  intro?: ReactNode
  sections: LegalSection[]
}) {
  return (
    <article className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Container className="max-w-[900px]">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </a>

        <h1 className="mt-6 text-balance text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
          {title}
        </h1>
        <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-faint">
          Last updated: {lastUpdated}
        </p>
        {intro && (
          <p className="mt-5 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-muted">{intro}</p>
        )}

        <nav aria-label="On this page" className="mt-9 rounded-card border border-line bg-surface-2/70 p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-ink">On this page</p>
          <ol className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-2.5 text-[13.5px] leading-snug text-muted transition-colors hover:text-fg"
                >
                  <span className="shrink-0 tabular-nums text-faint">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-[19px] font-semibold tracking-[-0.02em] sm:text-[21px]">{section.title}</h2>
              <div className="mt-3 space-y-3 text-pretty text-[14.5px] leading-relaxed text-muted [&_a:hover]:text-accent-deep [&_a]:font-medium [&_a]:text-accent-ink [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-[3px] [&_li]:pl-0.5 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium text-accent-ink transition-colors hover:text-accent-deep"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </a>
        </div>
      </Container>
    </article>
  )
}
