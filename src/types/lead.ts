import type { Timestamp } from "firebase/firestore";

export type LeadStatus = "new" | "contacted" | "converted" | "closed";

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
}
