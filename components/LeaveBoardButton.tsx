// components/LeaveBoardButton.tsx
"use client";

import { useRouter } from "next/navigation";

interface LeaveBoardButtonProps {
	text?: string;
	href?: string;
}

export default function LeaveBoardButton({
	text = "Leave Board",
	href = "/",
}: LeaveBoardButtonProps) {
	const router = useRouter();

	return (
		<div
			className="fixed left-4 z-9999 md:left-6 transition-all duration-200"
			style={{
				top: "calc(env(safe-area-inset-top, 0px) + 12px)",
			}}
		>
			{/* AMBIENT BACK-GLOW RING: Subtle breathing animation underneath to draw mobile eye focus */}
			<div className="absolute inset-0 rounded-full bg-amber-500/10 blur-md md:hidden animate-pulse pointer-events-none" />

			<button
				type="button"
				onClick={() => router.push(href)}
				className="
					relative
					z-10
					inline-flex
					items-center
					justify-center
					gap-2
					/* MAKING IT ROUND: Full radius circle by default */
					rounded-full
					
					/* HIGH MOBILE VISIBILITY: Thicker, high-contrast border and a permanent golden depth shadow */
					border-amber-500/60 md:border-amber-950/60
					bg-linear-to-b from-[#3a2012] via-[#1f1007] to-[#120a05] md:shadow-md
					
					/* RESPONSIVE SHAPE: Perfect 1:1 circle aspect ratio on mobile, pill shape on desktop */
					h-10 w-10 md:h-auto md:w-auto
					p-0 md:px-5 md:py-2.5
					
					font-sans
					text-[11px]
					font-extrabold
					uppercase
					tracking-[0.2em]
					text-amber-400 md:text-amber-500/80
					
					transition-all
					duration-200
					hover:text-amber-300
					hover:border-amber-400
					hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]
					cursor-pointer
				"
				aria-label={text}
			>
				{/* The icon arrow - Made bolder and slightly larger on mobile touch targets */}
				<span className="text-sm md:text-xs font-black translate-x-[-0.5px] md:translate-x-0">
					←
				</span>

				{/* The text layout expands naturally on wider viewports */}
				<span className="hidden md:inline">{text}</span>
			</button>
		</div>
	);
}
