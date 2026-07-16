// components/CommentForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { type ActionState, addCommentAction } from "@/app/blog/actions";

// Extend props to handle nested replies[cite: 11]
interface CommentFormProps {
	postId: string;
	parentId?: string; // Optional parent reference for dynamic nested comments[cite: 11]
	isReply?: boolean; // Optional flag to style the form compactly inside the ledger book[cite: 11]
}

const initialState: ActionState = {
	success: false,
};

/**
 * ============================================================================
 * MVP FEATURE #7: NESTED SUBMIT BUTTON (useFormStatus)
 * ============================================================================
 */
function SubmitButton({ isReply }: { isReply: boolean }) {
	const { pending } = useFormStatus();

	if (isReply) {
		return (
			<button
				type="submit"
				disabled={pending}
				className="
					px-4 py-1.5 
					border border-amber-900/30 
					bg-[#fff9e8] hover:bg-[#fdf3d6]
					font-sans font-extrabold text-[10px] uppercase tracking-wider text-stone-950 
					rounded-xs 
					transition-all duration-200 
					shadow-sm hover:shadow-[0_0_10px_rgba(245,158,11,0.15)]
					disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-300 disabled:cursor-not-allowed 
					cursor-pointer
				"
			>
				{pending ? "Whispering Echo..." : "✒️ Inscribe Reply"}
			</button>
		);
	}

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
				shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]
				hover:scale-[1.01] active:scale-[0.99] 
				disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-300 disabled:cursor-not-allowed 
				cursor-pointer
				"
		>
			{pending ? "Stamping Signet..." : "✒️ Scribe a Note"}
		</button>
	);
}

/**
 * ============================================================================
 * MVP FEATURE #7: FORM COMPONENT (CLIENT)
 * ============================================================================
 */
export default function CommentForm({
	postId,
	parentId,
	isReply = false,
}: CommentFormProps) {
	const [state, formAction] = useActionState(addCommentAction, initialState);

	const [authorName, setAuthorName] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		if (state.success) {
			setAuthorName("");
			setBody("");
		}
	}, [state.success]);

	const labelStyles = isReply
		? "block text-[10px] font-bold uppercase tracking-widest text-amber-950/70"
		: "block text-[11px] font-bold uppercase tracking-widest text-amber-300/90";

	return (
		<form
			action={formAction}
			className={`font-sans ${isReply ? "space-y-3 mt-4" : "space-y-5"}`}
		>
			<input type="hidden" name="postId" value={postId} />

			{parentId && <input type="hidden" name="parentId" value={parentId} />}

			<div className="space-y-1">
				<label
					htmlFor={`authorName-${parentId || "parent"}`}
					className={labelStyles}
				>
					Traveler Name / Moniker
				</label>
				<input
					type="text"
					id={`authorName-${parentId || "parent"}`}
					name="authorName"
					autoComplete="name"
					required
					value={authorName}
					onChange={(e) => setAuthorName(e.target.value)}
					className={`w-full bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic focus:outline-none focus:border-amber-500 transition-colors shadow-inner ${
						isReply ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
					}`}
					placeholder={isReply ? "e.g., Roland" : "e.g., Sir Roland"}
				/>
				{state.errors?.authorName && (
					<p className="text-orange-400 text-xs font-semibold pt-1">
						⚠️ {state.errors.authorName[0]}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<label htmlFor={`body-${parentId || "parent"}`} className={labelStyles}>
					{isReply ? "Reply" : "Message"}
				</label>
				<textarea
					id={`body-${parentId || "parent"}`}
					name="body"
					rows={isReply ? 2 : 4}
					required
					value={body}
					onChange={(e) => setBody(e.target.value)}
					className={`w-full bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic focus:outline-none focus:border-amber-500 transition-colors resize-y shadow-inner ${
						isReply ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
					}`}
					placeholder={
						isReply
							? "Write your reply back..."
							: "Leave your tale or testament written here..."
					}
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
				<div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xs text-emerald-200 text-xs font-semibold font-serif italic shadow-[inset_0_1px_2px_rgba(16,185,129,0.1)]">
					{isReply
						? "✨ Your response has been attached to this traveler's note!"
						: "✨ Your parchment scroll has been officially stamped and bound into the master registry ledger!"}
				</div>
			)}

			<div className="pt-1">
				<SubmitButton isReply={isReply} />
			</div>
		</form>
	);
}
