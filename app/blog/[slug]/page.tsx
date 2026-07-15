// app/blog/[slug]/page.tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import PostWrapper from "@/components/PostWrapper";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import CommentSection from "./CommentSection";

interface PageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ admin?: string }>;
}

export default async function BlogPostPage({
	params,
	searchParams,
}: PageProps) {
	const { slug } = await params;
	const { admin } = await searchParams;

	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
	});

	if (!post) {
		notFound();
	}

	const ADMIN_PASSWORD = process.env.ADMIN_SECRET || "tavern2026";
	const isAdmin = admin === ADMIN_PASSWORD;

	return (
		<>
			<LeaveBoardButton text="Leave Chronicles" href="/blog" />

			<PostWrapper>
				<main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12 md:space-y-16 relative z-10 pt-4 md:pt-16">
					<nav className="flex items-center justify-between relative z-20">
						{isAdmin ? (
							<span className="text-[10px] font-sans text-emerald-400 font-extrabold tracking-widest uppercase bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-xs animate-pulse">
								🛡️ Admin Mode Active
							</span>
						) : (
							<div />
						)}
						<span className="text-[10px] font-sans text-zinc-400 tracking-widest uppercase">
							Notice No. #{post.id.slice(0, 6)}
						</span>
					</nav>

					<div className="relative pt-6 pb-8 transition-all duration-500 group-hover/tavern:drop-shadow-[0_0_50px_rgba(245,158,11,0.08)]">
						<div className="absolute top-0 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#2a170c] via-[#4a2e1b] to-[#1f1007] border border-stone-950 shadow-md z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>

						<article className="relative mx-1 sm:mx-3 px-4 sm:px-16 py-10 sm:py-12 bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] text-zinc-900 border-x-8 sm:border-x-12 border-amber-900/10 z-10 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.5),0_40px_100px_rgba(234,88,12,0.15),inset_0_-20px_80px_rgba(217,119,6,0.1)]">
							<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(139,92,26,0.15)] sm:shadow-[inset_0_0_60px_rgba(139,92,26,0.2)] mix-blend-multiply" />
							<div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-amber-900/10 mix-blend-color-burn opacity-80" />

							<header className="text-center border-b-2 border-dashed border-amber-900/20 pb-6 mb-6 sm:pb-8 sm:mb-8 relative">
								<div className="mx-auto mb-4 w-10 h-10 rounded-full bg-linear-to-br from-red-600 to-red-900 shadow-md border-2 border-red-800/60 flex items-center justify-center font-sans text-xs text-red-100 font-bold tracking-tighter select-none opacity-95">
									D.H.
								</div>
								<p className="text-[10px] font-sans font-black uppercase tracking-[0.35em] text-amber-800/80">
									Royal Chronicle Post
								</p>

								<h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-950 leading-tight mt-2 mb-3">
									{post.title}
								</h1>

								<div className="text-xs font-sans text-amber-800 font-semibold tracking-wide">
									Penned by{" "}
									<span className="text-zinc-900 underline decoration-amber-900/30">
										Dominic Herce
									</span>{" "}
									•{" "}
									<span className="block sm:inline">
										Published{" "}
										{new Date(post.createdAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</span>
								</div>
							</header>

							<div className="text-zinc-900 text-base sm:text-xl leading-relaxed whitespace-pre-wrap font-serif italic text-justify tracking-wide">
								"{post.body}"
							</div>

							<footer className="mt-12 pt-6 border-t border-amber-900/20 text-center space-y-2">
								<div className="text-amber-800/40 text-xl font-sans">✦</div>
								<p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-amber-800/60">
									May this tale warm another traveler's heart.
								</p>
							</footer>
						</article>

						<div className="absolute bottom-2 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#1f1007] via-[#4a2e1b] to-[#2a170c] border border-stone-950 shadow-lg z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>
					</div>

					{/* Discussion Ledger Board Container */}
					<div className="pt-2 relative z-20">
						<Suspense
							fallback={
								<div className="space-y-4 animate-pulse bg-amber-950/10 p-8 rounded">
									<div className="h-6 w-32 bg-amber-900/20 rounded">
										<div className="h-40 w-full bg-amber-900/20 rounded" />
									</div>
								</div>
							}
						>
							{/* 🔌 Correctly matching fields dispatched down to child types */}
							<CommentSection
								postId={post.id}
								postSlug={slug}
								isAdmin={isAdmin}
							/>
						</Suspense>
					</div>
				</main>
			</PostWrapper>
		</>
	);
}
