// app/blog/loading.tsx
import BlogWrapper from "@/components/BlogWrapper";

export default function Loading() {
	const skeletonKeys = [
		"scroll-skel-primary",
		"scroll-skel-secondary",
		"scroll-skel-tertiary",
	];

	return (
		<BlogWrapper>
			<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
				{/* SKELETON SECTION 1: TAVERN HEADER / NOTICE BOARD SIGN */}
				<header className="relative mb-8 md:mb-12 flex flex-col items-center select-none w-full animate-pulse">
					<div className="absolute top-0 left-1/2 hidden h-20 w-px -translate-x-32 bg-amber-950/20 md:block" />
					<div className="absolute top-0 left-1/2 hidden h-20 w-px translate-x-32 bg-amber-950/20 md:block" />

					<div className="relative w-full max-w-3xl mt-4 md:mt-14 rounded-md border-4 border-amber-950/40 bg-linear-to-b from-[#3d2411] to-[#251307] px-8 py-10 text-center shadow-lg">
						<div className="mx-auto h-4 w-28 bg-amber-900/40 rounded-sm mb-4" />
						<div className="mx-auto h-9 w-3/4 max-w-md bg-amber-900/30 rounded-md mb-4" />
						<div className="mx-auto space-y-2 max-w-lg">
							<div className="h-3 w-full bg-amber-900/20 rounded-sm" />
							<div className="h-3 w-4/5 bg-amber-900/20 rounded-sm mx-auto" />
						</div>
					</div>
				</header>

				{/* SKELETON SECTION 2: FILTER TAGS */}
				<div className="flex flex-wrap items-center justify-center gap-2 pb-6 mb-2 border-b border-amber-950/20 max-w-2xl mx-auto w-full animate-pulse">
					<div className="h-8 w-24 bg-amber-900/10 rounded-full" />
					<div className="h-8 w-20 bg-amber-900/10 rounded-full" />
					<div className="h-8 w-24 bg-amber-900/10 rounded-full" />
					<div className="h-8 w-16 bg-amber-900/10 rounded-full" />
				</div>

				{/* SKELETON SECTION 3: SORT CONTROLS BAR */}
				<div className="flex items-center justify-center gap-4 pb-8 pt-2 animate-pulse">
					<div className="h-4 w-28 bg-amber-800/15 rounded-sm" />
					<div className="h-8 w-64 bg-black/30 border border-amber-950/40 rounded-sm" />
				</div>

				{/* SKELETON SECTION 4: QUEST BOARD & PARCHMENT CARDS */}
				<div className="mt-2 md:mt-6 flex-1 relative z-10 w-full animate-pulse">
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{skeletonKeys.map((key) => (
							<div
								key={key}
								className="relative flex flex-col rounded-sm border-x-8 border-amber-900/5 bg-[#f5ebd5] p-5 space-y-4 shadow-md opacity-50 h-95"
								style={{
									backgroundColor: "#f5ebd5",
									backgroundImage: `
											repeating-linear-gradient(
												0deg,
												rgba(0,0,0,0.02),
												rgba(0,0,0,0.02) 1px,
												transparent 1px,
												transparent 12px
											)
										`,
								}}
							>
								<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(92,44,12,0.15)] z-30 mix-blend-multiply" />
								<div className="mx-auto h-3.5 w-3.5 rounded-full bg-stone-700/30 border border-stone-800/10 shadow-xs" />

								<div className="space-y-1.5 pt-4">
									<div className="h-6 w-11/12 bg-amber-950/20 rounded-sm" />
									<div className="h-6 w-2/3 bg-amber-950/20 rounded-sm" />
								</div>

								<div className="h-3 w-28 bg-amber-950/15 rounded-xs" />
								<div className="my-2 h-px bg-amber-950/20" />

								<div className="space-y-2 pt-2">
									<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
									<div className="h-4 w-full bg-stone-900/10 rounded-xs" />
									<div className="h-4 w-4/5 bg-stone-900/10 rounded-xs" />
								</div>

								<div className="mt-auto pt-3 border-t border-amber-950/10 flex items-center justify-between">
									<div className="flex gap-2">
										<div className="h-5 w-16 bg-amber-950/15 rounded-xs" />
										<div className="h-5 w-20 bg-amber-950/15 rounded-xs" />
									</div>
									<div className="h-4 w-24 bg-amber-950/25 rounded-xs" />
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</BlogWrapper>
	);
}
