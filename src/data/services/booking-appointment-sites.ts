import { ServiceDetail } from '@/types/service';

export const bookingappointmentsitesDetail: ServiceDetail = {
    id: 'booking-appointment-sites',
    slug: 'booking-appointment-sites',
    title: 'Online Booking & Appointment System',
    subtitle: 'Stop losing customers to phone tag. Let them book 24/7 instantly.',
    heroImage: '/images/services/booking-hero.jpg',
    description: `
    67% of customers prefer to book appointments online rather than calling. 
    Every missed call is a lost booking—and your competitor's gain. 
    An automated booking system captures appointments 24/7, even while you sleep.
  `,

    commonMistakes: [
        {
            mistake: 'Manual calendar management (Google Calendar sharing)',
            consequence: 'Double bookings, scheduling conflicts, frustrated customers',
            solution: 'Automated system with real-time availability and instant confirmations',
        },
        {
            mistake: 'No automatic reminders',
            consequence: '30-40% no-show rate costing thousands in lost revenue',
            solution: 'WhatsApp/SMS reminders sent 24h and 2h before appointment',
        },
        {
            mistake: 'Phone-only booking',
            consequence: "Lose 70% of customers who call after hours or don't want to call",
            solution: 'Online booking captures leads 24/7',
        },
        {
            mistake: 'No deposit/prepayment option',
            consequence: 'High cancellation rate, wasted time slots',
            solution: 'Optional advance payment (₹100-500) reduces no-shows by 80%',
        },
        {
            mistake: 'Complex booking process (5+ steps)',
            consequence: '60% abandon before completing',
            solution: '3-step booking: Select service → Pick time → Confirm',
        },
    ],

    keyFeatures: [
        {
            feature: 'Real-Time Availability Calendar',
            description: 'Customers see only available slots, preventing double bookings',
            example: 'Salon customer books haircut at 3pm Friday → slot automatically blocked for other customers',
        },
        {
            feature: 'Automated WhatsApp Confirmations',
            description: 'Instant booking confirmation sent via WhatsApp',
            example: 'Customer books → receives WhatsApp: "✓ Confirmed: Haircut with Priya, Friday 3pm"',
        },
        {
            feature: 'Smart Reminders',
            description: '24h and 2h reminders reduce no-shows by 70%',
            example: 'System automatically sends: "Reminder: Your appointment is tomorrow at 3pm"',
        },
        {
            feature: 'Service Menu Integration',
            description: 'Customers choose service, duration, and staff member',
            example: 'Spa menu: Swedish Massage (60 min, ₹2,000) → Select therapist → Book slot',
        },
        {
            feature: 'Customer Database',
            description: 'Track booking history, preferences, and contact info',
            example: 'System remembers: "Customer prefers 3pm slots, books haircut every 6 weeks"',
        },
        {
            feature: 'Cancel/Reschedule Portal',
            description: 'Customers can self-manage without calling you',
            example: "Customer gets link to reschedule → picks new time → you're notified",
        },
    ],

    caseStudies: [
        {
            client: 'Bliss Beauty Lounge',
            industry: 'Salon & Spa',
            challenge: 'Missing 15-20 calls per day during busy hours, losing ₹50,000/month in bookings',
            solution: 'Online booking system with service menu, staff selection, and WhatsApp confirmations',
            results: [
                '+200% bookings within 6 weeks',
                '85% of bookings now come through website (not phone)',
                'No-show rate dropped from 35% to 8%',
                'Staff saves 2 hours/day on phone calls',
            ],
        },
        {
            client: 'Dr. Sharma Dental Clinic',
            industry: 'Healthcare',
            challenge: 'Patients calling after hours (40% of calls), receptionist overwhelmed',
            solution: 'Patient portal with appointment booking, treatment history, and reminders',
            results: [
                '+18 new patients per month',
                '60% of appointments booked online',
                'Reduced front desk workload by 50%',
                'Patient satisfaction score increased to 4.8/5',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'Booking Engine',
            technologies: ['Calendly API', 'Custom React Calendar', 'Firebase Realtime DB'],
        },
        {
            category: 'Notifications',
            technologies: ['WhatsApp Business API', 'Twilio SMS', 'Email (Nodemailer)'],
        },
        {
            category: 'Payments',
            technologies: ['Razorpay', 'PayU', 'Stripe'],
        },
        {
            category: 'Integration',
            technologies: ['Google Calendar Sync', 'Instagram DM Booking', 'Zoho CRM'],
        },
    ],

    pricing: [
        {
            package: 'Basic Booking',
            price: 19999,
            features: [
                'Online booking calendar',
                'WhatsApp confirmations',
                'Email reminders',
                'Customer database',
                'Cancel/reschedule portal',
                'Google Calendar sync',
                '30 days support',
                '3 weeks delivery',
            ],
        },
        {
            package: 'Premium Booking',
            price: 29999,
            features: [
                'Everything in Basic',
                'Multiple staff calendars',
                'SMS + WhatsApp reminders',
                'Advance payment integration',
                'Customer loyalty program',
                'Analytics dashboard',
                'Priority WhatsApp support',
                '60 days support',
                '4 weeks delivery',
            ],
        },
    ],

    sources: [
        {
            title: 'Accenture: Customer Booking Preferences Study',
            url: 'https://www.accenture.com/us-en/insights/software-platforms/appointment-booking',
            description: 'Research showing 67% of customers prefer online booking over phone calls',
        },
        {
            title: 'Harvard Business Review: Reducing No-Shows',
            url: 'https://hbr.org/2016/06/how-to-reduce-no-shows',
            description: 'Study on how SMS reminders reduce no-show rates by 29%',
        },
        {
            title: 'WhatsApp Business: Appointment Reminders',
            url: 'https://business.whatsapp.com/blog/appointment-reminders',
            description: 'Data on WhatsApp reminder effectiveness in reducing cancellations',
        },
    ],

    relatedServices: [
        'business-website',
        'ecommerce-online-store',
    ],

    faq: [
        {
            question: 'Can customers book without creating an account?',
            answer: 'Yes! We design frictionless booking—just name, phone, and email. No passwords required.',
        },
        {
            question: 'What if two customers book the same slot?',
            answer: 'Impossible. Our system updates in real-time. Once a slot is taken, it disappears for others.',
        },
        {
            question: 'Can I block certain days/times?',
            answer: 'Yes. You control your availability. Block holidays, lunch breaks, or busy periods instantly.',
        },
        {
            question: 'Do you integrate with my existing calendar?',
            answer: 'Yes. Two-way Google Calendar sync—bookings appear in your calendar automatically.',
        },
        {
            question: 'What if a customer needs to cancel?',
            answer: 'They get a cancellation link in their confirmation. Slot reopens automatically.',
        },
    ],
};
