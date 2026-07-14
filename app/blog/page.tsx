// app/blog/page.tsx

import { arrayContains, desc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import QuestBoard from "@/components/QuestBoard";
import TavernHeader from "@/components/TavernHeader";
import { db } from "@/lib/db";
import { posts as postsTable } from "@/lib/db/schema";

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
	searchParams: Promise<{ tag?: string }>;
}

export default async function BlogListPage({ searchParams }: BlogPageProps) {
	// Await URL search parameters for live query tracking
	const { tag } = await searchParams;

	// 1. Fetch posts (Conditionally append relational array filters if a tag parameter exists)
	const posts = await db
		.select()
		.from(postsTable)
		.where(tag ? arrayContains(postsTable.tags, [tag]) : undefined)
		.orderBy(desc(postsTable.createdAt));

	// 2. Fetch all unique tags currently present across the database records to generate the filter pills
	const rawPosts = await db.select({ tags: postsTable.tags }).from(postsTable);
	const uniqueTags = Array.from(
		new Set(rawPosts.flatMap((p) => p.tags || [])),
	).sort();

	return (
		<>
			<LeaveBoardButton />

			<BlogWrapper>
				<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
					<div className="relative pb-2 md:pb-6 w-full">
						<TavernHeader />
					</div>

					{/* ATMOSPHERIC TAG FILTER UI BAR */}
					{uniqueTags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2 pb-6 mb-2 border-b border-amber-950/20 max-w-2xl mx-auto w-full relative z-30">
							{/* "All" Toggle Anchor */}
							<Link
								href="/blog"
								className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
									!tag
										? "bg-amber-500/10 border-amber-500/60 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
										: "bg-black/40 border-amber-950/60 text-amber-600/60 hover:text-amber-400 hover:border-amber-950"
								}`}
							>
								All Scrolls
							</Link>

							{/* Dynamic Filter Tags */}
							{uniqueTags.map((t) => (
								<Link
									key={t}
									href={`/blog?tag=${encodeURIComponent(t)}`}
									className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
										tag === t
											? "bg-amber-500/10 border-amber-500/60 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
											: "bg-black/40 border-amber-950/60 text-amber-600/60 hover:text-amber-400 hover:border-amber-950"
									}`}
								>
									🏷️ {t}
								</Link>
							))}
						</div>
					)}

					{/* 2. Grid framework structure displaying filtered post blocks inside Suspense containers */}
					<div className="mt-2 md:mt-6 flex-1 relative z-10">
						<Suspense
							fallback={
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
									<div className="h-48 w-full bg-amber-950/10 rounded-xs border border-amber-950/20" />
									<div className="h-48 w-full bg-amber-950/10 rounded-xs border border-amber-950/20" />
								</div>
							}
						>
							<QuestBoard posts={posts} />
						</Suspense>
					</div>
				</main>
			</BlogWrapper>
		</>
	);
}
