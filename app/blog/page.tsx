// app/blog/page.tsx

import {
	and,
	arrayContains,
	desc,
	eq,
	ilike,
	or,
	type SQL,
	sql,
} from "drizzle-orm";
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
import { db } from "@/lib/db";
import {
	comments as commentsTable,
	posts as postsTable,
} from "@/lib/db/schema";
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
 * NEXT.JS 16 COMPLIANT OUTER LAYOUT WRAPPER (REFUGEE OF DUPLICATED CLASS JSX)
 * * Clean composition pattern. Passes query variables down to variant models.
 * * Ensures extremely lightweight rendering payloads for dynamic visitors.
 * ============================================================================
 */
export default async function BlogListPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams;
	const activeSort = resolvedParams.sort || "date";
	const tag = resolvedParams.tag;
	const search = resolvedParams.search?.trim();

	// Fetch unique tags in the layout scope so they display instantly without suspending
	const uniqueTags = await db
		.select({
			tag: sql<string>`DISTINCT unnest(${postsTable.tags})`,
		})
		.from(postsTable)
		.then((rows) =>
			rows
				.map((r) => r.tag)
				.filter(Boolean)
				.sort(),
		);

	return (
		<>
			<LeaveBoardButton />

			<BlogWrapper>
				<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
					<div className="relative pb-2 md:pb-6 w-full">
						<TavernHeader />
					</div>

					{/* SEARCH CHRONICLES BAR */}
					<div className="relative z-30 pb-6 max-w-md w-full mx-auto">
						<SearchBar initialValue={search} />
					</div>

					{/* 📜 COMPOSABLE MOBILE COLLAPSIBLE FILTERS PANEL */}
					<MobileFilters
						uniqueTags={uniqueTags}
						tag={tag}
						activeSort={activeSort}
						search={search}
					/>

					{/* ==================== DESKTOP-ONLY TAG FILTERS CONTAINER ==================== */}
					{uniqueTags.length > 0 && (
						<div
							className="
								hidden sm:flex flex-nowrap sm:flex-wrap 
								items-center justify-start sm:justify-center 
								gap-2 pb-6 mb-2 
								border-b border-amber-950/20 
								max-w-2xl w-full
								relative z-30 
								overflow-x-auto sm:overflow-visible
								scrollbar-none px-4 sm:px-0
								-mx-4 sm:mx-auto
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

					{/* ==================== DESKTOP-ONLY SORT FILTERS CONTAINER ==================== */}
					<div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-amber-800/60 pb-8 relative z-30">
						<span>Sort Posts:</span>
						<div className="flex items-center justify-between sm:justify-start gap-3 bg-black/30 border border-amber-950/40 px-4 py-2.5 sm:py-1.5 rounded-sm w-full sm:w-auto">
							<SortFilters tag={tag} activeSort={activeSort} search={search} />
						</div>
					</div>

					<div className="mt-2 md:mt-6 flex-1 relative z-10">
						<Suspense fallback={<BlogListLoading />}>
							<QuestBoardContainer
								tag={tag}
								sort={activeSort}
								search={search}
							/>
						</Suspense>
					</div>
				</main>
			</BlogWrapper>
		</>
	);
}

/**
 * ============================================================================
 * NESTED QUEST BOARD DATA CONTAINER
 * * Safely isolates async database loading queries below the UI layout.
 * ============================================================================
 */
async function QuestBoardContainer({
	tag,
	sort,
	search,
}: {
	tag?: string;
	sort: string;
	search?: string;
}) {
	const commentCountsSubquery = db
		.select({
			postId: commentsTable.postId,
			count: sql<number>`count(${commentsTable.id})::int`.as("comment_count"),
		})
		.from(commentsTable)
		.where(eq(commentsTable.approved, true))
		.groupBy(commentsTable.postId)
		.as("cc");

	// Unified SQL query construction utilizing strict TS arrays
	const filters: SQL[] = [];

	if (tag) {
		filters.push(arrayContains(postsTable.tags, [tag]));
	}

	if (search) {
		filters.push(
			or(
				ilike(postsTable.title, `%${search}%`) as SQL,
				ilike(postsTable.body, `%${search}%`) as SQL,
			) as SQL,
		);
	}

	const posts = await db
		.select({
			id: postsTable.id,
			title: postsTable.title,
			slug: postsTable.slug,
			body: postsTable.body,
			createdAt: postsTable.createdAt,
			coins: postsTable.coins,
			commentCount: sql<number>`coalesce(${commentCountsSubquery.count}, 0)::int`,
		})
		.from(postsTable)
		.leftJoin(
			commentCountsSubquery,
			eq(postsTable.id, commentCountsSubquery.postId),
		)
		.where(filters.length ? and(...filters) : undefined)
		.orderBy(
			sort === "coins"
				? desc(postsTable.coins)
				: sort === "discussions"
					? desc(sql`coalesce(${commentCountsSubquery.count}, 0)`)
					: desc(postsTable.createdAt),
		);

	return <QuestBoard posts={posts} search={search} />;
}
