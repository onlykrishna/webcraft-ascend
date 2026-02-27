export interface ProjectMetric {
    label: string;
    value: string;
    icon: string;
}

export interface PortfolioProject {
    id: number;
    slug: string;
    title: string;
    category: string;
    tags: string[];
    gradient: string;
    accentColor: string;
    icon: string;
    description: string;
    metrics: ProjectMetric[];
    deliveryWeeks: number;
    liveUrl: string;

    // Detailed case study data
    challenge?: string;
    solutionTitle?: string;
    solutionDetails?: string[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    techStack?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        slug: "sharma-dental-clinic",
        title: "Sharma Dental Clinic",
        category: "Healthcare",
        tags: ["Healthcare", "Booking", "SEO"],
        gradient: "from-blue-600/20 to-cyan-600/20",
        accentColor: "#06b6d4",
        icon: "Stethoscope",
        description:
            "Complete clinic website with online appointment booking, doctor profiles, and service pages optimized for local SEO.",
        metrics: [
            { label: "New patients/month", value: "+18", icon: "Users" },
            { label: "Google ranking", value: "#1", icon: "Search" },
            { label: "PageSpeed score", value: "94", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
        challenge: "Dr. Sharma was losing 40% of calls because his receptionist couldn't handle the volume during peak hours. His old Wix site was invisible on Google Maps.",
        solutionTitle: "Automated Booking & Local SEO Dominance",
        solutionDetails: [
            "Built a custom React patient portal with instant 24/7 appointment booking",
            "Structured Google Schema markup for local healthcare providers",
            "Integrated WhatsApp auto-reminders reducing no-shows by 80%",
            "Migrated from shared hosting to Firebase edge network for instant load times"
        ],
        testimonial: {
            quote: "I no longer hire receptionists just to answer phones. The website does the heavy lifting, and we rank #1 for 'Dentist near me'. Scalvicon changed my practice.",
            author: "Dr. Alok Sharma",
            role: "Head Surgeon"
        },
        techStack: ["React", "Firebase", "WhatsApp API", "Structured Schema"]
    },
    {
        id: 2,
        slug: "bliss-beauty-lounge",
        title: "Bliss Beauty Lounge",
        category: "Salon & Spa",
        tags: ["Salon", "Booking", "Gallery"],
        gradient: "from-pink-600/20 to-purple-600/20",
        accentColor: "#d946ef",
        icon: "Sparkles",
        description:
            "Luxury salon website with Instagram-synced gallery, online booking calendar, price list, and WhatsApp chat integration.",
        metrics: [
            { label: "Bookings increase", value: "+200%", icon: "Calendar" },
            { label: "Bounce rate drop", value: "-45%", icon: "TrendingDown" },
            { label: "PageSpeed score", value: "91", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
        challenge: "Relying purely on Instagram DMs to manage weekend bookings was chaos. They were missing messages, double booking chairs, and losing revenue.",
        solutionTitle: "The Instagram-to-Booking Funnel",
        solutionDetails: [
            "Implemented a visual-first design highlighting before/after transformations",
            "Synced live Instagram feeds directly to the homepage to keep content fresh",
            "Deployed a 3-step checkout booking funnel capturing ₹500 advance deposits",
            "Created clear service menu architecture that upsold premium packages natively"
        ],
        testimonial: {
            quote: "The deposit system alone paid for the website in month one. The aesthetics exactly match my salon's premium vibe.",
            author: "Priya Singh",
            role: "Owner & Lead Stylist"
        },
        techStack: ["React 18", "Framer Motion", "Razorpay Integration"]
    },
    {
        id: 3,
        slug: "gupta-real-estate",
        title: "Gupta Real Estate",
        category: "Real Estate",
        tags: ["Real Estate", "Listings", "Lead Gen"],
        gradient: "from-amber-600/20 to-orange-600/20",
        accentColor: "#f59e0b",
        icon: "Building2",
        description:
            "Property listing website with dynamic search filters, virtual tour links, lead capture forms, and CRM-ready inquiry management.",
        metrics: [
            { label: "Online leads share", value: "60%", icon: "PieChart" },
            { label: "Avg session time", value: "4.2m", icon: "Clock" },
            { label: "PageSpeed score", value: "89", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
        challenge: "Bleeding ₹50,000/month on 99Acres listings competing with 100 other brokers, offering no distinct premium brand presence.",
        solutionTitle: "Whitelabel Property Asset Portal",
        solutionDetails: [
            "Built a proprietary listing engine with custom parameters (BHK, Budget, Locality)",
            "Embedded immersive 360° Matterport virtual tours minimizing physical site visits",
            "Injected sticky WhatsApp CTAs on every property detail page",
            "Generated XML feeds syncing instantly with Google Maps API"
        ],
        testimonial: {
            quote: "We stopped paying aggregator fees within 3 months. Our direct high-net-worth client lead pipeline is now totally in our control.",
            author: "Rajesh Gupta",
            role: "Managing Director"
        },
        techStack: ["Next.js", "Google Maps API", "Tailwind CSS", "Firebase Firestore"]
    },
    {
        id: 4,
        slug: "reddys-kitchen",
        title: "Reddy's Kitchen",
        category: "Restaurant",
        tags: ["Restaurant", "Menu", "SEO"],
        gradient: "from-red-600/20 to-orange-600/20",
        accentColor: "#ef4444",
        icon: "UtensilsCrossed",
        description:
            "Restaurant website with digital menu, food photography showcase, Google Maps integration, and WhatsApp order button.",
        metrics: [
            { label: "WhatsApp orders", value: "3x", icon: "MessageCircle" },
            { label: "Google Maps views", value: "+890%", icon: "MapPin" },
            { label: "PageSpeed score", value: "96", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
        challenge: "Losing 25% margins giving revenue to Zomato/Swiggy. Their offline menu was great but online presence was non-existent.",
        solutionTitle: "Direct-to-Consumer Food Pipeline",
        solutionDetails: [
            "Highly visual, mouth-watering UI displaying 4K food photography",
            "Implemented direct WhatsApp ordering bypassing aggregator commissions",
            "Setup massive localized SEO for terms like 'Best Biryani in Hyderabad'",
            "Integrated direct Google reviews hook converting happy diners"
        ],
        testimonial: {
            quote: "The site paid for itself in 10 days just from saved Swiggy commissions on direct orders.",
            author: "Venkat Reddy",
            role: "Owner"
        },
        techStack: ["React", "Vite", "Image Optimization Pipelines"]
    },
    {
        id: 5,
        slug: "fitzone-gym",
        title: "FitZone Gym",
        category: "Fitness",
        tags: ["Fitness", "Membership", "SEO"],
        gradient: "from-green-600/20 to-emerald-600/20",
        accentColor: "#10b981",
        icon: "Dumbbell",
        description:
            "Gym and fitness center website with membership packages, class schedules, trainer profiles, and free trial sign-up flow.",
        metrics: [
            { label: "Trial signups/month", value: "+35", icon: "UserPlus" },
            { label: "Member retention lift", value: "+28%", icon: "TrendingUp" },
            { label: "PageSpeed score", value: "93", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
        challenge: "Competing against massive franchise gyms (Cult.fit) without the budget to out-spend them on Facebook Ads.",
        solutionTitle: "Hyper-Local Community Authority",
        solutionDetails: [
            "Engineered an aggressive 'Claim Free Day Pass' sticky modal across all pages",
            "Built out an exhaustive SEO structure capturing local 'gyms near me' traffic natively",
            "Integrated trainer profile portfolios increasing trust and personal connection"
        ],
        testimonial: {
            quote: "We are finally capturing the organic traffic that Cult used to steal from us. The free pass funnel is a machine.",
            author: "Rahul Verma",
            role: "Head Coach"
        },
        techStack: ["React Router DOM", "Cloud Functions", "Nodemailer Alerts"]
    },
    {
        id: 6,
        slug: "legaledge-associates",
        title: "LegalEdge Associates",
        category: "Legal",
        tags: ["Legal", "Professional", "Trust"],
        gradient: "from-slate-600/20 to-gray-600/20",
        accentColor: "#94a3b8",
        icon: "Scale",
        description:
            "Law firm website with practice areas, attorney profiles, case result highlights, and secure client inquiry form.",
        metrics: [
            { label: "Inquiry form rate", value: "+180%", icon: "FileText" },
            { label: "Trust signals added", value: "12", icon: "Shield" },
            { label: "PageSpeed score", value: "92", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
        challenge: "Old site looked like a scam from 2005. High net-worth corporate clients were bouncing immediately due to lack of trust.",
        solutionTitle: "The Trust & Authority Architecture",
        solutionDetails: [
            "Executed an ultra-minimalist, high-end monochrome design aesthetic",
            "Built a dynamic database engine publishing recent High Court case victory summaries",
            "Installed GDPR compliant privacy policies and secure PGP encrypted contact protocols",
            "Authored 10,000 words of deeply-researched legal SEO documentation"
        ],
        testimonial: {
            quote: "Corporate clients now tell me 'We hired you because your website proved you understand compliance better than anyone else'. Exceptional work.",
            author: "Neha Sharma",
            role: "Senior Partner"
        },
        techStack: ["React 18", "Zod Validations", "Framer Motion"]
    },
];

export const portfolioCategories = [
    "All",
    "Healthcare",
    "Salon & Spa",
    "Real Estate",
    "Restaurant",
    "Fitness",
    "Legal",
];
