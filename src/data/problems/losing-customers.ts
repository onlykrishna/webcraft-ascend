import { ProblemDetail } from '@/types/problem';

export const losingcustomersDetail: ProblemDetail = {
    id: 'losing-customers',
    slug: 'losing-customers',
    title: 'Losing Customers to Competitors',
    subtitle: 'Your competitors have modern websites. You\'re losing business every single day.',
    icon: 'TrendingDown',
    description: `
    When potential clients search for your services, they open 3-4 tabs. 
    If your competitor's website looks more professional, loads faster, and answers their questions clearly, they win the client. 
    You aren't just losing a sale; you are funding your competitor's growth.
  `,

    symptoms: [
        {
            symptom: 'Stagnant or declining lead volume',
            impact: 'Revenue growth has flattened while competitors expand',
        },
        {
            symptom: 'Low conversion rate from website traffic',
            impact: 'Spending money on ads but getting zero calls',
        },
        {
            symptom: 'No distinct value proposition',
            impact: 'Customers compare you purely on price instead of quality',
        },
        {
            symptom: 'Competitors ranking higher on Google',
            impact: 'They get the "warm" leads searching for immediate solutions',
        },
        {
            symptom: 'Poorly defined customer journey',
            impact: 'Visitors don\'t know what action to take next and drop off',
        },
    ],

    costAnalysis: [
        {
            lostRevenue: '₹1,00,000 - ₹5,00,000/month',
            description: 'High-value clients choosing modern competitors',
            calculation: 'Losing just 5 premium clients a month at ₹50,000 lifetime value = ₹2.5L lost monthly.',
        },
        {
            lostRevenue: 'Wasted Advertising Spend',
            description: 'Running Facebook/Google ads to a poorly converting site',
            calculation: 'Spending ₹30,000/month on ads with a 0.5% conversion rate = burned cash.',
        },
    ],

    solution: [
        {
            step: 'Competitor Analysis',
            description: 'Audit top 3 competitors to find their weaknesses and your opportunities',
            timeframe: '2-3 days',
        },
        {
            step: 'Value Proposition Redesign',
            description: 'Rewrite website copy to clearly communicate why you are the better choice',
            timeframe: '1 week',
        },
        {
            step: 'Conversion Funnel Strategy',
            description: 'Map out exact steps visitors must take to become a lead (e.g. clear CTAs)',
            timeframe: '1 week',
        },
        {
            step: 'Trust Building Elements',
            description: 'Integrate dynamic portfolios, case studies, and verified testimonials',
            timeframe: '1 week',
        },
        {
            step: 'Analytics Tracking Implementation',
            description: 'Set up GA4 and Heatmaps to see exactly where users drop off',
            timeframe: '2 days',
        },
    ],

    successMetrics: [
        {
            metric: 'Lead Generation Rate',
            before: '1.2%',
            after: '4.8%',
            improvement: '300% increase',
        },
        {
            metric: 'Cost Per Acquisition (CPA)',
            before: '₹2,500',
            after: '₹850',
            improvement: '66% reduction',
        },
        {
            metric: 'Time on Competitor Comparison Pages',
            before: 'N/A',
            after: '1 min 45 sec',
            improvement: 'High Engagement',
        },
    ],

    caseStudies: [
        {
            business: 'Elite Fitness Gym',
            problem: 'Losing memberships to a new, modern franchised gym down the street',
            solution: 'Rebuilt site highlighting community, real trainer success stories, and an intro-offer pop-up',
            result: 'Reclaimed 30% market share locally within 4 months, waitlisted personal training',
        },
        {
            business: 'TechServe IT Support',
            problem: 'B2B clients were choosing flashier agencies despite TechServe having better service',
            solution: 'Enterprise-grade redesign with detailed case studies and compliance certifications upfront',
            result: 'Closed 3 enterprise contracts worth ₹12L each in the first quarter post-launch',
        },
    ],

    preventionTips: [
        'Review competitor websites every 6 months',
        'Constantly update your portfolio and testimonials',
        'Ensure your Unique Selling Proposition (USP) is visible in the first 3 seconds of load',
        'Run A/B tests on your call-to-action buttons',
    ],

    sources: [
        {
            title: 'HubSpot: Website Conversion Optimization',
            url: 'https://blog.hubspot.com/marketing/conversion-rate-optimization',
            description: 'Data showing how structured funnels prevent customer leakage to competitors',
        },
    ],

    relatedProblems: [
        'outdated-website',
        'invisible-online',
    ],
};
