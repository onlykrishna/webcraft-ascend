import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    TrendingDown,
    Bell,
    Briefcase,
    Calendar,
    DollarSign,
    X,
    Eye,
    ChevronUp,
    AlertCircle,
    Timer,
    Search,
    ChevronRight
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { format, subDays, startOfDay, differenceInDays, isAfter, isBefore, isPast } from "date-fns";
import type { Lead, LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";
import LeadDetailDrawer from "./LeadDetailDrawer";

// Color palette
const CHART_COLORS = ["#00e5a0", "#a855f7", "#f59e0b", "#38bdf8", "#ec4899"];

interface Props {
    leads: Lead[];
}

type DashboardSection = "total" | "pending" | "reminding" | "converted" | "lost";

const DashboardView = ({ leads }: Props) => {
    const [activeSection, setActiveSection] = useState<DashboardSection>("pending");
    const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<Lead | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);

    // ─── Data Filtering Logic ───────────────────────────────────────────────
    const sections = useMemo(() => {
        const pending = leads.filter(l => l.status === "new");
        const converted = leads.filter(l => l.status === "converted");
        const lost = leads.filter(l => l.status === "lost" || l.status === "closed");
        const reminding = leads.filter(l => l.status === "reminding" && l.remindAt);

        // Final section maps
        return {
            total: leads,
            pending,
            reminding: reminding.sort((a, b) => a.remindAt!.toMillis() - b.remindAt!.toMillis()),
            converted: converted.sort((a, b) => b.lastUpdated?.toMillis() ?? 0 - (a.lastUpdated?.toMillis() ?? 0)),
            lost: lost.sort((a, b) => b.lastUpdated?.toMillis() ?? 0 - (a.lastUpdated?.toMillis() ?? 0)),
        };
    }, [leads]);

    const activeLeads = sections[activeSection];

    // ─── Search Logic ────────────────────────────────────────────────────────
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return leads.filter(l =>
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            l.phone.includes(q) ||
            l.businessName.toLowerCase().includes(q)
        ).slice(0, 8); // Limit to top 8 results
    }, [leads, searchQuery]);

    // ─── Stats Counts ────────────────────────────────────────────────────────
    const stats = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = subDays(now, 7);
        const fourteenDaysAgo = subDays(now, 14);

        const calcTrend = (leads: Lead[]) => {
            const thisWeek = leads.filter(l => l.createdAt && isAfter(l.createdAt.toDate(), sevenDaysAgo)).length;
            const lastWeek = leads.filter(l =>
                l.createdAt &&
                isAfter(l.createdAt.toDate(), fourteenDaysAgo) &&
                isBefore(l.createdAt.toDate(), sevenDaysAgo)
            ).length;
            if (lastWeek === 0) return { value: 100, isPositive: thisWeek > 0 };
            const pct = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
            return { value: Math.abs(pct), isPositive: pct >= 0 };
        };

        return [
            { id: "total", label: "Total Leads", count: leads.length, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", trend: calcTrend(leads) },
            { id: "pending", label: "Pending Leads", count: sections.pending.length, icon: Clock, color: "text-primary", bg: "bg-primary/10", trend: calcTrend(sections.pending) },
            { id: "reminding", label: "Reminders", count: sections.reminding.length, icon: Bell, color: "text-amber-400", bg: "bg-amber-400/10", trend: undefined },
            { id: "converted", label: "Converted", count: sections.converted.length, icon: CheckCircle2, color: "text-purple-400", bg: "bg-purple-400/10", trend: calcTrend(sections.converted) },
            { id: "lost", label: "Lost Leads", count: sections.lost.length, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", trend: calcTrend(sections.lost) },
        ];
    }, [leads, sections]);

    // ─── Charts Rendering Logic ──────────────────────────────────────────────
    const chartData = useMemo(() => {
        // Type breakdown
        const types: Record<string, number> = {};
        activeLeads.forEach(l => { types[l.businessType] = (types[l.businessType] ?? 0) + 1; });
        const typeBar = Object.entries(types).map(([name, value]) => ({ name, value }));

        // Trend
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = startOfDay(subDays(new Date(), 29 - i));
            return { date: format(d, "dd MMM"), ts: d.getTime(), count: 0 };
        });
        activeLeads.forEach((l) => {
            if (!l.createdAt) return;
            const d = startOfDay(l.createdAt.toDate()).getTime();
            const slot = days.find((s) => s.ts === d);
            if (slot) slot.count++;
        });

        // Status
        const statuses: Record<string, number> = {};
        activeLeads.forEach(l => { statuses[l.status] = (statuses[l.status] ?? 0) + 1; });
        const statusPie = Object.entries(statuses).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value
        }));

        return { typeBar, trendLine: days, statusPie };
    }, [activeLeads]);

    return (
        <div className="space-y-8 pb-20 relative">
            {/* ─── Global Search Bar ────────────────────────────────────────── */}
            <div className="relative z-50">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search leads by Name, Phone Number or Email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchResults(true);
                        }}
                        onFocus={() => setShowSearchResults(true)}
                        className="w-full bg-[#162030] border border-[#1c2b3a] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all shadow-lg"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setShowSearchResults(false);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                    {showSearchResults && searchQuery.trim() && (
                        <>
                            <div className="fixed inset-0 z-[-1]" onClick={() => setShowSearchResults(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-[#162030] border border-[#1c2b3a] rounded-2xl shadow-2xl overflow-hidden z-[100]"
                            >
                                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <div
                                                key={result.id}
                                                onClick={() => {
                                                    setSelectedLeadForDrawer(result);
                                                    setShowSearchResults(false);
                                                }}
                                                className="p-4 border-b border-[#1c2b3a]/50 hover:bg-[#0f1923] cursor-pointer transition-colors group flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {result.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white flex items-center gap-2">
                                                            {result.name}
                                                            <span className="text-[10px] text-gray-500 font-normal">({result.businessName})</span>
                                                        </p>
                                                        <p className="text-[11px] text-gray-400">{result.email} • {result.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <StatusBadge status={result.status} />
                                                    <p className="text-[9px] text-gray-500">
                                                        Received: {result.createdAt ? format(result.createdAt.toDate(), "dd MMM, hh:mm a") : "—"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-400 italic">
                                            No leads found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* ─── Stat Card Row ───────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((s) => (
                    <motion.div
                        key={s.id}
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveSection(activeSection === s.id ? "total" : s.id as any)}
                        className={cn(
                            "bg-[#162030] border border-[#1c2b3a] rounded-2xl p-4 cursor-pointer transition-all duration-300 relative group overflow-hidden",
                            activeSection === s.id ? "border-primary shadow-[0_0_20px_rgba(0,229,160,0.15)] ring-1 ring-primary/50" : "hover:border-primary/40"
                        )}
                    >
                        {/* Decorative background glow */}
                        <div className={cn("absolute -right-4 -top-4 w-16 h-16 rounded-full blur-3xl opacity-20 transition-opacity", s.bg, activeSection === s.id ? "opacity-40" : "group-hover:opacity-30")} />

                        <div className="flex flex-col gap-3 relative z-10">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
                                <s.icon size={18} className={s.color} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-2xl font-bold text-white">{s.count}</span>
                                    {s.trend && (
                                        <div className={cn(
                                            "flex items-center text-[9px] font-bold",
                                            s.trend.isPositive ? "text-primary" : "text-red-400"
                                        )}>
                                            {s.trend.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                            {s.trend.value}%
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ─── Expandable Charts ─────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
                {activeSection !== "total" && (
                    <motion.div
                        key={activeSection}
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        className="overflow-hidden bg-[#162030]/40 border border-[#1c2b3a] rounded-3xl p-6 backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-primary" />
                                <h3 className="text-lg font-bold text-white capitalize">
                                    {activeSection} <span className="text-gray-500 font-medium">Analytics</span>
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveSection("total")}
                                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <ChartCard title="Leads by Type">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={chartData.typeBar}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1c2b3a" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Bar dataKey="value" fill="#00e5a0" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartCard>

                            <ChartCard title="30 Day Trend">
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={chartData.trendLine}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1c2b3a" vertical={false} />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} interval={6} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartCard>

                            <ChartCard title="Status Distribution">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={chartData.statusPie}
                                            innerRadius={60}
                                            outerRadius={85}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.statusPie.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Data Tables ─────────────────────────────────────────────────── */}
            <div className="bg-[#162030] border border-[#1c2b3a] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-[#1c2b3a] flex items-center justify-between bg-[#162030]/50 sticky left-0 right-0">
                    <h3 className="text-lg font-bold text-white capitalize flex items-center gap-3">
                        {activeSection} Leads
                        <span className="text-[10px] text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 font-bold font-mono">
                            {activeLeads.length} TOTAL
                        </span>
                    </h3>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#0f1923]/50 text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-[#1c2b3a]">
                                <th className="px-6 py-4">Lead Information</th>
                                {activeSection === "reminding" ? (
                                    <>
                                        <th className="px-6 py-4">Remind Date & Time</th>
                                        <th className="px-6 py-4">Remaining Time</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-6 py-4">Business Type</th>
                                        <th className="px-6 py-4">{activeSection === "converted" || activeSection === "lost" ? "Completed On" : "Estim. Budget"}</th>
                                        <th className="px-6 py-4">{activeSection === "pending" ? "Lead Age" : "State Tag"}</th>
                                    </>
                                )}
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1c2b3a]/50">
                            {activeLeads.length === 0 ? (
                                <EmptyState section={activeSection} />
                            ) : (
                                activeLeads.map((l) => (
                                    <LeadRow
                                        key={l.id}
                                        lead={l}
                                        section={activeSection}
                                        onView={() => setSelectedLeadForDrawer(l)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── Detail Drawer ───────────────────────────────────────────────── */}
            <LeadDetailDrawer
                lead={selectedLeadForDrawer}
                isOpen={!!selectedLeadForDrawer}
                onClose={() => setSelectedLeadForDrawer(null)}
            />
        </div>
    );
};

// ─── Sub-Components ───────────────────────────────────────────────────────

const ChartCard = ({ title, children }: any) => (
    <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-center border-b border-[#1c2b3a] pb-2">
            {title}
        </h4>
        {children}
    </div>
);

const LeadRow = ({ lead, section, onView }: { lead: Lead, section: string, onView: () => void }) => {
    const daysPending = lead.createdAt ? differenceInDays(new Date(), lead.createdAt.toDate()) : 0;

    // Reminder logic
    const remains = lead.remindAt ? differenceInDays(lead.remindAt.toDate(), new Date()) : 0;
    const isOverdue = lead.remindAt ? isPast(lead.remindAt.toDate()) : false;
    const diffMs = lead.remindAt ? lead.remindAt.toMillis() - Date.now() : 0;
    const totalMinsRem = Math.floor(diffMs / (1000 * 60));
    const hoursRem = Math.floor(Math.abs(totalMinsRem) / 60);
    const minsRem = Math.abs(totalMinsRem) % 60;

    // Urgency styling for rows
    const getUrgencyClass = () => {
        if (section !== "reminding") return "";
        if (totalMinsRem < 0) return "bg-red-500/[0.04] border-red-500/10 shadow-[inset_4px_0_0_#ef4444]";
        if (totalMinsRem < 60) return "bg-amber-500/[0.04] border-amber-500/10 shadow-[inset_4px_0_0_#f59e0b]";
        return "";
    };

    return (
        <tr className={cn("hover:bg-[#0f1923]/80 transition-all duration-300 group relative", getUrgencyClass())}>
            <td className="px-6 py-4">
                <div className="font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {lead.name}
                    {section === "total" && <StatusBadge status={lead.status} />}
                </div>
                <div className="flex flex-col gap-0.5 mt-1">
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Briefcase size={10} /> {lead.businessName}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                        📅 {lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM, hh:mm a") : "—"}
                    </div>
                </div>
            </td>

            {section === "reminding" ? (
                <>
                    <td className="px-6 py-4">
                        <div className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                            <Calendar size={12} className="text-amber-500" />
                            {format(lead.remindAt!.toDate(), "dd MMM, hh:mm a")}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="space-y-1">
                            <div className={cn(
                                "flex items-center gap-1.5 text-[11px] font-black uppercase tracking-tighter",
                                totalMinsRem < 0 ? "text-red-400" : totalMinsRem < 60 ? "text-amber-400" : "text-primary"
                            )}>
                                {totalMinsRem < 0 ? (
                                    <><AlertCircle size={14} className="animate-pulse" /> Overdue by {hoursRem}h {minsRem}m</>
                                ) : (
                                    <><Timer size={14} /> {hoursRem}h {minsRem}m remaining</>
                                )}
                            </div>
                            <ReminderBadge minutes={totalMinsRem} />
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td className="px-6 py-4">
                        <span className="text-xs text-gray-400 font-medium">{lead.businessType}</span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-xs text-white font-mono flex items-center gap-1">
                            {section === "converted" || section === "lost" ? (
                                <span className="text-gray-400">{lead.lastUpdated ? format(lead.lastUpdated.toDate(), "dd MMM") : "-"}</span>
                            ) : (
                                <>
                                    <DollarSign size={12} className="text-emerald-400" />
                                    {lead.budget}
                                </>
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        {section === "pending" ? (
                            <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 w-fit",
                                daysPending > 14
                                    ? "bg-red-500/10 text-red-400 border-red-500/30"
                                    : daysPending > 7
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                        : "bg-primary/10 text-primary border-primary/20"
                            )}>
                                <Clock size={10} /> {daysPending} Days
                            </span>
                        ) : (
                            section !== "total" && <StatusBadge status={lead.status} />
                        )}
                    </td>
                </>
            )}

            <td className="px-6 py-4 text-right">
                <button
                    onClick={onView}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-primary hover:text-black hover:border-primary active:scale-95 shadow-sm"
                >
                    <Eye size={12} /> View Lead
                </button>
            </td>
        </tr>
    );
};

const StatusBadge = ({ status }: { status: LeadStatus }) => (
    <span className={cn(
        "text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full border border-opacity-40 font-black uppercase tracking-widest flex items-center gap-1.5 w-fit whitespace-nowrap",
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

const ReminderBadge = ({ minutes }: { minutes: number }) => {
    let classes = "bg-primary/20 text-primary border-primary/30";
    let label = "> 24h";

    if (minutes < 0) {
        classes = "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse";
        label = "Overdue";
    } else if (minutes < 60) {
        classes = "bg-orange-500/20 text-orange-400 border-orange-500/30";
        label = "< 1 hr";
    } else if (minutes < 1440) {
        classes = "bg-amber-500/20 text-amber-400 border-amber-500/30";
        label = "1–24 hrs";
    }

    return (
        <span className={cn("text-[9px] px-2 py-0.5 rounded font-black border uppercase tracking-tighter", classes)}>
            {label}
        </span>
    );
};

const EmptyState = ({ section }: { section: string }) => (
    <tr>
        <td colSpan={6} className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                    <Users size={32} />
                </div>
                <div>
                    <p className="text-gray-400 font-bold text-lg">No leads in {section}</p>
                    <p className="text-xs text-gray-600">Categories update automatically as you manage leads across the CRM.</p>
                </div>
            </div>
        </td>
    </tr>
);

const tooltipStyle = {
    backgroundColor: "#162030",
    border: "1px solid #1c2b3a",
    borderRadius: "12px",
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
};

export default DashboardView;
