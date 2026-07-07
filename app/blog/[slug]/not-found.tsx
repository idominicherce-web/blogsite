// app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function PostNotFound() {
	return (
		<div className="min-h-screen bg-zinc-950 text-amber-100 font-serif antialiased flex items-center justify-center p-6 select-none">
			{/* SOLID IRON-BOUND NOT FOUND NOTICE SLATE */}
			<main className="max-w-md w-full rounded-lg border-4 border-amber-950 bg-linear-to-b from-[#25150b] via-[#1c0f08] to-[#120a05] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
				<div className="relative overflow-hidden rounded-md border border-zinc-950 bg-[#120a05] p-8 text-center space-y-5">
					{/* Corner Brackets */}
					<div className="absolute left-1.5 top-1.5 h-3 w-3 bg-zinc-800 border border-zinc-950 rounded-xs" />
					<div className="absolute right-1.5 top-1.5 h-3 w-3 bg-zinc-800 border border-zinc-950 rounded-xs" />

					<div className="text-4xl filter grayscale opacity-30 pt-2">📜</div>

					<h2 className="text-2xl font-black tracking-[0.2em] bg-linear-to-b from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent uppercase">
						Post Dissolved
					</h2>

					<p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-xs mx-auto">
						The dynamic chronicle scroll you are searching for does not exist or
						has been stripped from the board.
					</p>

					<div className="pt-4">
						<Link
							href="/blog"
							className="inline-flex items-center justify-center px-5 py-2 border border-zinc-700 bg-zinc-900 text-xs font-sans font-bold uppercase tracking-widest text-amber-400 hover:border-amber-500 hover:text-amber-300 rounded-sm shadow-md transition-all duration-200 cursor-pointer"
						>
							← Return to the Quest Board
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
