import { email } from '../content'
import { LAST_UPDATED, LegalPage } from './LegalPage'

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro="This Privacy Policy explains how RenovReach collects, uses and shares personal data when you use our website and service."
      sections={[
        {
          id: 'who-we-are',
          title: 'Who we are',
          body: (
            <p>
              RenovReach provides customer engagement and reputation management software for service-based
              businesses. For privacy questions, contact us at <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
        {
          id: 'data-we-collect',
          title: 'Data we collect',
          body: (
            <>
              <p>We collect the following categories of data:</p>
              <ul>
                <li>account details, such as your name, email address and login information;</li>
                <li>customer and job data you add, such as names, contact details and job or service details;</li>
                <li>message content and delivery status for SMS and email sent through the service;</li>
                <li>payment data, which is handled by Stripe; and</li>
                <li>website usage and cookie data.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'how-we-use-data',
          title: 'How we use data',
          body: (
            <>
              <p>We use personal data to:</p>
              <ul>
                <li>provide and operate the service;</li>
                <li>send and track review requests, follow-ups and campaigns;</li>
                <li>process payments;</li>
                <li>respond to support requests;</li>
                <li>keep the service secure and prevent misuse;</li>
                <li>improve the service; and</li>
                <li>comply with legal obligations.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'our-role',
          title: 'Our role',
          body: (
            <p>
              When our business customers add customer and job data and send messages, we process that data on
              their behalf. Those customers are responsible for having the permissions and consents described
              in our <a href="/terms">Terms of Service</a>. For account data and website usage data, we act as
              the controller.
            </p>
          ),
        },
        {
          id: 'sharing',
          title: 'Sharing',
          body: (
            <p>
              We share personal data with service providers that help us run RenovReach, including Stripe for
              payments, Twilio and carriers for messaging, and hosting and email providers. We do not sell
              personal data.
            </p>
          ),
        },
        {
          id: 'sms-messaging',
          title: 'SMS messaging',
          body: (
            <p>
              Message and data rates may apply. Message frequency varies. Reply STOP to unsubscribe and HELP
              for help. Mobile information and SMS opt-in data are not shared with third parties or affiliates
              for marketing or promotional purposes.
            </p>
          ),
        },
        {
          id: 'retention',
          title: 'Retention',
          body: (
            <p>
              We keep personal data for as long as needed to provide the service, meet legal obligations,
              resolve disputes and enforce our agreements. When data is no longer needed, we delete or
              anonymise it.
            </p>
          ),
        },
        {
          id: 'your-rights',
          title: 'Your rights',
          body: (
            <>
              <p>
                Depending on where you live, you may have the right to access, correct, delete or object to the
                processing of your personal data. Email <a href={`mailto:${email}`}>{email}</a> to make a
                request. We may need to verify your identity before responding.
              </p>
              <p>
                If your request concerns data that a RenovReach customer added, please contact that business.
                We will help them respond.
              </p>
            </>
          ),
        },
        {
          id: 'cookies',
          title: 'Cookies',
          body: (
            <p>
              We use cookies and similar technologies for website usage and to keep the service working. You
              can control cookies through your browser settings.
            </p>
          ),
        },
        {
          id: 'security',
          title: 'Security',
          body: (
            <p>
              We use reasonable technical and organisational measures to protect personal data. No method of
              transmission or storage is completely secure.
            </p>
          ),
        },
        {
          id: 'changes',
          title: 'Changes',
          body: (
            <p>
              We may update this policy from time to time. We will post the updated policy on this page with a
              new “Last updated” date.
            </p>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          body: (
            <p>
              For privacy questions or requests, email <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
