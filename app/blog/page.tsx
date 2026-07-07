// app/blog/page.tsx
import QuestBoard from "@/components/QuestBoard";
import TavernHeader from "@/components/TavernHeader";
import BlogWrapper from "@/components/BlogWrapper";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import { db } from "@/lib/db";

export default async function BlogListPage() {
	const posts = await db.query.posts.findMany({
		orderBy: (posts, { desc }) => [desc(posts.createdAt)],
	});

	return (
		<>
			{/* PORTALLED: Rendered outside the wrapper to bypass overflow clipping completely */}
			<LeaveBoardButton />

			<BlogWrapper>
				<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
					<div className="relative pb-2 md:pb-6 w-full">
						<TavernHeader />
					</div>

					<div className="mt-2 md:mt-6 flex-1 relative z-10">
						<QuestBoard posts={posts} />
					</div>
				</main>
			</BlogWrapper>
		</>
	);
}
