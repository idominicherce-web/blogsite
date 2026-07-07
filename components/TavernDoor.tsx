"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TavernDoor() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	return (
		<div className="flex justify-center select-none p-4">
			{/* 🪨 STATIC STONE ARCHWAY (The Outer Frame - Never enters 3D context) */}
			<div
				className="
				relative
				w-[48vw]
				max-w-70
				min-w-47.5
				aspect-[3/4.2]
				rounded-t-[8rem]
				rounded-b-md
				bg-linear-to-b from-zinc-900 via-zinc-800 to-zinc-950
				p-2.5
				shadow-[0_45px_100px_rgba(0,0,0,0.95)]
				border border-zinc-900/60
			"
			>
				{/* 💡 DYNAMIC LIGHT SPILL OVERLAY */}
				{/* When the door opens, warm firelight bleeds onto the stone frame edges */}
				<motion.div
					className="absolute inset-0 rounded-t-[8rem] rounded-b-md bg-radial from-amber-500/20 via-orange-600/5 to-transparent opacity-0 mix-blend-screen pointer-events-none z-30 transition-opacity duration-500"
					animate={{ opacity: open ? 1 : 0 }}
				/>

				{/* Inner frame shadow recess */}
				<div className="absolute inset-0 rounded-t-[7.5rem] rounded-b-sm shadow-[inset_0_12px_40px_rgba(0,0,0,0.98)] pointer-events-none z-20" />

				{/* 🔥 TAVERN INTERIOR ROOM (Completely Static Underlayer) */}
				<div className="absolute inset-1.5 overflow-hidden rounded-t-[7.5rem] rounded-b-sm bg-[#070503]">
					{/* Ambient Fireplace Room Brightening */}
					<motion.div
						className="absolute inset-0 bg-linear-to-t from-orange-950/60 via-amber-700/30 to-yellow-100/5 mix-blend-screen"
						animate={{ opacity: open ? 1 : 0.1 }}
						transition={{ duration: 0.4 }}
					/>

					{/* Active Forge / Living Hearth Glow Core */}
					<motion.div
						className="absolute -bottom-6 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-radial from-orange-500/60 via-amber-600/10 to-transparent blur-2xl"
						animate={{
							scale: open ? [1, 1.06, 0.97, 1.03, 1] : 1,
							opacity: open ? [0.8, 1, 0.7, 0.95, 0.8] : 0.2,
						}}
						transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
					/>

					{/* Cinematic Dust Ray Spilling */}
					<motion.div
						className="absolute inset-0 bg-[linear-gradient(135deg,transparent_20%,rgba(245,158,11,0.18)_45%,transparent_60%)] mix-blend-overlay"
						animate={{ opacity: open ? 1 : 0 }}
						transition={{ duration: 0.3 }}
					/>
				</div>

				{/* 🚪 THE INTERACTIVE LINK AREA (Confined precisely to the door geometry) */}
				<button
					type="button"
					onClick={() => router.push("/blog")}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
					onTouchStart={() => setOpen((v) => !v)}
					className="absolute inset-2 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40 rounded-t-[7.4rem] rounded-b-xs text-left"
					aria-label="Enter the Quest Board"
				>
					{/* 📦 THE MOTION PLANK NODE */}
					<motion.div
						animate={{
							rotateY: open ? -52 : 0,
							scaleX: open ? 0.97 : 1,
							x: open ? -5 : 0,
						}}
						transition={{
							type: "spring",
							stiffness: 140,
							damping: 18,
							mass: 1.05,
						}}
						style={{
							transformOrigin: "left center",
							transformPerspective: 1800, // Injected directly into the specific target matrix node
							willChange: "transform",
						}}
						className="
							relative
							w-full
							h-full
							rounded-t-[7.4rem]
							rounded-b-xs
							border-[3px] border-zinc-950
							bg-linear-to-b from-[#3a2012] via-[#2a170e] to-[#160d07]
							shadow-[8px_0_35px_rgba(0,0,0,0.85)]
						"
					>
						{/* Opaque Matte Wood Slats (Zero Mix-Blend Overlap Hazards) */}
						<div
							className="absolute inset-0 rounded-t-[7.2rem] rounded-b-xs opacity-20 pointer-events-none"
							style={{
								backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 14px)`,
							}}
						/>

						{/* Dynamic Shadow Cast Mask inside the door itself */}
						<motion.div
							className="absolute inset-0 rounded-t-[7.2rem] rounded-b-xs bg-black/40 pointer-events-none transition-opacity duration-300"
							animate={{ opacity: open ? 0 : 0.3 }}
						/>

						{/* Vertical Planks Details */}
						<div className="absolute inset-x-0 top-[18%] bottom-[4%] flex justify-between px-4 pointer-events-none">
							<div className="w-px bg-black/90 shadow-[1px_0_1px_rgba(255,255,255,0.02)]" />
							<div className="w-px bg-black/90 shadow-[1px_0_1px_rgba(255,255,255,0.02)]" />
							<div className="w-px bg-black/90 shadow-[1px_0_1px_rgba(255,255,255,0.02)]" />
						</div>

						{/* Forged Structural Strap Iron Plates */}
						<div className="absolute left-2 right-2 top-[22%] h-1.5 bg-zinc-900 border-y border-black/60 shadow-xs" />
						<div className="absolute left-2 right-2 bottom-[22%] h-1.5 bg-zinc-900 border-y border-black/60 shadow-xs" />

						{/* Heavy Mounting Hinges */}
						<div className="absolute -left-0.5 top-[18%] h-10 w-2 rounded-r bg-zinc-900 border border-zinc-950" />
						<div className="absolute -left-0.5 bottom-[26%] h-10 w-2 rounded-r bg-zinc-900 border border-zinc-950" />

						{/* SPEAKEASY MONITOR PORTAL */}
						<div className="absolute left-1/2 top-[28%] h-12 w-10 -translate-x-1/2 overflow-hidden rounded-t-lg rounded-b-xs border-2 border-zinc-950 bg-zinc-950/90 shadow-inner">
							<div className="absolute inset-0 flex justify-evenly">
								<div className="w-0.5 h-full bg-zinc-800" />
								<div className="w-0.5 h-full bg-zinc-800" />
							</div>
							<div className="absolute inset-0 flex flex-col justify-evenly">
								<div className="h-0.5 w-full bg-zinc-800" />
							</div>
						</div>

						{/* FORGED RING LATCH ASSEMBLY */}
						<div className="absolute right-5 top-[55%] -translate-y-1/2 flex flex-col items-center">
							<div className="h-5 w-3.5 bg-zinc-900 border border-zinc-950 rounded-xs flex items-center justify-center">
								<div className="h-1.5 w-0.5 bg-black" />
							</div>
							<motion.div
								className="h-6 w-6 rounded-full border-[3px] border-zinc-800 bg-transparent mt-1 shadow-sm"
								animate={{ rotate: open ? 15 : 0 }}
								transition={{ type: "spring", stiffness: 220 }}
							/>
						</div>

						{/* Inner Plate Bevel Shadows */}
						<div className="absolute inset-0 rounded-t-[7.2rem] rounded-b-xs shadow-[inset_0_2px_6px_rgba(255,255,255,0.03),inset_0_-4px_10px_rgba(0,0,0,0.8)] pointer-events-none" />
					</motion.div>
				</button>
			</div>
		</div>
	);
}
