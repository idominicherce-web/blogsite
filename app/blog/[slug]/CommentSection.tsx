// app/blog/[slug]/CommentSection.tsx
import ModeratorToggle from "@/components/ModeratorToggle";
import { db } from "@/lib/db";
import CommentForm from "./CommentForm";

// Extended to match layout properties dispatched from parent page loop
interface CommentSectionProps {
	postId: string;
	postSlug: string;
	isAdmin: boolean;
}

export default async function CommentSection({
	postId,
	postSlug,
	isAdmin,
}: CommentSectionProps) {
	const commentsList = await db.query.comments.findMany({
		where: (comments, { eq }) => eq(comments.postId, postId),
	});

	// 1. DYNAMIC INSCRIPTION COUNT: Count ONLY approved comments (matches the QuestCard.tsx logic)
	const approvedCommentsCount = commentsList.filter(
		(comment) => comment.approved ?? true,
	).length;

	// 2. FILTERED LIST: Filter down unapproved posts instantly from normal traveler viewports
	const visibleComments = commentsList.filter((comment) => {
		const isApproved = comment.approved ?? true;
		return isApproved || isAdmin;
	});

	const sortedComments = [...visibleComments].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	);

	return (
		<section className="space-y-6 sm:space-y-8 relative z-10">
			{/* Segment Heading Descriptor */}
			<div className="flex items-center justify-between border-b border-[#3a2418] pb-2">
				<h3 className="text-lg sm:text-xl font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-amber-400">
					The Hearth Ledger
				</h3>
				{/* Shows the true number of approved inscriptions */}
				<span className="text-[10px] sm:text-xs font-sans text-amber-600/80 uppercase tracking-widest font-semibold">
					{approvedCommentsCount} Inscriptions
				</span>
			</div>

			{/* THE WRITING DESK INTERACTION CONTAINER */}
			<div className="rounded-xl border-2 sm:border-4 border-[#4a3225] bg-linear-to-b from-[#3a2418] to-[#251710] p-3 sm:p-5 shadow-2xl">
				<div className="bg-[#1f140e] rounded-md border border-[#4a3225]/40 p-4 sm:p-6 shadow-inner">
					<h4 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-400/90 mb-4 flex items-center gap-2">
						<span>✒️</span> Dip Quill & Inscribe Chronicle
					</h4>
					<CommentForm postId={postId} />
				</div>
			</div>

			{/* THE LEATHER-BOUND OPEN GUESTBOOK LEDGER */}
			<div className="relative rounded-xl border-t-[3px] border-b-[5px] border-x-6 sm:border-x-12 border-[#3a1f10] bg-linear-to-b from-[#fff9e8] via-[#fdf3d6] to-[#f9e7c9] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
				{/* Book Centerfold / Spine shadow representation strip */}
				<div className="absolute inset-y-0 left-6 sm:left-12 w-4 bg-linear-to-r from-black/10 via-black/5 to-transparent pointer-events-none z-20" />
				<div className="absolute inset-0 ledger-page-vignette pointer-events-none z-20" />

				{/* Ledger Headers */}
				<div className="px-4 sm:px-16 pt-6 sm:pt-8 pb-4 border-b-2 border-amber-950/10 flex items-center justify-between">
					<h4 className="font-serif text-base sm:text-lg font-black text-amber-950 tracking-wider">
						Guestbook Registry
					</h4>
					<span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest text-amber-900/50 uppercase">
						Tavern Vault
					</span>
				</div>

				{/* List Thread inside the continuous page book layout */}
				<div className="divide-y divide-amber-950/10 px-4 sm:px-16 pb-6 sm:pb-8">
					{sortedComments.length === 0 ? (
						<p className="py-12 text-center font-serif italic text-amber-900/60 text-sm">
							"The pages are clean. No travelers have signed the ledger book yet
							tonight..."
						</p>
					) : (
						sortedComments.map((comment, index) => {
							const slantVariance =
								index % 3 === 0
									? "rotate-[-0.3deg]"
									: index % 2 === 0
										? "rotate-[0.4deg]"
										: "rotate-0";

							// Stylize dynamic fade mask over hidden notes when viewing in admin mode
							const isApproved = comment.approved ?? true;

							return (
								<div
									key={comment.id}
									className={`py-5 sm:py-6 transition-all duration-200 hover:bg-amber-900/5 px-1 sm:px-2 rounded-xs ${slantVariance} ${
										!isApproved
											? "opacity-60 bg-red-900/5 border-y border-red-900/10"
											: ""
									}`}
								>
									<div className="flex items-center justify-between font-sans text-xs mb-1 gap-2">
										<span className="font-black text-amber-950 tracking-tight flex items-center gap-1.5 font-serif text-sm sm:text-base">
											🛡️ {comment.authorName}
											{/* VISUAL INDICATOR TO ADMINS FOR UNAPPROVED COMMENTS */}
											{isAdmin && !isApproved && (
												<span className="ml-2 inline-flex items-center text-[8px] font-sans font-extrabold uppercase tracking-wider bg-red-950/15 text-red-800 px-1.5 py-0.5 rounded-xs border border-red-800/15">
													✒️ Pending Approval
												</span>
											)}
										</span>

										{/* Align timestamp and moderator control badge actions horizontally */}
										<div className="flex items-center gap-3">
											{/* THE TRIGGER SWITCH: Render only if admin permissions match */}
											{isAdmin && (
												<ModeratorToggle
													commentId={comment.id}
													isApproved={isApproved}
													postSlug={postSlug}
												/>
											)}

											<span className="text-amber-900/60 font-semibold text-[9px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap">
												{new Date(comment.createdAt).toLocaleDateString(
													"en-US",
													{
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
														timeZone: "Asia/Manila",
													},
												)}
											</span>
										</div>
									</div>

									<p className="text-zinc-900 text-sm font-sans leading-relaxed whitespace-pre-wrap font-medium italic pl-3 sm:pl-5 border-l border-amber-950/10 mt-1.5">
										"{comment.body}"
									</p>
								</div>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
