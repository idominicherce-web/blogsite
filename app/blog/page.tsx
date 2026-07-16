// app/blog/page.tsx

import { arrayContains, desc, eq, sql } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import QuestBoard from "@/components/QuestBoard";
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
	searchParams: Promise<{ tag?: string; sort?: string }>;
}

/**
 * ============================================================================
 * NEXT.JS 16 COMPLIANT OUTER LAYOUT WRAPPER
 * * Immediately renders the static layout shell, preserving scroll states.
 * * Suspends only the core content board, keeping parent wrappers fully intact.
 * ============================================================================
 */
export default async function BlogListPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams;
	const activeSort = resolvedParams.sort || "date";
	const tag = resolvedParams.tag;

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

					{uniqueTags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2 pb-6 mb-2 border-b border-amber-950/20 max-w-2xl mx-auto w-full relative z-30">
							<Link
								href={`/blog${activeSort !== "date" ? `?sort=${activeSort}` : ""}`}
								scroll={false}
								className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
									!tag
										? "bg-amber-500/10 border-amber-500/60 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
										: "bg-black/40 border-amber-950/60 text-amber-600/60 hover:text-amber-400 hover:border-amber-950"
								}`}
							>
								All Scrolls
							</Link>

							{uniqueTags.map((t) => (
								<Link
									key={t}
									href={`/blog?tag=${encodeURIComponent(t)}${activeSort !== "date" ? `&sort=${activeSort}` : ""}`}
									scroll={false}
									className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
										tag === t
											? "bg-amber-500/10 border-amber-500/60 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
											: "bg-black/40 border-amber-950/60 text-amber-600/60 hover:text-amber-400 hover:border-amber-950"
									}`}
								>
									🪙 {t}
								</Link>
							))}
						</div>
					)}

					<div className="flex items-center justify-center gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-amber-800/60 pb-8 relative z-30">
						<span>Sort Posts:</span>
						<div className="flex items-center gap-3 bg-black/30 border border-amber-950/40 px-4 py-1.5 rounded-sm">
							<Link
								href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}sort=date`}
								scroll={false}
								className={`transition-colors hover:text-amber-400 ${
									activeSort === "date"
										? "text-amber-400 font-black"
										: "text-amber-700/80"
								}`}
							>
								📜 New Posts
							</Link>
							<span className="opacity-20">|</span>
							<Link
								href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}sort=coins`}
								scroll={false}
								className={`transition-colors hover:text-amber-400 ${
									activeSort === "coins"
										? "text-amber-400 font-black"
										: "text-amber-700/80"
								}`}
							>
								🪙 Gold Coins
							</Link>
							<span className="opacity-20">|</span>
							<Link
								href={`/blog?${tag ? `tag=${encodeURIComponent(tag)}&` : ""}sort=discussions`}
								scroll={false}
								className={`transition-colors hover:text-amber-400 ${
									activeSort === "discussions"
										? "text-amber-400 font-black"
										: "text-amber-700/80"
								}`}
							>
								💬 Discussions
							</Link>
						</div>
					</div>

					<div className="mt-2 md:mt-6 flex-1 relative z-10">
						{/* Only suspend the QuestBoard so scroll-context isn't blown away on revalidation */}
						<Suspense fallback={<BlogListLoading />}>
							<QuestBoardContainer tag={tag} sort={activeSort} />
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
}: {
	tag?: string;
	sort: string;
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
		.where(tag ? arrayContains(postsTable.tags, [tag]) : undefined)
		.orderBy(
			sort === "coins"
				? desc(postsTable.coins)
				: sort === "discussions"
					? desc(sql`coalesce(${commentCountsSubquery.count}, 0)`)
					: desc(postsTable.createdAt),
		);

	return <QuestBoard posts={posts} />;
}
