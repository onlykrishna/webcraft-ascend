import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { X, MessageCircle, Phone, CheckCircle2, FileText } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { Lead, LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";

// ── Re-use status badge ────────────────────────────────────────────────────────
const statusConfig: Record<LeadStatus, { label: string; classes: string }> = {
    new: { label: "New", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    contacted: { label: "Contacted", classes: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    converted: { label: "Converted", classes: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
    closed: { label: "Closed", classes: "bg-gray-500/15 text-gray-400 border-gray-500/30" },
    lost: { label: "Lost", classes: "bg-red-500/15 text-red-400 border-red-500/30" },
};

const StatusBadge = ({ status }: { status: LeadStatus }) => {
    const cfg = statusConfig[status] ?? statusConfig.new;
    return (
        <span className={cn("text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border", cfg.classes)}>
            {cfg.label}
        </span>
    );
};

// ── Props ──────────────────────────────────────────────────────────────────────
interface Props {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────────
export const LeadDetailsModal = ({ lead, isOpen, onClose }: Props) => {
    const [notes, setNotes] = useState(lead?.notes ?? "");
    const [saving, setSaving] = useState(false);

    // Sync notes when lead changes
    const currentNotes = lead?.notes ?? "";
    const dirty = notes !== currentNotes;

    const handleSaveNotes = async () => {
        if (!lead) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "leads", lead.id), {
                notes,
                lastUpdated: serverTimestamp(),
            });
            toast.success("Notes saved");
            onClose();
        } catch {
            toast.error("Failed to save notes");
        } finally {
            setSaving(false);
        }
    };

    const makeWAUrl = (l: Lead) => {
        const msg = encodeURIComponent(
            `Hi ${l.name}! This is Scalvicon team. We received your inquiry for ${l.businessType} website. Are you available for a quick call?`,
        );
        return `https://wa.me/${l.phone}?text=${msg}`;
    };

    const Field = ({ label, value }: { label: string; value?: string }) => (
        <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-sm text-foreground font-medium">{value || "—"}</p>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && lead && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-card border border-border rounded-card card-shadow overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <div>
                                <h2 className="font-display font-bold text-lg text-foreground">{lead.name}</h2>
                                <p className="text-xs text-muted-foreground">{lead.businessName}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={lead.status} />
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg hover:bg-foreground/5 text-muted-foreground transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                            {/* Info grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <Field label="Business Type" value={lead.businessType} />
                                <Field label="Budget" value={lead.budget} />
                                <Field label="Source" value={lead.source} />
                                <Field label="Phone" value={lead.phone} />
                                <Field label="Email" value={lead.email} />
                                <Field
                                    label="Submitted"
                                    value={lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM yyyy, HH:mm") : "—"}
                                />
                            </div>

                            {/* Message */}
                            {lead.message && (
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                        Message
                                    </p>
                                    <div className="bg-background rounded-lg border border-border p-3 text-sm text-foreground leading-relaxed">
                                        {lead.message}
                                    </div>
                                </div>
                            )}

                            {/* Internal notes */}
                            <div>
                                <label className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                                    <FileText size={11} /> Internal Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add private notes about this lead (visible to admin only)…"
                                    rows={4}
                                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40"
                                />
                            </div>

                            {/* Quick actions */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <a
                                    href={makeWAUrl(lead)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/30 text-[#25d366] transition-colors font-medium"
                                >
                                    <MessageCircle size={13} /> WhatsApp
                                </a>
                                <a
                                    href={`tel:+91${lead.phone}`}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 transition-colors font-medium"
                                >
                                    <Phone size={13} /> Call
                                </a>
                                <a
                                    href={`mailto:${lead.email}`}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors font-medium"
                                >
                                    Email
                                </a>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNotes}
                                disabled={saving || !dirty}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                                    dirty && !saving
                                        ? "bg-primary text-background hover:bg-primary/90"
                                        : "bg-primary/20 text-primary/50 cursor-not-allowed",
                                )}
                            >
                                <CheckCircle2 size={14} />
                                {saving ? "Saving…" : "Save Notes"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
