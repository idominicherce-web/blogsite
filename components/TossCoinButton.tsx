"use client";

import { useState, useTransition } from "react";
import { tossCoinAction } from "@/app/blog/actions";

interface TossCoinButtonProps {
	postId: string;
	initialCoins: number;
	hasAlreadyTossed: boolean;
}

export default function TossCoinButton({
	postId,
	initialCoins,
	hasAlreadyTossed,
}: TossCoinButtonProps) {
	const [, startTransition] = useTransition();

	const [isAnimating, setIsAnimating] = useState(false);

	// Local UI state
	const [localHasTossed, setLocalHasTossed] = useState(hasAlreadyTossed);

	const [coins, setCoins] = useState(initialCoins);

	const handleToss = () => {
		if (localHasTossed) return;

		setIsAnimating(true);
		setLocalHasTossed(true);

		// Immediate optimistic update
		setCoins((current) => current + 1);

		setTimeout(() => setIsAnimating(false), 300);

		startTransition(async () => {
			const result = await tossCoinAction(postId);

			if (!result.success) {
				// Roll back optimistic update
				setLocalHasTossed(false);
				setCoins((current) => current - 1);
				return;
			}

			// Sync with the database value if returned
			if (typeof result.newCoins === "number") {
				setCoins(result.newCoins);
			}
		});
	};

	return (
		<button
			type="button"
			onClick={handleToss}
			disabled={localHasTossed}
			className="group flex flex-col items-start gap-2 cursor-pointer focus:outline-none overflow-visible select-none disabled:cursor-not-allowed disabled:opacity-80"
			aria-label={
				localHasTossed
					? "You have already tossed a coin to this chronicle"
					: "Toss a coin to this chronicle"
			}
		>
			<div
				className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-linear-to-br transition-all duration-200 ${
					localHasTossed
						? "border-amber-950/20 from-stone-200 to-[#e2d6bc] shadow-inner opacity-75"
						: "border-amber-900/30 from-amber-100 to-[#fdf3d6] shadow-md group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:-translate-y-1"
				} ${isAnimating ? "scale-110 -translate-y-2" : ""}`}
			>
				<span
					className={`text-2xl leading-none select-none transition-transform ${
						isAnimating ? "rotate-12" : ""
					} ${localHasTossed ? "grayscale opacity-50" : ""}`}
				>
					🪙
				</span>
			</div>

			<div className="flex flex-col items-start">
				<span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/60 transition-colors group-hover:text-amber-700">
					{localHasTossed ? "Coin Given" : "Toss a Coin"}
				</span>

				<span className="font-serif text-xs font-bold italic text-amber-800/80 whitespace-nowrap">
					{coins} {coins === 1 ? "Coin" : "Coins"} Collected
				</span>
			</div>
		</button>
	);
}
