// app/blog/page.tsx

import Link from "next/link";
import { db } from "@/lib/db";

export default async function BlogListPage() {
	// Fetch all posts from Neon sorted by newest first
	const allPosts = await db.query.posts.findMany({
		orderBy: (posts, { desc }) => [desc(posts.createdAt)],
	});

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
			<main className="max-w-4xl mx-auto p-6 space-y-8">
				<header className="border-b border-neutral-800 pb-6">
					<h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
						T a v e r N
					</h1>
					<p className="text-neutral-400 mt-2">Gather by the Hearth</p>
				</header>

				<div className="grid gap-6 md:grid-cols-2">
					{allPosts.length === 0 ? (
						<p className="text-neutral-500 col-span-2 text-center py-12">
							No posts found.
						</p>
					) : (
						allPosts.map((post) => (
							<article
								key={post.id}
								className="group relative flex flex-col items-start p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm hover:border-neutral-700 hover:bg-neutral-900/80 transition-all duration-200"
							>
								<h2 className="text-2xl font-bold tracking-tight mb-2 text-neutral-100 group-hover:text-blue-400 transition-colors duration-200">
									<Link
										href={`/blog/${post.slug}`}
										className="focus:outline-none"
									>
										{post.title}
									</Link>
								</h2>
								<p className="text-xs text-neutral-500 mb-4">
									{new Date(post.createdAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</p>
								<p className="text-neutral-400 text-sm line-clamp-3 mb-4 grow leading-relaxed">
									{post.body}
								</p>
								<Link
									href={`/blog/${post.slug}`}
									className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline mt-auto inline-flex items-center gap-1"
								>
									Read post →
								</Link>
							</article>
						))
					)}
				</div>
			</main>
		</div>
	);
}
