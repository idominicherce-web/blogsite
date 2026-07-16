// app/blog/[slug]/CommentForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { type ActionState, addCommentAction } from "../actions";

interface CommentFormProps {
	postId: string;
}

const initialState: ActionState = {
	success: false,
};

/**
 * ============================================================================
 * MVP FEATURE #7: NESTED SUBMIT BUTTON (useFormStatus)
 * * Renders the submit mechanism using React's useFormStatus().
 * Must reside inside a child component within the <form> context.
 * ============================================================================
 */
function SubmitButton() {
	// MVP #7 REQUIREMENT: Extracts transition lifecycle state directly from the parent form
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending} // MVP #7 REQUIREMENT: Disables interaction during active database queries
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
 * * Implements input state tracking using React's useActionState().
 * Safely retains written inputs when server-side validation schema constraints fail.
 * ============================================================================
 */
export default function CommentForm({ postId }: CommentFormProps) {
	// MVP #7 REQUIREMENT: Wire the UI inputs with the Server Action schema using useActionState
	const [state, formAction] = useActionState(addCommentAction, initialState);

	// FORM PROGRESS RETENTION: Locks written states in memory to prevent input loss on schema validation rejection
	const [authorName, setAuthorName] = useState("");
	const [body, setBody] = useState("");

	// SUCCESS ACTION LISTENERS: Wipes inputs ONLY when database confirmation succeeds
	useEffect(() => {
		if (state.success) {
			setAuthorName("");
			setBody("");
		}
	}, [state.success]);

	return (
		<form action={formAction} className="space-y-5 font-sans">
			{/* Hidden identifier maps the comment to the active chronicle */}
			<input type="hidden" name="postId" value={postId} />

			{/* Traveler Moniker Field */}
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
					value={authorName}
					onChange={(e) => setAuthorName(e.target.value)}
					className="w-full px-4 py-2.5 bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic text-sm focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
					placeholder="e.g., Sir Roland"
				/>
				{/* MVP #7 REQUIREMENT: Render Zod field-level validation errors */}
				{state.errors?.authorName && (
					<p className="text-orange-400 text-xs font-semibold pt-1">
						⚠️ {state.errors.authorName[0]}
					</p>
				)}
			</div>

			{/* Message Body Field */}
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
					value={body}
					onChange={(e) => setBody(e.target.value)}
					className="w-full px-4 py-2.5 bg-[#fffdf9] border-2 border-[#4a3225] rounded-sm text-zinc-950 placeholder-stone-400 font-serif italic text-sm focus:outline-none focus:border-amber-500 transition-colors resize-y shadow-inner"
					placeholder="Leave your tale or testament written here..."
				/>
				{/* MVP #7 REQUIREMENT: Render Zod field-level validation errors */}
				{state.errors?.body && (
					<p className="text-orange-400 text-xs font-semibold pt-1">
						⚠️ {state.errors.body[0]}
					</p>
				)}
			</div>

			{/* Render database errors caught during server mutations */}
			{state.errors?.global && (
				<div className="p-3 bg-red-900/20 border border-red-700/40 rounded-xs text-red-300 text-xs font-medium">
					{state.errors.global[0]}
				</div>
			)}

			{/* Positive Feedback Panel */}
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
