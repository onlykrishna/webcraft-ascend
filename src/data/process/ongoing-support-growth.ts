import { ProcessDetail } from '@/types/process';

export const ongoingsupportgrowthDetail: ProcessDetail = {
    id: 'ongoing-support-growth',
    slug: 'ongoing-support-growth',
    weekNumber: 5,
    title: 'Support & Growth',
    subtitle: '30-day post-launch warranty. Monthly maintenance plans. Continuous SEO and content strategy.',
    duration: 'Ongoing',
    description: `
    Your website is live. But it's not "done." A website is a living asset that needs care. 
    We provide 30 days of post-launch support (unlimited changes), then offer monthly maintenance plans. 
    We also help with content strategy, SEO improvements, and growth optimization.
  `,

    activities: [
        {
            activity: 'Post-Launch Monitoring',
            description: 'Track site performance, uptime, speed, and analytics for first 30 days',
            whoDoesIt: 'Support team',
        },
        {
            activity: 'Bug Fixes & Tweaks',
            description: 'Fix any issues discovered after launch (unlimited for 30 days)',
            whoDoesIt: 'Development team',
        },
        {
            activity: 'Content Updates',
            description: 'Help with adding new pages, updating text, changing images',
            whoDoesIt: 'Content team',
        },
        {
            activity: 'SEO Monitoring',
            description: 'Track Google rankings, suggest improvements',
            whoDoesIt: 'SEO specialist',
        },
        {
            activity: 'Performance Optimization',
            description: 'Ongoing speed improvements as your content grows',
            whoDoesIt: 'Performance engineer',
        },
    ],

    deliverables: [
        {
            deliverable: '30-Day Support Period',
            description: 'Unlimited minor changes and bug fixes',
            format: 'WhatsApp/email support',
        },
        {
            deliverable: 'Monthly Analytics Report',
            description: 'Traffic stats, top pages, conversion rates',
            format: 'PDF dashboard',
        },
        {
            deliverable: 'SEO Performance Report',
            description: 'Keyword rankings, backlink growth, technical health',
            format: 'Monthly PDF',
        },
        {
            deliverable: 'Backup System',
            description: 'Weekly automated backups of your entire site',
            format: 'Cloud storage',
        },
    ],

    clientTasks: [
        {
            task: 'Report Issues Promptly',
            timeRequired: '10 minutes',
            importance: 'High — faster we know, faster we fix',
        },
        {
            task: 'Review Monthly Reports',
            timeRequired: '30 minutes',
            importance: 'Medium — understand your site performance',
        },
        {
            task: 'Plan Content Calendar',
            timeRequired: '1 hour/month',
            importance: 'High — fresh content improves SEO',
        },
    ],

    faq: [
        {
            question: 'What happens after 30 days?',
            answer: 'You choose: DIY (we\'ve trained you), pay-per-hour (₹1,500/hr), or monthly plan (₹3,000-10,000/month).',
        },
        {
            question: 'What\'s included in monthly maintenance?',
            answer: 'Security updates, content changes (2-3 hours/month), uptime monitoring, monthly analytics report, priority support.',
        },
        {
            question: 'Do I NEED ongoing support?',
            answer: 'Not mandatory, but recommended. Websites need security patches, content updates, and SEO work to stay competitive.',
        },
        {
            question: 'Can I switch to a different agency later?',
            answer: 'Yes. We provide full code export and documentation. You own everything.',
        },
    ],

    nextWeek: {
        preview: 'No "next week" — you\'re in ongoing mode! Focus on creating content, promoting your site, and growing your business.',
        preparation: 'Start content calendar, set quarterly review meetings, monitor analytics weekly.',
    },

    warningSigns: [
        '❌ Agency disappears after launch — no support',
        '❌ Security vulnerabilities discovered — site hacked',
        '❌ No analytics tracking — can\'t measure ROI',
        '❌ Site slowly degrades — no maintenance',
    ],

    relatedServices: [
        'seo-google-presence',
        'business-website',
    ],
};
