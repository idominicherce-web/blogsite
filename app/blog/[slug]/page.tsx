// app/blog/[slug]/page.tsx

import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
	// Await the dynamic routing params per Next.js standards
	const { slug } = await params;

	// Query Neon to find the specific post matching this unique slug string
	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
	});

	// Mandatory Constraint: Call notFound() if the slug doesn't exist in the DB
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

				{/* Relational Comment Section Container */}
				<section className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
					<h3 className="text-xl font-bold text-neutral-100 tracking-tight">
						Discussion Thread
					</h3>
					<p className="text-neutral-400 text-sm leading-relaxed">
						Comments are currently locked. We will wire up relational comments
						fetching next!
					</p>
				</section>
			</main>
		</div>
	);
}
