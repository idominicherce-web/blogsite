// app/blog/[slug]/page.tsx

import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import CommentSection from "./CommentSection"; // <-- Import the new split section

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;

	// Fetch only the post content here for the static shell
	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
	});

	if (!post) {
		notFound();
	}

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

				{/* Static Shell Content (Compiled at build-time) */}
				<article className="space-y-6">
					<header className="border-b border-neutral-800 pb-6">
						<h1 className="text-4xl font-extrabold tracking-tight text-neutral-100 leading-tight mb-3">
							{post.title}
						</h1>
						<p className="text-xs text-neutral-500">
							Published on{" "}
							{new Date(post.createdAt).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</header>

					<div className="text-neutral-300 text-lg leading-relaxed whitespace-pre-wrap">
						{post.body}
					</div>
				</article>

				<hr className="border-neutral-800 my-8" />

				{/* ✅ Item 10 FULFILLED: Suspense block marks this as an individual dynamic streaming chunk */}
				<Suspense
					fallback={
						<div className="space-y-4 animate-pulse">
							<div className="h-7 w-32 bg-neutral-900 rounded border border-neutral-800" />
							<div className="h-32 w-full bg-neutral-900 rounded-xl border border-neutral-800" />
						</div>
					}
				>
					<CommentSection postId={post.id} />
				</Suspense>
			</main>
		</div>
	);
}
