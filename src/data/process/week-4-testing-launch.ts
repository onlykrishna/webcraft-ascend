import { ProcessDetail } from '@/types/process';

export const week4testinglaunchDetail: ProcessDetail = {
    id: 'week-4-testing-launch',
    slug: 'week-4-testing-launch',
    weekNumber: 4,
    title: 'Testing & Launch',
    subtitle: 'Cross-browser testing, speed optimization, final checks, and go-live. You\'re officially online!',
    duration: '3-5 business days',
    description: `
    This is it. The final sprint before launch. We test EVERYTHING: 
    Every button, every form, every page on every device. 
    We optimize speed one last time, connect your custom domain, and push the button. 
    Your website goes live for the world to see.
  `,

    activities: [
        {
            activity: 'Comprehensive Testing',
            description: 'Test all functionality: forms, buttons, links, navigation',
            whoDoesIt: 'QA team',
        },
        {
            activity: 'Device Testing Matrix',
            description: 'Test on 10+ device/browser combinations (iPhone, Android, iPad, laptops)',
            whoDoesIt: 'QA team',
        },
        {
            activity: 'Final Speed Optimization',
            description: 'Last-minute performance tweaks to hit 90+ PageSpeed score',
            whoDoesIt: 'Performance engineer',
        },
        {
            activity: 'Domain Connection',
            description: 'Connect your custom domain (yourwebsite.com) to hosting',
            whoDoesIt: 'DevOps engineer',
        },
        {
            activity: 'SSL Certificate Setup',
            description: 'Enable HTTPS (padlock icon) for security',
            whoDoesIt: 'DevOps engineer',
        },
        {
            activity: 'Go-Live Deployment',
            description: 'Push website from staging to production',
            whoDoesIt: 'DevOps engineer',
        },
    ],

    deliverables: [
        {
            deliverable: 'Live Website',
            description: 'Your website accessible at yourwebsite.com',
            format: 'Public URL',
        },
        {
            deliverable: 'Testing Report',
            description: 'Document showing all tests passed',
            format: 'PDF with checklist',
        },
        {
            deliverable: 'Admin Panel Access',
            description: 'Login credentials to manage content yourself',
            format: 'Email with secure link',
        },
        {
            deliverable: 'Training Video',
            description: 'Screen recording showing how to update content, add images, etc.',
            format: 'Unlisted YouTube link',
        },
        {
            deliverable: 'Maintenance Guide',
            description: 'PDF with tips on keeping site secure and updated',
            format: 'PDF document',
        },
    ],

    clientTasks: [
        {
            task: 'Final Approval',
            timeRequired: '1 hour',
            importance: 'Critical — sign off before we launch',
        },
        {
            task: 'Domain Verification (if new domain)',
            timeRequired: '30 minutes',
            importance: 'High — verify ownership via email',
        },
        {
            task: 'Test Everything One Last Time',
            timeRequired: '2 hours',
            importance: 'High — this is your final chance to catch issues',
        },
        {
            task: 'Prepare Launch Announcement',
            timeRequired: '1 hour',
            importance: 'Medium — social media, email blast',
        },
    ],

    faq: [
        {
            question: 'What if we find a bug after launch?',
            answer: 'First 30 days: unlimited bug fixes included. After that: ₹1,500/hour or monthly support plan.',
        },
        {
            question: 'Will my old website go down during launch?',
            answer: 'No. We do a seamless cutover. Maximum downtime: 5-10 minutes.',
        },
        {
            question: 'What if I don\'t have a domain yet?',
            answer: 'We can register one for you (₹800-1,200/year) or you can buy from GoDaddy/Namecheap and we\'ll connect it.',
        },
        {
            question: 'Do you offer hosting?',
            answer: 'Yes, included free for first year (Firebase Hosting). After that: ₹3,000-5,000/year depending on traffic.',
        },
    ],

    nextWeek: {
        preview: 'You\'re launched! Now the real work begins: ongoing support, content updates, SEO improvements, and growth.',
        preparation: 'Announce launch on social media, update Google Business Profile with new website link, start creating content plan.',
    },

    warningSigns: [
        '❌ Rushed testing — bugs will show up after launch',
        '❌ No HTTPS — browsers show "Not Secure" warning',
        '❌ Slow load time — users bounce immediately',
        '❌ No training provided — you can\'t update content yourself',
    ],

    relatedServices: [
        'business-website',
        'website-revamp',
    ],
};
