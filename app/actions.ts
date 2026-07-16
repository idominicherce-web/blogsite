// app/actions.ts
"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

// Zod schema enforcing formatting rules on incoming chronicle submissions
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
		tags?: string;
	};
	redirectTo?: string;
};

/**
 * ============================================================================
 * STRETCH FEATURE #11: POST CREATION MUTATION
 * * Secures the creation of database posts. Parses schema values, matches passwords
 * against server variables, formats tags, and auto-generates URL slugs.
 * ============================================================================
 */
export async function createPost(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const rawTitle = formData.get("title")?.toString() || "";
	const rawBody = formData.get("body")?.toString() || "";
	const rawTags = formData.get("tags")?.toString() || "";

	// STRETCH #11 REQUIREMENT: Parse input values securely through Zod's safeParse()
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

	// STRETCH #11 REQUIREMENT: Basic password security check against environmental variable (ADMIN_SECRET)
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

	// STRETCH #12: Split the raw tags string into a cleaned, whitespace-trimmed string array
	const tagArray = tags
		? tags
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s.length > 0)
		: null;

	try {
		// Generate clean url slugs (e.g., "The Siege of Riverford" -> "the-siege-of-riverford")
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

		// Insert post details using the Drizzle instance
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

/**
 * ============================================================================
 * STRETCH FEATURE #13: ATOMIC COMMENT MODERATION
 * * Toggles approval status for selected inscriptions on the guestbook ledger.
 * Triggered only by administrators.
 * ============================================================================
 */
export async function toggleCommentApproval(
	commentId: string,
	postSlug: string,
) {
	try {
		// Atomically toggle the boolean flag directly within the database row
		await db
			.update(comments)
			.set({ approved: not(comments.approved) })
			.where(eq(comments.id, commentId));

		// Purge route cache payloads immediately to apply visual changes across the viewports
		revalidatePath(`/blog/${postSlug}`);
		return { success: true };
	} catch {
		return { success: false, error: "Failed to modulate the scroll comment." };
	}
}
