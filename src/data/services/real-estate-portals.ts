import { ServiceDetail } from '@/types/service';

export const realestateportalsDetail: ServiceDetail = {
    id: 'real-estate-portals',
    slug: 'real-estate-portals',
    title: 'Real Estate Property Portal',
    subtitle: 'Showcase properties with virtual tours. Capture leads automatically.',
    heroImage: '/images/services/real-estate-hero.jpg',
    description: `
    Stop relying on 99acres and MagicBricks alone. 
    Your own property portal means: no listing fees, direct leads, and complete control. 
    Showcase properties with 360° tours, floor plans, and WhatsApp inquiries.
  `,

    commonMistakes: [
        {
            mistake: 'Only listing on aggregator portals',
            consequence: 'Pay ₹15,000-50,000/year + compete with 100 other agents',
            solution: 'Own portal builds brand authority and costs less long-term',
        },
        {
            mistake: 'Poor quality photos (phone camera, bad lighting)',
            consequence: 'Properties get 80% fewer inquiries',
            solution: 'Professional property photography or detailed photo guidelines',
        },
        {
            mistake: 'No virtual tour or video walkthrough',
            consequence: 'Serious buyers skip your listings',
            solution: '360° tours or video walkthroughs boost engagement by 300%',
        },
        {
            mistake: 'Generic contact form only',
            consequence: 'Leads get lost, no follow-up system',
            solution: 'WhatsApp + Auto-CRM captures name, budget, preferred area',
        },
        {
            mistake: "No filter/search functionality",
            consequence: "Users can't find what they want → leave frustrated",
            solution: 'Search by: Location, Budget, BHK, Property Type, Amenities',
        },
    ],

    keyFeatures: [
        {
            feature: 'Advanced Property Search',
            description: 'Filter by location, price, BHK, type, amenities',
            example: 'Buyer searches: 3BHK in Pune, ₹60-80L budget → Gets 12 matching properties',
        },
        {
            feature: '360° Virtual Tours',
            description: 'Buyers explore properties from home',
            example: 'Click "Virtual Tour" → Navigate through rooms → Zoom into kitchen details',
        },
        {
            feature: 'Floor Plan Gallery',
            description: 'Show layout with dimensions',
            example: 'Property page shows: Living room 15×12 ft, Master bedroom 12×10 ft',
        },
        {
            feature: 'Lead Capture System',
            description: 'WhatsApp inquiry with property details pre-filled',
            example: 'User clicks "Inquire" → WhatsApp opens: "Hi, I\'m interested in 3BHK Koregaon Park"',
        },
        {
            feature: 'Property Comparison Tool',
            description: 'Compare 2-3 properties side-by-side',
            example: 'Select properties → Compare: Price, Size, Amenities, Location map',
        },
        {
            feature: 'Featured Listings',
            description: 'Highlight premium properties',
            example: 'Homepage slider shows 5 featured properties with "Premium" badge',
        },
    ],

    caseStudies: [
        {
            client: 'Gupta Real Estate',
            industry: 'Real Estate Agency',
            challenge: 'Getting only 5-8 inquiries/month, losing leads to competitors with better websites',
            solution: 'Property portal with 360° tours, advanced filters, WhatsApp integration',
            results: [
                '+60% leads from online (18-22 inquiries/month)',
                'Sold 3 properties directly through website in 2 months',
                'Saved ₹35,000/year in 99acres listing fees',
                'Positioned as premium agency due to professional website',
            ],
        },
        {
            client: 'Skyline Developers',
            industry: 'Real Estate Developer',
            challenge: 'Needed booking system for new apartment complex (150 units)',
            solution: 'Custom portal with unit availability, floor-wise view, booking with token amount',
            results: [
                'Sold 45 units in pre-launch phase',
                'Virtual site visits reduced physical visits by 70%',
                'Captured 300+ leads with budget/preference data',
                'Built buyer database for future projects',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'Frontend',
            technologies: ['React', 'Next.js', 'Google Maps API'],
        },
        {
            category: 'Backend',
            technologies: ['Firebase', 'Node.js', 'PostgreSQL'],
        },
        {
            category: 'Media',
            technologies: ['Cloudinary', 'YouTube API', '360° Tour Embedding'],
        },
        {
            category: 'CRM',
            technologies: ['Custom Lead Dashboard', 'WhatsApp Business API'],
        },
    ],

    pricing: [
        {
            package: 'Basic Portal',
            price: 34999,
            features: [
                'Up to 30 property listings',
                'Image gallery (10 photos/property)',
                'Advanced search filters',
                'Google Maps integration',
                'WhatsApp inquiry',
                'Contact form',
                'Mobile responsive',
                '30 days support',
                '4 weeks delivery',
            ],
        },
        {
            package: 'Premium Portal',
            price: 54999,
            features: [
                'Unlimited listings',
                'Virtual tour integration',
                'Video walkthroughs',
                'Floor plan gallery',
                'Lead management CRM',
                'Property comparison',
                'Featured listings',
                'Analytics dashboard',
                'Priority support',
                '60 days support',
                '5 weeks delivery',
            ],
        },
    ],

    sources: [
        {
            title: 'NAR: Virtual Tours Impact on Home Sales',
            url: 'https://www.nar.realtor/research-and-statistics/research-reports/real-estate-in-a-digital-age',
            description: 'National Association of Realtors research on virtual tour effectiveness',
        },
        {
            title: 'ANAROCK: Indian Real Estate Market Report',
            url: 'https://www.anarock.com/market-insights',
            description: 'Data on online property search trends in India',
        },
        {
            title: 'Matterport: Virtual Tour Statistics',
            url: 'https://matterport.com/industries/real-estate',
            description: 'Study showing properties with virtual tours get 87% more views',
        },
    ],

    relatedServices: [
        'business-website',
        'seo-google-presence',
    ],

    faq: [
        {
            question: 'Can I add/edit properties myself?',
            answer: 'Yes! Simple admin panel—upload photos, add details, mark sold/rented. Takes 5 minutes per property.',
        },
        {
            question: 'Do you provide professional property photography?',
            answer: 'We provide detailed guidelines. For ₹5,000 extra, we arrange professional photographer in major cities.',
        },
        {
            question: 'Can buyers save favorite properties?',
            answer: 'Yes! Wishlist feature—buyers save favorites, get alerts when price drops or status changes.',
        },
        {
            question: 'How do virtual tours work?',
            answer: 'You shoot 360° photos with a special camera (or phone with Ricoh Theta). We embed interactive tours.',
        },
        {
            question: 'What if I want to show under-construction projects?',
            answer: 'We add "Upcoming Projects" section with renders, floor plans, and pre-booking system.',
        },
    ],
};
