import type { Timestamp } from "firebase/firestore";

export type LeadStatus = "new" | "contacted" | "reminding" | "converted" | "closed" | "lost";

export interface TimelineEvent {
    date: Timestamp;
    event: string;
    note?: string;
    adminName?: string;
    statusAtTime?: LeadStatus;
}

export interface Lead {
    id: string;
    name: string;
    businessName: string;
    businessType: string;
    phone: string;
    email: string;
    budget: string;
    message?: string;
    status: LeadStatus;
    source: string;
    createdAt: Timestamp | null;
    notes?: string;
    lastUpdated?: Timestamp;
    remindAt?: Timestamp | null;
    timeline?: TimelineEvent[];
}
