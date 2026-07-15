// app/blog/[slug]/loading.tsx
import LeaveBoardButton from "@/components/LeaveBoardButton";
import PostWrapper from "@/components/PostWrapper";

export default function BlogPostLoading() {
	return (
		<>
			{/* Keeps the back button structurally present to prevent popping layout-shift */}
			<LeaveBoardButton text="Leave Chronicles" href="/blog" />

			<PostWrapper>
				<main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12 md:space-y-16 relative z-10 pt-4 md:pt-16">
					{/* Header Navigation Area (Matches the z-50 and exact paddings to clear the button) */}
					<nav className="flex flex-wrap items-center justify-between gap-2 pl-14 sm:pl-0 relative z-50 animate-pulse">
						{/* Admin HUD Spacer Placeholder */}
						<div className="h-4 sm:h-5 w-28 bg-emerald-950/10 rounded-xs" />

						{/* Notice Identifier Placeholder */}
						<div className="h-3 w-24 bg-amber-900/20 rounded-xs" />
					</nav>

					{/* SKELETON HIGH-CONTRAST UNFLURLED SCROLL */}
					<div className="relative pt-6 pb-8 animate-pulse">
						{/* Scroll Endpins Top Bar (With exact rivet dots) */}
						<div className="absolute top-0 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#2a170c] via-[#4a2e1b] to-[#1f1007] border border-stone-950 shadow-md z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>

						{/* Parchment Paper Structural Body (With exact shadows, borders and inner overlays) */}
						<article className="relative mx-1 sm:mx-3 px-4 sm:px-16 py-10 sm:py-12 bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] border-x-8 sm:border-x-12 border-amber-900/10 z-10 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.5),0_40px_100px_rgba(234,88,12,0.15),inset_0_-20px_80px_rgba(217,119,6,0.1)]">
							{/* Core Parchment Overlays */}
							<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(139,92,26,0.15)] sm:shadow-[inset_0_0_60px_rgba(139,92,26,0.2)] mix-blend-multiply" />
							<div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-amber-900/10 mix-blend-color-burn opacity-80" />

							{/* Document Header Section (Using static visual assets to prevent flicker) */}
							<header className="text-center border-b-2 border-dashed border-amber-900/20 pb-6 mb-6 sm:pb-8 sm:mb-8 relative flex flex-col items-center">
								{/* Wax Seal Circle Shell */}
								<div className="mx-auto mb-4 w-10 h-10 rounded-full bg-linear-to-br from-red-600 to-red-900 shadow-md border-2 border-red-800/60 flex items-center justify-center font-sans text-xs text-red-100 font-bold tracking-tighter select-none opacity-95">
									D.H.
								</div>
								{/* Chronicle Tag Label */}
								<p className="text-[10px] font-sans font-black uppercase tracking-[0.35em] text-amber-800/80">
									Royal Chronicle Post
								</p>

								{/* Dynamic Post Title Blocks */}
								<div className="mt-3 mb-2 h-8 w-5/6 bg-amber-950/20 rounded-md" />
								<div className="h-8 w-1/2 bg-amber-950/20 rounded-md mb-4" />

								{/* Author / Date Dateline Line placeholder */}
								<div className="h-3.5 w-48 bg-amber-900/15 rounded-sm" />
							</header>

							{/* Document Manuscript Core Lines (Mimicking font-serif italic bodies) */}
							<div className="space-y-4 pt-2">
								<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-11/12 bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-5/6 bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
								<div className="h-4 w-2/3 bg-stone-900/10 rounded-xs" />
							</div>

							{/* Signature Flourish Footer Endcap (Replicated exactly to keep static content stable) */}
							<footer className="mt-12 pt-6 border-t border-amber-900/20 text-center space-y-2">
								<div className="text-amber-800/40 text-xl font-sans">✦</div>
								<p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-amber-800/60">
									May this tale warm another traveler's heart.
								</p>
							</footer>
						</article>

						{/* Scroll Endpins Bottom Bar (With exact rivet dots) */}
						<div className="absolute bottom-2 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#1f1007] via-[#4a2e1b] to-[#2a170c] border border-stone-950 shadow-lg z-30 flex items-center justify-between px-6">
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
							<div className="w-2 h-2 bg-yellow-600/50 rounded-full border border-yellow-800 shadow-xs" />
						</div>
					</div>

					{/* SKELETON GUESTBOOK GUEST INTERACTION GRID (Matches the page's local Comment Section suspense) */}
					<div className="pt-2 relative z-20">
						<section className="space-y-4 animate-pulse bg-amber-950/10 p-8 rounded">
							<div className="h-6 w-32 bg-amber-900/20 rounded" />
							<div className="h-40 w-full bg-amber-900/20 rounded" />
						</section>
					</div>
				</main>
			</PostWrapper>
		</>
	);
}
