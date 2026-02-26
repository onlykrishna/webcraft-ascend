import type { Timestamp } from "firebase/firestore";
import type { LeadStatus } from "./lead";

export type ProjectPhase =
    | "new"
    | "planning"
    | "development"
    | "review"
    | "testing"
    | "deploying"
    | "live"
    | "cancelled";

export interface Bug {
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    status: "open" | "resolved";
    createdAt: Timestamp;
}

export interface TechProgressItem {
    id: string;
    label: string; // e.g., "Frontend - React"
    status: "pending" | "in-progress" | "done";
}

export interface ClientSuggestion {
    id: string;
    text: string;
    timestamp: Timestamp;
    status: "pending" | "reviewed" | "implemented";
}

export interface Project {
    id: string;
    leadId?: string; // Reference to original lead
    name: string;
    clientName: string;
    businessName: string;
    clientEmail: string;
    clientPhone: string;
    clientBudget: string;
    businessType: string;

    phase: ProjectPhase;
    allottedAt: Timestamp | null;
    deliveryDate: Timestamp | null;

    // Planning Data
    description: string; // Internal/Admin notes from allotment
    planningDoc: string; // Rich text planning doc
    attachedFiles: { name: string; url: string; type: string }[];
    vaultData: string; // Confidential vault (Admin only)
    clientSuggestions: ClientSuggestion[]; // Feedback for planning corrections

    // Development Data
    techTracker: TechProgressItem[];
    devNotes: string;

    // Review Data
    reviewSummaryLink?: string; // Description visible to client
    adminReviewNotes: string; // Internal review notes

    // Testing Data
    bugs: Bug[];

    // Deployment Data
    checklist: { label: string; checked: boolean }[];
    deploymentNotes: string;

    // History
    createdAt: Timestamp;
    goLiveDate?: Timestamp;
    cancelledAt?: Timestamp;
    cancellationReason?: string;
}
