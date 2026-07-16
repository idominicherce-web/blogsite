// app/blog/[slug]/page.tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LeaveBoardButton from "@/components/LeaveBoardButton";
import PostWrapper from "@/components/PostWrapper";
import TossCoinButton from "@/components/TossCoinButton";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import CommentSection from "./CommentSection";

interface PageProps {
	// MVP #5 REQUIREMENT: Both dynamic params and search query options are Promises in modern Next.js
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ admin?: string }>;
}

/**
 * ============================================================================
 * MVP FEATURE #5: INDIVIDUAL BLOG POST ROUTE
 * * Async Server Component resolving database queries from Neon directly on the server.
 * Triggers notFound() to contextually route visitors to the error fallback.
 * ============================================================================
 */
export default async function BlogPostPage({
	params,
	searchParams,
}: PageProps) {
	// MVP #5 REQUIREMENT: Asynchronously resolve route parameters before accessing values
	const { slug } = await params;
	const { admin } = await searchParams;

	// Query target database records using Drizzle ORM matching the dynamic route parameter
	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
	});

	// MVP #5 REQUIREMENT: If query is empty, instantly redirect execution flow to custom not-found page
	if (!post) {
		notFound();
	}

	// Dynamic Admin HUD configuration: Checks credentials against runtime environmental variables
	const ADMIN_PASSWORD = process.env.ADMIN_SECRET;
	const isAdmin = admin === ADMIN_PASSWORD;

	return (
		<>
			{/* Static Back Button Anchor (Uses Link to trigger client-side scroll restoration) */}
			<LeaveBoardButton text="Leave Post" href="/blog" />

			<PostWrapper>
				<main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12 md:space-y-16 relative z-10 pt-4 md:pt-16">
					{/* TOP HEADER STATUS ROW */}
					<nav className="flex flex-wrap items-center justify-between gap-2 pl-14 sm:pl-0 relative z-50">
						{/* 🛡️ VISUAL ADMINISTRATOR CONFIRMATION HUD (STRETCH #13) */}
						{isAdmin ? (
							<span
								className="
								inline-flex
								items-center
								whitespace-nowrap
								text-[9px]
								sm:text-[10px]
								font-sans
								font-extrabold
								uppercase
								tracking-[0.15em]
								bg-emerald-950/40
								border
								border-emerald-800/50
								px-2
								py-1
								sm:py-0.5
								rounded-xs
								animate-pulse
								text-emerald-400
							"
							>
								🛡️ Admin Mode Active
							</span>
						) : (
							<div className="h-4 sm:h-5" />
						)}

						{/* Document identifier index block */}
						<span className="text-[10px] font-sans text-zinc-400 tracking-widest uppercase whitespace-nowrap">
							Notice No. #{post.id.slice(0, 6)}
						</span>
					</nav>

					{/* PHYSICAL UNFLURLED SCROLL ARCHETYPE */}
					<div className="relative pt-6 pb-8 transition-all duration-500 group-hover/tavern:drop-shadow-[0_0_50px_rgba(245,158,11,0.08)]">
						{/* Scroll wood mounting endpin top bar */}
						<div className="absolute top-0 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#2a170c] via-[#4a2e1b] to-[#1f1007] border border-stone-950 shadow-md z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>

						{/* Parchment Body Wrapper with layered background patterns and depth shadows */}
						<article className="relative mx-1 sm:mx-3 px-4 sm:px-16 py-10 sm:py-12 bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] text-zinc-900 border-x-8 sm:border-x-12 border-amber-900/10 z-10 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.5),0_40px_100px_rgba(234,88,12,0.15),inset_0_-20px_80px_rgba(217,119,6,0.1)]">
							<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(139,92,26,0.15)] sm:shadow-[inset_0_0_60px_rgba(139,92,26,0.2)] mix-blend-multiply" />
							<div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-amber-900/10 mix-blend-color-burn opacity-80" />

							{/* Document Header Section */}
							<header className="text-center border-b-2 border-dashed border-amber-900/20 pb-6 mb-6 sm:pb-8 sm:mb-8 relative">
								{/* Aesthetic red wax seal representation */}
								<div className="mx-auto mb-4 w-10 h-10 rounded-full bg-linear-to-br from-red-600 to-red-900 shadow-md border-2 border-red-800/60 flex items-center justify-center font-sans text-xs text-red-100 font-bold tracking-tighter select-none opacity-95">
									D.H.
								</div>
								<p className="text-[10px] font-sans font-black uppercase tracking-[0.35em] text-amber-800/80">
									Royal Chronicle Post
								</p>

								{/* Core Title */}
								<h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-950 leading-tight mt-2 mb-3">
									{post.title}
								</h1>

								{/* Author & Timestamp Row */}
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

							{/* Main text contents */}
							<div className="text-zinc-900 text-base sm:text-xl leading-relaxed whitespace-pre-wrap font-serif italic text-justify tracking-wide">
								"{post.body}"
							</div>

							{/* Aesthetic footer flourish */}
							<footer className="mt-16 pt-8 border-t border-amber-900/20 space-y-6">
								<div className="flex justify-start pl-2 sm:pl-4">
									<TossCoinButton
										postId={post.id}
										postSlug={slug}
										initialCoins={post.coins}
									/>
								</div>

								{/* 📜 Distinct Decorative Separator (Fades out at the edges) */}
								<div className="w-full h-px bg-linear-to-r from-transparent via-amber-900/15 to-transparent" />

								{/* Centered Blessing & Star Section */}
								<div className="flex flex-col items-center justify-center space-y-3 text-center pt-2">
									<div className="text-amber-800/40 text-sm font-sans select-none">
										✦
									</div>

									<p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-amber-800/60 px-4">
										May this tale warm another traveler's heart.
									</p>
								</div>
							</footer>
						</article>

						{/* Scroll wood mounting endpin bottom bar */}
						<div className="absolute bottom-2 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#1f1007] via-[#4a2e1b] to-[#2a170c] border border-stone-950 shadow-lg z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>
					</div>

					{/* SENSE BOUNDARY (PARTIAL PRERENDERING / PPR COMPLIANT) */}
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
							{/* CommentSection handles database query isolation internally */}
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
