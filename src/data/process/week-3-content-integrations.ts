import { ProcessDetail } from '@/types/process';

export const week3contentintegrationsDetail: ProcessDetail = {
    id: 'week-3-content-integrations',
    slug: 'week-3-content-integrations',
    weekNumber: 3,
    title: 'Content & Integrations',
    subtitle: 'We add your content, connect WhatsApp, Google Maps, and all third-party tools. SEO setup.',
    duration: '5-7 business days',
    description: `
    Your website is built. Now we make it work FOR your business. 
    We connect WhatsApp for instant customer contact, embed Google Maps for directions, 
    set up SEO so Google can find you, and add all your written content with proper formatting.
  `,

    activities: [
        {
            activity: 'Content Integration',
            description: 'Add all written content, format properly, optimize headlines',
            whoDoesIt: 'Content editor',
        },
        {
            activity: 'WhatsApp Integration',
            description: 'Connect WhatsApp Business API with click-to-chat buttons',
            whoDoesIt: 'Integration specialist',
        },
        {
            activity: 'Google Maps Embedding',
            description: 'Add interactive map with your business location',
            whoDoesIt: 'Frontend developer',
        },
        {
            activity: 'SEO Setup (On-Page)',
            description: 'Optimize meta titles, descriptions, alt tags, heading structure',
            whoDoesIt: 'SEO specialist',
        },
        {
            activity: 'Analytics Integration',
            description: 'Set up Google Analytics to track visitors',
            whoDoesIt: 'Analytics expert',
        },
        {
            activity: 'Instagram Feed (if applicable)',
            description: 'Embed your Instagram posts on website',
            whoDoesIt: 'Integration specialist',
        },
    ],

    deliverables: [
        {
            deliverable: 'Fully Populated Website',
            description: 'All content added, all pages complete',
            format: 'Updated staging URL',
        },
        {
            deliverable: 'SEO Checklist Report',
            description: 'List of all SEO optimizations completed',
            format: 'PDF with screenshots',
        },
        {
            deliverable: 'Google Search Console Setup',
            description: 'Your site registered with Google for search tracking',
            format: 'Shared access link',
        },
        {
            deliverable: 'Analytics Dashboard',
            description: 'Google Analytics showing first data',
            format: 'Shared access + tutorial video',
        },
    ],

    clientTasks: [
        {
            task: 'Final Content Review',
            timeRequired: '2-3 hours',
            importance: 'Critical — check for typos, accuracy',
        },
        {
            task: 'Verify Google Maps Location',
            timeRequired: '10 minutes',
            importance: 'High — ensure correct address',
        },
        {
            task: 'Test WhatsApp Integration',
            timeRequired: '15 minutes',
            importance: 'High — send test message',
        },
        {
            task: 'Provide Social Media Links',
            timeRequired: '5 minutes',
            importance: 'Medium — Instagram, Facebook URLs',
        },
    ],

    faq: [
        {
            question: 'Do I need a WhatsApp Business account?',
            answer: 'Regular WhatsApp works fine for basic click-to-chat. WhatsApp Business API (paid) is optional for advanced features like automated replies.',
        },
        {
            question: 'Will my website appear on Google immediately?',
            answer: 'No. Google takes 2-4 weeks to index new sites. We submit your sitemap to speed this up, but patience is needed.',
        },
        {
            question: 'Can you write all the content for me?',
            answer: 'We provide content structure and suggestions. You know your business best. We polish and optimize what you provide.',
        },
        {
            question: 'What if my Google Maps location is wrong?',
            answer: 'We help you claim/update your Google Business Profile. This is separate from website but we guide you through it.',
        },
    ],

    nextWeek: {
        preview: 'Week 4: Final testing, bug fixes, browser compatibility checks, and then... launch! 🚀',
        preparation: 'Do thorough final review, prepare for launch announcement (social media posts, email to customers).',
    },

    warningSigns: [
        '❌ No SEO setup — you won\'t appear on Google',
        '❌ WhatsApp link opens wrong number — poor testing',
        '❌ Content has typos/errors — unprofessional',
        '❌ No analytics — you can\'t track performance',
    ],

    relatedServices: [
        'seo-google-presence',
        'business-website',
    ],
};
