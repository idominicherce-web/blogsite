// components/TossCoinButton.tsx
"use client";

import { useOptimistic, useState, useTransition } from "react";
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

	// Local lock state so the button disabled state matches the session instantly
	const [localHasTossed, setLocalHasTossed] = useState(hasAlreadyTossed);
	const [serverCoins, setServerCoins] = useState<number | null>(null);

	// Fallback to initial database coins count if server response hasn't arrived
	const currentCoins = serverCoins !== null ? serverCoins : initialCoins;

	const [optimisticCoins, addOptimisticCoin] = useOptimistic(
		currentCoins,
		(state, amount: number) => state + amount,
	);

	const handleToss = () => {
		if (localHasTossed) return;

		setIsAnimating(true);
		setLocalHasTossed(true); // Lock the button immediately for immediate visual feedback
		setTimeout(() => setIsAnimating(false), 300);

		startTransition(async () => {
			addOptimisticCoin(1);
			const result = await tossCoinAction(postId);

			if (result.success && result.newCoins !== undefined) {
				setServerCoins(result.newCoins);
			} else {
				// Revert local lock if the database write failed
				setLocalHasTossed(false);
			}
		});
	};

	const isDisabled = localHasTossed;

	return (
		<button
			type="button"
			onClick={handleToss}
			disabled={isDisabled}
			className="group flex flex-col items-start gap-2 cursor-pointer focus:outline-none overflow-visible select-none disabled:cursor-not-allowed disabled:opacity-80"
			aria-label={
				isDisabled
					? "You have already tossed a coin to this chronicle"
					: "Toss a coin to this chronicle"
			}
		>
			<div
				className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-linear-to-br transition-all duration-200 ${
					isDisabled
						? "border-amber-950/20 from-stone-200 to-[#e2d6bc] shadow-inner opacity-75"
						: "border-amber-900/30 from-amber-100 to-[#fdf3d6] shadow-md group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:-translate-y-1"
				} ${isAnimating ? "scale-110 -translate-y-2" : ""}`}
			>
				<span
					className={`text-2xl leading-none select-none transition-transform ${isAnimating ? "rotate-12" : ""} ${
						isDisabled ? "grayscale opacity-50" : ""
					}`}
				>
					🪙
				</span>
			</div>

			<div className="flex flex-col items-start">
				<span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/60 transition-colors group-hover:text-amber-700">
					{isDisabled ? "Coin Given" : "Toss a Coin"}
				</span>
				<span className="font-serif text-xs font-bold italic text-amber-800/80 whitespace-nowrap">
					{optimisticCoins} {optimisticCoins === 1 ? "Coin" : "Coins"} Collected
				</span>
			</div>
		</button>
	);
}
