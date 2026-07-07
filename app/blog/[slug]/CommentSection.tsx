// app/blog/[slug]/CommentSection.tsx
import { db } from "@/lib/db";
import CommentForm from "./CommentForm";

interface CommentSectionProps {
	postId: string;
}

export default async function CommentSection({ postId }: CommentSectionProps) {
	// Fetch comments live for this specific post inside the isolated chunk
	const commentsList = await db.query.comments.findMany({
		where: (comments, { eq }) => eq(comments.postId, postId),
	});

	const sortedComments = [...commentsList].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	);

	return (
		<section className="space-y-6">
			<h3 className="text-2xl font-bold text-neutral-100 tracking-tight">
				Discussion ({sortedComments.length})
			</h3>

			<div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-sm">
				<h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800/60 pb-2 mb-2">
					Leave a Comment
				</h4>
				<CommentForm postId={postId} />
			</div>

			<div className="space-y-4 pt-2">
				{sortedComments.length === 0 ? (
					<p className="text-neutral-500 text-sm italic bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
						No comments yet. Be the first to share your thoughts!
					</p>
				) : (
					sortedComments.map((comment) => (
						<div
							key={comment.id}
							className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2 shadow-sm"
						>
							<div className="flex items-center justify-between border-b border-neutral-800/50 pb-2">
								<span className="font-semibold text-blue-400 text-sm">
									{comment.authorName}
								</span>
								<span className="text-neutral-500 text-xs">
									{new Date(comment.createdAt).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</div>
							<p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap pt-1">
								{comment.body}
							</p>
						</div>
					))
				)}
			</div>
		</section>
	);
}
