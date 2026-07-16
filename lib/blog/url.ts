// lib/blog/url.ts

export interface BlogFilters {
	tag?: string;
	sort?: string;
	search?: string;
}

/**
 * ============================================================================
 * PURE BLOG URL GENERATOR
 * * Generates type-safe blog routing paths from an active state map.
 * * Merges parameter updates cleanly without any framework or styling dependencies.
 * ============================================================================
 */
export function buildBlogHref(
	updates: Partial<BlogFilters>,
	currentParams: BlogFilters,
): string {
	// Merge the current params and incoming updates into a single unified state object
	const next: BlogFilters = {
		...currentParams,
		...updates,
	};

	const params = new URLSearchParams();

	// 1. Serialize Tag (If defined and non-empty)
	if (next.tag && next.tag.trim().length > 0) {
		params.set("tag", next.tag.trim());
	}

	// 2. Serialize Sort (We suppress default "date" option to keep the address bar clean)
	if (next.sort && next.sort !== "date" && next.sort.trim().length > 0) {
		params.set("sort", next.sort.trim());
	}

	// 3. Serialize Search query
	if (next.search && next.search.trim().length > 0) {
		params.set("search", next.search.trim());
	}

	const queryString = params.toString();
	return queryString ? `/blog?${queryString}` : "/blog";
}
