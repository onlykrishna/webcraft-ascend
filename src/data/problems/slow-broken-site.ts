import { ProblemDetail } from '@/types/problem';

export const slowbrokensiteDetail: ProblemDetail = {
    id: 'slow-broken-site',
    slug: 'slow-broken-site',
    title: 'Slow & Broken Experience',
    subtitle: 'Slow load times and broken mobile views are killing your Google ranking.',
    icon: 'Clock',
    description: `
    If your website takes longer than 3 seconds to load, 53% of mobile users will abandon it entirely. 
    A single broken link, distorted image, or non-functional button creates immense friction. 
    Not only do users leave, but Google actively penalizes slow sites in search rankings.
  `,

    symptoms: [
        {
            symptom: 'Images take seconds to load piece by piece',
            impact: 'Users think your site crashed and leave (Bounce Rate skyrockets)',
        },
        {
            symptom: 'Text overlaps or falls off screen on mobile',
            impact: 'Content is illegible; visitors abandon the page in 2 seconds',
        },
        {
            symptom: 'Forms don\'t send or give errors',
            impact: 'You actively lose people who WANTED to hand you money',
        },
        {
            symptom: 'Google Search Console reports Core Web Vitals issues',
            impact: 'Your ranking is suppressed on the Google SERP algorithm',
        },
        {
            symptom: 'No SSL Certificate ("Not Secure" warning in browser)',
            impact: 'Destroys 100% of user trust instantly. Browsers block the connection.',
        },
    ],

    costAnalysis: [
        {
            lostRevenue: 'Up to 53% reduction in pipeline',
            description: 'Losing mobile users before they even see the Hero section',
            calculation: 'If 500 visitors meant 10 sales. A 50% drop means 5 lost sales. At ₹20,000 per sale = ₹1,00,000 loss every month.',
        },
        {
            lostRevenue: 'High Server/Hosting Costs',
            description: 'Paying for bloated shared hosting that crashes under load',
            calculation: 'Paying ₹15,000/yr for terrible performance when modern CDN delivery costs less and guarantees zero downtime.',
        },
    ],

    solution: [
        {
            step: 'Lighthouse Performance Audit',
            description: 'Run Google\'s internal tool to find exact bottlenecks (images, scripts, CSS)',
            timeframe: '1 day',
        },
        {
            step: 'Rebuilding with Vite & React',
            description: 'Scrap bloated WordPress themes. Build a headless, modern Single Page Application (SPA).',
            timeframe: '3 weeks',
        },
        {
            step: 'Image Payload Optimization',
            description: 'Convert heavy JPEGs/PNGs into next-gen WebP formats. Implement Lazy Loading.',
            timeframe: '2-3 days',
        },
        {
            step: 'Edge Network Deployment',
            description: 'Host the code globally on Vercel/Firebase so it loads instantly everywhere.',
            timeframe: '1 day',
        },
        {
            step: 'Comprehensive QA Testing',
            description: 'Test on iOS, Android, Tablets, Mac, and PC across all major browsers.',
            timeframe: '3 days',
        },
    ],

    successMetrics: [
        {
            metric: 'Time to First Byte (TTFB)',
            before: '1.8s',
            after: '0.1s',
            improvement: 'Lightning Fast Delivery',
        },
        {
            metric: 'Fully Loaded Time',
            before: '8.4s',
            after: '1.2s',
            improvement: '85% faster',
        },
        {
            metric: 'Lighthouse Performance Score',
            before: '42/100',
            after: '98/100',
            improvement: 'Mobile-first Grade',
        },
    ],

    caseStudies: [
        {
            business: 'Greenway Supply Co.',
            problem: 'E-commerce store on cheap hosting kept crashing during seasonal sales',
            solution: 'Replatformed to React frontend with Firebase backend handling massive concurrency',
            result: 'Handled 5,000 simultaneous users without a single dropped packet. Best Diwali sale ever.',
        },
        {
            business: 'A1 Local Plumbers',
            problem: 'Mobile site was broken; "Call Now" button unclickable on iPhones',
            solution: 'Responsive, fluid grid layout with sticky, always-clickable contact actions',
            result: 'Calls-from-website increased 400% in the first two weeks.',
        },
    ],

    preventionTips: [
        'Always compress images before uploading (TinyPNG)',
        'Use next-generation formats (WebP, AVIF)',
        'Do not use bloated page builders (Elementor/Wix) for scaling businesses',
        'Set up automated uptime monitoring pingers',
    ],

    sources: [
        {
            title: 'Google: Need for Mobile Speed',
            url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/',
            description: '53% of visits are abandoned if a mobile site takes longer than 3 seconds to load.',
        },
    ],

    relatedProblems: [
        'outdated-website',
        'losing-customers',
    ],
};
