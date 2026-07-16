// components/SearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface SearchBarProps {
	initialValue?: string;
}

/**
 * ============================================================================
 * DEBOUNCED SEARCH BAR (CLIENT COMPONENT)
 * * Captures traveler input, preserves existing query strings (tags/sort).
 * * Debounces navigation parameter updates to minimize redundant DB calls.
 * ============================================================================
 */
export default function SearchBar({ initialValue = "" }: SearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [query, setQuery] = useState(initialValue);

	// Derive the current search string to avoid re-triggering the effect on reference changes of searchParams
	const currentSearch = searchParams.get("search") || "";

	// Synchronize internal value if initialValue updates (e.g., clearing tags/navigating)
	useEffect(() => {
		setQuery(initialValue);
	}, [initialValue]);

	useEffect(() => {
		// Set a 300ms delay to allow typing to pause before changing the URL
		const timer = setTimeout(() => {
			if (query.trim() === currentSearch) return;

			startTransition(() => {
				const params = new URLSearchParams(searchParams.toString());

				if (query.trim()) {
					params.set("search", query.trim());
				} else {
					params.delete("search");
				}

				// Trigger router transition keeping current scroll state
				router.push(`/blog?${params.toString()}`, { scroll: false });
			});
		}, 300);

		return () => clearTimeout(timer);
	}, [query, currentSearch, router, searchParams]);

	return (
		<div className="relative w-full">
			<label htmlFor="chronicle-search" className="sr-only">
				Search Chronicles
			</label>

			<div className="relative">
				<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700/60 text-sm">
					{isPending ? (
						<div className="w-4 h-4 rounded-full border-2 border-amber-600/20 border-t-amber-600 animate-spin" />
					) : (
						"🔍"
					)}
				</span>

				<input
					type="text"
					id="chronicle-search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search posts by title or content..."
					className="w-full pl-10 pr-4 py-2.5 bg-[#1a0f0a]/60 border-2 border-[#4a2e1b]/40 rounded-md font-serif italic text-sm text-amber-100 placeholder-amber-800/50 focus:outline-none focus:border-amber-600/70 focus:bg-[#1a0f0a]/90 transition-all shadow-inner"
				/>
			</div>
		</div>
	);
}
