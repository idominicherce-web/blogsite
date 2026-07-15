// app/actions.ts
"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

const createPostSchema = z.object({
	title: z.string().min(5, "Title must be at least 5 characters").max(100),
	body: z.string().min(20, "Body must be at least 20 characters"),
	password: z.string().min(1, "Password is required"),
	tags: z.string().optional(),
});

export type ActionState = {
	success: boolean;
	errors?: {
		title?: string[];
		body?: string[];
		password?: string[];
		tags?: string[];
		global?: string[];
	};
	fields?: {
		title?: string;
		body?: string;
		tags?: string; // FIX: type definition to match raw input string values
	};
	redirectTo?: string;
};

export async function createPost(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const rawTitle = formData.get("title")?.toString() || "";
	const rawBody = formData.get("body")?.toString() || "";
	const rawTags = formData.get("tags")?.toString() || "";

	// FIX: Pass the raw string to safeParse so Zod doesn't reject an array structure
	const validatedFields = createPostSchema.safeParse({
		title: rawTitle,
		body: rawBody,
		password: formData.get("password")?.toString() || "",
		tags: rawTags,
	});

	if (!validatedFields.success) {
		return {
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
			fields: {
				title: rawTitle,
				body: rawBody,
				tags: rawTags,
			},
		};
	}

	const { title, body, password, tags } = validatedFields.data;

	const ADMIN_PASSWORD = process.env.ADMIN_SECRET;
	if (password !== ADMIN_PASSWORD) {
		return {
			success: false,
			errors: {
				password: ["The gatekeeper rejects your password! Access denied."],
			},
			fields: {
				title,
				body,
				tags,
			},
		};
	}

	// FORMATTING: Split tags string cleanly into a trimmed array for PostgreSQL
	const tagArray = tags
		? tags
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s.length > 0)
		: null;

	try {
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");

		const existingPost = await db.query.posts.findFirst({
			where: (posts, { eq }) => eq(posts.slug, slug),
		});

		if (existingPost) {
			return {
				success: false,
				errors: { title: ["A post with a similar title already exists."] },
				fields: { title, body, tags },
			};
		}

		// Explicitly append the generated tag array mapping to your Drizzle values
		await db.insert(posts).values({
			title,
			slug,
			body,
			tags: tagArray,
		});

		return {
			success: true,
			redirectTo: `/blog/${slug}`,
		};
	} catch {
		return {
			success: false,
			errors: {
				global: [
					"The scroll could not be inscribed due to a database anomaly.",
				],
			},
			fields: { title, body, tags },
		};
	}
}

export async function toggleCommentApproval(
	commentId: string,
	postSlug: string,
) {
	try {
		// Atomically flip the boolean flag directly on the database row
		await db
			.update(comments)
			.set({ approved: not(comments.approved) })
			.where(eq(comments.id, commentId));

		// Purge the Next.js server cache to show the status instantly
		revalidatePath(`/blog/${postSlug}`);
		return { success: true };
	} catch {
		return { success: false, error: "Failed to modulate the scroll comment." };
	}
}
