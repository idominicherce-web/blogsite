// app/page.tsx

import type { Metadata } from "next";
import TavernBoard from "@/components/TavernBoard";
import TavernDoor from "@/components/TavernDoor";
import TavernWrapper from "@/components/TavernWrapper";

export const metadata: Metadata = {
	metadataBase: new URL("https://tavernblogs.vercel.app"),
	title: "The Tavern | Entrance",
	description:
		"Push past the iron doors, settle by the hearth fire, and discover active chronicles and articles.",
	openGraph: {
		title: "The Tavern | Entrance",
		description:
			"Push past the iron doors, settle by the hearth fire, and discover active chronicles and articles.",
		url: "https://tavernblogs.vercel.app/",
		images: [
			{
				url: "https://tavernblogs.vercel.app/assets/tavern-entrance.jpg",
				width: 1200,
				height: 630,
				alt: "The Tavern Entrance",
			},
		],
		type: "website",
	},
};

export default function TavernLandingPage() {
	return (
		<TavernWrapper>
			{/* Sized perfectly to allow full header scaling without vertical or horizontal restrictions */}
			<div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-10 pb-6 sm:px-6 sm:pt-12">
				{/* ================= Hero ================= */}
				<main className="flex flex-1 flex-col items-center justify-center py-6">
					<div className="flex w-full flex-col items-center">
						{/* Removed header from the narrow door box. It now sits in this full-width container, completely preventing text clipping */}
						<header className="mb-6 w-full text-center max-w-md">
							<h1
								className="
									bg-linear-to-b
									from-amber-100
									via-amber-200
									to-amber-500
									bg-clip-text
									text-4xl
									font-black
									text-transparent
									drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]
									sm:text-5xl
									md:text-6xl
									
									/* CENTERING BALANCE: Adds left padding matching the tracking to offset the text shift */
									tracking-[0.25em]
									pl-[0.25em]
									sm:tracking-[0.35em]
									sm:pl-[0.35em]
								"
							>
								TAVERN
							</h1>

							<p
								className="
									mt-2
									text-[10px]
									uppercase
									text-amber-600/80
									sm:text-xs
									
									/* CENTERING BALANCE: Subtitle is centered using matching math metrics */
									tracking-[0.35em]
									pl-[0.35em]
									sm:tracking-[0.45em]
									sm:pl-[0.45em]
								"
							>
								Gather by the Hearthstone
							</p>
						</header>

						{/* Door Layout Container (Kept at exact physical widths to fit cleanly on screen) */}
						<div className="relative w-44 min-[390px]:w-48 sm:w-56 md:w-64 lg:w-72">
							<TavernDoor />

							<div className="pointer-events-none absolute bottom-0 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full bg-black/60 blur-md" />
						</div>

						{/* Board Container */}
						<div className="mt-6 w-full max-w-md sm:mt-8">
							<TavernBoard />
						</div>
					</div>
				</main>
			</div>
		</TavernWrapper>
	);
}
