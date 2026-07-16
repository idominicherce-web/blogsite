// components/MobileFilters.tsx

import SortFilters from "./SortFilters";
import TagFilters from "./TagFilters";

interface MobileFiltersProps {
	uniqueTags: string[];
	tag?: string;
	activeSort: string;
	search?: string;
}

/**
 * ============================================================================
 * THEMED COLLAPSIBLE MOBILE FILTER DRAWER (SERVER COMPONENT)
 * * Houses mobile wrapper styling and layout configurations.
 * * Computes a scalable, concise numerical active filter summary.
 * * Uses native CSS transitions to provide a smooth slide-and-fade feel.
 * ============================================================================
 */
export default function MobileFilters({
	uniqueTags,
	tag,
	activeSort,
	search,
}: MobileFiltersProps) {
	// 1. Calculate active filters for a scalable summary indicator
	let activeCount = 0;
	if (tag && tag.trim().length > 0) activeCount++;
	if (activeSort && activeSort !== "date") activeCount++;
	if (search && search.trim().length > 0) activeCount++;

	const hasActiveFilters = activeCount > 0;
	const filterSummary = hasActiveFilters
		? `📜 Filters (${activeCount} Active)`
		: "📜 Adjust Post Filters";

	return (
		<details className="group sm:hidden relative z-30 w-full max-w-md mx-auto mb-6 select-none [&_summary::-webkit-details-marker]:hidden">
			{/* COLLAPSIBLE SUMMARY TOGGLE */}
			<summary className="list-none outline-none cursor-pointer">
				<div
					className={`flex items-center justify-between px-5 py-3 rounded-md border-2 bg-linear-to-b transition-all duration-200 active:scale-[0.99] ${
						hasActiveFilters
							? "border-amber-500/50 from-[#4e2f17] to-[#341d0c] shadow-[0_0_15px_rgba(245,158,11,0.15)]"
							: "border-amber-950 from-[#3a210d] to-[#241407] shadow-lg"
					}`}
				>
					<span className="font-sans text-[10px] font-black uppercase tracking-[0.15em] text-amber-100 flex items-center gap-1.5 truncate max-w-[85%]">
						{filterSummary}
					</span>
					<span className="text-amber-400 font-serif text-xs transition-transform duration-300 group-open:rotate-180">
						▼
					</span>
				</div>
			</summary>

			{/* NATIVE PARCHMENT ANIMATED WRAPPER */}
			{/* Pure CSS slide and opacity fade leveraging Tailwind transition utilities */}
			<div
				className="
				overflow-hidden
				max-h-0 opacity-0
				group-open:max-h-125 group-open:opacity-100
				transition-all duration-300 ease-out
				mt-2 p-5 rounded-md border-2 border-amber-950/80 
				bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] 
				shadow-[0_15px_30px_rgba(0,0,0,0.4)] space-y-6 relative
			"
			>
				{/* Inner paper shadowing shadow overlay */}
				<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(139,92,26,0.15)] mix-blend-multiply" />

				{/* 1. MOBILE TAG SELECTION */}
				{uniqueTags.length > 0 && (
					<div className="space-y-2 relative z-10">
						<h4 className="font-sans text-[9px] font-black uppercase tracking-wider text-amber-900/60 border-b border-amber-900/15 pb-1">
							Filter by Tag
						</h4>

						{/* Localized Mobile Tag Layout Container */}
						<div className="flex flex-wrap gap-2 pt-1">
							<TagFilters
								uniqueTags={uniqueTags}
								activeTag={tag}
								activeSort={activeSort}
								search={search}
							/>
						</div>
					</div>
				)}

				{/* 2. MOBILE SORT SELECTION */}
				<div className="space-y-2 relative z-10">
					<h4 className="font-sans text-[9px] font-black uppercase tracking-wider text-amber-900/60 border-b border-amber-900/15 pb-1">
						Sort
					</h4>

					{/* Localized Mobile Sort Grid Container with absolute button uniformity */}
					<div className="grid grid-cols-3 gap-2 bg-black/5 p-1 rounded-sm border border-amber-950/10 text-[9px] font-sans font-bold uppercase tracking-wider text-center">
						<SortFilters tag={tag} activeSort={activeSort} search={search} />
					</div>
				</div>
			</div>
		</details>
	);
}
