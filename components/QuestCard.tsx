import Link from "next/link";

type QuestCardProps = {
	id: string;
	title: string;
	body: string;
	slug: string;
	createdAt: Date;
	index: number;
};

const rotations = [
	"-rotate-2",
	"rotate-1",
	"-rotate-1",
	"rotate-2",
	"rotate-0",
];

export default function QuestCard({
	title,
	body,
	slug,
	createdAt,
	index,
}: QuestCardProps) {
	const rotation = rotations[index % rotations.length];

	return (
		<article
			className={`
				group
				relative
				${rotation}
				transition-all
				duration-300
				hover:rotate-0
				hover:-translate-y-2
				hover:scale-[1.02]
				z-10
			`}
		>
			{/* RUSTIC FORGED IRON PIN */}
			<div className="absolute left-1/2 top-2 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-zinc-950 bg-linear-to-br from-zinc-700 via-zinc-800 to-zinc-950 shadow-[0_4px_6px_rgba(0,0,0,0.6)]" />

			{/* Heavy Cast Shadow depth */}
			<div className="absolute inset-0 translate-y-3 rounded-md bg-black/60 blur-md transition-all duration-300 group-hover:translate-y-5 group-hover:blur-xl pointer-events-none" />

			{/* HIGH-VISIBILITY AGED PARCHMENT SCROLL CONTRACT */}
			<div
				className="
					relative
					z-20
					overflow-hidden
					rounded-sm
					border border-amber-800/40
					bg-amber-100
					px-6
					py-7
					shadow-2xl
				"
				style={{
					// Enforcing distinct, photorealistic parchment paper colors explicitly
					backgroundColor: "#f5ebd5",
					backgroundImage: `
						repeating-linear-gradient(
							0deg,
							rgba(0,0,0,0.02),
							rgba(0,0,0,0.02) 1px,
							transparent 1px,
							transparent 12px
						)
					`,
				}}
			>
				{/* Photorealistic Weathered Vignette Edge Overlay */}
				<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(92,44,12,0.4)] z-30 mix-blend-multiply" />
				<div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-amber-950/20 z-30 mix-blend-color-burn opacity-80" />

				{/* Contract Title - Highly Visible Dark Charcoal */}
				<h2 className="mt-4 font-serif text-xl font-black tracking-tight text-stone-950 leading-tight group-hover:text-amber-900 transition-colors duration-200">
					<Link href={`/blog/${slug}`} className="focus:outline-none block">
						{title}
					</Link>
				</h2>

				{/* Timestamp Badge */}
				<p className="mt-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/70">
					Dispatched{" "}
					{new Date(createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</p>

				<div className="my-4 h-px bg-amber-950/20" />

				{/* Contract Body Details */}
				<p className="line-clamp-5 font-serif text-sm leading-6 text-stone-900 font-medium italic">
					"{body}"
				</p>

				{/* Call to Action Trigger */}
				<div className="mt-6 pt-1">
					<Link
						href={`/blog/${slug}`}
						className="
							inline-flex
							items-center
							gap-1.5
							font-sans
							text-xs
							font-extrabold
							uppercase
							tracking-widest
							text-amber-950
							hover:text-amber-800
							transition-all
							duration-200
							group-hover:translate-x-1
							focus:outline-none
							focus:underline
						"
					>
						Inspect Scroll →
					</Link>
				</div>
			</div>
		</article>
	);
}
