// app/blog/[slug]/page.tsx

import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import CommentForm from "./CommentForm"; // <-- Import the Client Component Form

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;

	// Fetch the post matching the slug AND include its corresponding comments relationally
	const postWithComments = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
		with: {
			comments: true,
		},
	});

	if (!postWithComments) {
		notFound();
	}

	// Sort comments chronologically (oldest first) so conversation reads naturally downward
	const sortedComments = [...postWithComments.comments].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	);

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
			<main className="max-w-3xl mx-auto p-6 space-y-8">
				<nav>
					<Link
						href="/blog"
						className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1"
					>
						← Back to all posts
					</Link>
				</nav>

				{/* Blog Post Content Block */}
				<article className="space-y-6">
					<header className="border-b border-neutral-800 pb-6">
						<h1 className="text-4xl font-extrabold tracking-tight text-neutral-100 leading-tight mb-3">
							{postWithComments.title}
						</h1>
						<p className="text-xs text-neutral-500">
							Published on{" "}
							{new Date(postWithComments.createdAt).toLocaleDateString(
								"en-US",
								{
									month: "long",
									day: "numeric",
									year: "numeric",
								},
							)}
						</p>
					</header>

					<div className="text-neutral-300 text-lg leading-relaxed whitespace-pre-wrap">
						{postWithComments.body}
					</div>
				</article>

				<hr className="border-neutral-800 my-8" />

				{/* Relational Comments Section */}
				<section className="space-y-6">
					<h3 className="text-2xl font-bold text-neutral-100 tracking-tight">
						Discussion ({sortedComments.length})
					</h3>

					{/* MVP 7: Interactive Form rendering in place */}
					<div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-sm">
						<h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800/60 pb-2 mb-2">
							Leave a Comment
						</h4>
						<CommentForm postId={postWithComments.id} />
					</div>

					{/* Comments Thread List View */}
					<div className="space-y-4 pt-2">
						{sortedComments.length === 0 ? (
							<p className="text-neutral-500 text-sm italic bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
								No comments yet. Be the first to share your thoughts!
							</p>
						) : (
							sortedComments.map((comment) => (
								<div
									key={comment.id}
									className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2 shadow-sm"
								>
									<div className="flex items-center justify-between border-b border-neutral-800/50 pb-2">
										<span className="font-semibold text-blue-400 text-sm">
											{comment.authorName}
										</span>
										<span className="text-neutral-500 text-xs">
											{new Date(comment.createdAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</span>
									</div>
									<p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap pt-1">
										{comment.body}
									</p>
								</div>
							))
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
