// components/TavernWrapper.tsx
import type React from "react";

export default function TavernWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const embers = Array.from({ length: 35 }).map((_, i) => ({
		id: i,
		left: `${((i * 7) % 92) + 4}%`,
		bottom: `${(i * 5) % 40}px`,
		size: i % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1",
		blur: i % 2 === 0 ? "blur-[0.5px]" : "blur-[1px]",
		delay: `${(i * 0.3).toFixed(1)}s`,
		duration: `${(i % 4) + 8}s`,
		color:
			i % 3 === 0
				? "bg-amber-400"
				: i % 2 === 0
					? "bg-orange-400"
					: "bg-red-400",
	}));

	return (
		<div className="min-h-screen bg-[#1a120d] text-zinc-100 font-serif relative overflow-x-hidden selection:bg-amber-300 selection:text-amber-950 group/tavern">
			<div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_100%)] mix-blend-multiply" />

			<div
				className="absolute inset-0 opacity-20 bg-[linear-gradient(#3a2418_1.5px,transparent_1.5px),linear-gradient(90deg,#3a2418_1.5px,transparent_1.5px)] bg-size-[140px_90px] pointer-events-none z-0"
				style={{
					maskImage:
						"radial-gradient(circle at 50% 30%, #000 30%, transparent 85%)",
					WebkitMaskImage:
						"radial-gradient(circle at 50% 30%, #000 30%, transparent 85%)",
				}}
			/>

			{/* Ceiling Beams */}
			<div className="absolute top-0 inset-x-0 h-10 bg-linear-to-b from-[#2a1b13] to-[#1a120d] border-b-4 border-[#3a2418] shadow-xl z-30 opacity-95 pointer-events-none">
				<div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-900/40" />
				<div className="absolute left-1/4 top-0 w-16 h-10 bg-[#211610] border-r border-amber-900/20" />
				<div className="absolute right-1/4 top-0 w-16 h-10 bg-[#211610] border-l border-amber-900/20" />
			</div>

			{/* Side Pillars - Hidden on mobile to avoid squeezing layout content */}
			<div className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-[#1a120d] to-[#2a1b13] border-r border-[#3a2418]/40 shadow-xl opacity-90 z-30 pointer-events-none hidden lg:block" />
			<div className="absolute inset-y-0 right-0 w-4 bg-linear-to-l from-[#1a120d] to-[#2a1b13] border-l border-[#3a2418]/40 shadow-xl opacity-90 z-30 pointer-events-none hidden lg:block" />

			{/* Lanterns - Hidden on mobile layout frames */}
			<div className="absolute top-10 left-[6%] w-px h-32 bg-zinc-700/40 z-20 hidden xl:block">
				<div className="absolute -bottom-2 -left-1.5 w-3 h-4 bg-amber-700 border border-amber-900 rounded-xs animate-[pulse_2.5s_infinite]" />
				<div className="absolute -bottom-16 -left-32 w-64 h-64 bg-radial from-amber-500/15 via-orange-600/5 to-transparent blur-2xl pointer-events-none animate-[pulse_4s_infinite_ease-in-out]" />
			</div>
			<div className="absolute top-10 right-[6%] w-px h-40 bg-zinc-700/40 z-20 hidden xl:block">
				<div className="absolute -bottom-2 -left-1.5 w-3 h-4 bg-amber-700 border border-amber-900 rounded-xs animate-[pulse_3s_infinite]" />
				<div className="absolute -bottom-20 -left-32 w-64 h-64 bg-radial from-amber-500/15 via-orange-600/5 to-transparent blur-2xl pointer-events-none animate-[pulse_3.5s_infinite_ease-in-out]" />
			</div>

			{/* Fluid Heat Embers */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-35 select-none">
				{embers.map((ember) => (
					<div
						key={ember.id}
						className={`absolute ${ember.size} ${ember.color} ${ember.blur} rounded-full animate-ember`}
						style={{
							left: ember.left,
							bottom: ember.bottom,
							animationDelay: ember.delay,
							animationDuration: ember.duration,
						}}
					/>
				))}
			</div>

			{/* 🪵 MOBILE-FIRST TIMBER FLOOR: Scaled down to h-24 on mobile, expands to h-40 on desktop */}
			<div className="absolute bottom-0 inset-x-0 h-24 md:h-40 bg-linear-to-b from-[#211610] to-[#150e0a] border-t-8 border-[#2c1d15] pointer-events-none z-0">
				<div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,transparent_95%,#000_95%),linear-gradient(to_right,transparent_98%,#3a2418_98%)] bg-size-[240px_100%]" />
			</div>

			<div className="relative z-10 w-full">{children}</div>
		</div>
	);
}
