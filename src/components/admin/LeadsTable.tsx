import { useState, useMemo } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import {
    MessageCircle, Phone, CheckCircle2, Search, Filter,
    Download, Eye, X, ChevronDown, Check,
} from "lucide-react";
import { format, isToday, isThisWeek, isThisMonth } from "date-fns";
import Papa from "papaparse";
import type { Lead, LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPES } from "@/lib/validations/contact";
import { LeadDetailsModal } from "./LeadDetailsModal";

// ─── Status badge ──────────────────────────────────────────────────────────────
export const statusConfig: Record<LeadStatus, { label: string; classes: string }> = {
    new: { label: "New", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    contacted: { label: "Contacted", classes: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    converted: { label: "Converted", classes: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
    closed: { label: "Closed", classes: "bg-gray-500/15 text-gray-400 border-gray-500/30" },
    lost: { label: "Lost", classes: "bg-red-500/15 text-red-400 border-red-500/30" },
};

export const StatusBadge = ({ status }: { status: LeadStatus }) => {
    const cfg = statusConfig[status] ?? statusConfig.new;
    return (
        <span className={cn("text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border", cfg.classes)}>
            {cfg.label}
        </span>
    );
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
async function updateStatus(id: string, status: LeadStatus) {
    await updateDoc(doc(db, "leads", id), { status });
}

type DateRange = "all" | "today" | "week" | "month";

function passesDateFilter(lead: Lead, range: DateRange): boolean {
    if (range === "all" || !lead.createdAt) return true;
    const d = lead.createdAt.toDate();
    if (range === "today") return isToday(d);
    if (range === "week") return isThisWeek(d);
    return isThisMonth(d);
}

// ─── Multi-select status dropdown ─────────────────────────────────────────────
const ALL_STATUSES: LeadStatus[] = ["new", "contacted", "converted", "closed", "lost"];

const StatusMultiSelect = ({
    selected,
    onChange,
}: {
    selected: LeadStatus[];
    onChange: (s: LeadStatus[]) => void;
}) => {
    const [open, setOpen] = useState(false);
    const label =
        selected.length === 0 ? "All Statuses" : `${selected.length} status${selected.length > 1 ? "es" : ""}`;

    const toggle = (s: LeadStatus) =>
        onChange(selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s]);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground hover:border-primary/40 transition-colors"
            >
                {label}
                <ChevronDown size={13} className={cn("transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute z-20 top-full mt-1 left-0 w-44 bg-card border border-border rounded-xl shadow-xl py-1 overflow-hidden">
                        {ALL_STATUSES.map((s) => (
                            <button
                                key={s}
                                onClick={() => toggle(s)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-foreground/5 transition-colors"
                            >
                                <div
                                    className={cn(
                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                        selected.includes(s)
                                            ? "bg-primary border-primary"
                                            : "border-border",
                                    )}
                                >
                                    {selected.includes(s) && <Check size={10} className="text-background" />}
                                </div>
                                <StatusBadge status={s} />
                            </button>
                        ))}
                        {selected.length > 0 && (
                            <button
                                onClick={() => onChange([])}
                                className="w-full flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors border-t border-border mt-1"
                            >
                                <X size={11} /> Clear filter
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

// ─── Main component ────────────────────────────────────────────────────────────
interface Props {
    leads: Lead[];
}

const LeadsTable = ({ leads }: Props) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<LeadStatus[]>([]);
    const [typeFilter, setTypeFilter] = useState("all");
    const [dateRange, setDateRange] = useState<DateRange>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [bulkLoading, setBulkLoading] = useState(false);

    const selectClass =
        "bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40";

    const filtered = useMemo(() => {
        return leads.filter((l) => {
            const q = search.toLowerCase();
            const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
            const matchStatus = statusFilter.length === 0 || statusFilter.includes(l.status);
            const matchType = typeFilter === "all" || l.businessType === typeFilter;
            const matchDate = passesDateFilter(l, dateRange);
            return matchSearch && matchStatus && matchType && matchDate;
        });
    }, [leads, search, statusFilter, typeFilter, dateRange]);

    // ── Selection ────────────────────────────────────────────────────────────────
    const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;
    const toggleSelectAll = () =>
        setSelectedIds(allSelected ? [] : filtered.map((l) => l.id));
    const toggleOne = (id: string) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );

    // ── Bulk status update ───────────────────────────────────────────────────────
    const handleBulkUpdate = async (newStatus: LeadStatus) => {
        setBulkLoading(true);
        try {
            await Promise.all(selectedIds.map((id) => updateStatus(id, newStatus)));
            toast.success(`${selectedIds.length} lead${selectedIds.length > 1 ? "s" : ""} marked as ${newStatus}`);
            setSelectedIds([]);
        } catch {
            toast.error("Failed to update leads");
        } finally {
            setBulkLoading(false);
        }
    };

    // ── Row action ───────────────────────────────────────────────────────────────
    const handleRowAction = async (id: string, status: LeadStatus) => {
        try {
            await updateStatus(id, status);
            toast.success(`Lead marked as ${status}`);
        } catch {
            toast.error("Failed to update lead");
        }
    };

    // ── CSV export ───────────────────────────────────────────────────────────────
    const handleExportCSV = () => {
        const exportData = filtered.map((l) => ({
            Name: l.name,
            Business: l.businessName,
            Type: l.businessType,
            Phone: l.phone,
            Email: l.email,
            Budget: l.budget,
            Status: l.status,
            Message: l.message ?? "",
            Notes: l.notes ?? "",
            Date: l.createdAt ? l.createdAt.toDate().toLocaleDateString("en-IN") : "",
        }));
        const csv = Papa.unparse(exportData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `scalvicon-leads-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("CSV downloaded!");
    };

    const makeWAUrl = (lead: Lead) => {
        const msg = encodeURIComponent(
            `Hi ${lead.name}! This is Scalvicon team. We received your inquiry for ${lead.businessType} website. Are you available for a quick call?`,
        );
        return `https://wa.me/${lead.phone}?text=${msg}`;
    };

    return (
        <div className="space-y-4">
            {/* ── Filters ──────────────────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-[180px]">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search name or email…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(selectClass, "pl-8 w-full")}
                    />
                </div>

                {/* Multi-select Statuses */}
                <StatusMultiSelect selected={statusFilter} onChange={setStatusFilter} />

                {/* Business Type */}
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectClass}>
                    <option value="all">All Types</option>
                    {BUSINESS_TYPES.map((bt) => (
                        <option key={bt} value={bt}>{bt}</option>
                    ))}
                </select>

                {/* Date range */}
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value as DateRange)} className={selectClass}>
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>

                {/* Export CSV */}
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                    <Download size={13} /> Export CSV
                </button>

                <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                    <Filter size={11} className="inline mr-1" />
                    {filtered.length} of {leads.length}
                </span>
            </div>

            {/* ── Table ──────────────────────────────────────────────────────────── */}
            <div className="overflow-x-auto rounded-card border border-border bg-card">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-background/40">
                            {/* Checkbox all */}
                            <th className="px-4 py-3 w-8">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleSelectAll}
                                    className="w-3.5 h-3.5 accent-primary cursor-pointer"
                                />
                            </th>
                            {["Name / Business", "Type", "Phone", "Email", "Budget", "Date", "Status", "Actions"].map((h) => (
                                <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-16 text-muted-foreground text-sm">
                                    No leads found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((lead) => (
                                <tr
                                    key={lead.id}
                                    className={cn(
                                        "border-b border-border/50 transition-colors",
                                        selectedIds.includes(lead.id)
                                            ? "bg-primary/5"
                                            : "hover:bg-foreground/[0.02]",
                                    )}
                                >
                                    {/* Checkbox */}
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(lead.id)}
                                            onChange={() => toggleOne(lead.id)}
                                            className="w-3.5 h-3.5 accent-primary cursor-pointer"
                                        />
                                    </td>
                                    {/* Name + Business */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-foreground">{lead.name}</p>
                                        <p className="text-xs text-muted-foreground">{lead.businessName}</p>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{lead.businessType}</td>
                                    <td className="px-4 py-3">
                                        <a href={`tel:+91${lead.phone}`} className="text-primary hover:underline text-xs font-mono">{lead.phone}</a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <a href={`mailto:${lead.email}`} className="text-xs hover:underline text-muted-foreground">{lead.email}</a>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{lead.budget}</td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                                        {lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM, HH:mm") : "—"}
                                    </td>
                                    <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            {/* View details */}
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                title="View Details"
                                                className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Eye size={13} />
                                            </button>
                                            {/* WhatsApp */}
                                            <a
                                                href={makeWAUrl(lead)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="WhatsApp"
                                                className="p-1.5 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/30 text-[#25d366] transition-colors"
                                            >
                                                <MessageCircle size={13} />
                                            </a>
                                            {/* Mark Contacted */}
                                            {lead.status === "new" && (
                                                <button
                                                    onClick={() => handleRowAction(lead.id, "contacted")}
                                                    title="Mark Contacted"
                                                    className="p-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 transition-colors"
                                                >
                                                    <Phone size={13} />
                                                </button>
                                            )}
                                            {/* Convert */}
                                            {(lead.status === "new" || lead.status === "contacted") && (
                                                <button
                                                    onClick={() => handleRowAction(lead.id, "converted")}
                                                    title="Mark Converted"
                                                    className="p-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 text-purple-400 transition-colors"
                                                >
                                                    <CheckCircle2 size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Bulk action floating bar ────────────────────────────────────────── */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 backdrop-blur">
                    <span className="text-sm font-medium text-foreground">
                        {selectedIds.length} lead{selectedIds.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="w-px h-4 bg-border" />
                    <button
                        onClick={() => handleBulkUpdate("contacted")}
                        disabled={bulkLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 text-xs font-medium transition-colors disabled:opacity-50"
                    >
                        <Phone size={12} /> Mark Contacted
                    </button>
                    <button
                        onClick={() => handleBulkUpdate("converted")}
                        disabled={bulkLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 text-purple-400 text-xs font-medium transition-colors disabled:opacity-50"
                    >
                        <CheckCircle2 size={12} /> Convert All
                    </button>
                    <button
                        onClick={() => handleBulkUpdate("closed")}
                        disabled={bulkLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/15 hover:bg-gray-500/30 text-gray-400 text-xs font-medium transition-colors disabled:opacity-50"
                    >
                        Close All
                    </button>
                    <button
                        onClick={() => setSelectedIds([])}
                        className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* ── Lead details modal ──────────────────────────────────────────────── */}
            <LeadDetailsModal
                lead={selectedLead}
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
            />
        </div>
    );
};

export default LeadsTable;
