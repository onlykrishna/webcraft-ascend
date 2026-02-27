export interface ProcessDetail {
    id: string;
    slug: string;
    weekNumber: number;
    title: string;
    subtitle: string;
    duration: string;
    description: string;

    // What happens this week
    activities: {
        activity: string;
        description: string;
        whoDoesIt: string;
    }[];

    // Deliverables
    deliverables: {
        deliverable: string;
        description: string;
        format: string;
    }[];

    // Client involvement
    clientTasks: {
        task: string;
        timeRequired: string;
        importance: string;
    }[];

    // Common questions
    faq: {
        question: string;
        answer: string;
    }[];

    // What to expect next
    nextWeek: {
        preview: string;
        preparation: string;
    };

    // Red flags to watch
    warningSigns: string[];

    relatedServices: string[];
}
