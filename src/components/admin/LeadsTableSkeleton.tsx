export const LeadsTableSkeleton = () => (
    <div className="space-y-2">
        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-5">
            <div className="h-9 flex-1 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-36 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-36 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-36 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-card border border-border bg-card">
            {/* Header row */}
            <div className="flex gap-4 px-4 py-3 border-b border-border bg-background/40">
                {[120, 100, 70, 130, 80, 70, 60, 80].map((w, i) => (
                    <div
                        key={i}
                        className="h-3 animate-pulse rounded bg-muted"
                        style={{ width: w }}
                    />
                ))}
            </div>

            {/* Data rows */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 px-4 py-4 border-b border-border/50"
                    style={{ opacity: 1 - i * 0.15 }}
                >
                    {/* Name + business */}
                    <div className="space-y-1.5 min-w-[120px]">
                        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-2.5 w-16 animate-pulse rounded bg-muted/60" />
                    </div>
                    {/* Type */}
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    {/* Phone */}
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    {/* Email */}
                    <div className="h-3 w-32 animate-pulse rounded bg-muted/70" />
                    {/* Budget */}
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                    {/* Date */}
                    <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
                    {/* Status badge */}
                    <div className="h-5 w-14 animate-pulse rounded-full bg-emerald-500/10" />
                    {/* Actions */}
                    <div className="flex gap-1.5">
                        <div className="h-7 w-7 animate-pulse rounded-lg bg-muted" />
                        <div className="h-7 w-7 animate-pulse rounded-lg bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
