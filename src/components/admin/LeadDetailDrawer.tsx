import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Phone,
    Mail,
    Briefcase,
    DollarSign,
    Globe,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Bell,
    MessageSquare,
    Send,
    History,
    FileText,
    TrendingUp,
    User
} from "lucide-react";
import { format, addDays } from "date-fns";
import type { Lead, LeadStatus, TimelineEvent } from "@/types/lead";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface Props {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
}

const LeadDetailDrawer = ({ lead, isOpen, onClose }: Props) => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<"details" | "timeline">("details");
    const [contactNote, setContactNote] = useState("");
    const [showContactForm, setShowContactForm] = useState(false);
    const [remindDate, setRemindDate] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"));
    const [showRemindForm, setShowRemindForm] = useState(false);
    const [saving, setSaving] = useState(false);

    // Reset forms when lead changes or opens
    useEffect(() => {
        if (isOpen) {
            setShowContactForm(false);
            setShowRemindForm(false);
            setContactNote("");
            setActiveTab("details");
        }
    }, [isOpen, lead?.id]);

    if (!lead) return null;

    const adminName = currentUser?.displayName || "Admin";

    const handleUpdateStatus = async (status: LeadStatus, eventDescription: string, note?: string) => {
        setSaving(true);
        try {
            const updateData: any = {
                status,
                lastUpdated: Timestamp.now(),
                timeline: arrayUnion({
                    date: Timestamp.now(),
                    event: eventDescription,
                    note: note ?? "",
                    adminName,
                    statusAtTime: status
                })
            };

            await updateDoc(doc(db, "leads", lead.id), updateData);
            toast.success(`Lead updated: ${eventDescription}`);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update lead");
        } finally {
            setSaving(false);
        }
    };

    const handleSetReminder = async () => {
        setSaving(true);
        try {
            const date = new Date(remindDate);
            await updateDoc(doc(db, "leads", lead.id), {
                status: "reminding",
                remindAt: Timestamp.fromDate(date),
                lastUpdated: Timestamp.now(),
                timeline: arrayUnion({
                    date: Timestamp.now(),
                    event: "Reminder Scheduled",
                    note: `Follow-up set for ${format(date, "dd MMM, hh:mm a")}`,
                    adminName,
                    statusAtTime: "reminding" as LeadStatus
                })
            });
            toast.success("Reminder scheduled");
            onClose();
        } catch (err) {
            toast.error("Failed to set reminder");
        } finally {
            setSaving(false);
        }
    };

    // Filter for interaction history: only manually logged entries (either have a note or description of manual act)
    // The prompt says "only show the interactions that the admin has explicitly logged — not system events or automatic status changes"
    const interactionHistory = (lead.timeline || []).filter(event => event.note || event.adminName);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#162030] border-l border-[#1c2b3a] z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[#1c2b3a] flex items-center justify-between bg-[#162030]/50 sticky top-0 backdrop-blur-md z-10">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {lead.name}
                                    <StatusBadge status={lead.status} />
                                </h2>
                                <p className="text-sm text-gray-400 font-medium">{lead.businessName}</p>
                                <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-[#00e5a0] uppercase tracking-wider bg-[#00e5a0]/10 px-2 py-0.5 rounded-md w-fit">
                                    <Calendar size={12} />
                                    Received on: {lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM yyyy, hh:mm a") : "N/A"}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-6 border-b border-[#1c2b3a]">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={cn(
                                    "px-4 py-3 text-sm font-bold transition-all border-b-2",
                                    activeTab === "details" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-200"
                                )}
                            >
                                Lead Details
                            </button>
                            <button
                                onClick={() => setActiveTab("timeline")}
                                className={cn(
                                    "px-4 py-3 text-sm font-bold transition-all border-b-2 gap-2 flex items-center",
                                    activeTab === "timeline" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-200"
                                )}
                            >
                                <History size={14} />
                                Interaction History
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {activeTab === "details" ? (
                                <>
                                    {/* Grid Details */}
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                        <DetailItem icon={Phone} label="Phone" value={lead.phone} color="text-emerald-400" />
                                        <DetailItem icon={Mail} label="Email" value={lead.email} color="text-blue-400" />
                                        <DetailItem icon={Briefcase} label="Business Type" value={lead.businessType} color="text-purple-400" />
                                        <DetailItem icon={DollarSign} label="Budget" value={lead.budget} color="text-amber-400" />
                                        <DetailItem icon={Globe} label="Lead Source" value={lead.source} color="text-sky-400" />
                                        <DetailItem icon={Calendar} label="Date Received" value={lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM, yyyy") : "N/A"} color="text-gray-400" />
                                    </div>

                                    {/* Requirements Section */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <FileText size={14} /> Requirements
                                        </h3>
                                        <div className="bg-[#0f1923] p-4 rounded-xl border border-[#1c2b3a] text-sm text-gray-300 leading-relaxed min-h-[100px]">
                                            {lead.message || "No specific requirements provided."}
                                        </div>
                                    </div>

                                    {/* Notes Section (Current) */}
                                    {lead.notes && (
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                <MessageSquare size={14} /> Admin Notes
                                            </h3>
                                            <div className="bg-[#0f1923] p-4 rounded-xl border border-[#1c2b3a] text-sm text-gray-300 italic">
                                                {lead.notes}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-6">
                                    {(interactionHistory.length === 0) ? (
                                        <div className="text-center py-10 text-gray-500 italic text-sm">
                                            No interactions logged yet.
                                        </div>
                                    ) : (
                                        interactionHistory.slice().reverse().map((event, idx) => (
                                            <div key={idx} className="relative pl-8">
                                                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary/40 border-2 border-primary" />
                                                {idx !== interactionHistory.length - 1 && (
                                                    <div className="absolute left-[5.5px] top-4.5 bottom-[-24px] w-px bg-[#1c2b3a]" />
                                                )}
                                                <div className="bg-[#0f1923] border border-[#1c2b3a] rounded-xl p-4 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-primary uppercase">{event.event}</span>
                                                            {event.statusAtTime && (
                                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 uppercase tracking-tighter">
                                                                    {event.statusAtTime}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-gray-500 font-mono">
                                                            {format(event.date.toDate(), "dd MMM, hh:mm a")}
                                                        </span>
                                                    </div>

                                                    {event.note && (
                                                        <p className="text-sm text-gray-300 italic leading-relaxed">
                                                            "{event.note}"
                                                        </p>
                                                    )}

                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 border-t border-white/5 pt-2">
                                                        <User size={10} className="text-gray-600" />
                                                        <span>Logged by: <span className="text-gray-400 font-bold">{event.adminName || "Admin"}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Footer */}
                        <div className="p-6 border-t border-[#1c2b3a] bg-[#0f1923]/50 space-y-4">
                            {/* Inline Forms for Contact/Remind */}
                            <AnimatePresence>
                                {showContactForm && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden space-y-3"
                                    >
                                        <textarea
                                            placeholder="What happened during the contact? Add a quick note..."
                                            value={contactNote}
                                            onChange={(e) => setContactNote(e.target.value)}
                                            className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none h-24"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                disabled={saving}
                                                onClick={() => handleUpdateStatus("contacted", "Contacted Customer", contactNote)}
                                                className="flex-1 bg-primary text-black font-bold py-2 rounded-lg text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Send size={14} /> Submit Update
                                            </button>
                                            <button
                                                onClick={() => setShowContactForm(false)}
                                                className="px-4 py-2 border border-[#1c2b3a] text-gray-400 rounded-lg text-sm hover:bg-white/5 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {showRemindForm && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden space-y-3"
                                    >
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                            <input
                                                type="datetime-local"
                                                value={remindDate}
                                                onChange={(e) => setRemindDate(e.target.value)}
                                                className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/40 [color-scheme:dark]"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                disabled={saving}
                                                onClick={handleSetReminder}
                                                className="flex-1 bg-amber-500 text-black font-bold py-2 rounded-lg text-sm hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Clock size={14} /> Schedule Follow-up
                                            </button>
                                            <button
                                                onClick={() => setShowRemindForm(false)}
                                                className="px-4 py-2 border border-[#1c2b3a] text-gray-400 rounded-lg text-sm hover:bg-white/5 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!showContactForm && !showRemindForm && (
                                <div className="grid grid-cols-2 gap-3">
                                    <ActionButton
                                        icon={CheckCircle2}
                                        label="Contacted"
                                        color="text-emerald-400"
                                        bg="bg-emerald-400/10"
                                        border="border-emerald-400/20"
                                        onClick={() => setShowContactForm(true)}
                                    />
                                    <ActionButton
                                        icon={Clock}
                                        label="Remind Me"
                                        color="text-amber-400"
                                        bg="bg-amber-400/10"
                                        border="border-amber-400/20"
                                        onClick={() => setShowRemindForm(true)}
                                    />
                                    <ActionButton
                                        icon={TrendingUp}
                                        label="Converted"
                                        color="text-purple-400"
                                        bg="bg-purple-400/10"
                                        border="border-purple-400/20"
                                        onClick={() => handleUpdateStatus("converted", "Lead Converted", "Successful conversion after negotiation.")}
                                    />
                                    <ActionButton
                                        icon={XCircle}
                                        label="Lost / Dead"
                                        color="text-red-400"
                                        bg="bg-red-400/10"
                                        border="border-red-400/20"
                                        onClick={() => handleUpdateStatus("lost", "Lead Lost", "Customer declined or stopped responding.")}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const DetailItem = ({ icon: Icon, label, value, color }: any) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <Icon size={12} className={color} /> {label}
        </p>
        <p className="text-sm font-semibold text-white truncate">{value || "—"}</p>
    </div>
);

const ActionButton = ({ icon: Icon, label, color, bg, border, onClick }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-95 group",
            bg, border
        )}
    >
        <Icon size={20} className={cn("transition-transform group-hover:scale-110", color)} />
        <span className={cn("text-xs font-bold uppercase tracking-tighter", color)}>{label}</span>
    </button>
);

const StatusBadge = ({ status }: { status: LeadStatus }) => (
    <span className={cn(
        "text-[9px] px-2 py-0.5 rounded-full border border-opacity-40 font-black uppercase tracking-widest flex items-center gap-1.5 w-fit whitespace-nowrap",
        {
            "bg-[#00e5a0]/10 text-[#00e5a0] border-[#00e5a0]": status === "new",
            "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]": status === "contacted",
            "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]": status === "converted",
            "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]": status === "reminding",
            "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]": status === "lost" || status === "closed",
        }
    )}>
        {status === "new" && <span className="w-1 h-1 rounded-full bg-[#00e5a0] animate-pulse" />}
        {status === "new" ? "New / Pending" :
            status === "contacted" ? "Contacted" :
                status === "reminding" ? "Remind Scheduled" :
                    status === "converted" ? "Converted" : "Lost / Dead"}
    </span>
);

export default LeadDetailDrawer;
