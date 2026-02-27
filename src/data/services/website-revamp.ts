import { ServiceDetail } from '@/types/service';

export const websiterevampDetail: ServiceDetail = {
    id: 'website-revamp',
    slug: 'website-revamp',
    title: 'Website Revamp & Redesign',
    subtitle: 'Refresh your outdated website to meet modern web standards and convert better.',
    heroImage: '/images/services/revamp-hero.jpg',
    description: `
    An outdated website makes your business look outdated. 
    If your site was built 3+ years ago, it might be slow, hard to navigate on mobile, or simply failing to generate leads. 
    We don't just change the colors; we completely architect a modern, high-performance experience that builds trust and drives action.
  `,

    commonMistakes: [
        {
            mistake: 'Clinging to a site that takes 5+ seconds to load',
            consequence: 'Losing over 50% of your visitors before they see your brand',
            solution: 'Rebuilding with modern frameworks (React/Next.js) for sub-2-second loads',
        },
        {
            mistake: 'Having a non-responsive, non-mobile-first design',
            consequence: 'Frustrating the 70% of your users browsing on their phones',
            solution: 'A fluid, mobile-first design that scales beautifully on all devices',
        },
        {
            mistake: 'Missing clear Calls-to-Action (CTAs)',
            consequence: 'Visitors passively read and leave without contacting you',
            solution: 'Strategically placed CTAs guiding users toward booking or buying',
        },
        {
            mistake: 'Outdated, cluttered, or confusing navigation',
            consequence: 'Users can\'t find what they need and quickly bounce to a competitor',
            solution: 'Simplified, intuitive user flows that quickly answer user questions',
        },
        {
            mistake: 'Using an unsecure platform (No HTTPS)',
            consequence: 'Browsers warn users your site is "Not Secure", instantly destroying trust',
            solution: 'Fully secured hosting with modern SSL certificates and data protection',
        },
    ],

    keyFeatures: [
        {
            feature: 'UX/UI Modernization',
            description: 'A complete visual overhaul matching your current brand and modern aesthetic',
            example: 'Replacing a blocky 2015 layout with a clean, dynamic, glassmorphism design',
        },
        {
            feature: 'Speed & Performance Optimization',
            description: 'Rewriting messy codebase to load blindingly fast',
            example: 'Decreasing site load time from 7.2 seconds to 1.4 seconds',
        },
        {
            feature: 'Mobile & Tablet Responsiveness',
            description: 'Ensuring every single button and image works perfectly on the latest iPhones and Androids',
            example: 'A tapping experience that feels like a native mobile app',
        },
        {
            feature: 'Conversion Rate Optimization (CRO)',
            description: 'Restructuring content to encourage users to take action',
            example: 'Adding a sticky "Get a Quote" button that stays visible as they scroll',
        },
        {
            feature: 'Content Migration & SEO Preservation',
            description: 'Moving your old posts safely so you don\'t lose current Google rankings',
            example: 'Setting up proper 301 redirects from old URLs to new, clean URLs',
        },
        {
            feature: 'Modern Tech Stack Implementation',
            description: 'Moving away from slow, bloated builders like older WordPress themes',
            example: 'Rebuilding on a custom React architecture powered by a headless CMS',
        },
    ],

    caseStudies: [
        {
            client: 'Pinnacle Consulting',
            industry: 'B2B Services',
            challenge: 'Had a 7-year-old WordPress site that looked unprofessional and was generating 0 leads.',
            solution: 'Complete modern redesign, focused on their flagship consulting service, with clear lead magnets.',
            results: [
                'Bounce rate decreased from 82% to 35%',
                'Site speed improved by 400%',
                'Received 12 high-value enterprise leads in the first month post-launch',
                'Rebranded their entire digital identity',
            ],
        },
        {
            client: 'Sunrise Bakery',
            industry: 'Food & Beverage',
            challenge: 'Their existing site didn\'t work on mobile, making it impossible for people to view the cake menu on the go.',
            solution: 'Mobile-first revamp with an integrated gallery and a direct WhatsApp ordering button.',
            results: [
                'Mobile traffic sessions increased by 150%',
                'Direct custom cake inquiries doubled',
                'Customers praised how easy it was to order directly via WhatsApp',
                'Allowed them to stop paying directory listing fees',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'Frontend Performance',
            technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            category: 'CMS & Data',
            technologies: ['Sanity.io', 'Firebase', 'Supabase'],
        },
        {
            category: 'Hosting & CDN',
            technologies: ['Vercel', 'Cloudflare Edge', 'AWS'],
        },
        {
            category: 'SEO Migration',
            technologies: ['Automated 301 Redirects', 'Lighthouse Auditing'],
        },
    ],

    pricing: [
        {
            package: 'Essential Revamp',
            price: 19999,
            features: [
                'Redesign of existing pages (up to 7)',
                'Mobile-First Responsiveness',
                'Performance Optimization',
                'Basic SEO Migration',
                'WhatsApp/Contact Form Integration',
                '45 Days Support',
                '4 Weeks Delivery',
            ],
        },
        {
            package: 'Complete Transformation',
            price: 39999,
            features: [
                'Complete brand and design overhaul',
                'Unlimited Pages Redesign',
                'Advanced Animations (Framer Motion)',
                'Comprehensive SEO Conservation',
                'Custom Lead Generation Funnels',
                'Advanced Analytics Integration',
                '90 Days Priority Support',
                '6 Weeks Delivery',
            ],
        },
    ],

    sources: [
        {
            title: 'Hobo Web: How Fast Should a Website Load',
            url: 'https://www.hobo-web.co.uk/your-website-design-should-load-in-4-seconds/',
            description: 'Statistics on how page load time affects user bounce rates directly',
        },
        {
            title: 'Sweor: Web Design Statistics',
            url: 'https://www.sweor.com/firstimpressions',
            description: 'Data showing 75% of consumers admit to making judgments on a company\'s credibility based on website design',
        },
        {
            title: 'HubSpot: Website Redesign Guide',
            url: 'https://blog.hubspot.com/marketing/website-redesign-guide',
            description: 'Guide highlighting the ROI of modernizing digital assets',
        },
    ],

    relatedServices: [
        'business-website',
        'ecommerce-online-store',
    ],

    faq: [
        {
            question: 'Will I lose my current Google rankings if I redesign?',
            answer: 'Not if done correctly. We perform a comprehensive SEO audit and implement proper 301 redirects to ensure your "link juice" and rankings are preserved entirely.',
        },
        {
            question: 'How do I know if I need a revamp or just minor updates?',
            answer: 'If your site looks bad on mobile, takes longer than 3 seconds to load, or uses an outdated builder that you can\'t easily edit anymore, you need a full revamp.',
        },
        {
            question: 'Can you use my existing logo and content?',
            answer: 'Absolutely. A revamp is about upgrading the vehicle, not necessarily changing the passengers. We organize and style your existing content to perform better.',
        },
        {
            question: 'Will my website go down while you build the new one?',
            answer: 'No. We build the new website completely separately on a staging link. Once you approve it, we switch them out instantly with zero downtime.',
        },
        {
            question: 'What platform will the new site be built on?',
            answer: 'We typically upgrade legacy sites (like old WordPress or Wix) to modern React/Next.js architectures, ensuring lightning-fast performance and future-proof scaling.',
        },
    ],
};
