import { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import type { Lead } from "@/types/lead";

// Colour palette
const PIE_COLORS = ["#00e5a0", "#38bdf8", "#fbbf24", "#f97316", "#a78bfa", "#ec4899", "#34d399", "#60a5fa"];

interface Props {
    leads: Lead[];
}

const AnalyticsView = ({ leads }: Props) => {
    // ── Line chart: leads per day (last 30 days) ────────────────────────
    const lineData = useMemo(() => {
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = startOfDay(subDays(new Date(), 29 - i));
            return { date: format(d, "dd MMM"), ts: d.getTime(), count: 0 };
        });

        leads.forEach((l) => {
            if (!l.createdAt) return;
            const d = startOfDay(l.createdAt.toDate()).getTime();
            const slot = days.find((s) => s.ts === d);
            if (slot) slot.count++;
        });

        return days;
    }, [leads]);

    // ── Pie chart: leads by business type ───────────────────────────────
    const pieData = useMemo(() => {
        const map: Record<string, number> = {};
        leads.forEach((l) => {
            map[l.businessType] = (map[l.businessType] ?? 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [leads]);

    // ── Bar chart: leads by budget ───────────────────────────────────────
    const barData = useMemo(() => {
        const map: Record<string, number> = {};
        leads.forEach((l) => {
            map[l.budget] = (map[l.budget] ?? 0) + 1;
        });
        return Object.entries(map).map(([budget, count]) => ({ budget, count }));
    }, [leads]);

    const tooltipStyle = {
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "8px",
        color: "hsl(var(--foreground))",
        fontSize: 12,
    };

    const labelStyle = { color: "hsl(var(--foreground))" };
    const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };
    const gridStroke = "hsl(var(--border))";

    if (leads.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                No leads yet. Submit the contact form to see analytics.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Line chart */}
            <div className="bg-card border border-border rounded-card p-6 card-shadow">
                <h3 className="font-display font-bold text-foreground mb-5">Leads per Day — Last 30 Days</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis
                            dataKey="date"
                            tick={axisStyle}
                            tickLine={false}
                            axisLine={false}
                            interval={4}
                        />
                        <YAxis tick={axisStyle} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} cursor={{ stroke: "rgba(0,229,160,0.15)" }} />
                        <Line
                            type="monotone"
                            dataKey="count"
                            name="Leads"
                            stroke="hsl(162, 100%, 45%)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: "hsl(162, 100%, 45%)" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Pie chart */}
                <div className="bg-card border border-border rounded-card p-6 card-shadow">
                    <h3 className="font-display font-bold text-foreground mb-5">Leads by Business Type</h3>
                    {pieData.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={230}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Bar chart */}
                <div className="bg-card border border-border rounded-card p-6 card-shadow">
                    <h3 className="font-display font-bold text-foreground mb-5">Leads by Budget Range</h3>
                    {barData.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={230}>
                            <BarChart data={barData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                                <XAxis
                                    dataKey="budget"
                                    tick={{ ...axisStyle, fontSize: 9 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis tick={axisStyle} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
                                <Bar dataKey="count" name="Leads" fill="hsl(162, 100%, 45%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
