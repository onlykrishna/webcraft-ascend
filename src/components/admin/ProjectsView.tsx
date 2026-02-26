import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Layout,
    Settings,
    Search,
    Plus,
    Clock,
    CheckCircle2,
    XCircle,
    FlaskConical,
    Rocket,
    Globe,
    FileText,
    TrendingUp,
    ChevronRight,
    Calendar,
    DollarSign,
    User,
    ArrowRight,
    AlertCircle,
    Timer,
    Lock,
    Unlock,
    MessageSquare,
    Save,
    Play,
    ChevronDown,
    ExternalLink,
    Paperclip
} from "lucide-react";
import {
    collection,
    query,
    onSnapshot,
    orderBy,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project, ProjectPhase, TechProgressItem, Bug } from "@/types/project";
import type { Lead } from "@/types/lead";
import { cn } from "@/lib/utils";
import { format, addDays, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { toast } from "sonner";
import LeadDetailDrawer from "./LeadDetailDrawer";

interface Props {
    leads: Lead[];
}

const ProjectsView = ({ leads }: Props) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePhase, setActivePhase] = useState<ProjectPhase | "all">("new");
    const [searchQuery, setSearchQuery] = useState("");

    // ─── Fetch Projects from Firestore ─────────────────────────────────────
    useEffect(() => {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Project));
            setProjects(projectsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching projects:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // ─── Derived Data ────────────────────────────────────────────────────────
    const unallotedLeads = useMemo(() => {
        const allottedLeadIds = new Set(projects.map(p => p.leadId).filter(Boolean));
        return leads.filter(l => l.status === "converted" && !allottedLeadIds.has(l.id));
    }, [leads, projects]);

    const newProjectsCount = unallotedLeads.length;

    const projectStats = useMemo(() => {
        const getCount = (p: ProjectPhase) => projects.filter(pr => pr.phase === p).length;

        return [
            { id: "new", label: "New Projects", count: newProjectsCount, icon: Plus, color: "text-[#00e5a0]", bg: "bg-[#00e5a0]/10", description: "Not yet allotted" },
            { id: "planning", label: "Planning", count: getCount("planning"), icon: Layout, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10", description: "Under planning" },
            { id: "development", label: "Development", count: getCount("development"), icon: Settings, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", description: "In build phase" },
            { id: "review", label: "Review", count: getCount("review"), icon: CheckCircle2, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10", description: "Client review" },
            { id: "testing", label: "Testing", count: getCount("testing"), icon: FlaskConical, color: "text-[#f97316]", bg: "bg-[#f97316]/10", description: "QA / Testing" },
            { id: "deploying", label: "Deploying", count: getCount("deploying"), icon: Rocket, color: "text-[#00e5a0]", bg: "bg-[#00e5a0]/10", description: "Ready to launch" },
            { id: "live", label: "Live", count: getCount("live"), icon: Globe, color: "text-green-500", bg: "bg-green-500/10", description: "Deployed online" },
            { id: "cancelled", label: "Cancelled", count: getCount("cancelled"), icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", description: "Halted / Closed" },
        ];
    }, [projects, newProjectsCount]);

    return (
        <div className="space-y-8 pb-20">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                {projectStats.map((s) => (
                    <motion.div
                        key={s.id}
                        whileHover={{ y: -4 }}
                        onClick={() => setActivePhase(s.id as any)}
                        className={cn(
                            "bg-[#162030] border border-[#1c2b3a] rounded-2xl p-4 cursor-pointer transition-all duration-300 relative group overflow-hidden",
                            activePhase === s.id ? "border-primary shadow-[0_0_20px_rgba(0,229,160,0.15)] ring-1 ring-primary/50" : "hover:border-primary/40"
                        )}
                    >
                        <div className="flex flex-col gap-2 relative z-10">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s.bg)}>
                                <s.icon size={16} className={s.color} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{s.label}</h4>
                                <span className="text-xl font-bold text-white">{s.count}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Phase Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1c2b3a] pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="capitalize">{activePhase.replace("-", " ")}</span>
                        <span className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-widest font-black">
                            {activePhase === "new" ? newProjectsCount : projects.filter(p => p.phase === activePhase).length} ACTIVE
                        </span>
                    </h2>

                    {/* Minimal Search inside projects */}
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary" size={14} />
                        <input
                            type="text"
                            placeholder="Find project..."
                            className="w-full bg-[#162030] border border-[#1c2b3a] rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40"
                        />
                    </div>
                </div>

                {/* Grid of Project Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePhase === "new" ? (
                        unallotedLeads.map(lead => (
                            <NewProjectTile key={lead.id} lead={lead} />
                        ))
                    ) : (
                        projects
                            .filter(p => activePhase === 'all' || p.phase === activePhase)
                            .filter(p =>
                                searchQuery === "" ||
                                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(project => (
                                <ProjectTile key={project.id} project={project} />
                            ))
                    )}
                    {(activePhase !== "new" && projects.filter(p => activePhase === 'all' || p.phase === activePhase).length === 0) && (
                        <div className="col-span-full py-20 text-center text-gray-600 border-2 border-dashed border-[#1c2b3a] rounded-3xl">
                            <Plus className="mx-auto mb-3 opacity-20" size={48} />
                            <p className="font-bold text-lg">No Projects</p>
                            <p className="text-sm">No projects currently in the {activePhase === 'all' ? 'system' : activePhase + ' phase'}.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Component: New Project Tile ───────────────────────────────────────────
const NewProjectTile = ({ lead }: { lead: Lead }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showAllotModal, setShowAllotModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#162030] border border-[#1c2b3a] rounded-2xl p-5 space-y-5 hover:border-primary/30 transition-colors group relative"
            >
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{lead.name}</h3>
                        <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                            <Layout size={12} className="text-primary" /> {lead.businessName}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                    >
                        <Settings size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <div className="space-y-3">
                        <div className="text-gray-400 flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Contact</span>
                            <span className="text-white truncate">{lead.phone}</span>
                            <span className="text-white truncate">{lead.email}</span>
                        </div>
                        <div className="text-gray-400 flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Details</span>
                            <span className="text-white">{lead.businessType}</span>
                            <span className="text-white font-mono">{lead.budget}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-gray-400 flex flex-col gap-0.5 text-right">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600">Received</span>
                            <span className="text-white">{lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM, yyyy") : "N/A"}</span>
                        </div>
                        <div className="text-gray-400 flex flex-col gap-0.5 text-right">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600 text-primary">Converted</span>
                            <span className="text-white">{lead.lastUpdated ? format(lead.lastUpdated.toDate(), "dd MMM, yyyy") : "N/A"}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={() => setShowAllotModal(true)}
                        className="w-full bg-[#00e5a0] hover:bg-[#00c58a] text-[#0f1923] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,160,0.2)]"
                    >
                        <Plus size={14} /> Allot Project & Start Planning
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowDetailDrawer(true)}
                            className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white py-2 rounded-xl text-[11px] font-bold transition-all border border-white/5"
                        >
                            View Lead
                        </button>
                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-xl text-[11px] font-bold transition-all border border-red-500/20"
                        >
                            Cancel Project
                        </button>
                    </div>
                </div>
            </motion.div>

            <LeadDetailDrawer
                lead={lead}
                isOpen={showDetailDrawer}
                onClose={() => setShowDetailDrawer(false)}
            />

            {lead && (
                <>
                    <AllotProjectModal
                        lead={lead}
                        isOpen={showAllotModal}
                        onClose={() => setShowAllotModal(false)}
                    />
                    <CancelProjectModal
                        lead={lead}
                        isOpen={showCancelModal}
                        onClose={() => setShowCancelModal(false)}
                    />
                </>
            )}
        </>
    );
};

// ─── Component: Allot Project Modal ───────────────────────────────────────
const AllotProjectModal = ({ lead, isOpen, onClose }: { lead: Lead, isOpen: boolean, onClose: () => void }) => {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        projectName: `${lead.name}'s Project`,
        deliveryDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
        budget: lead.budget.replace(/[^0-9]/g, ""),
        description: lead.message || ""
    });

    const handleAllot = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const projectData: Partial<Project> = {
                leadId: lead.id,
                name: formData.projectName,
                clientName: lead.name,
                businessName: lead.businessName,
                clientEmail: lead.email,
                clientPhone: lead.phone,
                clientBudget: `₹${formData.budget}`,
                businessType: lead.businessType,
                phase: "planning",
                allottedAt: Timestamp.now(),
                deliveryDate: Timestamp.fromDate(new Date(formData.deliveryDate)),
                description: formData.description,
                planningDoc: "",
                attachedFiles: [],
                vaultData: "",
                clientSuggestions: [],
                techTracker: [],
                devNotes: "",
                adminReviewNotes: "",
                bugs: [],
                checklist: [],
                deploymentNotes: "",
                createdAt: Timestamp.now(),
            };

            await addDoc(collection(db, "projects"), projectData);
            toast.success("Project allotted and moved to Planning!");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to allot project");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#162030] border border-[#1c2b3a] rounded-3xl p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">Allot Project</h2>
                        <p className="text-gray-400 text-sm mb-6">Set initial targets for <span className="text-primary">{lead.name}</span></p>

                        <form onSubmit={handleAllot} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Project Name</label>
                                <input
                                    required
                                    value={formData.projectName}
                                    onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                                    className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-primary/40 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Delivery Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.deliveryDate}
                                        onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
                                        className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-primary/40 focus:outline-none [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Expected Budget (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.budget}
                                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-primary/40 focus:outline-none font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Project Notes / Plan</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-primary/40 focus:outline-none resize-none text-sm h-32"
                                    placeholder="Internal notes, architecture ideas, or client specific requests..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl font-bold transition-all"
                                >
                                    Go Back
                                </button>
                                <button
                                    disabled={saving}
                                    className="flex-[2] bg-primary hover:brightness-110 text-black py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,229,160,0.2)] disabled:opacity-50"
                                >
                                    {saving ? "Creating Project..." : "Initialize Project"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// ─── Component: Cancel Project Modal ──────────────────────────────────────
const CancelProjectModal = ({ lead, isOpen, onClose }: { lead: Lead, isOpen: boolean, onClose: () => void }) => {
    const [saving, setSaving] = useState(false);
    const [reason, setReason] = useState("");

    const handleCancel = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason) return toast.error("Reason for cancellation is required");
        setSaving(true);
        try {
            const projectData: Partial<Project> = {
                leadId: lead.id,
                name: `${lead.name}'s Project (Cancelled)`,
                clientName: lead.name,
                businessName: lead.businessName,
                clientEmail: lead.email,
                clientPhone: lead.phone,
                clientBudget: lead.budget,
                businessType: lead.businessType,
                phase: "cancelled",
                cancelledAt: Timestamp.now(),
                cancellationReason: reason,
                description: lead.message || "",
                planningDoc: "",
                attachedFiles: [],
                vaultData: "",
                clientSuggestions: [],
                techTracker: [],
                devNotes: "",
                adminReviewNotes: "",
                bugs: [],
                checklist: [],
                deploymentNotes: "",
                createdAt: Timestamp.now(),
            };

            await addDoc(collection(db, "projects"), projectData);
            toast.success("Project cancelled and archived.");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel project");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-[#162030] border border-red-500/20 rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                            <AlertCircle className="text-red-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Cancel Project?</h2>
                        <p className="text-gray-400 text-sm mb-6">Are you sure you want to cancel this project for <span className="text-white font-bold">{lead.name}</span>?</p>

                        <form onSubmit={handleCancel} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Reason for cancellation (Required)</label>
                                <textarea
                                    required
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-red-500/40 focus:outline-none resize-none text-sm h-32"
                                    placeholder="Briefly explain why this project won't proceed..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl font-bold transition-all"
                                >
                                    Go Back
                                </button>
                                <button
                                    disabled={saving}
                                    className="flex-1 bg-red-500 hover:bg-red-400 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] disabled:opacity-50"
                                >
                                    {saving ? "Cancelling..." : "Confirm Cancel"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// ─── Component: Project Tile (Generic) ──────────────────────────────────────
const ProjectTile = ({ project }: { project: Project }) => {
    const [showDetail, setShowDetail] = useState(false);

    const getDaysLeft = () => {
        if (!project.deliveryDate) return null;
        const days = differenceInDays(project.deliveryDate.toDate(), new Date());
        return days;
    };

    const daysLeft = getDaysLeft();

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowDetail(true)}
                className="bg-[#162030] border border-[#1c2b3a] rounded-2xl p-5 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden"
            >
                {/* Progress Bar Background */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0f1923]">
                    <div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,229,160,0.5)] transition-all duration-1000"
                        style={{ width: project.phase === 'planning' ? '15%' : project.phase === 'development' ? '50%' : '90%' }}
                    />
                </div>

                <div className="flex justify-between items-start mb-4 pt-1">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5">
                            <User size={12} /> {project.clientName}
                        </p>
                    </div>
                    <div className={cn(
                        "px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border",
                        project.phase === 'planning' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                            project.phase === 'development' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                "bg-green-500/10 text-green-400 border-green-500/20"
                    )}>
                        {project.phase}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="space-y-1">
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider block">Budget</span>
                        <span className="text-sm text-white font-mono">{project.clientBudget}</span>
                    </div>
                    <div className="space-y-1 text-right">
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider block">Delivery</span>
                        <span className={cn(
                            "text-sm font-bold",
                            daysLeft !== null && daysLeft < 7 ? "text-red-400" : "text-white"
                        )}>
                            {project.deliveryDate ? format(project.deliveryDate.toDate(), "dd MMM") : "N/A"}
                            {daysLeft !== null && (
                                <span className="text-[10px] ml-1.5 opacity-60">
                                    ({daysLeft}d left)
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1c2b3a]">
                    <div className="flex -space-x-2">
                        {/* Team placeholder */}
                        {[1, 2].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-[#0f1923] border border-[#1c2b3a] flex items-center justify-center text-[10px] text-gray-400">
                                <User size={10} />
                            </div>
                        ))}
                    </div>
                    <button className="text-[11px] font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Manage <ArrowRight size={12} />
                    </button>
                </div>
            </motion.div>

            <ProjectDetailDrawer
                project={project}
                isOpen={showDetail}
                onClose={() => setShowDetail(false)}
            />
        </>
    );
};

// ─── Component: Project Detail Drawer ─────────────────────────────────────
const ProjectDetailDrawer = ({ project, isOpen, onClose }: { project: Project, isOpen: boolean, onClose: () => void }) => {
    const [saving, setSaving] = useState(false);
    const [vaultLocked, setVaultLocked] = useState(true);
    const [formData, setFormData] = useState({
        planningDoc: project.planningDoc || "",
        vaultData: project.vaultData || "",
        devNotes: project.devNotes || "",
        adminReviewNotes: project.adminReviewNotes || "",
    });

    const handleSave = async () => {
        setSaving(true);
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                ...formData,
                lastUpdated: Timestamp.now()
            });
            toast.success("Project updated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update project");
        } finally {
            setSaving(false);
        }
    };

    const handleProgress = async (nextPhase: ProjectPhase) => {
        const confirmMsg = nextPhase === 'development' ? "Start development phase?" :
            nextPhase === 'review' ? "Move to Client Review phase?" :
                nextPhase === 'testing' ? "Enter Testing Mode?" :
                    nextPhase === 'deploying' ? "Mark as Ready to Deploy?" :
                        nextPhase === 'live' ? "Launch Project Live?" :
                            `Move to ${nextPhase} phase?`;

        if (!confirm(confirmMsg)) return;
        setSaving(true);
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                phase: nextPhase,
                lastUpdated: Timestamp.now()
            });
            toast.success(`Project moved to ${nextPhase}`);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update phase");
        } finally {
            setSaving(false);
        }
    };

    const addTechMilestone = async () => {
        const label = prompt("Enter milestone label (e.g., 'Backend API Setup')");
        if (!label) return;

        const newMilestone: TechProgressItem = {
            id: Math.random().toString(36).substr(2, 9),
            label,
            status: "pending"
        };

        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                techTracker: [...(project.techTracker || []), newMilestone],
                lastUpdated: Timestamp.now()
            });
            toast.success("Milestone added");
        } catch (err) {
            toast.error("Failed to add milestone");
        }
    };

    const toggleMilestoneStatus = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'pending' ? 'in-progress' : currentStatus === 'in-progress' ? 'done' : 'pending';
        const updatedTracker = project.techTracker.map(m => m.id === id ? { ...m, status: nextStatus as any } : m);

        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                techTracker: updatedTracker,
                lastUpdated: Timestamp.now()
            });
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const deleteMilestone = async (id: string) => {
        if (!confirm("Delete this milestone?")) return;
        const updatedTracker = project.techTracker.filter(m => m.id !== id);

        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                techTracker: updatedTracker,
                lastUpdated: Timestamp.now()
            });
        } catch (err) {
            toast.error("Failed to delete milestone");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-4xl bg-[#0f1923] h-full shadow-2xl flex flex-col border-l border-[#1c2b3a]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[#1c2b3a] flex items-center justify-between bg-[#162030]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Briefcase className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{project.name}</h2>
                                    <p className="text-xs text-gray-400">Client: {project.clientName} • {project.businessName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
                                >
                                    <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                                </button>
                                {project.phase === 'planning' && (
                                    <button
                                        onClick={() => handleProgress('development')}
                                        className="px-4 py-2 bg-primary text-[#0f1923] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                                    >
                                        <Play size={14} /> Start Development
                                    </button>
                                )}
                                {project.phase === 'development' && (
                                    <button
                                        onClick={() => handleProgress('review')}
                                        className="px-4 py-2 bg-yellow-500 text-black rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                                    >
                                        <MessageSquare size={14} /> Send for Review
                                    </button>
                                )}
                                {project.phase === 'review' && (
                                    <button
                                        onClick={() => handleProgress('testing')}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                                    >
                                        <FlaskConical size={14} /> Start Testing
                                    </button>
                                )}
                                {project.phase === 'testing' && (
                                    <button
                                        onClick={() => handleProgress('deploying')}
                                        className="px-4 py-2 bg-[#00e5a0] text-[#0f1923] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                                    >
                                        <Rocket size={14} /> Ready to Deploy
                                    </button>
                                )}
                                {project.phase === 'deploying' && (
                                    <button
                                        onClick={() => handleProgress('live')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                    >
                                        <Globe size={14} /> Launch Live
                                    </button>
                                )}
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all ml-2">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Phase Stepper */}
                            <div className="flex items-center justify-between px-4">
                                {['planning', 'development', 'review', 'testing', 'deploying', 'live'].map((p, idx) => (
                                    <div key={p} className="flex items-center flex-1 last:flex-initial">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                                            project.phase === p ? "border-primary bg-primary text-black shadow-[0_0_10px_rgba(0,229,160,0.5)]" :
                                                idx < ['planning', 'development', 'review', 'testing', 'deploying', 'live'].indexOf(project.phase) ? "border-primary/40 bg-primary/20 text-primary" :
                                                    "border-[#1c2b3a] text-gray-600"
                                        )}>
                                            {idx + 1}
                                        </div>
                                        {idx < 5 && (
                                            <div className={cn(
                                                "h-0.5 flex-1 mx-2 rounded-full",
                                                idx < ['planning', 'development', 'review', 'testing', 'deploying', 'live'].indexOf(project.phase) ? "bg-primary/30" : "bg-[#1c2b3a]"
                                            )} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-8">
                                {/* Left Column: Info & Details */}
                                <div className="space-y-8">
                                    <section className="bg-[#162030] rounded-2xl p-6 border border-[#1c2b3a] space-y-4">
                                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                            <TrendingUp size={12} /> Project Stats
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Budget Allocation</label>
                                                <div className="text-xl font-mono text-white">{project.clientBudget}</div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Target Launch</label>
                                                <div className="flex items-center gap-2 text-white font-bold">
                                                    <Calendar size={14} className="text-primary" />
                                                    {project.deliveryDate ? format(project.deliveryDate.toDate(), "dd MMMM, yyyy") : "TBD"}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Project Type</label>
                                                <div className="text-sm text-gray-300 bg-[#0f1923] px-3 py-1.5 rounded-lg border border-[#1c2b3a] inline-block">
                                                    {project.businessType}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-[#162030] rounded-2xl p-6 border border-[#1c2b3a] space-y-4">
                                        <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                                            <Lock size={12} /> Confidential Vault
                                        </h3>
                                        <div className="relative group">
                                            <textarea
                                                value={vaultLocked ? "••••••••••••••••••••••••••••••••" : formData.vaultData}
                                                onChange={e => setFormData({ ...formData, vaultData: e.target.value })}
                                                readOnly={vaultLocked}
                                                className={cn(
                                                    "w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-3 px-4 text-sm font-mono focus:outline-none transition-all h-32 resize-none",
                                                    vaultLocked ? "text-gray-600 blur-[2px]" : "text-white"
                                                )}
                                                placeholder="API Keys, Login Credentials, SSH Info..."
                                            />
                                            {vaultLocked && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-[1px]">
                                                    <button
                                                        onClick={() => setVaultLocked(false)}
                                                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                                                    >
                                                        <Unlock size={12} /> Access Vault
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {!vaultLocked && (
                                            <button
                                                onClick={() => setVaultLocked(true)}
                                                className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-500 rounded-lg text-[10px] font-bold uppercase"
                                            >
                                                Lock Vault
                                            </button>
                                        )}
                                    </section>
                                </div>

                                {/* Right Columns: Main Implementation Area */}
                                <div className="col-span-2 space-y-10">
                                    {/* Architecture - Always visible but smaller if not planning */}
                                    <section className="space-y-4">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <FileText size={16} className="text-primary" />
                                            {project.phase === 'planning' ? "Planning & Architecture" : "Technical Architecture"}
                                        </h3>
                                        <textarea
                                            value={formData.planningDoc}
                                            onChange={e => setFormData({ ...formData, planningDoc: e.target.value })}
                                            className={cn(
                                                "w-full bg-[#162030] border border-[#1c2b3a] rounded-2xl p-6 text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none leading-relaxed transition-all",
                                                project.phase === 'planning' ? "h-[300px]" : "h-24 text-xs opacity-60"
                                            )}
                                            placeholder="Outline the project architecture..."
                                        />
                                    </section>

                                    {/* Phase Specific Implementation Component */}
                                    {(project.phase === 'development' || project.phase === 'planning') && (
                                        <section className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                                    <TrendingUp size={16} className="text-primary" /> Technical Milestones
                                                </h3>
                                                <button
                                                    onClick={addTechMilestone}
                                                    className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1"
                                                >
                                                    <Plus size={10} /> Add Milestone
                                                </button>
                                            </div>
                                            <div className="bg-[#162030] border border-[#1c2b3a] rounded-2xl overflow-hidden divide-y divide-[#1c2b3a]">
                                                {project.techTracker && project.techTracker.length > 0 ? (
                                                    project.techTracker.map((entry) => (
                                                        <div key={entry.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group/item">
                                                            <div className={cn(
                                                                "w-2 h-2 rounded-full",
                                                                entry.status === 'done' ? "bg-primary" :
                                                                    entry.status === 'in-progress' ? "bg-yellow-500" : "bg-gray-600"
                                                            )} />
                                                            <div className="flex-1">
                                                                <div className="text-sm text-white font-medium">{entry.label}</div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <button
                                                                    onClick={() => toggleMilestoneStatus(entry.id, entry.status)}
                                                                    className={cn(
                                                                        "text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-bold transition-all",
                                                                        entry.status === 'done' ? "bg-primary/10 text-primary border-primary/20" :
                                                                            entry.status === 'in-progress' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                                                "bg-white/5 text-gray-500 border-white/10"
                                                                    )}
                                                                >
                                                                    {entry.status}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteMilestone(entry.id)}
                                                                    className="p-1.5 hover:bg-red-500/10 text-gray-600 hover:text-red-400 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                                                                >
                                                                    <XCircle size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-8 text-center text-gray-600 italic text-sm">
                                                        No technical milestones tracked yet.
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    )}

                                    {project.phase === 'review' && (
                                        <section className="space-y-4">
                                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                                <MessageSquare size={16} className="text-yellow-500" /> Client Feedback & Suggestions
                                            </h3>
                                            <div className="bg-[#162030] border border-[#1c2b3a] rounded-2xl overflow-hidden divide-y divide-[#1c2b3a]">
                                                {project.clientSuggestions && project.clientSuggestions.length > 0 ? (
                                                    project.clientSuggestions.map((s) => (
                                                        <div key={s.id} className="p-4 space-y-2">
                                                            <div className="text-xs text-gray-400 font-bold">{format(s.timestamp.toDate(), "dd MMM, HH:mm")}</div>
                                                            <div className="text-sm text-white bg-[#0f1923] p-3 rounded-xl border border-[#1c2b3a]">{s.text}</div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-8 text-center text-gray-600 italic text-sm">
                                                        Waiting for client feedback...
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    )}

                                    {project.phase === 'testing' && <BugTracker project={project} />}

                                    {(project.phase === 'deploying' || project.phase === 'live') && <DeploymentChecklist project={project} />}

                                    <section className="space-y-4">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <Paperclip size={16} className="text-primary" /> Assets & Files
                                        </h3>
                                        <div className="bg-[#162030] border-2 border-dashed border-[#1c2b3a] rounded-2xl p-8 text-center transition-all hover:border-primary/30 group">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <Plus size={20} className="text-gray-500" />
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium">Click or drag to upload technical assets & documents</p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// ─── Component: Bug Tracker ────────────────────────────────────────────────
const BugTracker = ({ project }: { project: Project }) => {
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newBug, setNewBug] = useState({ title: "", description: "", severity: "low" as any });

    const handleAddBug = async () => {
        if (!newBug.title) return;
        setSaving(true);
        try {
            const bug: Bug = {
                id: Math.random().toString(36).substr(2, 9),
                title: newBug.title,
                description: newBug.description,
                severity: newBug.severity,
                status: "open",
                createdAt: Timestamp.now()
            };
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                bugs: [...(project.bugs || []), bug],
                lastUpdated: Timestamp.now()
            });
            setAdding(false);
            setNewBug({ title: "", description: "", severity: "low" });
            toast.success("Bug reported");
        } catch (err) {
            toast.error("Failed to add bug");
        } finally {
            setSaving(false);
        }
    };

    const resolveBug = async (id: string) => {
        const updatedBugs = project.bugs.map(b => b.id === id ? { ...b, status: "resolved" as any } : b);
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                bugs: updatedBugs,
                lastUpdated: Timestamp.now()
            });
            toast.success("Bug resolved");
        } catch (err) {
            toast.error("Failed to update bug");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FlaskConical size={16} className="text-primary" /> Bug Tracker
                </h3>
                <button
                    onClick={() => setAdding(!adding)}
                    className="text-[10px] text-primary font-bold hover:underline"
                >
                    {adding ? "Cancel" : "+ Report Bug"}
                </button>
            </div>

            {adding && (
                <div className="bg-[#162030] border border-red-500/20 rounded-2xl p-5 space-y-4 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <input
                        placeholder="Bug Title"
                        value={newBug.title}
                        onChange={e => setNewBug({ ...newBug, title: e.target.value })}
                        className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                    <textarea
                        placeholder="Steps to reproduce / description..."
                        value={newBug.description}
                        onChange={e => setNewBug({ ...newBug, description: e.target.value })}
                        className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40 h-20 resize-none"
                    />
                    <div className="flex gap-4">
                        <select
                            value={newBug.severity}
                            onChange={e => setNewBug({ ...newBug, severity: e.target.value as any })}
                            className="bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-2 px-4 text-xs text-white focus:outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                        <button
                            onClick={handleAddBug}
                            disabled={saving}
                            className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                            {saving ? "Reporting..." : "Report Bug"}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-[#162030] border border-[#1c2b3a] rounded-2xl overflow-hidden divide-y divide-[#1c2b3a]">
                {project.bugs && project.bugs.length > 0 ? (
                    project.bugs.map((bug) => (
                        <div key={bug.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-tighter",
                                        bug.severity === 'critical' ? 'bg-red-500 text-white' :
                                            bug.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                bug.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-400'
                                    )}>
                                        {bug.severity}
                                    </span>
                                    <h4 className={cn("text-sm font-bold truncate", bug.status === 'resolved' ? "text-gray-600 line-through" : "text-white")}>
                                        {bug.title}
                                    </h4>
                                </div>
                                <p className="text-[11px] text-gray-500 truncate">{bug.description}</p>
                            </div>
                            {bug.status === 'open' && (
                                <button
                                    onClick={() => resolveBug(bug.id)}
                                    className="p-2 hover:bg-green-500/10 text-gray-600 hover:text-green-500 rounded-lg transition-all"
                                >
                                    <CheckCircle2 size={16} />
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-600 italic text-sm">
                        No bugs reported yet.
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Component: Deployment Checklist ──────────────────────────────────────
const DeploymentChecklist = ({ project }: { project: Project }) => {
    const [newItem, setNewItem] = useState("");

    const addItem = async () => {
        if (!newItem) return;
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                checklist: [...(project.checklist || []), { label: newItem, checked: false }],
                lastUpdated: Timestamp.now()
            });
            setNewItem("");
            toast.success("Checklist item added");
        } catch (err) {
            toast.error("Failed to add item");
        }
    };

    const toggleItem = async (index: number) => {
        const updatedChecklist = [...(project.checklist || [])];
        updatedChecklist[index].checked = !updatedChecklist[index].checked;
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                checklist: updatedChecklist,
                lastUpdated: Timestamp.now()
            });
        } catch (err) {
            toast.error("Failed to update item");
        }
    };

    const deleteItem = async (index: number) => {
        const updatedChecklist = project.checklist.filter((_, i) => i !== index);
        try {
            const projectRef = doc(db, "projects", project.id);
            await updateDoc(projectRef, {
                checklist: updatedChecklist,
                lastUpdated: Timestamp.now()
            });
        } catch (err) {
            toast.error("Failed to delete item");
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Rocket size={16} className="text-primary" /> Pre-Launch Checklist
            </h3>

            <div className="bg-[#162030] border border-[#1c2b3a] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1c2b3a] bg-white/5 flex gap-2">
                    <input
                        placeholder="Add checklist item..."
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addItem()}
                        className="flex-1 bg-[#0f1923] border border-[#1c2b3a] rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                    <button
                        onClick={addItem}
                        className="p-2 bg-primary text-black rounded-xl hover:brightness-110 transition-all shadow-[0_0_10px_rgba(0,229,160,0.2)]"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <div className="divide-y divide-[#1c2b3a]">
                    {project.checklist && project.checklist.length > 0 ? (
                        project.checklist.map((item, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between group/item hover:bg-white/5 transition-colors">
                                <div
                                    onClick={() => toggleItem(idx)}
                                    className="flex items-center gap-3 cursor-pointer flex-1"
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                                        item.checked ? "bg-primary border-primary text-black" : "border-[#1c2b3a] bg-[#0f1923]"
                                    )}>
                                        {item.checked && <CheckCircle2 size={12} strokeWidth={3} />}
                                    </div>
                                    <span className={cn("text-xs font-medium", item.checked ? "text-gray-500 line-through" : "text-white")}>
                                        {item.label}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteItem(idx)}
                                    className="p-1.5 hover:bg-red-500/10 text-gray-600 hover:text-red-400 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                                >
                                    <XCircle size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-600 italic text-sm">
                            Deployment checklist is empty.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsView;
