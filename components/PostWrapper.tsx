// components/PostWrapper.tsx
import type React from "react";

export default function PostWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const embers = Array.from({ length: 35 }).map((_, i) => ({
		id: i,
		left: `${((i * 7) % 90) + 5}%`,
		bottom: `${(i * 3) % 20}px`,
		size: i % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1",
		blur: i % 2 === 0 ? "blur-[0.5px]" : "blur-[1px]",
		delay: `${(i * 0.4).toFixed(1)}s`,
		duration: `${(i % 4) + 6}s`,
		color:
			i % 3 === 0
				? "bg-amber-400"
				: i % 2 === 0
					? "bg-orange-400"
					: "bg-red-400",
	}));

	return (
		<div className="min-h-screen bg-[#1a120d] text-zinc-100 font-serif antialiased pb-32 relative overflow-x-hidden selection:bg-amber-300 selection:text-amber-950 group/tavern">
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

			{/* Top Boundary Accent */}
			<div className="absolute top-0 inset-x-0 h-10 bg-linear-to-b from-[#2a1b13] to-[#1a120d] border-b-4 border-[#3a2418] shadow-xl z-30 opacity-95">
				<div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-900/40" />
				<div className="absolute left-1/4 top-0 w-16 h-10 bg-[#211610] border-r border-amber-900/20" />
				<div className="absolute right-1/4 top-0 w-16 h-10 bg-[#211610] border-l border-amber-900/20" />
			</div>

			<div className="absolute top-10 left-[8%] w-px h-32 bg-zinc-700/50 z-20 hidden md:block">
				<div className="absolute -bottom-2 -left-1.5 w-3 h-4 bg-amber-700 border border-amber-900 rounded-xs animate-[pulse_2.5s_infinite]" />
				<div className="absolute -bottom-16 -left-32 w-64 h-64 bg-radial from-amber-500/15 via-orange-600/5 to-transparent blur-2xl pointer-events-none animate-[pulse_4s_infinite_ease-in-out]" />
			</div>
			<div className="absolute top-10 right-[8%] w-px h-40 bg-zinc-700/50 z-20 hidden md:block">
				<div className="absolute -bottom-2 -left-1.5 w-3 h-4 bg-amber-700 border border-amber-900 rounded-xs animate-[pulse_3s_infinite]" />
				<div className="absolute -bottom-20 -left-32 w-64 h-64 bg-radial from-amber-500/15 via-orange-600/5 to-transparent blur-2xl pointer-events-none animate-[pulse_3.5s_infinite_ease-in-out]" />
			</div>

			{/* FLAME TOP SHADES: Made fluid to respect compact viewports cleanly */}
			<div className="absolute -top-32 left-1/2 translate-x-[-50%] h-72 w-72 md:h-120 md:w-120 rounded-full bg-radial from-orange-600/15 via-red-700/5 to-transparent blur-[80px] md:blur-[120px] pointer-events-none z-0 mix-blend-screen animate-[pulse_1.8s_infinite_alternate_ease-in-out]" />
			<div className="absolute -top-20 left-1/2 translate-x-[-50%] h-48 w-48 md:h-80 md:w-80 rounded-full bg-radial from-yellow-500/10 via-orange-600/5 to-transparent blur-[50px] md:blur-[80px] pointer-events-none z-0 mix-blend-screen animate-[pulse_1.2s_infinite_alternate_ease-in-out_0.2s] scale-x-125 scale-y-110" />

			{/* Flooring Layout */}
			<div className="absolute bottom-0 inset-x-0 h-24 md:h-162.5 bg-linear-to-b from-[#211610] to-[#150e0a] border-t-8 border-[#2c1d15] pointer-events-none z-0">
				<div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,transparent_95%,#000_95%),linear-gradient(to_right,transparent_98%,#3a2418_98%)] bg-size-[240px_100%]" />
			</div>

			<div className="absolute bottom-0 left-1/2 translate-x-[-50%] w-full max-w-5xl h-162.5 bg-radial from-orange-600/5 via-amber-700/2 to-transparent blur-3xl pointer-events-none z-0 mix-blend-screen" />

			<div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden z-20 opacity-40 select-none">
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

			<div className="relative z-10 w-full">{children}</div>
		</div>
	);
}
