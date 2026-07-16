// lib/db/schema.ts
import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

/**
 * ============================================================================
 * MVP FEATURE #1: DRIZZLE SCHEMA - POSTS TABLE
 * * Defines the core "posts" schema structure containing chronicle metadata.
 * Includes optimization for indexing PostgreSQL array structures.
 * ============================================================================
 */
export const posts = pgTable(
	"posts",
	{
		// MVP #1 REQUIREMENT: Primary Key configured as an auto-generating randomized UUID string
		id: uuid("id").defaultRandom().primaryKey(),

		// MVP #1 REQUIREMENT: Standard payload text columns enforced with database-level notNull() constraints
		title: text("title").notNull(),
		slug: text("slug").notNull().unique(),
		body: text("body").notNull(),

		// STRETCH FEATURE #12: Tags column added as a native text array in PostgreSQL
		tags: text("tags").array(),

		// Track the coins tossed to this chronicle
		coins: integer("coins").default(0).notNull(),

		// MVP #1 REQUIREMENT: Timestamp track default set to runtime database creation date
		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => [
		/**
		 * PERFORMANCE OPTIMIZATION (STRETCH #12):
		 * 🛡️ GIN (Generalized Inverted Index) for lightning-fast array lookups.
		 * Prevents slow sequential table-scans when evaluating arrayContains(posts.tags, [tag]).
		 */
		index("posts_tags_gin_idx").using("gin", table.tags),
	],
);

/**
 * ============================================================================
 * MVP FEATURE #1: DRIZZLE SCHEMA - COMMENTS TABLE
 * * Defines the guestbook inscription data schema linked directly to parent posts.
 * Enforces automatic cascading garbage collection for database integrity.
 * ============================================================================
 */
export const comments = pgTable("comments", {
	// MVP #1 REQUIREMENT: Primary Key auto-generating randomized UUID string
	id: uuid("id").primaryKey().defaultRandom(),

	// MVP #1 REQUIREMENT: Foreign Key targeting posts.id configured with cascade delete behavior.
	// If a post is deleted by an admin, its associated guestbook comments are cleared automatically.
	postId: uuid("post_id")
		.references(() => posts.id, { onDelete: "cascade" })
		.notNull(),

	// MVP #1 REQUIREMENT: Required text inputs for author identifiers and message payloads
	authorName: text("author_name").notNull(),
	body: text("body").notNull(),

	// STRETCH FEATURE #13: Comment Moderation state flag.
	// Defaults to true so initial seed data renders immediately; set to false by admin flag toggles.
	approved: boolean("approved").default(true).notNull(),

	// MVP #1 REQUIREMENT: Standard timestamp track initialized to table record creation time
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * ============================================================================
 * MVP FEATURE #1: DRIZZLE SCHEMA - RELATIONAL DEFINITIONS
 * * Configures declarative relations mapped via Drizzle Query API boundaries.
 * Enables quick joins (e.g. `db.query.posts.findFirst({ with: { comments: true } })`).
 * ============================================================================
 */
export const postsRelations = relations(posts, ({ many }) => ({
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));
