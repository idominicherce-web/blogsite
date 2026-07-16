// components/QuestBoard.tsx
import QuestCard from "./QuestCard";

type Post = {
	id: string;
	title: string;
	body: string;
	slug: string;
	createdAt: Date;
	coins: number; // Added coin count property[cite: 15]
};

interface QuestBoardProps {
	posts: Post[];
	search?: string; // 🔍 Dynamic search parameter passed down from the data container[cite: 14]
}

export default function QuestBoard({ posts, search }: QuestBoardProps) {
	return (
		<section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 select-none">
			{/* AMBER-PINE BOUND OUTER BOARD BEVEL[cite: 15] */}
			<div className="rounded-lg border-4 border-amber-950 bg-linear-to-b from-[#3d220a] via-[#2d1704] to-[#1f0f00] p-2.5 shadow-[0_40px_90px_rgba(0,0,0,0.95)]">
				<div className="relative overflow-hidden rounded-md border border-zinc-950 bg-[#1f1106] p-4 sm:p-6 lg:p-8">
					{/* Fine Wood Grain & Slat Texturing[cite: 15] */}
					<div
						className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
						style={{
							backgroundImage: `
								repeating-linear-gradient(
									90deg,
									#000 0px,
									#000 2px,
									transparent 2px,
									transparent 16px
								)
							`,
						}}
					/>

					{/* RUSTIC CAST-IRON CORNER BRACKETS[cite: 15] */}
					<div className="absolute left-2 top-2 h-5 w-5 border border-zinc-950 bg-linear-to-br from-zinc-700 to-zinc-800 shadow-xs rounded-xs" />
					<div className="absolute right-2 top-2 h-5 w-5 border border-zinc-950 bg-linear-to-br from-zinc-700 to-zinc-800 shadow-xs rounded-xs" />
					<div className="absolute bottom-2 left-2 h-5 w-5 border border-zinc-950 bg-linear-to-br from-zinc-700 to-zinc-800 shadow-xs rounded-xs" />
					<div className="absolute bottom-2 right-2 h-5 w-5 border border-zinc-950 bg-linear-to-br from-zinc-700 to-zinc-800 shadow-xs rounded-xs" />

					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_70%)] mix-blend-screen" />

					{posts.length === 0 ? (
						<div className="flex min-h-105 items-center justify-center py-12">
							<div className="max-w-md text-center space-y-4">
								<div className="text-4xl filter grayscale opacity-40">🔍</div>
								<h2 className="text-2xl font-black tracking-[0.2em] text-amber-100/90 uppercase">
									{search ? "No Chronicles Found" : "The Board is Empty"}
								</h2>

								<p className="text-sm font-serif italic text-zinc-500 leading-relaxed max-w-xs mx-auto">
									{search ? (
										<>
											"No scrolls matched your search query for{" "}
											<strong className="text-amber-500/90 font-bold">
												&ldquo;{search}&rdquo;
											</strong>
											. Try writing another legend or clearing your filter."
										</>
									) : (
										"No traveler has pinned an active note or chronicle upon the ledger yet."
									)}
								</p>
							</div>
						</div>
					) : (
						<div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
							{posts.map((post, index) => (
								<QuestCard
									key={post.id}
									id={post.id}
									title={post.title}
									body={post.body}
									slug={post.slug}
									createdAt={post.createdAt}
									coins={post.coins}
									index={index}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
