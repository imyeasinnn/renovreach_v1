import { email } from '../content'
import { LAST_UPDATED, LegalPage } from './LegalPage'

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro="These Terms of Service govern your access to and use of RenovReach. By using the service, you agree to these terms."
      sections={[
        {
          id: 'about',
          title: 'About RenovReach',
          body: (
            <p>
              RenovReach is a customer engagement and reputation management service for service-based
              businesses. In these terms, “RenovReach”, “we”, “us” and “our” refer to the provider of the
              service.
            </p>
          ),
        },
        {
          id: 'service',
          title: 'The service',
          body: (
            <>
              <p>RenovReach helps service businesses stay in touch with their customers. The V1 service covers:</p>
              <ul>
                <li>customer and job management;</li>
                <li>job completion confirmation;</li>
                <li>automated SMS and email review requests;</li>
                <li>review management;</li>
                <li>automated customer follow-ups; and</li>
                <li>customer marketing campaigns.</li>
              </ul>
              <p>We may improve, update or change the service and its features over time.</p>
            </>
          ),
        },
        {
          id: 'launch-status',
          title: 'Launch status',
          body: (
            <p>
              V1 is launching soon. The features described on this website may change before launch. We will
              update the product information and these terms if they do.
            </p>
          ),
        },
        {
          id: 'business-use',
          title: 'Business use only',
          body: (
            <p>
              RenovReach is provided for business use. You must use the service for business purposes and not
              for personal, family or household purposes.
            </p>
          ),
        },
        {
          id: 'accounts',
          title: 'Accounts and acceptable use',
          body: (
            <>
              <p>
                You must provide accurate account information and keep your login details secure. You are
                responsible for activity that happens under your account.
              </p>
              <p>You must not:</p>
              <ul>
                <li>use the service unlawfully or to send spam;</li>
                <li>message people who have not agreed to be contacted;</li>
                <li>interfere with the service or try to access it without permission; or</li>
                <li>use the service to mislead, harass or harm others.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'messaging-consent',
          title: 'Your responsibility for messaging consent',
          body: (
            <>
              <p>
                You are responsible for the messages you send through RenovReach. You must have permission from
                your own customers before texting or emailing them, and you must follow all applicable laws and
                carrier rules.
              </p>
              <p>
                You must honor opt-out requests, including STOP requests, and keep records of the consent you
                rely on.
              </p>
            </>
          ),
        },
        {
          id: 'pricing',
          title: 'Pricing and billing',
          body: (
            <>
              <p>
                RenovReach is $297/month, billed monthly. There are no annual subscriptions. The plan includes
                500 messaging credits per month.
              </p>
              <p>
                Additional messaging is available through a usage-based credit system. SMS delivery costs
                depend on messaging usage, destination country, carrier, and Twilio rates. Your usage and
                balance are visible in your customer dashboard.
              </p>
            </>
          ),
        },
        {
          id: 'payments',
          title: 'Payments',
          body: (
            <p>
              Payments are processed securely by Stripe. We do not store full payment card details.
            </p>
          ),
        },
        {
          id: 'cancellation',
          title: 'Cancellation and refunds',
          body: (
            <p>
              You can cancel at any time. Cancellation takes effect at the end of the current billing period,
              and you keep access until then. Subscription fees are non-refundable once a billing period has
              started, except where required by law. See our{' '}
              <a href="/refund-policy">Refund &amp; Cancellation Policy</a> for the full details.
            </p>
          ),
        },
        {
          id: 'messaging-delivery',
          title: 'Messaging delivery',
          body: (
            <p>
              We do not guarantee that messages will be delivered. Carriers and third parties may filter or
              delay messages. Undelivered messages caused by carrier filtering, invalid numbers, or other
              factors outside our control are not refunded.
            </p>
          ),
        },
        {
          id: 'third-party-services',
          title: 'Third-party services',
          body: (
            <p>
              We use third-party providers including Stripe for payments, and Twilio and carriers for
              messaging. Their services are subject to their own terms and policies.
            </p>
          ),
        },
        {
          id: 'your-data',
          title: 'Your data',
          body: (
            <p>
              Our handling of personal data, including the customer and job data you add, is described in our{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          ),
        },
        {
          id: 'availability',
          title: 'Availability and changes to the service',
          body: (
            <p>
              We work to keep RenovReach available, but we do not guarantee uninterrupted or error-free access.
              We may change, suspend or discontinue parts of the service, and we will give reasonable notice
              where we can.
            </p>
          ),
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          body: (
            <p>
              To the maximum extent permitted by law, RenovReach is not liable for indirect, incidental,
              special, consequential or punitive damages, or for lost profits, revenue, data or goodwill,
              arising from your use of the service. Our total liability for any claim relating to the service
              will not exceed the amount you paid us in the three months before the event giving rise to the
              claim.
            </p>
          ),
        },
        {
          id: 'suspension',
          title: 'Suspension and termination',
          body: (
            <p>
              We may suspend or terminate your access if you breach these terms, if required by law, or if your
              use creates risk for us, our customers or third parties. You may stop using the service at any
              time. Payment obligations for the current billing period, and sections that by their nature
              should survive, will survive termination.
            </p>
          ),
        },
        {
          id: 'changes',
          title: 'Changes to these terms',
          body: (
            <p>
              We may update these terms from time to time. We will post the updated terms on this page with a
              new “Last updated” date. Your continued use of the service after changes take effect means you
              accept the updated terms.
            </p>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          body: (
            <p>
              Questions about these terms? Email{' '}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
