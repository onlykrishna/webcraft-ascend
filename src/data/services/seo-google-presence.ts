import { ServiceDetail } from '@/types/service';

export const seogooglepresenceDetail: ServiceDetail = {
    id: 'seo-google-presence',
    slug: 'seo-google-presence',
    title: 'SEO & Google Presence',
    subtitle: 'Rank higher on Google and get discovered by local customers automatically.',
    heroImage: '/images/services/seo-hero.jpg',
    description: `
    Having a beautiful website is useless if no one can find it. 
    93% of online experiences begin with a search engine, and 75% of users never scroll past the first page of search results. 
    We optimize your digital presence so you appear exactly when customers are looking for your services.
  `,

    commonMistakes: [
        {
            mistake: 'Ignoring Google Business Profile (formerly GMB)',
            consequence: 'Losing 80% of local "near me" searches to competitors',
            solution: 'Fully optimized, verified Google Business Profile with weekly updates',
        },
        {
            mistake: 'Keyword stuffing and unreadable content',
            consequence: 'Google penalizes your site, ranking drops to page 10',
            solution: 'Natural, high-quality content that answers user questions expertly',
        },
        {
            mistake: 'Slow website speed and poor mobile experience',
            consequence: 'High bounce rates; Google demotes slow sites',
            solution: 'Technical SEO optimization for sub-2-second load times on mobile',
        },
        {
            mistake: 'No backlink strategy or buying cheap links',
            consequence: 'Zero domain authority or spam penalties',
            solution: 'Earning high-quality links from reputable local and industry sites',
        },
        {
            mistake: 'Treating SEO as a one-time task',
            consequence: 'Competitors quickly outrank you as their content stays fresh',
            solution: 'Ongoing, monthly SEO campaigns and consistent content publishing',
        },
    ],

    keyFeatures: [
        {
            feature: 'Comprehensive Keyword Research',
            description: 'Identifying exactly what your local customers are searching for',
            example: 'Targeting "emergency plumber in Mumbai" rather than just "plumber"',
        },
        {
            feature: 'Technical SEO Optimization',
            description: 'Fixing under-the-hood issues that block search engines',
            example: 'Optimizing site speed, fixing broken links, and implementing schema markup',
        },
        {
            feature: 'Local SEO & Google Maps',
            description: 'Dominating the local 3-pack for location-based searches',
            example: 'Ranking #1 when someone searches "best cafes near me"',
        },
        {
            feature: 'High-Quality Content Creation',
            description: 'Publishing blog posts and service pages that Google loves',
            example: 'Creating a detailed guide on "How to Choose the Right AC for Your Home"',
        },
        {
            feature: 'Authority Building (Backlinks)',
            description: 'Increasing your website\'s trust and authority in your industry',
            example: 'Getting featured in local news outlets or industry directories',
        },
        {
            feature: 'Transparent Analytics & Reporting',
            description: 'Clear, monthly reports showing exact ranking improvements',
            example: 'Monthly dashboard showing organic traffic grew by +45%',
        },
    ],

    caseStudies: [
        {
            client: 'Metro Legal Services',
            industry: 'Law Firm',
            challenge: 'Struggling to get clients organically, spending ₹1L/month on Google Ads',
            solution: 'Complete Local SEO overhaul, extensive FAQ content, and Google Profile optimization',
            results: [
                'Ranked #1 for "corporate lawyer near me" within 4 months',
                '+150% increase in organic website traffic',
                'Reduced ad spend by 60% while getting more qualified leads',
                'Generated 25+ calls per month directly from Google Maps',
            ],
        },
        {
            client: 'GreenLeaf Landscaping',
            industry: 'Home Services',
            challenge: 'Brand new business, invisible on Google, struggling to find clients',
            solution: 'Location-specific landing pages, review generation strategy, and fast mobile site',
            results: [
                'Started ranking on Page 1 for 15+ high-value keywords',
                'Acquired 40+ 5-star Google reviews in 3 months',
                'Organic search is now their #1 source of revenue',
                'Expanded team from 2 to 8 people due to demand',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'Analytics & Tracking',
            technologies: ['Google Analytics 4', 'Google Search Console', 'Google Tag Manager'],
        },
        {
            category: 'SEO Tools',
            technologies: ['Ahrefs', 'SEMrush', 'Screaming Frog'],
        },
        {
            category: 'On-Page Optimization',
            technologies: ['Schema.org Markup', 'Next.js SSR', 'Dynamic Meta Tags'],
        },
        {
            category: 'Local SEO',
            technologies: ['Google Business Profile Center', 'Yext / BrightLocal'],
        },
    ],

    pricing: [
        {
            package: 'Local SEO Starter',
            price: 14999,
            features: [
                'Google Business Profile Setup',
                'Basic Keyword Research',
                'On-Page Optimization (up to 5 pages)',
                'Local Directory Citations (Top 20)',
                'Monthly Performance Report',
                'Ideal for small local shops',
                'Monthly Retainer Setup',
            ],
        },
        {
            package: 'Growth SEO Pro',
            price: 29999,
            features: [
                'Advanced Keyword targeting',
                'Comprehensive Technical SEO',
                'Content Strategy (2 Blog Posts/mo)',
                'Extensive Link Building Campaign',
                'Competitor Analysis Dashboard',
                'Bi-weekly Strategy Calls',
                'Ideal for growing scaling businesses',
            ],
        },
    ],

    sources: [
        {
            title: 'Search Engine Journal: Importance of Local SEO',
            url: 'https://www.searchenginejournal.com/local-seo/',
            description: 'Comprehensive guide and statistics on why local SEO matters for SMBs',
        },
        {
            title: 'Backlinko: Google CTR Stats',
            url: 'https://backlinko.com/google-ctr-stats',
            description: 'Study showing the #1 result in Google gets 31.7% of all clicks',
        },
        {
            title: 'Think With Google: Mobile Search Behavior',
            url: 'https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/local-search-mobile-search-micro-moments/',
            description: 'Insights on how consumers use mobile devices to search for local businesses',
        },
    ],

    relatedServices: [
        'business-website',
        'website-revamp',
    ],

    faq: [
        {
            question: 'How long does it take to see results from SEO?',
            answer: 'SEO is a long-term strategy. Typically, you will start seeing noticeable improvements in rankings and traffic within 3 to 6 months.',
        },
        {
            question: 'Why can\'t you guarantee a #1 ranking on Google?',
            answer: 'Google\'s algorithm is constantly changing, and no agency can guarantee a specific ranking. We guarantee proven strategies that consistently increase visibility and traffic over time.',
        },
        {
            question: 'Do I really need SEO if I run Google Ads?',
            answer: 'Yes! Ads stop bringing traffic the moment you stop paying. SEO builds a sustainable, long-term foundation of free organic traffic.',
        },
        {
            question: 'What is Local SEO compared to regular SEO?',
            answer: 'Local SEO focuses specifically on optimizing your presence for location-based searches (like "dentist near me"), heavily involving Google Maps and local directories.',
        },
        {
            question: 'Will I be locked into a long-term contract?',
            answer: 'We recommend a minimum 6-month commitment to see real SEO results, but our agreements are flexible based on your business needs.',
        },
    ],
};
