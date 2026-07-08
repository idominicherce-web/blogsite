// app/blog/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import QuestBoard from "@/components/QuestBoard";
import TavernHeader from "@/components/TavernHeader";
import { db } from "@/lib/db";

export const metadata: Metadata = {
	// ✅ Fixes absolute asset paths warning for the /blog subpath URL
	metadataBase: new URL("https://tavernblogs.vercel.app"),
	title: "The Notice Board",
	description: "Gather by the hearthstone and read active chronicles.",
	openGraph: {
		title: "The Notice Board | Tavern",
		description: "Gather by the hearthstone and read active chronicles.",
		url: "https://tavernblogs.vercel.app/blog",
		images: [
			{
				url: "/assets/notice-board.png",
				width: 1200,
				height: 630,
				alt: "The Tavern Notice Board",
			},
		],
		type: "website",
	},
};

// 1. Static shell fetches the posts (statically pre-rendered)
export default async function BlogListPage() {
	const posts = await db.query.posts.findMany({
		orderBy: (posts, { desc }) => [desc(posts.createdAt)],
	});

	return (
		<>
			<LeaveBoardButton />

			<BlogWrapper>
				<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
					<div className="relative pb-2 md:pb-6 w-full">
						<TavernHeader />
					</div>

					{/* 2. The grid frame renders as a static shell immediately, 
					  while dynamic features like dynamic comment badge counts are deferred inside the components.
					*/}
					<div className="mt-2 md:mt-6 flex-1 relative z-10">
						<Suspense
							fallback={
								<div className="h-40 w-full animate-pulse bg-amber-950/10 rounded-xl" />
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
