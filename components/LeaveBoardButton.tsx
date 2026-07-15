// components/LeaveBoardButton.tsx
"use client";

import Link from "next/link";

interface LeaveBoardButtonProps {
	text?: string;
	href?: string;
}

export default function LeaveBoardButton({
	text = "Leave Board",
	href = "/",
}: LeaveBoardButtonProps) {
	return (
		<div
			className="fixed left-4 z-100 md:left-6 transition-all duration-200"
			style={{
				top: "calc(env(safe-area-inset-top, 0px) + 12px)",
				contain: "layout style",
			}}
		>
			{/* AMBIENT BACK-GLOW RING */}
			<div className="absolute inset-0 rounded-full bg-amber-500/10 blur-md md:hidden animate-pulse pointer-events-none" />

			<Link
				href={href}
				scroll={true}
				className="
					relative
					z-10
					inline-flex
					items-center
					justify-center
					/* Keep the gap at 0 on mobile so the circle behaves symmetrically */
					gap-0 md:gap-2
					rounded-full
					
					/* HIGH MOBILE VISIBILITY */
					border-2
					border-amber-500/60 md:border-amber-950/60
					bg-linear-to-b from-[#3a2012] via-[#1f1007] to-[#120a05]
					shadow-[0_4px_12px_rgba(245,158,11,0.25)] md:shadow-md
					
					/* RESPONSIVE SHAPE */
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
					group
					no-underline
				"
				aria-label={text}
			>
				{/* High-contrast vector SVG arrow that scales and centers flawlessly */}
				<svg
					className="h-4.5 w-4.5 md:h-3.5 md:w-3.5 text-amber-400 md:text-amber-500/80 transition-transform duration-200 group-hover:-translate-x-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="3"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 19l-7-7 7-7"
					/>
				</svg>

				{/* The text layout expands naturally on wider viewports */}
				<span className="hidden md:inline">{text}</span>
			</Link>
		</div>
	);
}
