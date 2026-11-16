import { Logo } from '../components/Logo'
import { COMPANY, email, footer } from '../content'
import { cx } from '../lib/cx'

const columnHeading = 'text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8ba096]'
const columnLink =
  'inline-flex min-h-11 items-center text-[14px] leading-snug text-[#d3ded8] transition-colors hover:text-accent'

// One address part per line, with a comma on every line but the last.
const addressLines = COMPANY.registeredOffice
  .split(',')
  .map((part) => part.trim())
  .filter(Boolean)

function FooterColumn({
  title,
  links,
  hrefFor,
  className,
}: {
  title: string
  links: { label: string; href: string }[]
  hrefFor: (target: string) => string
  className?: string
}) {
  return (
    <nav aria-label={title} className={className}>
      <p className={columnHeading}>{title}</p>
      <ul className="mt-1 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <a href={hrefFor(link.href)} className={columnLink}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer({ home = true }: { home?: boolean }) {
  // Section links need to travel back to the home page from policy pages.
  const hrefFor = (target: string) => (target.startsWith('#') && !home ? `/${target}` : target)

  return (
    <footer className="border-t border-[rgb(16_185_129/0.28)] bg-[#050d0a] text-white">
      <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-y-0 lg:py-16">
          <div>
            <Logo home={home} tone="dark" className="[&_img]:h-8" />

            {/* DEMO company details: replace values in the COMPANY object before launch */}
            {addressLines.length > 0 && (
              <address className="mt-3 text-[14px] not-italic leading-[1.6] text-[#a9b9b2]">
                {addressLines.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i < addressLines.length - 1 ? ',' : ''}
                  </span>
                ))}
              </address>
            )}
          </div>

          <FooterColumn title="Product" links={footer.product} hrefFor={hrefFor} />

          <FooterColumn title="Legal" links={footer.legal} hrefFor={hrefFor} />

          <nav aria-label="Contact">
            <p className={columnHeading}>Contact</p>
            <ul className="mt-1 flex flex-col">
              <li>
                <a href={footer.contact.href} className={columnLink}>
                  Contact
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className={cx(columnLink, 'break-all')}>
                  {email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col items-center py-6 text-center sm:flex-row sm:justify-start sm:text-left">
            <p className="text-[12.5px] text-white/45">
              {footer.copyright}{' '}·{' '}
              <a href="/terms" className="transition-colors hover:text-accent">
                Terms
              </a>
              {' '}·{' '}
              <a href="/privacy" className="transition-colors hover:text-accent">
                Privacy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
