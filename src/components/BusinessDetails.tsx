import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { COMPANY } from '../content'
import { cx } from '../lib/cx'

// The legal line only appears once every registered-detail field is known.
const hasRegisteredDetails = Boolean(
  COMPANY.registeredName && COMPANY.registeredIn && COMPANY.companyNumber && COMPANY.registeredOffice,
)

// Built from the COMPANY object so editing it updates the footer and contact page.
export const COMPANY_LEGAL_LINE = hasRegisteredDetails
  ? [
      `${COMPANY.registeredName}, registered in ${COMPANY.registeredIn}.`,
      `Company number ${COMPANY.companyNumber}.`,
      `Registered office: ${COMPANY.registeredOffice}.`,
      COMPANY.vatNumber ? `VAT number: ${COMPANY.vatNumber}.` : '',
    ]
      .filter(Boolean)
      .join(' ')
  : ''

// One address part per line, with a comma on every line but the last.
const addressLines = COMPANY.registeredOffice
  .split(',')
  .map((part) => part.trim())
  .filter(Boolean)

/*
  Company details controlled by the COMPANY object in src/content.ts.
  Each line is rendered only when its value is filled in, so an empty
  setting leaves no placeholder and no blank gap.
*/
export function BusinessDetails({
  tone = 'light',
  className,
  showLegal = true,
}: {
  tone?: 'light' | 'dark'
  className?: string
  showLegal?: boolean
}) {
  const onDark = tone === 'dark'
  const row = cx('flex items-start gap-2 text-[12.5px] leading-snug', onDark ? 'text-[#a9b9b2]' : 'text-muted')
  const icon = cx('mt-px size-3.5 shrink-0', onDark ? 'text-[#7f9a8e]' : 'text-accent-ink/75')
  const link = cx('transition-colors', onDark ? 'hover:text-accent' : 'hover:text-accent-ink')
  const legal = cx(
    'mt-2.5 max-w-[340px] text-pretty text-[11.5px] leading-relaxed',
    onDark ? 'text-[#8ba096]' : 'text-faint',
  )

  return (
    <div className={className}>
      <ul className="flex flex-col gap-2">
        {addressLines.length > 0 && (
          <li className={row}>
            <MapPin aria-hidden className={icon} strokeWidth={1.9} />
            <span>
              {addressLines.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i < addressLines.length - 1 ? ',' : ''}
                </span>
              ))}
            </span>
          </li>
        )}

        {COMPANY.phone && (
          <li className={row}>
            <Phone aria-hidden className={icon} strokeWidth={1.9} />
            <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`} className={link}>
              {COMPANY.phone}
            </a>
          </li>
        )}

        <li className={row}>
          <Mail aria-hidden className={icon} strokeWidth={1.9} />
          <a href={`mailto:${COMPANY.email}`} className={cx(link, 'break-all')}>
            {COMPANY.email}
          </a>
        </li>

        {COMPANY.hours && (
          <li className={row}>
            <Clock aria-hidden className={icon} strokeWidth={1.9} />
            <span>{COMPANY.hours}</span>
          </li>
        )}
      </ul>

      {showLegal && COMPANY_LEGAL_LINE && <p className={legal}>{COMPANY_LEGAL_LINE}</p>}
    </div>
  )
}
