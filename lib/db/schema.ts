// lib/db/schema.ts

import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// 1. Posts Table
export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	body: text("body").notNull(),
	// Add the tags column as a text array in PostgreSQL
	tags: text("tags").array(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Comments Table
export const comments = pgTable("comments", {
	id: uuid("id").primaryKey().defaultRandom(),
	postId: uuid("post_id")
		.references(() => posts.id, { onDelete: "cascade" })
		.notNull(),
	authorName: text("author_name").notNull(),
	body: text("body").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Relational Definitions
export const postsRelations = relations(posts, ({ many }) => ({
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));
