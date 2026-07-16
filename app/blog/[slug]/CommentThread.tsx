// components/CommentThread.tsx
"use client";

import { useState } from "react";
import ModeratorToggle from "@/components/ModeratorToggle";
import CommentForm from "./CommentForm";

interface Comment {
	id: string;
	postId: string;
	parentId: string | null;
	authorName: string;
	body: string;
	approved: boolean;
	createdAt: Date;
}

interface CommentThreadProps {
	comment: Comment;
	postId: string;
	postSlug: string;
	isAdmin: boolean;
	isApproved: boolean;
	slantVariance: string;
	childReplies: Comment[];
}

export default function CommentThread({
	comment,
	postId,
	postSlug,
	isAdmin,
	isApproved,
	slantVariance,
	childReplies,
}: CommentThreadProps) {
	// Track whether this specific comment's reply drawer is open
	const [isReplying, setIsReplying] = useState(false);

	return (
		<div
			className={`py-5 sm:py-6 transition-all duration-200 hover:bg-amber-900/5 px-1 sm:px-2 rounded-xs ${slantVariance} ${
				!isApproved ? "opacity-60 bg-red-900/5 border-y border-red-900/10" : ""
			}`}
		>
			{/* Main Comment Node */}
			<div className="flex items-center justify-between font-sans text-xs mb-1 gap-2">
				<span className="font-black text-amber-950 tracking-tight flex items-center gap-1.5 font-serif text-sm sm:text-base">
					🛡️ {comment.authorName}
					{isAdmin && !isApproved && (
						<span className="ml-2 inline-flex items-center text-[8px] font-sans font-extrabold uppercase tracking-wider bg-red-950/15 text-red-800 px-1.5 py-0.5 rounded-xs border border-red-800/15">
							✒️ Pending Approval
						</span>
					)}
				</span>

				<div className="flex items-center gap-3">
					{isAdmin && (
						<ModeratorToggle
							commentId={comment.id}
							isApproved={isApproved}
							postSlug={postSlug}
						/>
					)}

					<span className="text-amber-900/60 font-semibold text-[9px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap">
						{new Date(comment.createdAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							timeZone: "Asia/Manila",
						})}
					</span>
				</div>
			</div>

			<p className="text-zinc-900 text-sm font-sans leading-relaxed whitespace-pre-wrap font-medium italic pl-3 sm:pl-5 border-l border-amber-950/10 mt-1.5">
				"{comment.body}"
			</p>

			{/* Action Row containing the Reply Toggle Button */}
			<div className="mt-3 pl-3 sm:pl-5 flex items-center gap-4">
				<button
					type="button"
					onClick={() => setIsReplying(!isReplying)}
					className={`font-sans text-[10px] font-extrabold uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer ${
						isReplying
							? "text-amber-700 hover:text-amber-900"
							: "text-amber-900/60 hover:text-amber-800"
					}`}
				>
					{isReplying ? "❌ Close Quill" : "💬 Reply to Note"}
				</button>
			</div>

			{/* Inline reply desk component: Slides down only when isReplying is true */}
			{isReplying && (
				<div className="mt-4 pl-3 sm:pl-5 border-l-2 border-amber-950/5 ml-1 animate-fadeIn">
					<CommentForm postId={postId} parentId={comment.id} isReply={true} />
				</div>
			)}

			{/* Render nested child replies underneath this parent */}
			{childReplies.length > 0 && (
				<div className="relative mt-5 ml-4 sm:ml-8 pl-4 sm:pl-6 space-y-4">
					<div className="absolute left-0 top-0 bottom-6 w-0.5 bg-linear-to-b from-amber-900/10 via-amber-900/20 to-transparent border-l border-dashed border-amber-950/20" />

					{childReplies.map((reply) => {
						const isReplyApproved = reply.approved ?? true;

						return (
							<div
								key={reply.id}
								className={`relative p-4 rounded-sm border border-amber-950/5 bg-[#faf6ee]/50 transition-all duration-200 ${
									!isReplyApproved ? "opacity-60 bg-red-900/5" : ""
								}`}
							>
								<div className="flex items-center justify-between font-sans text-xs mb-1 gap-2">
									<span className="font-serif text-xs font-bold text-stone-800 flex items-center gap-1.5">
										✒️ {reply.authorName}
										{isAdmin && !isReplyApproved && (
											<span className="ml-2 text-[7px] font-sans font-extrabold uppercase tracking-wider bg-red-950/10 text-red-800 px-1 rounded-xs">
												Pending
											</span>
										)}
									</span>

									<div className="flex items-center gap-2">
										{isAdmin && (
											<ModeratorToggle
												commentId={reply.id}
												isApproved={isReplyApproved}
												postSlug={postSlug}
											/>
										)}
										<span className="text-amber-900/50 text-[8px] sm:text-[9px] uppercase tracking-wider">
											{new Date(reply.createdAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												timeZone: "Asia/Manila",
											})}
										</span>
									</div>
								</div>
								<p className="text-stone-800 text-xs sm:text-sm font-sans italic leading-relaxed pl-2 border-l border-amber-900/10">
									"{reply.body}"
								</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
