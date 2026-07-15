// components/ModeratorToggle.tsx
"use client";

import { useTransition } from "react";
import { toggleCommentApproval } from "@/app/actions";

interface ModeratorToggleProps {
	commentId: string;
	isApproved: boolean;
	postSlug: string;
}

export default function ModeratorToggle({
	commentId,
	isApproved,
	postSlug,
}: ModeratorToggleProps) {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="button"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await toggleCommentApproval(commentId, postSlug);
				});
			}}
			className={`px-2 py-0.5 rounded-xs text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer disabled:opacity-40 ${
				isApproved
					? "bg-emerald-950/20 border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/40"
					: "bg-rose-950/20 border-rose-700/50 text-rose-400 hover:bg-rose-900/40"
			}`}
		>
			{isPending ? "•••" : isApproved ? "✦ Approved" : "☠ Hidden"}
		</button>
	);
}
