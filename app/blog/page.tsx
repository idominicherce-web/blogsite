// app/blog/page.tsx

import { Suspense } from "react";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import QuestBoard from "@/components/QuestBoard";
import TavernHeader from "@/components/TavernHeader";
import { db } from "@/lib/db";

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
