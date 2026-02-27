export interface ProblemDetail {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    icon: string;
    description: string;

    // How to recognize the problem
    symptoms: {
        symptom: string;
        impact: string;
    }[];

    // Real cost breakdown
    costAnalysis: {
        lostRevenue: string;
        description: string;
        calculation: string;
    }[];

    // Solution approach
    solution: {
        step: string;
        description: string;
        timeframe: string;
    }[];

    // Success metrics
    successMetrics: {
        metric: string;
        before: string;
        after: string;
        improvement: string;
    }[];

    // Related case studies
    caseStudies: {
        business: string;
        problem: string;
        solution: string;
        result: string;
    }[];

    // Prevention tips
    preventionTips: string[];

    sources: {
        title: string;
        url: string;
        description: string;
    }[];

    relatedProblems: string[];
}
