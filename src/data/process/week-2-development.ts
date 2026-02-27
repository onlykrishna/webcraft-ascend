import { ProcessDetail } from '@/types/process';

export const week2developmentDetail: ProcessDetail = {
    id: 'week-2-development',
    slug: 'week-2-development',
    weekNumber: 2,
    title: 'Development',
    subtitle: 'Your approved design goes into production. Mobile-first, fast, clean code.',
    duration: '7-10 business days',
    description: `
    This is where magic happens. Our developers turn the beautiful design into a real, functioning website. 
    We build mobile-first (because 70% of traffic comes from phones), optimize for speed, and write clean code. 
    By Week 2 end, you'll have a working website on a staging URL to test.
  `,

    activities: [
        {
            activity: 'Frontend Development',
            description: 'Convert design to React code with responsive breakpoints for all devices',
            whoDoesIt: 'Frontend developer',
        },
        {
            activity: 'Backend Setup',
            description: 'Set up Firebase/database, contact forms, and data storage',
            whoDoesIt: 'Backend developer',
        },
        {
            activity: 'Mobile Optimization',
            description: 'Ensure perfect functionality on iPhone, Android, tablets',
            whoDoesIt: 'Frontend developer',
        },
        {
            activity: 'Speed Optimization',
            description: 'Compress images, minify code, implement caching for <2s load time',
            whoDoesIt: 'Performance engineer',
        },
        {
            activity: 'Cross-Browser Testing',
            description: 'Test on Chrome, Safari, Firefox, Edge to ensure consistency',
            whoDoesIt: 'QA tester',
        },
    ],

    deliverables: [
        {
            deliverable: 'Staging Website URL',
            description: 'Live preview of your website on a temporary URL (e.g., yoursite-staging.web.app)',
            format: 'Live link',
        },
        {
            deliverable: 'Mobile Demo Video',
            description: 'Screen recording showing how site works on iPhone/Android',
            format: 'MP4 video via WhatsApp',
        },
        {
            deliverable: 'Speed Test Results',
            description: 'Google PageSpeed score (target: 90+/100)',
            format: 'PDF report',
        },
    ],

    clientTasks: [
        {
            task: 'Test Staging Site',
            timeRequired: '1-2 hours',
            importance: 'Critical — catch bugs before launch',
        },
        {
            task: 'Provide Content',
            timeRequired: '3-5 hours',
            importance: 'High — written text for all pages',
        },
        {
            task: 'Submit Final Photos',
            timeRequired: '1 hour',
            importance: 'High — real business photos (not stock)',
        },
    ],

    faq: [
        {
            question: 'Can I see progress before Week 2 ends?',
            answer: 'Yes! We share work-in-progress links mid-week so you can see how it\'s shaping up.',
        },
        {
            question: 'What if I want changes to the design during development?',
            answer: 'Minor tweaks are fine. Major redesigns delay the project and may incur extra costs. That\'s why Week 1 design approval is critical.',
        },
        {
            question: 'Will it work on old phones?',
            answer: 'We test on devices from the last 3-4 years. Super old phones (5+ years) may have minor issues but core functionality works.',
        },
        {
            question: 'What tech stack do you use?',
            answer: 'React + Firebase for most projects. We choose tech based on your needs (e-commerce may need different stack).',
        },
    ],

    nextWeek: {
        preview: 'Week 3 is all about integrations: WhatsApp, Google Maps, payment gateways, SEO setup, and adding your content.',
        preparation: 'Test the staging site thoroughly, compile feedback, finish writing content.',
    },

    warningSigns: [
        '❌ No staging/preview site — you won\'t see progress until launch (risky)',
        '❌ Site loads slowly on mobile — they didn\'t optimize',
        '❌ Buttons/forms don\'t work — poor testing',
        '❌ Looks different on your phone vs theirs — cross-device issues',
    ],

    relatedServices: [
        'business-website',
        'ecommerce-online-store',
    ],
};
