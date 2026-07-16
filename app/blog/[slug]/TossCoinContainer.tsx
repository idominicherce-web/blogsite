// app/blog/[slug]/TossCoinContainer.tsx

import TossCoinButton from "@/components/TossCoinButton";

interface TossCoinContainerProps {
	postId: string;
	initialCoins: number;
}

/**
 * ============================================================================
 * TOSS COIN SERVER CONTAINER
 * * Static wrapper that forwards the initial coin count to the client.
 * * The client now owns the optimistic UI state.
 * * The server action still enforces the one-coin-per-session rule.
 * ============================================================================
 */
export default function TossCoinContainer({
	postId,
	initialCoins,
}: TossCoinContainerProps) {
	return (
		<TossCoinButton
			postId={postId}
			initialCoins={initialCoins}
			hasAlreadyTossed={false}
		/>
	);
}
