// app/blog/[slug]/CommentForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { type ActionState, addCommentAction } from "../actions";

interface CommentFormProps {
	postId: string;
}

const initialState: ActionState = {
	success: false,
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="
				w-full sm:w-auto 
				px-6 py-2.5 
				border border-amber-900/40 
				bg-[#fff9e8] hover:bg-[#fdf3d6]
				font-sans font-extrabold text-xs uppercase tracking-widest text-stone-950 
				rounded-sm 
				transition-all duration-200 
				shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.2.5)]
				hover:scale-[1.01] active:scale-[0.99] 
				disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-300 disabled:cursor-not-allowed 
				cursor-pointer
				"
		>
			{pending ? "Stamping Signet..." : "✒️ Scribe a Note"}
		</button>
	);
}

export default function CommentForm({ postId }: CommentFormProps) {
	const [state, formAction] = useActionState(addCommentAction, initialState);

	return (
		<form action={formAction} className="space-y-5 font-sans">
			<input type="hidden" name="postId" value={postId} />

			<div className="space-y-1">
				<label
					htmlFor="authorName"
					className="block text-[11px] font-bold uppercase tracking-widest text-amber-300/90"
				>
					Traveler Name / Moniker
				</label>
				<input
					type="text"
					id="authorName"
					name="authorName"
					autoComplete="name"
					required
					className="w-full px-4 py-2.5 bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic text-sm focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
					placeholder="e.g., Sir Roland"
				/>
				{state.errors?.authorName && (
					<p className="text-orange-400 text-xs font-semibold pt-1">
						⚠️ {state.errors.authorName[0]}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<label
					htmlFor="body"
					className="block text-[11px] font-bold uppercase tracking-widest text-amber-300/90"
				>
					Message
				</label>
				<textarea
					id="body"
					name="body"
					rows={4}
					required
					className="w-full px-4 py-2.5 bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic text-sm focus:outline-none focus:border-amber-500 transition-colors resize-y shadow-inner"
					placeholder="Leave your tale or testament written here..."
				/>
				{state.errors?.body && (
					<p className="text-orange-400 text-xs font-semibold pt-1">
						⚠️ {state.errors.body[0]}
					</p>
				)}
			</div>

			{state.errors?.global && (
				<div className="p-3 bg-red-900/20 border border-red-700/40 rounded-xs text-red-300 text-xs font-medium">
					{state.errors.global[0]}
				</div>
			)}

			{state.success && (
				<div className="p-3 bg-emerald-900/20 border border-emerald-700/40 rounded-xs text-emerald-300 text-xs font-medium font-serif italic">
					✨ Your parchment scroll has been officially stamped and bound into
					the master registry ledger!
				</div>
			)}

			<div className="pt-1">
				<SubmitButton />
			</div>
		</form>
	);
}
