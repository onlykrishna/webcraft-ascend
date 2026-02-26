import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogOut,
    LayoutDashboard,
    User,
    ExternalLink,
    Briefcase,
    Clock,
    CheckCircle2,
    ChevronRight,
    Search,
    Rocket,
    Layout,
    Settings,
    FlaskConical,
    Globe
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { fadeUp, fadeUpWithDelay, stagger } from "@/lib/animations";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Dashboard() {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser?.email) return;

        const q = query(
            collection(db, "projects"),
            where("clientEmail", "==", currentUser.email),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Project));
            setProjects(projectsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching project data:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out successfully.");
            navigate("/");
        } catch {
            // error already toasted
        }
    };

    const initials = currentUser?.displayName
        ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : currentUser?.email?.[0].toUpperCase() ?? "U";

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Scalvicon%2C%20I%27d%20like%20to%20discuss%20my%20project`;

    return (
        <div className="min-h-screen bg-background dot-grid-bg relative overflow-hidden">
            {/* Glow orb */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[140px] animate-drift pointer-events-none" />

            {/* Top nav bar */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
                    <Link to="/" className="font-display text-xl font-bold">
                        Scalvi<span className="text-primary">con</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {initials}
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
                <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
                    {/* Welcome header */}
                    <motion.div variants={fadeUp} className="mb-10">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest">Client Portal</span>
                        <h1 className="font-display font-extrabold text-white mt-2" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                            Welcome back,{" "}
                            <span className="text-gradient-green leading-tight">
                                {currentUser?.displayName?.split(" ")[0] ?? "Partner"}
                            </span>
                            !
                        </h1>
                        <p className="text-muted-foreground mt-2">Manage your active projects and track live development.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Side: Project List */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={14} className="text-primary" /> Active Projects
                            </h2>

                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-32 bg-card/50 border border-border rounded-card animate-pulse" />
                                    ))}
                                </div>
                            ) : projects.length > 0 ? (
                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <ClientProjectTile key={project.id} project={project} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-card/30 border border-dashed border-border rounded-card p-12 text-center">
                                    <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                                        <Briefcase size={20} className="text-muted-foreground" />
                                    </div>
                                    <h3 className="font-bold text-foreground mb-1">No Active Projects</h3>
                                    <p className="text-sm text-muted-foreground">Contact us to start your first project with Scalvicon.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Quick Stats & Actions */}
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Settings size={14} className="text-primary" /> Support & Actions
                            </h2>

                            <div className="bg-card rounded-card border border-border p-6 space-y-4">
                                <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                                    <User size={20} className="text-accent-blue" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-foreground">Dedicated Support</h3>
                                    <p className="text-muted-foreground text-xs mt-1">Have questions? Reach out to your project manager directly.</p>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-[#25D366]/20"
                                >
                                    Chat on WhatsApp <ExternalLink size={14} />
                                </a>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 rounded-card p-6">
                                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Next Step</h3>
                                <p className="text-sm text-white/80 font-medium">Ready to discuss a new idea? Let's turn it into reality.</p>
                                <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                    Start New Inquiry <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sign out footer */}
                    <div className="mt-16 text-center">
                        <button
                            onClick={handleSignOut}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Signed in as {currentUser?.email} (Sign Out)
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Component: Client Project Tile ───────────────────────────────────────
const ClientProjectTile = ({ project }: { project: Project }) => {
    const phases = [
        { id: 'planning', label: 'Planning', icon: Layout },
        { id: 'development', label: 'Development', icon: Settings },
        { id: 'review', label: 'Review', icon: CheckCircle2 },
        { id: 'testing', label: 'Testing', icon: FlaskConical },
        { id: 'deploying', label: 'Deploying', icon: Rocket },
        { id: 'live', label: 'Live', icon: Globe }
    ];

    const currentPhaseIdx = phases.findIndex(p => p.id === project.phase);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-card p-6 hover:border-primary/30 transition-all group overflow-hidden relative"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">
                            {project.phase}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Business: {project.businessName}</p>
                </div>

                {/* Progress Stepper Mini */}
                <div className="flex items-center gap-1">
                    {phases.map((p, idx) => (
                        <div
                            key={p.id}
                            className={cn(
                                "w-6 md:w-8 h-1 rounded-full bg-border relative",
                                idx <= currentPhaseIdx ? "bg-primary shadow-[0_0_8px_rgba(0,229,160,0.4)]" : ""
                            )}
                        >
                            {idx === currentPhaseIdx && (
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-background" />
                            )}
                        </div>
                    ))}
                </div>

                <Link
                    to={`/portal/project/${project.id}`}
                    className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl transition-all border border-white/10 group-hover:bg-primary group-hover:text-black group-hover:border-primary"
                >
                    <ChevronRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
};
