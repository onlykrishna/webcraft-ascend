export interface ServiceDetail {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    description: string;

    // What customers get wrong
    commonMistakes: {
        mistake: string;
        consequence: string;
        solution: string;
    }[];

    // What makes a great solution
    keyFeatures: {
        feature: string;
        description: string;
        example: string;
    }[];

    // Real-world examples
    caseStudies: {
        client: string;
        industry: string;
        challenge: string;
        solution: string;
        results: string[];
    }[];

    // Technical details
    technicalStack: {
        category: string;
        technologies: string[];
    }[];

    // Pricing
    pricing: {
        package: string;
        price: number;
        features: string[];
    }[];

    // SEO & Citations
    sources: {
        title: string;
        url: string;
        description: string;
    }[];

    // Related services
    relatedServices: string[];

    // FAQ
    faq: {
        question: string;
        answer: string;
    }[];
}
