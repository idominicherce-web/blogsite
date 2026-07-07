import dotenv from "dotenv";

const result = dotenv.config({ path: ".env.local" });

if (result.error) {
	console.error("❌ Failed to load .env.local:", result.error);
	process.exit(1);
}

console.log("✅ Loaded .env.local");
console.log("DATABASE_URL =", process.env.DATABASE_URL);

async function main() {
	// Import AFTER loading environment variables
	const { db } = await import("./index");
	const { posts, comments } = await import("./schema");

	console.log("⏳ Seeding database...");

	// Clear existing data
	await db.delete(comments);
	await db.delete(posts);

	// Insert seed posts
	const seededPosts = await db
		.insert(posts)
		.values([
			{
				title: "Getting Started with Next.js 16 and React 19",
				slug: "getting-started-nextjs-16",
				body: "Next.js 16 introduces powerful capabilities alongside React 19, including Server Actions, useActionState, and revolutionary performance updates under Turbopack. This project showcases how seamlessly the full-stack loop can be built.",
			},
			{
				title: "Why We Switched From Prisma to Drizzle ORM v2",
				slug: "switching-to-drizzle-orm",
				body: "Drizzle ORM v2 offers an incredibly lightweight, type-safe, SQL-like development experience. Paired with serverless drivers like neon-http, database queries execute with near-zero overhead compared to traditional heavy ORMs.",
			},
			{
				title: "Mastering Server Actions and Zod Form Validation",
				slug: "mastering-server-actions-zod",
				body: "Moving away from standard API route fetch requests simplifies full-stack data flow. By bringing Zod validation directly into 'use server' definitions, we guarantee robust backend validation and secure database operations.",
			},
		])
		.returning();

	console.log(`✅ Successfully seeded ${seededPosts.length} posts!`);
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌ Seeding failed:", err);
		process.exit(1);
	});
