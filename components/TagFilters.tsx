// components/TagFilters.tsx
import Link from "next/link";
import { buildBlogHref } from "@/lib/blog/url";

interface TagFiltersProps {
	uniqueTags: string[];
	activeTag?: string;
	activeSort: string;
	search?: string;
}

/**
 * ============================================================================
 * REFINED TAG FILTERS (SERVER COMPONENT)
 * * Renders tag navigation links cleanly as an independent list of items.
 * * Uses smart styling classes to contrast perfectly on both dark backgrounds
 * and light parchment containers.
 * ============================================================================
 */
export default function TagFilters({
	uniqueTags,
	activeTag,
	activeSort,
	search,
}: TagFiltersProps) {
	if (uniqueTags.length === 0) return null;

	const currentParams = { tag: activeTag, sort: activeSort, search };

	// Context-sensitive styling utilizing Tailwind parent markers (like .group-open or custom wrappers)
	// On light backgrounds, active tags use deep amber/brown accents. On dark, they use warm glowing amber.
	const activeClass = `
		bg-amber-900/10 border-amber-800/60 text-amber-950 font-black shadow-xs
		sm:bg-amber-500/10 sm:border-amber-500/60 sm:text-amber-400 sm:shadow-[0_0_12px_rgba(245,158,11,0.15)]
	`;

	const inactiveClass = `
		bg-black/5 border-amber-950/10 text-amber-900/60 hover:text-amber-950 hover:border-amber-950/30
		sm:bg-black/40 sm:border-amber-950/60 sm:text-amber-600/60 sm:hover:text-amber-400 sm:hover:border-amber-950/80
	`;

	return (
		<>
			{/* All Scrolls Reset Link */}
			<Link
				href={buildBlogHref({ tag: undefined }, currentParams)}
				scroll={false}
				className={`shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
					!activeTag ? activeClass : inactiveClass
				}`}
			>
				All Scrolls
			</Link>

			{/* Dynamic Tag Link List */}
			{uniqueTags.map((t) => (
				<Link
					key={t}
					href={buildBlogHref({ tag: t }, currentParams)}
					scroll={false}
					className={`shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
						activeTag === t ? activeClass : inactiveClass
					}`}
				>
					🏷️ {t}
				</Link>
			))}
		</>
	);
}
