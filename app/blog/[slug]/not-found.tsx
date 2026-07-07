// app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function PostNotFound() {
	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased flex items-center justify-center">
			<main className="max-w-md w-full text-center p-12 space-y-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-md">
				<h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
					Post Not Found
				</h2>
				<p className="text-neutral-400 text-sm leading-relaxed">
					The article you are searching for does not exist or may have been
					moved.
				</p>
				<div className="pt-4">
					<Link
						href="/blog"
						className="inline-flex items-center justify-center px-5 py-2.5 border border-neutral-800 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none transition-colors duration-200 shadow-sm"
					>
						Return to Blog Feed
					</Link>
				</div>
			</main>
		</div>
	);
}
