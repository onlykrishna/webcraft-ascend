import { ProblemDetail } from '@/types/problem';

export const outdatedwebsiteDetail: ProblemDetail = {
    id: 'outdated-website',
    slug: 'outdated-website',
    title: 'Outdated Website Design',
    subtitle: 'Your website looks like it\'s from 2010. Customers judge you in 3 seconds.',
    icon: 'AlertTriangle',
    description: `
    75% of consumers admit to judging a company's credibility based on their website design. 
    An outdated website signals: "We don't care about our business." 
    It costs you customers before they even read your content.
  `,

    symptoms: [
        {
            symptom: 'Not mobile-friendly',
            impact: '70% of visitors bounce immediately on their phones',
        },
        {
            symptom: 'Flash elements or auto-playing music',
            impact: 'Instant credibility loss, looks like spam',
        },
        {
            symptom: 'Last updated 2+ years ago',
            impact: 'Customers think you\'re out of business',
        },
        {
            symptom: 'Slow loading (>5 seconds)',
            impact: 'Google penalizes you, visitors leave',
        },
        {
            symptom: 'Generic stock photos',
            impact: 'No trust, no personality, no connection',
        },
    ],

    costAnalysis: [
        {
            lostRevenue: '₹50,000 - ₹2,00,000/month',
            description: 'Potential customers who bounce due to poor design',
            calculation: 'If 1,000 visitors/month × 5% conversion × ₹10,000 average sale = ₹5L potential. Lose 40% due to design = ₹2L lost.',
        },
        {
            lostRevenue: '₹15,000 - ₹50,000/year',
            description: 'SEO ranking loss from slow, non-mobile site',
            calculation: 'Drop from page 1 to page 3 = 90% traffic loss = customers going to competitors',
        },
        {
            lostRevenue: 'Immeasurable brand damage',
            description: 'Lost trust, word-of-mouth referrals, and market positioning',
            calculation: 'Customers tell others "their website looks sketchy" — brand reputation destroyed',
        },
    ],

    solution: [
        {
            step: 'Conduct Website Audit',
            description: 'Analyze current site: speed, mobile-friendliness, SEO, design issues',
            timeframe: '1-2 days',
        },
        {
            step: 'Modern Design Mockups',
            description: 'Create 2-3 design concepts matching your brand and industry standards',
            timeframe: '1 week',
        },
        {
            step: 'Mobile-First Development',
            description: 'Build responsive site that works perfectly on all devices',
            timeframe: '2-3 weeks',
        },
        {
            step: 'Content Migration & SEO',
            description: 'Transfer existing content, optimize for search engines',
            timeframe: '1 week',
        },
        {
            step: 'Testing & Launch',
            description: 'Cross-browser testing, speed optimization, go-live',
            timeframe: '3-5 days',
        },
    ],

    successMetrics: [
        {
            metric: 'Bounce Rate',
            before: '78%',
            after: '35%',
            improvement: '55% reduction',
        },
        {
            metric: 'Average Session Duration',
            before: '23 seconds',
            after: '2 min 47 sec',
            improvement: '625% increase',
        },
        {
            metric: 'Mobile Conversion Rate',
            before: '0.8%',
            after: '3.2%',
            improvement: '300% increase',
        },
        {
            metric: 'Google PageSpeed Score',
            before: '32/100',
            after: '94/100',
            improvement: '194% increase',
        },
    ],

    caseStudies: [
        {
            business: 'Sharma Law Associates',
            problem: 'Website built in 2012, losing clients to firms with modern sites',
            solution: 'Complete redesign with case results showcase, attorney profiles, online consultation booking',
            result: '+45% client inquiries in 3 months, now ranked #1 for "lawyer in Jaipur"',
        },
        {
            business: 'Heritage Sweets',
            problem: 'Non-mobile site, customers couldn\'t view menu or order',
            solution: 'Mobile-first redesign with online ordering, delivery tracking',
            result: '₹3.5L in online orders first month, 82% orders from mobile',
        },
    ],

    preventionTips: [
        'Redesign every 2-3 years to stay modern',
        'Monitor Google PageSpeed monthly',
        'Test on actual phones/tablets quarterly',
        'Update content at least quarterly',
        'Watch competitor sites — if theirs look better, act fast',
    ],

    sources: [
        {
            title: 'Stanford Web Credibility Research',
            url: 'https://credibility.stanford.edu/guidelines/index.html',
            description: '75% of users judge credibility based on website design',
        },
        {
            title: 'Google Mobile-First Indexing',
            url: 'https://developers.google.com/search/mobile-sites/',
            description: 'Google prioritizes mobile-friendly sites in rankings',
        },
    ],

    relatedProblems: [
        'slow-broken-site',
        'losing-customers',
    ],
};
