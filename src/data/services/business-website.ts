import { ServiceDetail } from '@/types/service';

export const businessWebsiteDetail: ServiceDetail = {
    id: 'business-website',
    slug: 'business-website',
    title: 'Business Website Development',
    subtitle: 'Your 24/7 digital storefront that actually converts visitors into customers',
    heroImage: '/images/services/business-website-hero.jpg',
    description: `
    A business website is more than just an online brochure—it's your most powerful marketing tool. 
    80% of consumers research a business online before visiting or making a purchase. 
    Without a professional website, you're invisible to potential customers actively searching for your services.
  `,

    commonMistakes: [
        {
            mistake: 'Using a free website builder without custom domain',
            consequence: 'Looks unprofessional, hurts credibility, poor SEO',
            solution: 'Invest in professional custom domain and hosting (₹500/month)',
        },
        {
            mistake: 'No mobile optimization',
            consequence: '70% of visitors bounce immediately on mobile',
            solution: 'Responsive design that works perfectly on all devices',
        },
        {
            mistake: 'Slow loading speed (>3 seconds)',
            consequence: 'Lose 40% of visitors before page even loads',
            solution: 'Optimized images, fast hosting, modern code architecture',
        },
        {
            mistake: 'No clear call-to-action (CTA)',
            consequence: "Visitors don't know what to do next—they leave",
            solution: 'Prominent "Book Now", "Call Us", or "WhatsApp" buttons',
        },
        {
            mistake: 'Generic stock photos',
            consequence: "Looks fake, doesn't build trust",
            solution: 'Use real photos of your business, team, and work',
        },
    ],

    keyFeatures: [
        {
            feature: 'Mobile-First Design',
            description: 'Website looks perfect on phones, tablets, and desktops',
            example: 'Customer searches "salon near me" on phone → sees your mobile-friendly site → books appointment in 2 taps',
        },
        {
            feature: 'Fast Loading (<2 seconds)',
            description: 'Optimized for Indian internet speeds',
            example: 'Compressed images, efficient code, CDN delivery',
        },
        {
            feature: 'Google Maps Integration',
            description: 'Customers can find you instantly',
            example: 'Embedded map shows your exact location, directions, and contact',
        },
        {
            feature: 'WhatsApp Click-to-Chat',
            description: 'One-tap connection to your business',
            example: 'Customer clicks WhatsApp button → starts conversation with pre-filled message',
        },
        {
            feature: 'Contact Form with Auto-Reply',
            description: 'Capture leads 24/7',
            example: 'Customer fills form at midnight → receives instant confirmation email',
        },
        {
            feature: 'SEO Setup',
            description: 'Appear in Google searches for your services',
            example: 'Optimized for keywords like "best salon in [city]"',
        },
    ],

    caseStudies: [
        {
            client: 'Sharma Dental Clinic',
            industry: 'Healthcare',
            challenge: 'Getting only 5-10 patient inquiries per month through walk-ins',
            solution: 'Professional website with online appointment booking, service pages, doctor profiles',
            results: [
                '+18 new patient inquiries per month from Google',
                '40% of bookings now come through website',
                'Ranked #1 for "dentist in Jaipur" on Google',
            ],
        },
        {
            client: 'Bliss Beauty Lounge',
            industry: 'Salon & Spa',
            challenge: 'Customers going to competitors with better online presence',
            solution: 'Gallery-focused website showing before/after photos, service menu, online booking',
            results: [
                '+200% increase in bookings within 6 weeks',
                '45% bounce rate drop',
                'Saved ₹15,000/month in salon aggregator commissions',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'Frontend',
            technologies: ['React', 'Next.js', 'Tailwind CSS'],
        },
        {
            category: 'Backend',
            technologies: ['Firebase', 'Node.js'],
        },
        {
            category: 'Hosting',
            technologies: ['Vercel', 'Firebase Hosting', 'Cloudflare CDN'],
        },
        {
            category: 'Integrations',
            technologies: ['WhatsApp Business API', 'Google Maps', 'Google Analytics'],
        },
    ],

    pricing: [
        {
            package: 'Starter',
            price: 14999,
            features: [
                'Up to 5 pages',
                'Mobile-responsive design',
                'Contact form',
                'WhatsApp integration',
                'Google Maps',
                'Basic SEO',
                '30 days support',
                '3 weeks delivery',
            ],
        },
        {
            package: 'Business',
            price: 24999,
            features: [
                'Up to 10 pages',
                'Premium custom design',
                'Online booking system',
                'WhatsApp + Instagram integration',
                'Blog setup (5 posts)',
                'Advanced SEO',
                'Google Search Console setup',
                '30 days support',
                '4 weeks delivery',
            ],
        },
    ],

    sources: [
        {
            title: 'Google Research: Consumer Search Behavior',
            url: 'https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-search-trends/',
            description: 'Study showing 80% of consumers research businesses online before visiting',
        },
        {
            title: 'Google PageSpeed Study',
            url: 'https://web.dev/why-speed-matters/',
            description: 'Research on how page load speed impacts bounce rate and conversions',
        },
        {
            title: 'Statista: Mobile Internet Usage in India',
            url: 'https://www.statista.com/statistics/558610/number-of-mobile-internet-user-in-india/',
            description: 'Data on mobile-first browsing trends in India',
        },
    ],

    relatedServices: [
        'booking-appointment-sites',
        'seo-google-presence',
        'website-revamp',
    ],

    faq: [
        {
            question: 'How long does it take to build a business website?',
            answer: 'Typically 3-4 weeks from design approval to launch. We deliver in phases so you can see progress weekly.',
        },
        {
            question: 'Do I need to provide content (text, images)?',
            answer: 'We help with copywriting, but real photos of your business perform 10x better than stock photos. We guide you on what photos to take.',
        },
        {
            question: 'Will my website work on mobile phones?',
            answer: 'Yes! 70% of traffic comes from mobile, so we design mobile-first. Your site will look perfect on all devices.',
        },
        {
            question: 'Can I update content myself after launch?',
            answer: 'Yes. We build on easy-to-update platforms. We also provide a 30-minute training video.',
        },
        {
            question: 'What if I need changes after launch?',
            answer: 'First 30 days: unlimited minor changes included. After that: ₹1,500/hour or monthly retainer plans available.',
        },
    ],
};
