// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import type { ActionState } from "@/app/actions";
import { createPost } from "@/app/actions";
import LeaveBoardButton from "@/components/LeaveBoardButton";

const initialState: ActionState = {
	success: false,
};

/**
 * ============================================================================
 * STRETCH FEATURE #11: ADMIN NEW-POST PAGE
 * * Secured client-interactive interface facilitating the addition of chronicles.
 * Handles validation states, manages form state preservation, and routes redirects.
 * ============================================================================
 */
export default function AdminNewPostPage() {
	// STRETCH #11 REQUIREMENT: Leverage useActionState to bind createPost server actions
	const [state, formAction, isPending] = useActionState(
		createPost,
		initialState,
	);
	const router = useRouter();
	const [, startTransition] = useTransition();

	// PROGRESS PRESERVATION STATE: Locks inputs locally to safeguard drafts on error
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState("");

	// INPUT RESCUE LISTENER: Feeds written values back into state on server action validation failures
	useEffect(() => {
		if (state.fields) {
			setTitle(state.fields.title ?? "");
			setBody(state.fields.body ?? "");
			setTags(state.fields.tags ?? "");
		}
	}, [state.fields]);

	// DYNAMIC REDIRECT HANDLER: Redirects to the newly created chronicle upon success
	useEffect(() => {
		if (!state.success || !state.redirectTo) return;

		const redirectTo = state.redirectTo;

		// Wrapping in a transition prevents layout flicker or route preservation lock-ups
		startTransition(() => {
			router.push(redirectTo);
			router.refresh();
		});
	}, [state.success, state.redirectTo, router]);

	return (
		<div className="relative min-h-screen bg-[#090604] text-amber-100 flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-x-hidden">
			<LeaveBoardButton text="Back to Blog" href="/blog" />

			<div className="w-full max-w-xl bg-linear-to-b from-[#1b1009] via-[#120a05] to-[#0a0502] border-2 border-amber-950/40 rounded-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative mt-12">
				<div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-amber-500/40 to-transparent" />

				<header className="mb-8 text-center">
					<h1 className="bg-linear-to-b from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-2xl sm:text-3xl font-black tracking-[0.2em] text-transparent uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]">
						Inscribe Scroll
					</h1>
					<p className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber-600/70 mt-1">
						Add a new chronicle to the board
					</p>
				</header>

				<form action={formAction} className="space-y-6">
					{/* TITLE COMPONENT (Validated by Zod schema) */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="title"
							className="text-xs font-bold uppercase tracking-[0.15em] text-amber-500/80"
						>
							Chronicle Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							disabled={isPending}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full bg-[#0d0704] border border-amber-950/60 focus:border-amber-500/50 rounded-xs p-3 font-sans text-sm text-amber-100 outline-none placeholder-zinc-700 transition-all shadow-inner"
							placeholder="e.g., The Siege of Riverford"
						/>
						{state.errors?.title && (
							<span className="text-[11px] font-medium text-red-400/90 tracking-wide mt-0.5">
								✦ {state.errors.title[0]}
							</span>
						)}
					</div>

					{/* TAGS INPUT FIELD ELEMENT (STRETCH #12) */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="tags"
							className="text-xs font-bold uppercase tracking-[0.15em] text-amber-500/80"
						>
							Scroll Categories / Tags (Comma-separated)
						</label>
						<input
							type="text"
							id="tags"
							name="tags"
							disabled={isPending}
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							className="w-full bg-[#0d0704] border border-amber-950/60 focus:border-amber-500/50 rounded-xs p-3 font-sans text-sm text-amber-100 outline-none placeholder-zinc-700 transition-all shadow-inner"
							placeholder="e.g., Lore, Quests, Dragon"
						/>
						{state.errors?.tags && (
							<span className="text-[11px] font-medium text-red-400/90 tracking-wide mt-0.5">
								✦ {state.errors.tags[0]}
							</span>
						)}
					</div>

					{/* BODY TEXT COMPONENT (Validated by Zod schema) */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="body"
							className="text-xs font-bold uppercase tracking-[0.15em] text-amber-500/80"
						>
							Scroll Content
						</label>
						<textarea
							id="body"
							name="body"
							rows={6}
							disabled={isPending}
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="w-full bg-[#0d0704] border border-amber-950/60 focus:border-amber-500/50 rounded-xs p-3 font-sans text-sm text-amber-100 outline-none placeholder-zinc-700 transition-all resize-none shadow-inner leading-relaxed"
							placeholder="Write your tales, annotations, or contract requirements upon the wood..."
						/>
						{state.errors?.body && (
							<span className="text-[11px] font-medium text-red-400/90 tracking-wide mt-0.5">
								✦ {state.errors.body[0]}
							</span>
						)}
					</div>

					{/* PASSWORD SECURITY GATE (STRETCH #11: Password Match Check) */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="password"
							className="text-xs font-bold uppercase tracking-[0.15em] text-amber-500/80"
						>
							Gatekeeper Passcode
						</label>
						<input
							type="password"
							id="password"
							name="password"
							disabled={isPending}
							className="w-full bg-[#0d0704] border border-amber-950/60 focus:border-amber-500/50 rounded-xs p-3 font-sans text-sm text-amber-100 tracking-widest outline-none placeholder-zinc-700 transition-all shadow-inner"
							placeholder="••••••••"
						/>
						{state.errors?.password && (
							<span className="text-[11px] font-medium text-red-400/90 tracking-wide mt-0.5">
								✦ {state.errors.password[0]}
							</span>
						)}
					</div>

					{/* GLOBAL SERVER EXCEPTION FEEDBACK */}
					{state.errors?.global && (
						<div className="bg-red-950/30 border border-red-900/40 rounded-xs p-3 text-center text-xs text-red-400">
							{state.errors.global[0]}
						</div>
					)}

					{/* ACTION SUBMIT TRIGGER */}
					<button
						type="submit"
						disabled={isPending}
						className="w-full inline-flex items-center justify-center rounded-xs border border-amber-500/40 bg-linear-to-b from-[#4e2a14] via-[#2d180b] to-[#1a0e06] py-3 text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400 transition-all duration-200 hover:text-amber-200 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer mt-2 shadow-md"
					>
						{isPending ? "Inscribing Scroll..." : "Post to Notice Board ✦"}
					</button>
				</form>
			</div>
		</div>
	);
}
