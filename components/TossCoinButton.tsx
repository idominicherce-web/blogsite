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

	// Optimistically update the UI instantly before the server confirms the database write
	const [optimisticCoins, addOptimisticCoin] = useOptimistic(
		initialCoins,
		(state, amount: number) => state + amount,
	);

	const handleToss = () => {
		// Trigger the satisfying CSS bounce animation
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 300);

		startTransition(async () => {
			// Instantly update the visual number by 1
			addOptimisticCoin(1);
			// Fire the background server mutation
			await tossCoinAction(postId, postSlug);
		});
	};

	return (
		<button
			type="button"
			onClick={handleToss}
			className="group flex flex-col items-center justify-center gap-2 cursor-pointer focus:outline-none"
			aria-label="Toss a coin to this chronicle"
		>
			<div
				className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-900/30 bg-linear-to-br from-amber-100 to-[#fdf3d6] shadow-md transition-all duration-200 group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] ${
					isAnimating
						? "scale-110 -translate-y-2"
						: "group-hover:-translate-y-1"
				}`}
			>
				<span
					className={`text-2xl transition-transform ${isAnimating ? "rotate-12" : ""}`}
				>
					🪙
				</span>
			</div>

			<div className="flex flex-col items-center">
				<span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/60 transition-colors group-hover:text-amber-700">
					Toss a Coin
				</span>
				<span className="font-serif text-xs font-bold italic text-amber-800/80">
					{optimisticCoins} {optimisticCoins === 1 ? "Coin" : "Coins"} Collected
				</span>
			</div>
		</button>
	);
}
