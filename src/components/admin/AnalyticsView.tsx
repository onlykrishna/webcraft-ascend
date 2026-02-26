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
    Legend,
    BarChart,
    Bar,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import type { Lead } from "@/types/lead";

// ─── Consistent high-contrast colour palette ───────────────────────────────────
const CHART_COLORS = {
    purple: "#8b5cf6",
    blue: "#3b82f6",
    green: "#10b981",
    amber: "#f59e0b",
    red: "#ef4444",
    cyan: "#06b6d4",
    rose: "#f43f5e",
    indigo: "#6366f1",
};

const PIE_COLORS = Object.values(CHART_COLORS);

// ─── Budget sort order matching actual Scalvicon form values ──────────────────
const BUDGET_ORDER = [
    "Under ₹15,000",
    "₹15,000 – ₹25,000",
    "₹25,000 – ₹35,000",
    "Custom / Not sure",
];

// ─── Custom Tooltips ───────────────────────────────────────────────────────────
const CustomLineTooltip = ({ active, payload, label }: {
    active?: boolean; payload?: { value: number }[]; label?: string
}) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-bold text-primary">
                {payload[0].value} lead{payload[0].value !== 1 ? "s" : ""}
            </p>
        </div>
    );
};

const CustomPieTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: { name: string; value: number; payload: { percentage: string } }[];
}) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
            <p className="text-xs font-medium text-foreground">{payload[0].name}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
                {payload[0].value} lead{payload[0].value !== 1 ? "s" : ""}{" "}
                <span className="text-primary font-semibold">({payload[0].payload.percentage}%)</span>
            </p>
        </div>
    );
};

const CustomBarTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: { value: number; payload: { budget: string } }[];
}) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-1">{payload[0].payload.budget}</p>
            <p className="text-sm font-bold text-primary">
                {payload[0].value} lead{payload[0].value !== 1 ? "s" : ""}
            </p>
        </div>
    );
};

// ─── Pie label — percentage inside slice ──────────────────────────────────────
const renderPieLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percentage,
}: {
    cx: number; cy: number; midAngle: number;
    innerRadius: number; outerRadius: number; percentage: string;
}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (parseFloat(percentage) < 5) return null; // skip tiny slices
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight="700"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)", pointerEvents: "none" }}
        >
            {percentage}%
        </text>
    );
};

// ─── Shared axis / grid styles ────────────────────────────────────────────────
const axisTick = { fill: "hsl(var(--foreground))", fontSize: 12 };
const axisTickSm = { fill: "hsl(var(--foreground))", fontSize: 10 };
const gridStroke = "hsl(var(--border))";
const muted = "hsl(var(--muted-foreground))";

// ─── Main component ───────────────────────────────────────────────────────────
interface Props { leads: Lead[] }

const AnalyticsView = ({ leads }: Props) => {
    // Line chart — leads per day, last 30 days
    const lineData = useMemo(() => {
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = startOfDay(subDays(new Date(), 29 - i));
            return { date: format(d, "dd MMM"), ts: d.getTime(), leads: 0 };
        });
        leads.forEach((l) => {
            if (!l.createdAt) return;
            const d = startOfDay(l.createdAt.toDate()).getTime();
            const slot = days.find((s) => s.ts === d);
            if (slot) slot.leads++;
        });
        return days;
    }, [leads]);

    // Pie chart — by business type with %
    const pieData = useMemo(() => {
        const map: Record<string, number> = {};
        leads.forEach((l) => { map[l.businessType] = (map[l.businessType] ?? 0) + 1; });
        return Object.entries(map).map(([name, value]) => ({
            name,
            value,
            percentage: leads.length > 0 ? ((value / leads.length) * 100).toFixed(1) : "0",
        }));
    }, [leads]);

    // Bar chart — by budget, sorted in logical order
    const barData = useMemo(() => {
        const map: Record<string, number> = {};
        leads.forEach((l) => { map[l.budget] = (map[l.budget] ?? 0) + 1; });
        return BUDGET_ORDER
            .filter((b) => map[b] !== undefined)
            .map((budget) => ({
                budget: budget.replace("₹15,000 – ₹25,000", "₹15k–₹25k")
                    .replace("₹25,000 – ₹35,000", "₹25k–₹35k")
                    .replace("Under ₹15,000", "< ₹15k")
                    .replace("Custom / Not sure", "Custom"),
                count: map[budget],
            }));
    }, [leads]);

    if (leads.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
                <p className="text-sm">No leads yet.</p>
                <p className="text-xs">Submit the contact form to see analytics.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ── Line chart ────────────────────────────────────────────── */}
            <div className="bg-card border border-border rounded-card p-6 card-shadow">
                <h3 className="font-display font-bold text-foreground mb-5">
                    Leads Over Time — Last 30 Days
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.4} />
                        <XAxis
                            dataKey="date"
                            stroke={muted}
                            tick={axisTickSm}
                            tickLine={{ stroke: gridStroke }}
                            interval={4}
                            angle={-40}
                            textAnchor="end"
                            height={55}
                        />
                        <YAxis
                            stroke={muted}
                            tick={axisTick}
                            tickLine={{ stroke: gridStroke }}
                            axisLine={false}
                            allowDecimals={false}
                            width={28}
                        />
                        <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: `${CHART_COLORS.purple}30` }} />
                        <Line
                            type="monotone"
                            dataKey="leads"
                            stroke={CHART_COLORS.purple}
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5, fill: CHART_COLORS.purple, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* ── Pie chart ──────────────────────────────────────── */}
                <div className="bg-card border border-border rounded-card p-6 card-shadow">
                    <h3 className="font-display font-bold text-foreground mb-5">
                        Leads by Business Type
                    </h3>
                    {pieData.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="45%"
                                    outerRadius={95}
                                    innerRadius={40}
                                    paddingAngle={2}
                                    dataKey="value"
                                    labelLine={false}
                                    label={renderPieLabel}
                                >
                                    {pieData.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={40}
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value: string) => (
                                        <span style={{ color: "hsl(var(--foreground))", fontSize: 11 }}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* ── Bar chart ──────────────────────────────────────── */}
                <div className="bg-card border border-border rounded-card p-6 card-shadow">
                    <h3 className="font-display font-bold text-foreground mb-5">
                        Leads by Budget Range
                    </h3>
                    {barData.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.4} vertical={false} />
                                <XAxis
                                    dataKey="budget"
                                    stroke={muted}
                                    tick={axisTickSm}
                                    tickLine={{ stroke: gridStroke }}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke={muted}
                                    tick={axisTick}
                                    tickLine={{ stroke: gridStroke }}
                                    axisLine={false}
                                    allowDecimals={false}
                                    width={28}
                                />
                                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
                                <Bar
                                    dataKey="count"
                                    name="Leads"
                                    fill={CHART_COLORS.purple}
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={72}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
