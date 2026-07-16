// components/TavernHeader.tsx
"use client";

import { motion } from "framer-motion";

export default function TavernHeader() {
	return (
		<header className="relative mb-8 md:mb-12 flex flex-col items-center select-none w-full">
			{/* Brighter Hearth Glow */}
			<div className="absolute -top-32 h-120 w-120 rounded-full bg-red-500/20 blur-[120px] pointer-events-none" />

			{/* Hanging support bars */}
			<div className="absolute top-0 left-1/2 hidden h-20 w-px -translate-x-32 bg-zinc-700 md:block opacity-40" />
			<div className="absolute top-0 left-1/2 hidden h-20 w-px translate-x-32 bg-zinc-700 md:block opacity-40" />

			{/* HONEY-OAK BOUNTY BOARD SIGN */}
			<motion.div
				className="relative w-full max-w-3xl mt-4 md:mt-14"
				animate={{ rotate: [-0.4, 0.4, -0.4] }}
				transition={{
					duration: 7,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<div className="relative rounded-md border-4 border-amber-950 bg-linear-to-b from-[#4a2c11] via-[#3d220a] to-[#2b1604] px-4 py-8 sm:px-8 sm:py-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
					<div
						className="absolute inset-0 rounded-md opacity-25 mix-blend-overlay pointer-events-none"
						style={{
							backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 16px)`,
						}}
					/>

					<div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-zinc-700 border border-zinc-950 shadow-xs" />
					<div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-zinc-700 border border-zinc-950 shadow-xs" />
					<div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-zinc-700 border border-zinc-950 shadow-xs" />
					<div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-zinc-700 border border-zinc-950 shadow-xs" />

					<p className="relative z-10 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.4em] text-amber-400">
						Active Postings
					</p>

					<h1 className="relative z-10 mt-3 text-2xl font-black tracking-[0.15em] sm:tracking-[0.25em] text-amber-50 sm:text-4xl uppercase drop-shadow-md">
						The Notice Board
					</h1>

					<p className="relative z-10 mt-4 max-w-lg mx-auto text-xs sm:text-sm text-amber-100/70 italic font-serif leading-relaxed">
						"Inscriptions, tales, and chronicles with notes from travelers who
						passed through these iron doors."
					</p>
				</div>
				<div className="absolute inset-0 rounded-md shadow-[inset_0_2px_6px_rgba(255,255,255,0.05),inset_0_-4px_12px_rgba(0,0,0,0.8)] pointer-events-none" />
			</motion.div>
		</header>
	);
}
