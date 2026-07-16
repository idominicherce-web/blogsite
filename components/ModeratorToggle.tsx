// components/ModeratorToggle.tsx
"use client";

import { useTransition } from "react";
import { toggleCommentApproval } from "@/app/actions";

interface ModeratorToggleProps {
	commentId: string;
	isApproved: boolean;
	postSlug: string;
}

/**
 * ============================================================================
 * STRETCH FEATURE #13: GUESTBOOK COMMENT MODERATION TOGGLE (CLIENT)
 * * Interactive button rendered only for authenticated administrators.
 * Leverages useTransition to execute the server action and update the dynamic
 * ledger instantly without freezing the user interface.
 * ============================================================================
 */
export default function ModeratorToggle({
	commentId,
	isApproved,
	postSlug,
}: ModeratorToggleProps) {
	// STRETCH #13 REQUIREMENT: Manage transaction lifecycles using useTransition
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="button"
			disabled={isPending} // Prevents double-clicking/concurrent request collisions
			onClick={() => {
				// Execute the transition-bound server mutation asynchronously
				startTransition(async () => {
					await toggleCommentApproval(commentId, postSlug);
				});
			}}
			className={`px-2 py-0.5 rounded-xs text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer disabled:opacity-40 ${
				isApproved
					? "bg-emerald-950/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/40"
					: "bg-rose-950/20 border-rose-700/50 text-rose-400 hover:bg-rose-900/40"
			}`} // High-contrast visual cues indicating approval statuses.
		>
			{/* Reflect the active mutation state or the static ledger status. */}
			{isPending ? "•••" : isApproved ? "✦ Approved" : "✕ Hidden"}
		</button>
	);
}
