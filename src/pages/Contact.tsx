import { ArrowLeft, CircleCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { BusinessDetails } from '../components/BusinessDetails'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { email } from '../content'
import { cx } from '../lib/cx'

const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzD37G2smpo4Y2pAEvp6gVMXuUvNTcKiMXJ0n-G69peOwCy6EZbIjyyw1yyqdwgFbrw/exec'

const inputClass =
  'h-11 w-full rounded-control border border-line bg-surface-2/60 px-3.5 text-[14px] text-fg placeholder:text-faint transition-colors focus:border-accent/45 focus:bg-white'

const errorInputClass = 'border-[#d92d20]/50 bg-[#fff6f5] focus:border-[#d92d20]/70'

type FieldErrors = { name?: string; email?: string; message?: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const nextErrors: FieldErrors = {}
    if (!name.trim()) nextErrors.name = 'Please enter your name.'
    if (!address.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!message.trim()) nextErrors.message = 'Please enter a message.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    try {
      const body = new URLSearchParams({
        name: name.trim(),
        email: address.trim(),
        message: message.trim(),
        website,
      })

      await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body })

      setName('')
      setAddress('')
      setMessage('')
      setWebsite('')
      setErrors({})
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

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
          Contact us
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-[15.5px] leading-relaxed text-muted">
          Questions about RenovReach, a demo, or your account? Send us a message and we’ll get back to you.
        </p>

        <div className="mt-9 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-card border border-line bg-surface-2/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-ink">Contact details</p>
            <BusinessDetails className="mt-3" showLegal={false} showPhone={false} showHours={false} />

            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">We reply within 1-2 business days.</p>

            <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
              For billing, cancellation, or privacy requests, email{' '}
              <a
                href={`mailto:${email}`}
                className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-deep"
              >
                {email}
              </a>
              .
            </p>
          </div>

          {status === 'sent' ? (
            <div className="rounded-card border border-line bg-white p-6 shadow-soft" role="status">
              <span className="grid size-10 place-items-center rounded-full bg-mint text-accent-ink">
                <CircleCheck className="size-5" strokeWidth={1.9} />
              </span>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-fg">
                Thanks! We got your message and will reply within 1-2 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-card border border-line bg-white p-6 shadow-soft"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-fg">Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      if (errors.name) setErrors((current) => ({ ...current, name: undefined }))
                    }}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={cx(inputClass, errors.name && errorInputClass)}
                  />
                  {errors.name && (
                    <span id="contact-name-error" className="text-[11.5px] font-medium text-[#b42318]">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-fg">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value)
                      if (errors.email) setErrors((current) => ({ ...current, email: undefined }))
                    }}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={cx(inputClass, errors.email && errorInputClass)}
                  />
                  {errors.email && (
                    <span id="contact-email-error" className="text-[11.5px] font-medium text-[#b42318]">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-fg">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value)
                    if (errors.message) setErrors((current) => ({ ...current, message: undefined }))
                  }}
                  placeholder="How can we help?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={cx(inputClass, 'h-auto min-h-[128px] py-2.5', errors.message && errorInputClass)}
                />
                {errors.message && (
                  <span id="contact-message-error" className="text-[11.5px] font-medium text-[#b42318]">
                    {errors.message}
                  </span>
                )}
              </label>

              {/* Honeypot: hidden from people, filled in by bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="hidden"
              />

              <Button type="submit" size="lg" className="mt-4 w-full" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </Button>

              {status === 'error' && (
                <p role="alert" className="mt-3 text-[12.5px] leading-relaxed text-[#b42318]">
                  Something went wrong. Please email{' '}
                  <a
                    href={`mailto:${email}`}
                    className="font-medium underline decoration-[#b42318]/40 underline-offset-2"
                  >
                    {email}
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </article>
  )
}
