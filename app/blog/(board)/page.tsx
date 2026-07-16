// app/blog/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import MobileFilters from "@/components/MobileFilters";
import QuestBoard from "@/components/QuestBoard";
import SearchBar from "@/components/SearchBar";
import SortFilters from "@/components/SortFilters";
import TagFilters from "@/components/TagFilters";
import TavernHeader from "@/components/TavernHeader";
import { getChronicles, getUniqueTags } from "@/lib/db/queries";
// Import your native local loading component to use as the fallback
import BlogListLoading from "./loading";

export const metadata: Metadata = {
	metadataBase: new URL("https://tavernblogs.vercel.app"),
	title: "The Notice Board",
	description: "Gather by the hearthstone and read active chronicles.",
	openGraph: {
		title: "The Notice Board | Tavern",
		description: "Gather by the hearthstone and read active chronicles.",
		url: "https://tavernblogs.vercel.app/blog",
		images: [
			{
				url: "https://tavernblogs.vercel.app/assets/notice-board.jpg",
				width: 1200,
				height: 630,
				alt: "The Tavern Notice Board",
			},
		],
		type: "website",
	},
};

interface BlogPageProps {
	searchParams: Promise<{
		tag?: string;
		sort?: string;
		search?: string;
	}>;
}

/**
 * ============================================================================
 * NEXT.JS 16 COMPLIANT OUTER LAYOUT WRAPPER (STATIC SHELL)
 * * Serves immediate, unblocked static HTML shells.
 * * defers database lookups inside a single Suspense boundary.
 * ============================================================================
 */
export default async function BlogListPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams;
	const activeSort = resolvedParams.sort || "date";
	const tag = resolvedParams.tag;
	const search = resolvedParams.search?.trim();

	return (
		<>
			<LeaveBoardButton />

			<BlogWrapper>
				{/* Wrap the entire dynamic page composition to force your custom skeleton transition */}
				<Suspense fallback={<BlogListLoading />}>
					<DeferredBlogContent
						tag={tag}
						activeSort={activeSort}
						search={search}
					/>
				</Suspense>
			</BlogWrapper>
		</>
	);
}

/**
 * ============================================================================
 * DEFERRED BLOG CONTENT CONTAINER
 * * Resolves data from our memory cache helper on the server inside Suspense.
 * ============================================================================
 */
async function DeferredBlogContent({
	tag,
	activeSort,
	search,
}: {
	tag?: string;
	activeSort: string;
	search?: string;
}) {
	// ⚡ Reads both datasets instantly from memory (<1ms on cache hits!)
	const uniqueTags = await getUniqueTags();
	const posts = await getChronicles({ tag, sort: activeSort, search });

	return (
		<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
			<div className="relative pb-2 md:pb-6 w-full">
				<TavernHeader />
			</div>

			{/* SEARCH BAR */}
			<div className="relative z-30 pb-6 max-w-md w-full mx-auto">
				<SearchBar initialValue={search} />
			</div>

			{/* MOBILE COLLAPSIBLE DRAWER */}
			<MobileFilters
				uniqueTags={uniqueTags}
				tag={tag}
				activeSort={activeSort}
				search={search}
			/>

			{/* DESKTOP TAGS */}
			{uniqueTags.length > 0 && (
				<div
					className="
						hidden sm:flex flex-nowrap sm:flex-wrap 
						items-center justify-start sm:justify-center 
						gap-2 pb-6 mb-2 
						border-b border-amber-950/20 
						max-w-2xl w-full mx-auto
						relative z-30 
						overflow-x-auto sm:overflow-visible
						scrollbar-none px-4 sm:px-0 sm:mx-auto
					"
				>
					<TagFilters
						uniqueTags={uniqueTags}
						activeTag={tag}
						activeSort={activeSort}
						search={search}
					/>
				</div>
			)}

			{/* DESKTOP SORT CONTROLS */}
			<div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-amber-800/60 pb-8 relative z-30">
				<span>Sort Posts:</span>
				<div className="flex items-center justify-between sm:justify-start gap-3 bg-black/30 border border-amber-950/40 px-4 py-2.5 sm:py-1.5 rounded-sm w-full sm:w-auto">
					<SortFilters tag={tag} activeSort={activeSort} search={search} />
				</div>
			</div>

			{/* QUEST BOARD LIST CONTAINER */}
			<div className="mt-2 md:mt-6 flex-1 relative z-10">
				<QuestBoard posts={posts} search={search} />
			</div>
		</main>
	);
}
