// lib/db/queries.ts
import {
	and,
	arrayContains,
	desc,
	eq,
	ilike,
	or,
	type SQL,
	sql,
} from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache"; // Next.js 16 Cache APIs
import { db } from "@/lib/db";
import {
	comments as commentsTable,
	posts as postsTable,
} from "@/lib/db/schema";

/**
 * ============================================================================
 * CACHED UNIQUE TAGS LIST
 * * "use cache" ensures the database unnest distinct work runs exactly once.
 * ============================================================================
 */
export async function getUniqueTags(): Promise<string[]> {
	"use cache";
	cacheTag("blog-tags");
	cacheLife("max"); // Infinite cache (recalculates only when we publish/edit a post)

	const rows = await db
		.select({
			tag: sql<string>`DISTINCT unnest(${postsTable.tags})`,
		})
		.from(postsTable);

	return rows
		.map((r) => r.tag)
		.filter(Boolean)
		.sort();
}

export interface ChronicleQueryParams {
	tag?: string;
	sort: string;
	search?: string;
}

/**
 * ============================================================================
 * CACHED CHRONICLE FETCH
 * * Automatically uses parameters (tag, sort, search) as cache keys.
 * * This query is cached globally; switching filters or sorting reads from cache.
 * ============================================================================
 */
export async function getChronicles({
	tag,
	sort,
	search,
}: ChronicleQueryParams) {
	"use cache";
	cacheTag("blog-posts");
	cacheLife("hours"); // Keeps active query combinations cached in memory

	const commentCountsSubquery = db
		.select({
			postId: commentsTable.postId,
			count: sql<number>`count(${commentsTable.id})::int`.as("comment_count"),
		})
		.from(commentsTable)
		.where(eq(commentsTable.approved, true))
		.groupBy(commentsTable.postId)
		.as("cc");

	const filters: SQL[] = [];

	if (tag) {
		filters.push(arrayContains(postsTable.tags, [tag]));
	}

	if (search) {
		filters.push(
			or(
				ilike(postsTable.title, `%${search}%`) as SQL,
				ilike(postsTable.body, `%${search}%`) as SQL,
			) as SQL,
		);
	}

	return db
		.select({
			id: postsTable.id,
			title: postsTable.title,
			slug: postsTable.slug,
			body: postsTable.body,
			createdAt: postsTable.createdAt,
			coins: postsTable.coins,
			commentCount: sql<number>`coalesce(${commentCountsSubquery.count}, 0)::int`,
		})
		.from(postsTable)
		.leftJoin(
			commentCountsSubquery,
			eq(postsTable.id, commentCountsSubquery.postId),
		)
		.where(filters.length ? and(...filters) : undefined)
		.orderBy(
			sort === "coins"
				? desc(postsTable.coins)
				: sort === "discussions"
					? desc(sql`coalesce(${commentCountsSubquery.count}, 0)`)
					: desc(postsTable.createdAt),
		);
}

// lib/db/queries.ts (Append this to the very bottom)

/**
 * ============================================================================
 * CACHED SINGLE BLOG POST QUERY
 * * Next.js 16 caches individual blog post data by its slug.
 * ============================================================================
 */
export async function getSinglePostBySlug(slug: string) {
	"use cache";
	cacheTag(`post-${slug}`);
	cacheLife("hours"); // Keeps individual chronicles cached dynamically in edge memory

	return db.query.posts.findFirst({
		where: eq(postsTable.slug, slug),
	});
}
