// app/blog/loading.tsx
export default function BlogListLoading() {
	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
			<main className="max-w-4xl mx-auto p-6 space-y-8">
				<header className="border-b border-neutral-800 pb-6 animate-pulse">
					<div className="h-10 w-64 bg-neutral-800 rounded-lg mb-3" />
					<div className="h-4 w-48 bg-neutral-800 rounded" />
				</header>

				<div className="grid gap-6 md:grid-cols-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={`skeleton-${i.toString()}`}
							className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4 animate-pulse"
						>
							<div className="h-7 w-3/4 bg-neutral-800 rounded-md" />
							<div className="h-4 w-24 bg-neutral-800 rounded" />
							<div className="space-y-2">
								<div className="h-4 w-full bg-neutral-800 rounded" />
								<div className="h-4 w-full bg-neutral-800 rounded" />
								<div className="h-4 w-2/3 bg-neutral-800 rounded" />
							</div>
							<div className="h-4 w-20 bg-neutral-800 rounded mt-4" />
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
