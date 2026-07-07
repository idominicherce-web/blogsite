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

// 1. Separate SubmitButton Sub-component to safely utilize useFormStatus()
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
		>
			{pending ? "Posting comment..." : "Submit Comment"}
		</button>
	);
}

export default function CommentForm({ postId }: CommentFormProps) {
	// 2. Wiring up the React 19 useActionState hook
	const [state, formAction] = useActionState(addCommentAction, initialState);

	return (
		<form action={formAction} className="space-y-4 pt-4">
			{/* Hidden input to pass along our strict UUID identifier */}
			<input type="hidden" name="postId" value={postId} />

			{/* Author Name Input */}
			<div className="space-y-1">
				<label
					htmlFor="authorName"
					className="block text-sm font-medium text-neutral-300"
				>
					Your Name
				</label>
				<input
					type="text"
					id="authorName"
					name="authorName"
					autoComplete="name"
					className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
					placeholder="John Doe"
				/>
				{state.errors?.authorName && (
					<p className="text-red-400 text-xs font-medium pt-1">
						{state.errors.authorName[0]}
					</p>
				)}
			</div>

			{/* Body Input */}
			<div className="space-y-1">
				<label
					htmlFor="body"
					className="block text-sm font-medium text-neutral-300"
				>
					Comment
				</label>
				<textarea
					id="body"
					name="body"
					rows={4}
					className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-y"
					placeholder="Share your technical thoughts on this topic (minimum 10 characters)..."
				/>
				{state.errors?.body && (
					<p className="text-red-400 text-xs font-medium pt-1">
						{state.errors.body[0]}
					</p>
				)}
			</div>

			{/* Global Server Processing Errors */}
			{state.errors?.global && (
				<div className="p-3 bg-red-950/50 border border-red-900 rounded-lg text-red-400 text-xs font-medium">
					{state.errors.global[0]}
				</div>
			)}

			{/* Success Alert Banner */}
			{state.success && (
				<div className="p-3 bg-green-950/50 border border-green-900 rounded-lg text-green-400 text-xs font-medium">
					✅ Comment added successfully!
				</div>
			)}

			<div className="pt-2">
				<SubmitButton />
			</div>
		</form>
	);
}
