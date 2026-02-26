import { format } from "date-fns";
import { motion } from "framer-motion";
import type { Lead, LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";

// ── Status dot ─────────────────────────────────────────────────────────────────
const dotColor: Record<LeadStatus, string> = {
    new: "bg-emerald-400",
    contacted: "bg-blue-400",
    converted: "bg-purple-400",
    closed: "bg-gray-400",
    lost: "bg-red-400",
};

interface Props {
    leads: Lead[];
}

export const ActivityTimeline = ({ leads }: Props) => {
    const recent = [...leads]
        .filter((l) => l.createdAt)
        .sort((a, b) => (b.createdAt!.toMillis() - a.createdAt!.toMillis()))
        .slice(0, 10);

    if (recent.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                No lead activity yet.
            </div>
        );
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-1">
            <div className="relative ml-2">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />

                <div className="space-y-4">
                    {recent.map((lead) => (
                        <motion.div key={lead.id} variants={fadeUp} className="relative pl-8">
                            {/* Dot */}
                            <div
                                className={cn(
                                    "absolute left-0 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-card",
                                    dotColor[lead.status],
                                )}
                            />
                            <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm text-foreground truncate">{lead.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {lead.businessName} · {lead.businessType}
                                        </p>
                                    </div>
                                    <span
                                        className={cn(
                                            "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border shrink-0",
                                            {
                                                "bg-emerald-500/15 text-emerald-400 border-emerald-500/30": lead.status === "new",
                                                "bg-blue-500/15 text-blue-400 border-blue-500/30": lead.status === "contacted",
                                                "bg-purple-500/15 text-purple-400 border-purple-500/30": lead.status === "converted",
                                                "bg-gray-500/15 text-gray-400 border-gray-500/30": lead.status === "closed",
                                                "bg-red-500/15 text-red-400 border-red-500/30": lead.status === "lost",
                                            },
                                        )}
                                    >
                                        {lead.status}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>{lead.budget}</span>
                                    <span>·</span>
                                    <span>{format(lead.createdAt!.toDate(), "MMM dd, yyyy · h:mm a")}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
