// components/TossCoinButton.tsx
"use client";

import { useOptimistic, useState, useTransition } from "react";
import { tossCoinAction } from "@/app/actions";

interface TossCoinButtonProps {
	postId: string;
	postSlug: string;
	initialCoins: number;
}

export default function TossCoinButton({
	postId,
	postSlug,
	initialCoins,
}: TossCoinButtonProps) {
	const [, startTransition] = useTransition();
	const [isAnimating, setIsAnimating] = useState(false);

	const [optimisticCoins, addOptimisticCoin] = useOptimistic(
		initialCoins,
		(state, amount: number) => state + amount,
	);

	const handleToss = () => {
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 300);

		startTransition(async () => {
			addOptimisticCoin(1);
			await tossCoinAction(postId, postSlug);
		});
	};

	return (
		<button
			type="button"
			onClick={handleToss}
			/* 🛡️ overflow-visible ensures scale & translate animations are never clipped */
			className="group flex flex-col items-start gap-2 cursor-pointer focus:outline-none overflow-visible select-none"
			aria-label="Toss a coin to this chronicle"
		>
			<div
				/* 🛡️ Added 'shrink-0' so mobile viewports never squeeze the circle shape */
				className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-900/30 bg-linear-to-br from-amber-100 to-[#fdf3d6] shadow-md transition-all duration-200 group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] ${
					isAnimating
						? "scale-110 -translate-y-2"
						: "group-hover:-translate-y-1"
				}`}
			>
				{/* 🛡️ Added 'leading-none' and 'select-none' to prevent OS-level emoji line-height cutoffs */}
				<span
					className={`text-2xl leading-none select-none transition-transform ${isAnimating ? "rotate-12" : ""}`}
				>
					🪙
				</span>
			</div>

			<div className="flex flex-col items-start">
				<span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/60 transition-colors group-hover:text-amber-700">
					Toss a Coin
				</span>
				<span className="font-serif text-xs font-bold italic text-amber-800/80 whitespace-nowrap">
					{optimisticCoins} {optimisticCoins === 1 ? "Coin" : "Coins"} Collected
				</span>
			</div>
		</button>
	);
}
