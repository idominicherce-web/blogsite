// components/Footer.tsx
export default function Footer() {
	return (
		<footer className="relative w-full text-center z-10 select-none pointer-events-none">
			{/* Clean layout divider */}
			<div className="max-w-xs mx-auto mb-3.5 flex items-center justify-center gap-3">
				<div className="h-[0.5px] flex-1 bg-linear-to-r from-transparent to-amber-500/20" />
				<span className="text-amber-500/30 text-[10px] font-serif">✦</span>
				<div className="h-[0.5px] flex-1 bg-linear-to-l from-transparent to-amber-500/20" />
			</div>

			<p className="font-sans text-[10px] tracking-[0.3em] uppercase text-amber-500/60 pl-[0.3em]">
				T a v e r n
			</p>

			<p className="font-serif text-[10px] italic text-zinc-400 mt-1">
				"Gather by the Hearthstone."
			</p>

			<p className="font-sans text-[8px] tracking-widest text-zinc-500 uppercase mt-2.5">
				© 2026 • Crafted by Dominic Herce
			</p>
		</footer>
	);
}
