// app/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
			<main className="max-w-3xl mx-auto p-6 space-y-8">
				{/* Back Button Placeholder */}
				<nav className="animate-pulse">
					<div className="h-4 w-28 bg-neutral-800 rounded" />
				</nav>

				{/* Article Body Placeholder */}
				<article className="space-y-6 animate-pulse">
					<header className="border-b border-neutral-800 pb-6">
						<div className="h-10 w-5/6 bg-neutral-800 rounded-lg mb-4" />
						<div className="h-4 w-32 bg-neutral-800 rounded" />
					</header>

					<div className="space-y-3">
						<div className="h-4 w-full bg-neutral-800 rounded" />
						<div className="h-4 w-full bg-neutral-800 rounded" />
						<div className="h-4 w-11/12 bg-neutral-800 rounded" />
						<div className="h-4 w-full bg-neutral-800 rounded" />
						<div className="h-4 w-4/5 bg-neutral-800 rounded" />
					</div>
				</article>

				<hr className="border-neutral-800 my-8" />

				{/* Discussion Thread Section Placeholder */}
				<section className="space-y-4 animate-pulse">
					<div className="h-7 w-36 bg-neutral-800 rounded-md" />

					<div className="space-y-3">
						{Array.from({ length: 2 }).map((_, i) => (
							<div
								key={`comment-skeleton-${i.toString()}`}
								className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3"
							>
								<div className="flex items-center justify-between border-b border-neutral-800/50 pb-2">
									<div className="h-4 w-24 bg-neutral-800 rounded" />
									<div className="h-3 w-16 bg-neutral-800 rounded" />
								</div>
								<div className="h-4 w-5/6 bg-neutral-800 rounded" />
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
