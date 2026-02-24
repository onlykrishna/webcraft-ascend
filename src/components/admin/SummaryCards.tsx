import { useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Inbox, Phone, TrendingUp, TrendingDown, Percent } from "lucide-react";
import type { Lead } from "@/types/lead";
import { isToday, subDays, isAfter, isBefore } from "date-fns";
import { fadeUp } from "@/lib/animations";

interface TrendInfo {
    value: number;
    isPositive: boolean;
}

interface Props {
    leads: Lead[];
}

const SummaryCards = ({ leads }: Props) => {
    const stats = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = subDays(now, 7);
        const fourteenDaysAgo = subDays(now, 14);

        const total = leads.length;
        const newToday = leads.filter((l) => l.createdAt && isToday(l.createdAt.toDate())).length;
        const contacted = leads.filter((l) => l.status === "contacted").length;
        const converted = leads.filter((l) => l.status === "converted").length;
        const rate = total > 0 ? Math.round((converted / total) * 100) : 0;

        // Week-over-week trend helpers
        const thisWeek = leads.filter(
            (l) => l.createdAt && isAfter(l.createdAt.toDate(), sevenDaysAgo),
        ).length;
        const lastWeek = leads.filter(
            (l) =>
                l.createdAt &&
                isAfter(l.createdAt.toDate(), fourteenDaysAgo) &&
                isBefore(l.createdAt.toDate(), sevenDaysAgo),
        ).length;

        const calcTrend = (curr: number, prev: number): TrendInfo => {
            if (prev === 0) return { value: 100, isPositive: curr > 0 };
            const pct = Math.round(((curr - prev) / prev) * 100);
            return { value: Math.abs(pct), isPositive: pct >= 0 };
        };

        return {
            total,
            newToday,
            contacted,
            converted,
            rate,
            totalTrend: calcTrend(thisWeek, lastWeek),
        };
    }, [leads]);

    const cards = [
        {
            label: "Total Leads",
            value: stats.total,
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/10",
            trend: stats.totalTrend,
        },
        {
            label: "New Today",
            value: stats.newToday,
            icon: Inbox,
            color: "text-sky-400",
            bg: "bg-sky-400/10",
            trend: undefined,
        },
        {
            label: "Contacted",
            value: stats.contacted,
            icon: Phone,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            trend: undefined,
        },
        {
            label: "Converted",
            value: stats.converted,
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            trend: undefined,
        },
        {
            label: "Conversion Rate",
            value: `${stats.rate}%`,
            icon: Percent,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            trend: undefined,
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((c) => (
                <motion.div
                    key={c.label}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-card border border-border rounded-card p-4 card-shadow"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{c.label}</p>
                            <p className={`font-display font-extrabold text-2xl mt-1.5 ${c.color}`}>
                                {c.value}
                            </p>
                            {c.trend && (
                                <div
                                    className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${c.trend.isPositive ? "text-emerald-400" : "text-red-400"
                                        }`}
                                >
                                    {c.trend.isPositive ? (
                                        <TrendingUp size={11} />
                                    ) : (
                                        <TrendingDown size={11} />
                                    )}
                                    <span>{c.trend.value}% vs last week</span>
                                </div>
                            )}
                        </div>
                        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0 ml-2`}>
                            <c.icon size={17} className={c.color} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SummaryCards;
