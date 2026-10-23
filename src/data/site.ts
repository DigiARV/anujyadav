/** Verified details only. Empty fields are deliberately hidden from visitors. */
export const site = {
  name: 'Anuj Yadav',
  brand: 'Anuj The Coach',
  email: '',
  phone: '',
  bookingUrl: '',
  whatsappUrl: '',
  socials: { LinkedIn: '', YouTube: '', Instagram: '' },
  portrait: '', // Approved image in public/, e.g. /images/anuj.webp
  portraitAlt: 'Anuj Yadav',
  speakerReelUrl: '', // Verified external video URL
  speakerKitUrl: '', // Real approved PDF in public/
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  privacyContact: '',
};

export const services = [
  {
    slug: 'speaking',
    number: '01',
    title: 'Keynote speaking',
    short: 'A fresh perspective. A shared direction.',
    description:
      'Bring people together around the ideas that move work forward: leadership, growth, communication, and the practical possibilities of AI.',
    audience: 'Conferences, organizations, leadership teams, and business communities.',
    formats:
      'Keynotes, fireside chats, panels, and corporate sessions. Format and availability confirmed after enquiry.',
    topics: [
      'Growth mindset & high-performance thinking',
      'Leadership, communication & influence',
      'The future of work: AI, skills & human potential',
      'Entrepreneurship, execution & sustainable growth',
      'Personal branding & thought leadership',
      'Digital marketing & modern customer acquisition',
    ],
    cta: 'Plan a speaking engagement',
  },
  {
    slug: 'corporate-training',
    number: '02',
    title: 'Corporate training',
    short: 'Build skills that show up in the work.',
    description:
      'Practical, participatory workshops shaped around your team’s context. Create space to practise, reflect, and turn a useful idea into an everyday habit.',
    audience: 'People leaders, growing teams, HR and learning & development partners.',
    formats:
      'Interactive workshops, team sessions, and customized programs; virtual or in person, subject to scope.',
    topics: [
      'Leadership & managerial effectiveness',
      'Communication & presentation skills',
      'Soft skills & professional effectiveness',
      'Public speaking & confidence',
      'Personal branding & professional visibility',
      'AI awareness, productivity & adoption',
      'Digital marketing & business growth',
    ],
    cta: 'Discuss your team’s needs',
  },
  {
    slug: 'business-coaching',
    number: '03',
    title: 'Business growth & strategy',
    short: 'Find the next move that matters.',
    description:
      'Step back from the day-to-day to make sense of your priorities, sharpen your positioning, and build a practical plan for what comes next.',
    audience: 'Entrepreneurs, founders, and business owners navigating their next stage.',
    formats: 'Strategy sessions, business coaching, and scoped advisory engagements.',
    topics: [
      'Strategic clarity & business growth',
      'Entrepreneurship & startup thinking',
      'Marketing & customer acquisition',
      'Digital presence & growth opportunities',
      'Goal-setting, execution & accountability',
    ],
    cta: 'Start a strategy conversation',
  },
  {
    slug: 'leadership-coaching',
    number: '04',
    title: 'Leadership & executive coaching',
    short: 'Lead with clarity. Communicate with intent.',
    description:
      'A focused space to examine how you lead, communicate, and make decisions—and identify the practices you want to strengthen.',
    audience: 'Managers, emerging leaders, and professionals taking on greater responsibility.',
    formats: 'One-to-one coaching and focused leadership development conversations.',
    topics: [
      'Leadership development',
      'Executive presence',
      'Communication & influence',
      'Decision-making & professional growth',
      'Career clarity & development',
    ],
    cta: 'Explore leadership coaching',
  },
  {
    slug: 'personal-branding',
    number: '05',
    title: 'Personal branding & creator growth',
    short: 'Make your expertise easier to recognize.',
    description:
      'Connect what you know with what your audience needs. Develop a clear point of view and a more intentional approach to your content and visibility.',
    audience: 'Professionals, entrepreneurs, educators, and creators.',
    formats: 'Brand strategy sessions, content advisory, and tailored workshops.',
    topics: [
      'Personal brand strategy',
      'Content positioning',
      'YouTube & social media strategy',
      'Thought leadership',
      'Digital visibility & audience development',
    ],
    cta: 'Shape your personal brand',
  },
  {
    slug: 'education',
    number: '06',
    title: 'AI & digital education',
    short: 'Understand what’s changing. Learn what’s useful.',
    description:
      'Make emerging tools and digital fundamentals approachable, with learning focused on real work, thoughtful adoption, and useful next steps.',
    audience: 'Professionals, entrepreneurs, teams, and curious learners.',
    formats:
      'Workshops, proposed live cohorts, and customized educational sessions. No public program dates announced.',
    topics: [
      'Practical AI tools for work & business',
      'AI-assisted content & workflows',
      'Digital marketing fundamentals',
      'SEO & answer-engine visibility',
      'Workshops, live cohorts & educational programs',
    ],
    cta: 'Explore learning opportunities',
  },
  {
    slug: 'individual-coaching',
    number: '07',
    title: 'Individual coaching & consulting',
    short: 'Space to think. A direction to act on.',
    description:
      'Work through a specific professional challenge, clarify your next step, and create an approach that fits your context.',
    audience: 'Professionals looking for clarity, direction, and purposeful execution.',
    formats: 'One-to-one clarity sessions and customized advisory engagements.',
    topics: [
      'One-to-one strategy & clarity',
      'Professional growth & execution',
      'Customized advisory engagements',
    ],
    cta: 'Discuss a one-to-one session',
  },
];

export const programs = [
  {
    title: 'AI for everyday work',
    theme: 'AI & productivity',
    description:
      'Explore practical ways to evaluate AI tools, structure useful prompts, and keep human judgment in the workflow.',
  },
  {
    title: 'Build your digital foundations',
    theme: 'Digital marketing',
    description:
      'Connect audience understanding, content, search, and measurement into a more coherent digital presence.',
  },
  {
    title: 'Your expertise, clearly expressed',
    theme: 'Personal branding',
    description:
      'Develop a point of view and a content practice that reflects what you know and whom you want to help.',
  },
];
