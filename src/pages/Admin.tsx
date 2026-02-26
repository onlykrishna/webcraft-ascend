import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Inbox,
    BarChart2,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    RefreshCw,
    Clock,
    Bell,
    LayoutDashboard,
    Briefcase,
    FileText,
} from "lucide-react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Lead } from "@/types/lead";
import SummaryCards from "@/components/admin/SummaryCards";
import LeadsTable from "@/components/admin/LeadsTable";
import { LeadsTableSkeleton } from "@/components/admin/LeadsTableSkeleton";
import AnalyticsView from "@/components/admin/AnalyticsView";
import DashboardView from "@/components/admin/DashboardView";
import ProjectsView from "@/components/admin/ProjectsView";
import { ActivityTimeline } from "@/components/admin/ActivityTimeline";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import BlogAdmin from "@/pages/BlogAdmin";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

// ─── Tab definition ────────────────────────────────────────────────────────────
type Tab = "dashboard" | "leads" | "projects" | "analytics" | "activity" | "blog" | "settings";

const sidebarItems: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
];

// ─── Settings panel ────────────────────────────────────────────────────────────
const SettingsPanel = () => {
    const { currentUser } = useAuth();
    const [notifPerm, setNotifPerm] = useState(
        typeof Notification !== "undefined" ? Notification.permission : "unsupported",
    );

    const requestNotifPermission = async () => {
        if (typeof Notification === "undefined") return;
        const perm = await Notification.requestPermission();
        setNotifPerm(perm);
        if (perm === "granted") toast.success("Browser notifications enabled!");
        else toast.error("Notification permission denied");
    };

    return (
        <div className="max-w-lg space-y-6">
            <div className="bg-card border border-border rounded-card p-6 card-shadow space-y-4">
                <h3 className="font-display font-bold text-foreground">Admin Account</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                        <p className="text-foreground mt-1">{currentUser?.displayName ?? "—"}</p>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                        <p className="text-foreground mt-1">{currentUser?.email}</p>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Role</label>
                        <span className="inline-block mt-1 text-xs font-mono text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Admin
                        </span>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-card p-6 card-shadow space-y-3">
                <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                    <Bell size={16} /> Browser Notifications
                </h3>
                <p className="text-muted-foreground text-sm">
                    Get a browser notification when a new lead is submitted.
                </p>
                <div className="flex items-center gap-3">
                    <span className={cn(
                        "text-xs px-2 py-1 rounded-full border font-mono",
                        notifPerm === "granted"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : notifPerm === "denied"
                                ? "bg-red-500/10 text-red-400 border-red-500/30"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    )}>
                        {notifPerm}
                    </span>
                    {notifPerm !== "granted" && notifPerm !== "unsupported" && (
                        <button
                            onClick={requestNotifPermission}
                            className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                        >
                            Enable Notifications
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-card border border-border rounded-card p-6 card-shadow space-y-3">
                <h3 className="font-display font-bold text-foreground">Firestore Rules</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    Security rules restricting lead access to admin email are active.{" "}
                    <a
                        href="https://console.firebase.google.com/project/scalvicon/firestore/rules"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        View in Firebase Console →
                    </a>
                </p>
            </div>
        </div>
    );
};

// ─── Main Admin page ───────────────────────────────────────────────────────────
export default function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(true);
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    // Track previous count for new-lead notifications
    const prevCountRef = useRef<number | null>(null);

    // ── Real-time Firestore listener ─────────────────────────────────────────
    useEffect(() => {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Lead[];
                setLeads(docs);
                setLoadingLeads(false);
            },
            (err) => {
                console.error("Firestore error:", err);
                toast.error("Failed to load leads. Check Firestore rules.");
                setLoadingLeads(false);
            },
        );
        return () => unsub();
    }, []);

    // ── New lead notification ────────────────────────────────────────────────
    useEffect(() => {
        if (prevCountRef.current === null) {
            prevCountRef.current = leads.length;
            return;
        }
        const newCount = leads.length - prevCountRef.current;
        if (newCount > 0) {
            toast.success(`🔔 ${newCount} new lead${newCount > 1 ? "s" : ""} received!`, {
                duration: 6000,
            });
            if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                new Notification("New Lead — Scalvicon", {
                    body: `${newCount} new lead${newCount > 1 ? "s" : ""} submitted`,
                    icon: "/logo.png",
                });
            }
        }
        prevCountRef.current = leads.length;
    }, [leads.length]);

    // ── Request notification permission on mount ─────────────────────────────
    useEffect(() => {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
            Notification.requestPermission().catch(() => { });
        }
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out.");
            navigate("/");
        } catch {
            /* toasted in context */
        }
    };

    const newLeadsCount = useMemo(() => leads.filter((l) => l.status === "new").length, [leads]);

    const initials = currentUser?.displayName
        ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : currentUser?.email?.[0].toUpperCase() ?? "A";

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground flex">
                {/* ── Mobile sidebar overlay ──────────────────────────────────── */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                </AnimatePresence>

                {/* ── Sidebar ─────────────────────────────────────────────────── */}
                <aside
                    className={cn(
                        "fixed md:sticky top-0 left-0 h-screen z-50 w-60 bg-card border-r border-border flex flex-col transition-transform duration-300",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    )}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-5 border-b border-border shrink-0">
                        <span className="font-display font-bold text-lg">
                            Scalvi<span className="text-primary">con</span>{" "}
                            <span className="text-xs font-mono text-muted-foreground">Admin</span>
                        </span>
                        <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                    activeTab === item.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                                )}
                            >
                                <item.icon size={17} />
                                {item.label}
                                {item.id === "leads" && newLeadsCount > 0 && (
                                    <span className="ml-auto text-[10px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                                        {newLeadsCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom actions */}
                    <div className="p-3 border-t border-border space-y-1">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-all"
                        >
                            <Home size={17} /> View Site
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-all"
                        >
                            <LogOut size={17} /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* ── Main area ───────────────────────────────────────────────── */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
                        <div className="flex items-center gap-3">
                            <button className="md:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
                                <Menu size={22} />
                            </button>
                            <h1 className="font-display font-bold text-foreground capitalize">
                                {activeTab}
                            </h1>
                            {loadingLeads && (
                                <RefreshCw size={14} className="animate-spin text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground hidden sm:block">
                                {currentUser?.email}
                            </span>
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="avatar" className="w-8 h-8 rounded-full border border-border" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                    {initials}
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                        <motion.div
                            key={activeTab}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="space-y-6"
                        >
                            {activeTab === "dashboard" && <DashboardView leads={leads} />}
                            {activeTab === "leads" && (
                                <>
                                    <SummaryCards leads={leads} />
                                    {loadingLeads ? (
                                        <LeadsTableSkeleton />
                                    ) : (
                                        <LeadsTable leads={leads} />
                                    )}
                                </>
                            )}
                            {activeTab === "projects" && <ProjectsView leads={leads} />}
                            {activeTab === "analytics" && <AnalyticsView leads={leads} />}
                            {activeTab === "activity" && (
                                <div className="max-w-2xl">
                                    <h2 className="font-display font-bold text-lg text-foreground mb-6">
                                        Recent Activity
                                    </h2>
                                    <ActivityTimeline leads={leads} />
                                </div>
                            )}
                            {activeTab === "blog" && (
                                <div>
                                    <h2 className="font-display font-bold text-lg text-foreground mb-6">
                                        Blog Posts
                                    </h2>
                                    <BlogAdmin />
                                </div>
                            )}
                            {activeTab === "settings" && <SettingsPanel />}
                        </motion.div>
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
}
