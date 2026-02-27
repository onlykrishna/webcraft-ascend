import { ProcessDetail } from '@/types/process';

export const week1discoverydesignDetail: ProcessDetail = {
    id: 'week-1-discovery-design',
    slug: 'week-1-discovery-design',
    weekNumber: 1,
    title: 'Discovery & Design',
    subtitle: 'We learn your business, competitors, and goals. Then deliver 2 custom design concepts.',
    duration: '5-7 business days',
    description: `
    This is the foundation of your website. We don't use templates. 
    We study your industry, analyze what works for competitors, and design something unique for YOUR business. 
    By the end of Week 1, you'll see exactly what your website will look like.
  `,

    activities: [
        {
            activity: 'Business Discovery Call (60 minutes)',
            description: 'Deep dive into your business: target customers, unique selling points, competitors, goals',
            whoDoesIt: 'You + Our project lead',
        },
        {
            activity: 'Competitor Analysis',
            description: 'We analyze 5-10 competitor websites in your industry to identify what works and what doesn\'t',
            whoDoesIt: 'Our design team',
        },
        {
            activity: 'Content Strategy',
            description: 'Plan what goes on each page, what to highlight, and how to structure information',
            whoDoesIt: 'Our content strategist',
        },
        {
            activity: 'Wireframe Creation',
            description: 'Basic layout sketches showing where elements go (no colors/images yet)',
            whoDoesIt: 'Our UX designer',
        },
        {
            activity: 'Design Mockups (2 concepts)',
            description: 'Full-color designs of your homepage and one inner page in 2 different styles',
            whoDoesIt: 'Our visual designer',
        },
    ],

    deliverables: [
        {
            deliverable: 'Design Concept A',
            description: 'First complete visual design with colors, fonts, images, and layout',
            format: 'Figma link + PDF preview',
        },
        {
            deliverable: 'Design Concept B',
            description: 'Alternative design approach to give you options',
            format: 'Figma link + PDF preview',
        },
        {
            deliverable: 'Content Outline',
            description: 'Detailed plan of what goes on each page (headings, sections, CTAs)',
            format: 'Google Doc',
        },
        {
            deliverable: 'Project Timeline',
            description: 'Week-by-week schedule with milestones and deadlines',
            format: 'Shared calendar + PDF',
        },
    ],

    clientTasks: [
        {
            task: 'Attend Discovery Call',
            timeRequired: '60 minutes',
            importance: 'Critical — sets direction for entire project',
        },
        {
            task: 'Share Brand Assets',
            timeRequired: '30 minutes',
            importance: 'High — logo, brand colors, existing photos',
        },
        {
            task: 'Provide Competitor Examples',
            timeRequired: '20 minutes',
            importance: 'Medium — helps us understand your expectations',
        },
        {
            task: 'Review & Choose Design',
            timeRequired: '1-2 hours',
            importance: 'Critical — determines final look and feel',
        },
    ],

    faq: [
        {
            question: 'What if I don\'t like either design?',
            answer: 'We revise based on your feedback. You get 2 rounds of revisions included. We iterate until you love it.',
        },
        {
            question: 'Can I mix elements from both concepts?',
            answer: 'Absolutely! Most clients take the layout from Concept A and colors from Concept B. That\'s normal.',
        },
        {
            question: 'Do I need to write all the content myself?',
            answer: 'No. We provide a content outline with suggestions. You fill in business-specific details (services, prices, team bios). We help polish the wording.',
        },
        {
            question: 'What if I\'m too busy for a 60-minute call?',
            answer: 'We can break it into 2×30-minute calls or do it async via video recording. But skipping discovery leads to generic results.',
        },
    ],

    nextWeek: {
        preview: 'Once you approve the design, we start building! Week 2 is all about turning designs into a functioning website.',
        preparation: 'Finalize design choice, gather all photos/videos you want on the site, start working on content based on our outline.',
    },

    warningSigns: [
        '❌ Agency shows you a template and says "we\'ll customize it" — that\'s lazy',
        '❌ No discovery call — they don\'t care about your business',
        '❌ Only 1 design option — what if you don\'t like it?',
        '❌ Designs take >2 weeks — they\'re either overbooked or disorganized',
    ],

    relatedServices: [
        'business-website',
        'website-revamp',
    ],
};
