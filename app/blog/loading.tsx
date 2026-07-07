// app/blog/loading.tsx
import BlogWrapper from "@/components/BlogWrapper";

export default function BlogListLoading() {
	return (
		<BlogWrapper>
			{/* Main bounding layout container mirrors app/blog/page.tsx exactly */}
			<main className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 pb-24 sm:px-6 md:pt-16 md:pb-48 lg:px-8">
				{/* 1. SKELETON TAVERN HEADER / NOTICE BOARD */}
				<header className="relative mb-8 md:mb-12 flex flex-col items-center select-none w-full animate-pulse">
					{/* Placeholder for the hanging support bars */}
					<div className="absolute top-0 left-1/2 hidden h-20 w-px -translate-x-32 bg-amber-950/20 md:block" />
					<div className="absolute top-0 left-1/2 hidden h-20 w-px translate-x-32 bg-amber-950/20 md:block" />

					{/* Honey-Oak Sign Board Silhouette */}
					<div className="relative w-full max-w-3xl mt-4 md:mt-14 rounded-md border-4 border-amber-950/40 bg-linear-to-b from-[#3d2411] to-[#251307] px-8 py-10 text-center shadow-lg">
						{/* Active Postings Text Line */}
						<div className="mx-auto h-4 w-28 bg-amber-900/40 rounded-sm mb-4" />
						{/* The Notice Board Main Title */}
						<div className="mx-auto h-9 w-3/4 max-w-md bg-amber-900/30 rounded-md mb-4" />
						{/* Description Subtext Blocks */}
						<div className="mx-auto space-y-2 max-w-lg">
							<div className="h-3 w-full bg-amber-900/20 rounded-sm" />
							<div className="h-3 w-4/5 bg-amber-900/20 rounded-sm mx-auto" />
						</div>
					</div>
				</header>

				{/* 2. SKELETON QUEST BOARD / CONTRACT CARDS */}
				{/* Represents the QuestBoard backdrop frame containing individual contracts */}
				<div className="mt-2 md:mt-6 flex-1 relative z-10 w-full animate-pulse">
					{/* Darker wood frame container of the board */}
					<div className="rounded-xl border-4 border-[#3a2418]/60 bg-[#251710]/40 p-4 sm:p-6 md:p-8">
						{/* Grid layout mimics your inner responsive QuestBoard columns */}
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={`contract-skeleton-${i.toString()}`}
									className="relative flex flex-col rounded-sm border-x-8 border-amber-900/5 bg-linear-to-b from-[#fdf6e2] to-[#f5ebd5] p-5 space-y-4 shadow-md opacity-75"
								>
									{/* Thumbtack / Pin Silhouette */}
									<div className="mx-auto h-3 w-3 rounded-full bg-stone-700/30 border border-stone-800/10 shadow-xs" />

									{/* Post Title */}
									<div className="space-y-1.5 pt-1">
										<div className="h-5 w-11/12 bg-amber-900/20 rounded-sm" />
										<div className="h-5 w-2/3 bg-amber-900/20 rounded-sm" />
									</div>

									{/* Meta Timestamp Dispatched Date */}
									<div className="h-3 w-28 bg-amber-900/15 rounded-xs" />

									{/* Excerpt/Body lines */}
									<div className="space-y-2 pt-2">
										<div className="h-3.5 w-full bg-stone-900/10 rounded-xs" />
										<div className="h-3.5 w-full bg-stone-900/10 rounded-xs" />
										<div className="h-3.5 w-4/5 bg-stone-900/10 rounded-xs" />
									</div>

									{/* Bottom Action Link Indicator */}
									<div className="h-3 w-16 bg-amber-900/20 rounded-xs mt-auto pt-4" />
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</BlogWrapper>
	);
}
