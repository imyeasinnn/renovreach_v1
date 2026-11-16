import { ArrowLeft } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { BusinessDetails } from '../components/BusinessDetails'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { email } from '../content'

const inputClass =
  'h-11 w-full rounded-control border border-line bg-surface-2/60 px-3.5 text-[14px] text-fg placeholder:text-faint transition-colors focus:border-accent/45 focus:bg-white'

export function Contact() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = `Website enquiry from ${name}`
    const body = `${message}\n\n${name}\n${address}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
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
            <BusinessDetails className="mt-3" showLegal={false} />

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

          <form onSubmit={handleSubmit} className="rounded-card border border-line bg-white p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-fg">Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-fg">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-[12.5px] font-medium text-fg">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="How can we help?"
                className={`${inputClass} h-auto min-h-[128px] py-2.5`}
              />
            </label>

            <Button type="submit" size="lg" className="mt-4 w-full">
              Send message
            </Button>

            {opened && (
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                Your email app should open with the message ready to send. If it doesn’t, email{' '}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-deep"
                >
                  {email}
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </Container>
    </article>
  )
}
