import { email } from '../content'
import { LAST_UPDATED, LegalPage } from './LegalPage'

export function Refunds() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      lastUpdated={LAST_UPDATED}
      intro="This policy explains how cancellation and refunds work for the RenovReach monthly plan."
      sections={[
        {
          id: 'plan',
          title: 'Plan and billing',
          body: (
            <p>
              RenovReach is one plan at $297/month, billed monthly. There are no annual subscriptions or
              long-term contracts.
            </p>
          ),
        },
        {
          id: 'cancel-anytime',
          title: 'Cancel anytime',
          body: (
            <p>
              You can cancel at any time by emailing <a href={`mailto:${email}`}>{email}</a> or from your
              dashboard (once available). Cancellation takes effect at the end of the current billing period.
              You keep access until then and will not be charged again.
            </p>
          ),
        },
        {
          id: 'cancel-before-renewal',
          title: 'Cancel before renewal',
          body: (
            <p>
              To avoid the next charge, cancel before your next billing date. We will send a cancellation
              confirmation by email.
            </p>
          ),
        },
        {
          id: 'refunds',
          title: 'Refunds',
          body: (
            <p>
              Subscription fees are non-refundable once a billing period has started, except where required by
              law.
            </p>
          ),
        },
        {
          id: 'messaging-credits',
          title: 'Messaging credits',
          body: (
            <p>
              Your plan includes 500 messaging credits per month. Included monthly credits do not roll over.
              Credits already used are non-refundable. Messages that fail because of carrier filtering,
              invalid numbers, or other factors outside our control are not refunded.
            </p>
          ),
        },
        {
          id: 'billing-errors',
          title: 'Billing errors',
          body: (
            <p>
              If you think you were charged incorrectly, email{' '}
              <a href={`mailto:${email}`}>{email}</a> within 30 days and we will review it.
            </p>
          ),
        },
        {
          id: 'chargebacks',
          title: 'Chargebacks',
          body: <p>Please contact us first so we can resolve the issue quickly.</p>,
        },
        {
          id: 'approved-refunds',
          title: 'Approved refunds',
          body: <p>Approved refunds are returned to the original payment method.</p>,
        },
      ]}
    />
  )
}
