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
			className="fixed left-3 z-9999 md:left-6 transition-all duration-200"
			style={{
				top: "calc(env(safe-area-inset-top, 0px) + 12px)",
			}}
		>
			<button
				type="button"
				onClick={() => router.push(href)}
				className="
					inline-flex
					items-center
					justify-center
					gap-2
					rounded-sm
					border
					border-amber-950/60
					bg-linear-to-b from-[#2a170c] via-[#1f1007] to-[#120a05]
					p-2.5 md:px-4 md:py-2
					font-sans
					text-[11px]
					font-bold
					uppercase
					tracking-[0.2em]
					text-amber-500/80
					transition-all
					duration-200
					hover:text-amber-300
					hover:border-amber-500/50
					hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]
					cursor-pointer
					shadow-md
					w-auto
				"
				aria-label={text}
			>
				{/* The icon arrow is always visible */}
				<span className="text-xs md:text-sm">←</span>

				{/* The customizable text label hides safely on mobile devices */}
				<span className="hidden md:inline">{text}</span>
			</button>
		</div>
	);
}
