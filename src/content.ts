// All copy lives here so the page can be read and edited in one place.
// Sections read from this file; remove a section by deleting it from App.tsx.
//
// V1 only: customer and job management, completion confirmation, automated SMS
// and email review requests, review management, automated follow-ups and
// customer campaigns. No integrations, AI features or extra pricing tiers.

// DEMO VALUES: replace with real details when available.
// Empty fields are hidden automatically.
export const COMPANY = {
  registeredName: 'RenovReach Ltd',
  registeredIn: 'England and Wales',
  companyNumber: '00000000',
  registeredOffice: '10 Example Street, London, EC1A 1AA, United Kingdom',
  location: 'London, United Kingdom',
  phone: '+44 20 7946 0000',
  vatNumber: 'GB 000 0000 00',
  hours: 'Mon-Fri, 9:00-17:00 (GMT)',
  email: 'contact@renovreach.com',
}

export const brand = {
  name: 'RenovReach',
  tagline: 'Customer engagement and reputation management for service businesses.',
}

// The only call to action on the page. Booking opens in a new tab.
export const booking = {
  label: 'Book a Demo',
  href: 'https://cal.com/renov-reach/review',
}

// One contact address for support, billing, privacy and legal questions.
export const email = COMPANY.email

export const legalPages = [
  { label: 'Terms of Service', footerLabel: 'Terms', href: '/terms' },
  { label: 'Privacy Policy', footerLabel: 'Privacy', href: '/privacy' },
  { label: 'Refund & Cancellation Policy', footerLabel: 'Refund & Cancellation', href: '/refund-policy' },
  { label: 'Contact', footerLabel: 'Contact', href: '/contact' },
]

export const nav = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  demo: booking,
}

export const hero = {
  badge: 'Customer engagement & reputation management for service businesses',
  title: 'Turn Every Completed Job Into More Reviews and Repeat Business.',
  // The tail of the headline, set in the accent colour. Must match `title`.
  emphasis: 'More Reviews and Repeat Business.',
  description:
    'Automate customer follow-ups, collect reviews, manage your reputation, and build stronger customer relationships with RenovReach.',
  cta: booking,
  footnote: '$297/month · Monthly billing · No annual contract',
  flow: ['Job completed', 'Review request sent', '5-star review received'],
}

export const problem = {
  eyebrow: 'The problem',
  title: 'Great work shouldn’t go unnoticed.',
  items: [
    {
      key: 'forget',
      title: 'Happy customers forget to leave reviews',
      description: 'Most people intend to. Then the moment passes and the review never gets written.',
    },
    {
      key: 'missed',
      title: 'Follow-ups get missed',
      description: 'In a busy week, the calls and messages that keep customers close are the first to slide.',
    },
    {
      key: 'return',
      title: 'Past customers never come back',
      description: 'Without a reason to reach out again, last year’s customers quietly become last year’s jobs.',
    },
  ],
}

// The post-job flow chart. Steps sharing a number play at the same time.
export const featureFlow = {
  eyebrow: 'What V1 does',
  title: 'Everything that happens after the job is done.',
  subtitle: 'One click from you. The rest runs automatically.',
  closing: 'That’s it. Reviews and repeat business, on autopilot.',
  automaticLabel: 'Automatic',
  manualLabel: 'You do this',
  replayLabel: 'Replay',
  nodes: {
    manual: {
      step: 0,
      title: 'Add customer manually',
      description: 'Name, phone, email and service.',
    },
    upload: {
      step: 0,
      title: 'Upload CSV or Excel',
      description: 'CSV or Excel file.',
    },
    cleanup: {
      step: 1,
      title: 'Automatic clean-up',
      description: 'Columns matched, duplicates removed.',
    },
    added: {
      step: 2,
      title: 'Job added',
      description: 'Customer and service details saved.',
    },
    completed: {
      step: 3,
      title: 'Job completed',
      description: 'You mark the job as completed.',
    },
    confirmed: {
      step: 4,
      title: 'Completion confirmed',
      description: 'The job is confirmed and the automation starts.',
    },
    sms: {
      step: 5,
      title: 'SMS review request',
      description: 'Sent automatically to the customer.',
    },
    email: {
      step: 5,
      title: 'Email review request',
      description: 'Sent automatically to the customer.',
    },
    followUp: {
      step: 6,
      title: 'Automated follow-up',
      description: 'A follow-up goes out if the customer hasn’t left a review.',
    },
    received: {
      step: 7,
      title: 'Review received',
      description: 'A new review appears in your dashboard.',
    },
    manage: {
      step: 8,
      title: 'Review management',
      description: 'See and manage all your reviews in one place.',
    },
    repeat: {
      step: 9,
      title: 'Repeat business',
      description: 'Reach past customers with SMS and email marketing campaigns.',
    },
  },
}

export const howItWorks = {
  title: 'How RenovReach works',
  description: 'Add your customers once. Everything after the job runs automatically.',
  steps: [
    {
      number: '1',
      title: 'Add your customers',
      description: 'Add them one by one, or upload a CSV or Excel file of past customers.',
    },
    {
      number: '2',
      title: 'We clean up your list automatically',
      description: 'RenovReach checks your file and organizes it before anything is sent.',
    },
    {
      number: '3',
      title: 'Mark jobs as completed',
      description: 'One click when the work is done.',
    },
    {
      number: '4',
      title: 'Reviews and follow-ups go out automatically',
      description: 'RenovReach sends SMS and email review requests and follow-ups for you.',
    },
  ],
}

export const cleaning = {
  title: 'How your past customer list is cleaned',
  stages: [
    { title: 'Upload', description: 'CSV or Excel file.' },
    { title: 'Match columns', description: 'Name, phone, email, and service are detected and mapped.' },
    { title: 'Clean up', description: 'Extra spaces fixed and phone numbers standardized.' },
    {
      title: 'Check',
      description:
        'Duplicates removed. Rows with missing or invalid phone or email are flagged for review.',
    },
    { title: 'Ready', description: 'Clean customers added to your customer list.' },
  ],
  notice: 'Only import customers you have permission to contact. You are responsible for consent.',
  fileTypes: 'Supported file types: CSV and Excel.',
}

export const showcase = {
  eyebrow: 'Product',
  title: 'A closer look at what you use every day.',
  description: 'The customer, job, review and campaign views that hold your follow-up together.',
  frames: [
    {
      key: 'customers',
      label: 'Customers',
      caption: 'Customer records with contact details, services and job history in one list.',
    },
    {
      key: 'jobs',
      label: 'Jobs',
      caption: 'Every job and its status, including completion confirmations.',
    },
    {
      key: 'reviews',
      label: 'Reviews & Campaigns',
      caption: 'New reviews as they arrive, and the campaigns that bring past customers back.',
    },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: 'One simple plan.',
  description: 'Every V1 feature, one monthly price, no annual commitment.',
  price: '$297',
  period: '/month',
  cta: booking,
  includesLabel: 'Everything included',
  includes: [
    'All core platform features',
    '500 messaging credits per month',
    'Customer and job management',
    'Automated review requests',
    'SMS and email automation',
    'Reputation management',
  ],
  note: 'No annual subscriptions. Monthly billing only.',
  messagingNote:
    'Additional messaging is available through a usage-based credit system. SMS delivery costs depend on messaging usage, destination country, carrier, and Twilio rates. Additional credits are transparently priced, and usage and balances are visible in your customer dashboard.',
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'Questions, answered.',
  description: 'The details that matter before you start.',
  items: [
    {
      q: 'How do review requests get sent?',
      a: 'By SMS and email. Once you mark a job as completed, RenovReach sends the review request automatically, using the timing and templates you set up.',
    },
    {
      q: 'What happens if I use more than 500 credits?',
      a: 'Messaging continues through a usage-based credit system. Additional credits are priced transparently, and you can see your usage and balance in your customer dashboard at any time.',
    },
    {
      q: 'Is there a contract?',
      a: 'No. RenovReach is billed monthly, with no annual contract and no annual subscription.',
    },
    {
      q: 'What affects SMS costs?',
      a: 'SMS delivery costs depend on messaging usage, the destination country, the carrier, and Twilio rates.',
    },
    {
      q: 'Who is RenovReach for?',
      a: 'Service-based businesses such as contractors, remodelers and home services companies that complete jobs for their customers.',
    },
  ],
}

export const cta = {
  title: 'Ready to get more reviews from every job?',
  description: 'Book a quick demo and see how RenovReach works for your business.',
  button: booking,
}

export const footer = {
  tagline: brand.tagline,
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: legalPages.filter((page) => page.href !== '/contact'),
  contact: legalPages[legalPages.length - 1],
  copyright: '© 2026 RenovReach. All rights reserved.',
  badge: 'V1 Coming Soon',
}
