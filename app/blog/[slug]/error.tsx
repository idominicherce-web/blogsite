// app/blog/[slug]/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

/**
 * ============================================================================
 * ROUTE ERROR BOUNDARY
 * * Catches unexpected rendering or server errors within /blog/[slug].
 * * Allows travelers to retry without leaving the chronicle.
 * ============================================================================
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
			<div className="w-full max-w-2xl rounded-sm border-4 border-amber-950/30 bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] p-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
				<div className="mb-5 text-5xl select-none">⚠️</div>

				<p className="font-sans text-[10px] font-black uppercase tracking-[0.35em] text-amber-700">
					Tavern Archive
				</p>

				<h2 className="mt-3 font-serif text-3xl font-black text-amber-950">
					This Scroll Could Not Be Read
				</h2>

				<p className="mx-auto mt-5 max-w-xl font-serif text-base italic leading-relaxed text-amber-900/80">
					"The parchment has become smudged with ink, and the scribes cannot
					finish reading this chronicle. Perhaps another attempt will restore
					the tale."
				</p>

				<button
					type="button"
					onClick={reset}
					className="
						mt-8
						inline-flex
						items-center
						justify-center
						rounded-xs
						border
						border-amber-700/40
						bg-linear-to-b
						from-[#4e2a14]
						via-[#2d180b]
						to-[#1a0e06]
						px-6
						py-3
						font-sans
						text-xs
						font-extrabold
						uppercase
						tracking-[0.25em]
						text-amber-300
						transition-all
						duration-200
						hover:border-amber-400
						hover:text-amber-100
						hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]
						active:scale-[0.98]
					"
				>
					Try Again
				</button>
			</div>
		</div>
	);
}
