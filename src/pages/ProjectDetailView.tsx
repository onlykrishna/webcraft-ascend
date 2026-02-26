import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    ChevronLeft,
    Calendar,
    Layout,
    Settings,
    CheckCircle2,
    FlaskConical,
    Rocket,
    Globe,
    FileText,
    TrendingUp,
    MessageSquare,
    ExternalLink,
    Paperclip
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";
import type { Project, ClientSuggestion } from "@/types/project";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const ProjectDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitFeedback = async () => {
        if (!feedback.trim() || !id) return;
        setSubmitting(true);
        try {
            const suggestion: ClientSuggestion = {
                id: Math.random().toString(36).substr(2, 9),
                text: feedback.trim(),
                timestamp: Timestamp.now(),
                status: 'pending'
            };

            await updateDoc(doc(db, "projects", id), {
                clientSuggestions: arrayUnion(suggestion),
                lastUpdated: Timestamp.now()
            });

            setFeedback("");
            toast.success("Feedback submitted successfully. Our team will review it shortly.");
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const unsubscribe = onSnapshot(doc(db, "projects", id), (snap) => {
            if (snap.exists()) {
                setProject({ id: snap.id, ...snap.data() } as Project);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm font-mono text-gray-500">Retrieving project data...</p>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
            <p className="text-gray-400 mb-6">This project might have been removed or moved.</p>
            <button onClick={() => navigate("/dashboard")} className="px-6 py-2 bg-primary text-black rounded-xl font-bold">
                Return to Dashboard
            </button>
        </div>
    );

    const phases = [
        { id: 'planning', label: 'Planning', icon: Layout, desc: 'Architecture & UI/UX' },
        { id: 'development', label: 'Development', icon: Settings, desc: 'Active Build Phase' },
        { id: 'review', label: 'Review', icon: MessageSquare, desc: 'Client Verification' },
        { id: 'testing', label: 'Testing', icon: FlaskConical, desc: 'QA & Optimization' },
        { id: 'deploying', label: 'Deploying', icon: Rocket, desc: 'Final Preparations' },
        { id: 'live', label: 'Live', icon: Globe, desc: 'Successfully Launched' }
    ];

    const currentPhaseIdx = phases.findIndex(p => p.id === project.phase);

    return (
        <div className="min-h-screen bg-[#0f1923] dot-grid-bg pb-20">
            {/* Header */}
            <div className="bg-[#162030]/80 backdrop-blur-xl border-b border-[#1c2b3a] sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white leading-none mb-1">{project.name}</h1>
                            <p className="text-xs text-primary font-bold uppercase tracking-widest">{project.phase} PHASE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-10">
                <div className="grid lg:grid-cols-4 gap-8">

                    {/* Stepper Logic (Full Width Top) */}
                    <section className="lg:col-span-4 bg-[#162030] border border-[#1c2b3a] rounded-[2rem] p-8 md:p-12 mb-4">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 relative">
                            {/* Connector Line (Back) */}
                            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-[#0f1923] -translate-y-1/2 hidden md:block" />
                            {/* Connector Line (Active) */}
                            <div
                                className="absolute top-1/2 left-[10%] h-1 bg-primary/40 -translate-y-1/2 hidden md:block transition-all duration-1000"
                                style={{ width: `${(currentPhaseIdx / (phases.length - 1)) * 80}%` }}
                            />

                            {phases.map((p, idx) => {
                                const isActive = currentPhaseIdx === idx;
                                const isCompleted = currentPhaseIdx > idx;
                                return (
                                    <div key={p.id} className="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                            isActive ? "bg-primary text-black shadow-[0_0_20px_rgba(0,229,160,0.5)] scale-110" :
                                                isCompleted ? "bg-primary/20 text-primary" : "bg-[#0f1923] text-gray-600 border border-[#1c2b3a]"
                                        )}>
                                            <p.icon size={22} />
                                        </div>
                                        <div className="text-center">
                                            <p className={cn("text-xs font-bold uppercase tracking-widest", isActive ? "text-primary" : isCompleted ? "text-gray-400" : "text-gray-700")}>
                                                {p.label}
                                            </p>
                                            <p className="text-[10px] text-gray-600 hidden md:block">{p.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Dynamic Progress Section */}
                        <section className="bg-[#162030] border border-[#1c2b3a] rounded-[2rem] p-8 space-y-10">
                            {/* Milestones / Tracker */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                    <TrendingUp size={20} className="text-primary" /> Visual Progress Tracker
                                </h3>
                                <div className="space-y-4">
                                    {project.techTracker && project.techTracker.length > 0 ? (
                                        project.techTracker.map((m) => (
                                            <div key={m.id} className="flex items-center gap-4 group">
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                                    m.status === 'done' ? "bg-primary shadow-[0_0_8px_rgba(0,229,160,0.6)]" :
                                                        m.status === 'in-progress' ? "bg-yellow-500 animate-pulse" : "bg-gray-700"
                                                )} />
                                                <div className="flex-1 pb-4 border-b border-[#1c2b3a] group-last:border-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className={cn("text-sm font-medium", m.status === 'done' ? "text-gray-400" : "text-white")}>
                                                            {m.label}
                                                        </span>
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase tracking-tighter",
                                                            m.status === 'done' ? "text-primary" :
                                                                m.status === 'in-progress' ? "text-yellow-500" : "text-gray-600"
                                                        )}>
                                                            {m.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center text-gray-500 italic">
                                            Generating initial tech milestones...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Client Feedback Section (Shown in Review Phase) */}
                            {project.phase === 'review' && (
                                <div className="space-y-6 pt-6 border-t border-[#1c2b3a]">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                        <MessageSquare size={20} className="text-yellow-500" /> Share your Feedback
                                    </h3>
                                    <p className="text-sm text-gray-400">Your feedback helps us perfect the results. Feel free to request changes or ask questions.</p>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="w-full bg-[#0f1923] border border-[#1c2b3a] rounded-2xl p-6 text-white focus:outline-none focus:ring-1 focus:ring-primary/40 h-32 resize-none"
                                        placeholder="Type your notes or feedback here..."
                                    />
                                    <button
                                        onClick={handleSubmitFeedback}
                                        disabled={submitting || !feedback.trim()}
                                        className="px-8 py-3 bg-primary text-black rounded-xl font-bold shadow-[0_0_15px_rgba(0,229,160,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {submitting ? "Submitting..." : "Submit Feedback"}
                                    </button>
                                </div>
                            )}

                            {/* Bug List (Shown in Testing Phase) */}
                            {project.phase === 'testing' && project.bugs && project.bugs.length > 0 && (
                                <div className="space-y-6 pt-6 border-t border-[#1c2b3a]">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                        <FlaskConical size={20} className="text-red-400" /> Live Optimizations
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {project.bugs.map((b) => (
                                            <div key={b.id} className="bg-[#0f1923] border border-[#1c2b3a] p-4 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <p className={cn("text-xs font-bold", b.status === 'resolved' ? "text-gray-500 line-through" : "text-white")}>
                                                        {b.title}
                                                    </p>
                                                    <p className="text-[10px] text-gray-600">{b.description}</p>
                                                </div>
                                                <div className={cn(
                                                    "text-[8px] px-1.5 py-0.5 rounded border uppercase font-black",
                                                    b.status === 'resolved' ? "bg-primary/10 text-primary border-primary/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                                                )}>
                                                    {b.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar: Details & Action */}
                    <div className="space-y-6">
                        <section className="bg-[#162030] border border-[#1c2b3a] rounded-[2rem] p-8 space-y-6">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none">Project Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                                        <Briefcase size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold leading-tight">Type</p>
                                        <p className="text-sm text-white font-medium">{project.businessType}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold leading-tight">Delivery</p>
                                        <p className="text-sm text-white font-medium">{project.deliveryDate ? format(project.deliveryDate.toDate(), "dd MMM, yyyy") : "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-[#00e5a0]/10 hover:bg-[#00e5a0]/20 text-primary py-4 rounded-2xl text-xs font-bold transition-all border border-[#00e5a0]/20 flex items-center justify-center gap-2">
                                <ExternalLink size={14} /> Open Live Preview
                            </button>
                        </section>

                        <section className="bg-card/30 border border-border rounded-[2rem] p-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Architecture</h3>
                            <div className="text-xs text-gray-400 leading-relaxed bg-[#0f1923] p-4 rounded-xl border border-[#1c2b3a]">
                                {project.planningDoc || "Analyzing requirements and setting up the technical blueprint..."}
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;
