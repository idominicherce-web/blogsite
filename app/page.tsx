// app/page.tsx
import TavernBoard from "@/components/TavernBoard";
import TavernDoor from "@/components/TavernDoor";
import TavernWrapper from "@/components/TavernWrapper";

export default function TavernLandingPage() {
	return (
		<TavernWrapper>
			{/* Spreads elements naturally with responsive bottom paddings */}
			<div className="relative flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 pt-16 pb-36 md:pb-48 overflow-hidden">
				{/* Ambient Header Shell */}
				<header className="relative z-10 w-full text-center max-w-xl mt-4 px-2">
					{/* Mobile-first responsive text sizes and fluid tracking metrics to prevent edge clipping */}
					<h1 className="bg-linear-to-b from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.25em] sm:tracking-[0.4em] text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.2)] pl-[0.25em] sm:pl-[0.4em]">
						TAVERN
					</h1>
					<p className="mt-3 text-[10px] sm:text-xs font-sans uppercase tracking-[0.35em] sm:tracking-[0.5em] text-amber-600/80 pl-[0.35em] sm:pl-[0.5em]">
						Gather by the Hearthstone
					</p>
				</header>

				{/* Centerpiece Focus Array */}
				<main className="relative z-10 w-full mt-auto mb-4 flex flex-col items-center justify-center gap-6 sm:gap-8 py-2">
					{/* THE DOOR ISOLATION FRAME */}
					<div className="relative pb-4 w-full flex flex-col items-center justify-center">
						<div className="relative z-10 scale-90 sm:scale-100 transition-transform">
							<TavernDoor />
						</div>
						{/* Real-time ambient contact floor shadow */}
						<div className="absolute bottom-0 left-1/2 translate-x-[-50%] w-full max-w-xs h-4 bg-black/60 blur-md rounded-full z-0 mix-blend-multiply pointer-events-none" />
					</div>

					{/* Compact Minimalist Notice Board Ledger */}
					<div className="w-full px-2">
						<TavernBoard />
					</div>
				</main>

				{/* Immersive Micro Footer */}
				<footer className="relative z-10 text-center text-[10px] sm:text-xs font-sans tracking-[0.25em] text-zinc-500 uppercase mt-auto pt-4">
					<p>✦ Est. 2026 ✦</p>
				</footer>
			</div>
		</TavernWrapper>
	);
}
