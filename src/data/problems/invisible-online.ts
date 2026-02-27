import { ProblemDetail } from '@/types/problem';

export const invisibleonlineDetail: ProblemDetail = {
    id: 'invisible-online',
    slug: 'invisible-online',
    title: 'Invisible Online (No SEO)',
    subtitle: 'No SEO means nobody finds you. It\'s like having a shop with no signboard.',
    icon: 'Search',
    description: `
    You could have the most beautiful, expensive website in the world, but if nobody visits it, it's useless. 
    93% of all online experiences begin with a search engine. If you aren't on Page 1 of Google for your keywords, you are virtually invisible to customers actively looking to spend money in your industry.
  `,

    symptoms: [
        {
            symptom: 'Zero organic traffic from Google',
            impact: 'You are completely reliant on paid ads or word of mouth to get clients',
        },
        {
            symptom: 'Competitors outrank you for your own services',
            impact: 'They steal the "high-intent" leads searching for immediate solutions',
        },
        {
            symptom: 'No Google Maps (Local pack) presence',
            impact: 'Local customers literally drive past your business to go to a competitor',
        },
        {
            symptom: 'Relying 100% on Facebook/Google Ads',
            impact: 'The second you stop paying Mark Zuckerberg or Google, your leads drop to 0',
        },
        {
            symptom: 'Thin content / No blog',
            impact: 'Google has no reason to index your site as an "authority" in your field',
        },
    ],

    costAnalysis: [
        {
            lostRevenue: '₹2,00,000+ in missed Free Traffic',
            description: 'The lifetime value of organic, high-intent leads searching for your exact service.',
            calculation: 'Competitor gets 200 free clicks/mo at a ₹300 CPC equivalent = you are losing ₹60,000/mo in free ad value.',
        },
        {
            lostRevenue: 'Unsustainable Paid Ads Reliance',
            description: 'Ad costs (CPCs) increase 20% every year. Margins shrink.',
            calculation: 'Spending ₹50,000/mo forever. Over 5 years = ₹30 Lakhs burned instead of building permanent organic assets.',
        },
    ],

    solution: [
        {
            step: 'Comprehensive SEO/Keyword Audit',
            description: 'Discover exactly what your customers type into Google.',
            timeframe: '2-3 days',
        },
        {
            step: 'On-Page SEO Optimization',
            description: 'Rewrite meta titles, descriptions, headers (H1/H2), and image alt text across your entire site.',
            timeframe: '1-2 weeks',
        },
        {
            step: 'Google Business Profile Dominance',
            description: 'Optimize your Local SEO, Maps listing, and establish a steady review-generation funnel.',
            timeframe: '1 week',
        },
        {
            step: 'Content Marketing (Blogging)',
            description: 'Write deep, authoritative, 1000-word articles answering your customer\'s exact questions.',
            timeframe: 'Ongoing Monthly',
        },
        {
            step: 'Technical SEO fixes',
            description: 'Implement Schema markup (JSON-LD), generate XML sitemaps, fix broken 404 links.',
            timeframe: '1 week',
        },
    ],

    successMetrics: [
        {
            metric: 'Organic Traffic Volume',
            before: '45 visitors/mo',
            after: '1,450 visitors/mo',
            improvement: '3,100% Increase',
        },
        {
            metric: 'Keywords on Page 1',
            before: '0',
            after: '14 High-Value terms',
            improvement: 'Market Dominance',
        },
        {
            metric: 'Google Maps Inquiries',
            before: '1 call/week',
            after: '3 calls/day',
            improvement: 'Massive local footfall',
        },
    ],

    caseStudies: [
        {
            business: 'Apex Dental Care',
            problem: 'Struggling to get local patients, relying entirely on expensive JustDial listings',
            solution: 'Optimized their Google Business Profile, wrote in-depth "Root Canal Cost in [City]" articles',
            result: 'Ranked #1 organically. Stopped paying JustDial entirely. Saving ₹1L/year and getting better leads.',
        },
        {
            business: 'Precision Manufacturing Pvt.',
            problem: 'B2B buyers could not find them when searching for specialized CNC machining in India',
            solution: 'Created dedicated SEO-optimized landing pages for every single industrial service they offered',
            result: 'Generated 4 massive RFQs from international clients within 6 months via Google Search.',
        },
    ],

    preventionTips: [
        'Publish a high-quality blog post at least twice a month answering client FAQs',
        'Ask every happy customer to leave a 5-star Google Review',
        'Ensure your Name, Address, and Phone Number (NAP) are exactly identical across all directories',
        'Submit an XML Sitemap to Google Search Console',
    ],

    sources: [
        {
            title: 'Backlinko: Search Engine CTR Stats',
            url: 'https://backlinko.com/google-ctr-stats',
            description: 'The #1 organic result on Google gets 31.7% of all clicks. Page 2 gets almost 0.',
        },
    ],

    relatedProblems: [
        'slow-broken-site',
        'losing-customers',
    ],
};
