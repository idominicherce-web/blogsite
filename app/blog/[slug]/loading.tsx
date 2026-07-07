// app/blog/[slug]/loading.tsx
import PostWrapper from "@/components/PostWrapper";

export default function BlogPostLoading() {
	return (
		<PostWrapper>
			{/* Main responsive padding core constraints align perfectly with page.tsx */}
			<main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12 md:space-y-16 relative z-10 pt-4 md:pt-16">
				{/* Back Button / Notice Identifier Row Area Placeholder */}
				<nav className="flex items-center justify-end relative z-20 animate-pulse">
					<div className="h-3 w-24 bg-amber-900/20 rounded-xs" />
				</nav>

				{/* SKELETON HIGH-CONTRAST UNFLURLED SCROLL */}
				<div className="relative pt-6 pb-8 animate-pulse">
					{/* Scroll Endpins Top Bar */}
					<div className="absolute top-0 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#2a170c] via-[#4a2e1b] to-[#1f1007] border border-stone-950/40 z-30 flex items-center justify-between px-6" />

					{/* Parchment Paper Structural Body */}
					<article className="relative mx-1 sm:mx-3 px-4 sm:px-16 py-10 sm:py-12 bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] border-x-8 sm:border-x-12 border-amber-900/10 z-10 rounded-sm shadow-md">
						{/* Document Header Section */}
						<header className="text-center border-b-2 border-dashed border-amber-900/20 pb-6 mb-6 sm:pb-8 sm:mb-8 relative flex flex-col items-center">
							{/* Wax Seal Circle Shell */}
							<div className="mb-4 w-10 h-10 rounded-full bg-red-800/20 border-2 border-red-900/10" />
							{/* Chronicle Tag Label */}
							<div className="h-3 w-32 bg-amber-900/20 rounded-sm mb-3" />
							{/* Dynamic Post Title Blocks */}
							<div className="h-7 w-5/6 bg-amber-950/20 rounded-md mb-2" />
							<div className="h-7 w-1/2 bg-amber-950/20 rounded-md mb-4" />
							{/* Author / Date Dateline */}
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

						{/* Signature Flourish Footer Endcap */}
						<footer className="mt-12 pt-6 border-t border-amber-900/20 flex flex-col items-center space-y-2">
							<div className="h-3 w-3 bg-amber-800/20 rotate-45" />
							<div className="h-3 w-48 bg-amber-800/15 rounded-xs" />
						</footer>
					</article>

					{/* Scroll Endpins Bottom Bar */}
					<div className="absolute bottom-2 inset-x-2 sm:inset-x-4 h-5 rounded-full bg-linear-to-b from-[#1f1007] via-[#4a2e1b] to-[#2a170c] border border-stone-950/40 z-30" />
				</div>

				{/* SKELETON GUESTBOOK GUEST INTERACTION GRID */}
				<section className="space-y-6 sm:space-y-8 relative z-10 animate-pulse">
					{/* Header Label bar */}
					<div className="flex items-center justify-between border-b border-[#3a2418] pb-2">
						<div className="h-5 w-36 bg-amber-900/20 rounded-sm" />
						<div className="h-3 w-20 bg-amber-900/20 rounded-sm" />
					</div>

					{/* Writing Desk Box */}
					<div className="rounded-xl border-2 sm:border-4 border-[#4a3225]/40 bg-linear-to-b from-[#3a2418]/60 to-[#251710]/60 p-3 sm:p-5">
						<div className="bg-[#1f140e]/80 rounded-md h-32 border border-[#4a3225]/20" />
					</div>

					{/* Leather Bound registry shell placeholder */}
					<div className="relative rounded-xl border-t-[3px] border-b-[5px] border-x-6 sm:border-x-12 border-[#3a1f10]/40 bg-linear-to-b from-[#fdf6e2] to-[#f5ebd5] h-56 p-6 shadow-md">
						<div className="w-1/3 h-5 bg-amber-950/20 rounded-sm border-b-2 mb-6" />
						<div className="space-y-4">
							<div className="h-4 w-3/4 bg-stone-900/10 rounded-xs" />
							<div className="h-3 w-1/4 bg-stone-900/5 rounded-xs" />
							<div className="h-px bg-amber-950/10 w-full my-2" />
							<div className="h-4 w-5/6 bg-stone-900/10 rounded-xs" />
						</div>
					</div>
				</section>
			</main>
		</PostWrapper>
	);
}
