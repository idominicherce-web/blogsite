// components/SortFilters.tsx
import Link from "next/link";
import { buildBlogHref } from "@/lib/blog/url";

interface SortFiltersProps {
	tag?: string;
	activeSort: string;
	search?: string;
}

/**
 * ============================================================================
 * UNIFIED SORT FILTERS (SERVER COMPONENT)
 * * Single source of truth for rendering sorting options.
 * * Uses corrected lowercase keys to perfectly match page database sorting params.
 * * Uses smart dual-labels (short on mobile, full on desktop) to prevent clipping.
 * ============================================================================
 */
export default function SortFilters({
	tag,
	activeSort,
	search,
}: SortFiltersProps) {
	const currentParams = { tag, sort: activeSort, search };

	// Corrected lowercase keys ('coins' and 'discussions') to align with Drizzle database queries
	const sortOptions = [
		{ key: "date", mobileLabel: "New", desktopLabel: "New Posts", icon: "📜" },
		{
			key: "coins", // Fixed casing: "Coins" -> "coins"
			mobileLabel: "Coins",
			desktopLabel: "Gold Coins",
			icon: "🪙",
		},
		{
			key: "discussions", // Fixed key alignment: "Notes" -> "discussions" to trigger comment counts ordering
			mobileLabel: "Notes",
			desktopLabel: "Notes",
			icon: "✒️",
		},
	];

	return (
		<>
			{sortOptions.map((opt) => {
				const isActive = activeSort === opt.key;

				// Sizing/structural parameters are identical for all states
				return (
					<Link
						key={opt.key}
						href={buildBlogHref({ sort: opt.key }, currentParams)}
						scroll={false}
						className={`
							/* Base structure & alignment */
							flex items-center justify-center gap-1 sm:gap-1.5
							py-2 px-1 sm:py-1.5 sm:px-3 rounded-xs border transition-all duration-200 text-center
							
							/* State-dependent appearance */
							${
								isActive
									? `
									border-amber-900/30 bg-amber-900/10 text-amber-950 font-black shadow-xs
									sm:border-amber-500/30 sm:bg-amber-500/10 sm:text-amber-400 sm:font-black
								  `
									: `
									border-transparent bg-transparent text-amber-900/60 hover:text-amber-950 hover:bg-amber-900/5
									sm:text-amber-700/80 sm:hover:text-amber-400 sm:hover:bg-transparent
								  `
							}
						`}
					>
						<span className="text-[10px] sm:text-xs leading-none shrink-0">
							{opt.icon}
						</span>

						{/* Mobile label: Visible only on mobile, hidden on tablet/desktop */}
						<span className="inline sm:hidden text-[8.5px] tracking-wide uppercase font-black">
							{opt.mobileLabel}
						</span>

						{/* Desktop label: Hidden on mobile, visible on desktop */}
						<span className="hidden sm:inline">{opt.desktopLabel}</span>
					</Link>
				);
			})}
		</>
	);
}
