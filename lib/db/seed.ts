// drizzle/seed.ts
import dotenv from "dotenv";

// Load configuration variables from the local environmental file securely
const result = dotenv.config({ path: ".env.local" });

if (result.error) {
	console.error("❌ Failed to load .env.local:", result.error);
	process.exit(1);
}

console.log("✅ Loaded .env.local");

/**
 * ============================================================================
 * MVP FEATURE #9: DATABASE SEED SCRIPT
 * * Programmatically purges old records to prevent duplication constraints,
 * and populates the tables with at least three immersive fantasy posts.
 * ============================================================================
 */
async function main() {
	// Import after confirming environmental context is fully loaded into memory
	const { db } = await import("./index");
	const { posts, comments } = await import("./schema");

	console.log("⏳ Clearing old chronicles and records...");

	// MVP #9 REQUIREMENT: Clear existing database records before seeding to avoid conflict errors
	// Cascading deletes in schema will clean up orphans automatically
	await db.delete(comments);
	await db.delete(posts);

	console.log("⏳ Inscribing scrolls into the database...");

	// MVP #9 REQUIREMENT: Insert at least 3 high-quality seed records into the posts table
	const seededPosts = await db
		.insert(posts)
		.values([
			{
				title: "The Battle Above the Gods Eye",
				slug: "battle-above-gods-eye",
				body: "The Dance of the Dragons reached its fatal peak high in the storm clouds over the Riverlands in 130 AC. Prince Daemon Targaryen, riding the agile blood wyrm Caraxes, clashed with his nephew Prince Aemond Targaryen upon the colossal Vhagar. Locked in a terminal fiery spiral toward the waters below, Daemon unfastened his saddle chains, leapt across the roaring chasm of wind, and drove the Valyrian steel blade Dark Sister straight through Aemond's sapphire eye socket, sealing their tragic legends forever.",
				// STRETCH #12: Tags mapped cleanly to test and verify filtering capabilities
				tags: ["Lore", "Dragons"],
			},
			{
				title: "The Forging of the One Ring in Mount Doom",
				slug: "forging-of-the-one-ring",
				body: "Deep within the fiery subterranean chasms of Sammath Naur, the Dark Lord Sauron secretly forged a master element to control the Free Peoples of Middle-earth. Infusing the golden band with his own cruel malice, life force, and will to dominate, he spoke the Black Speech incantation that would bind the Three, Seven, and Nine. In that blinding moment of shadow and flame, the fate of the Second Age was forever tethered to the fires of Orodruin.",
				tags: ["Lore", "Artifacts"],
			},
			{
				title: "A Decree on the Ranging Protocols of Dunedain Chieftains",
				slug: "dunedain-ranging-protocols",
				body: "Heed this warning, rangers of the North. The shadows growing along the borders of Angmar demand total vigilance. Keep your travel tracks masked by gray cloaks, use only avian whistles for communication across the deep brush, and report all movements of unusual warg packs immediately to the hidden valley of Imladris. The blood of Westernesse must endure silently in the wilds.",
				tags: ["Quests"],
			},
		])
		.returning();

	console.log(
		`✅ Successfully seeded ${seededPosts.length} legendary scrolls!`,
	);
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌ Seeding failed:", err);
		process.exit(1);
	});
