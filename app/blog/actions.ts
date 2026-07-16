// app/blog/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

/**
 * ============================================================================
 * MVP FEATURE #8: ZOD INPUT VALIDATION SCHEMA
 * * Strictly validates types and sizes on the server before mutating the database.
 * Enforces specific min/max string limits to protect against buffer overflow exploits.
 * ============================================================================
 */
const createCommentSchema = z.object({
	postId: z.uuid({ error: "Invalid post identifier." }),

	// MVP #8 REQUIREMENT: authorName must be between 1 and 80 characters
	authorName: z
		.string()
		.trim()
		.min(1, "Name must be at least 1 character long.")
		.max(80, "Name cannot exceed 80 characters."),

	// MVP #8 REQUIREMENT: body must be between 10 and 2000 characters
	body: z
		.string()
		.trim()
		.min(10, "Comment must be at least 10 characters long.")
		.max(2000, "Comment cannot exceed 2000 characters."),
});

export type ActionState = {
	success: boolean;
	errors?: {
		authorName?: string[];
		body?: string[];
		global?: string[];
	};
};

/**
 * ============================================================================
 * MVP FEATURE #8: "addCommentAction" SERVER MUTATION
 * * Secures the database mutation flow. Validates input payloads on the server,
 * executes query insertions, and triggers cache revalidation.
 * ============================================================================
 */
export async function addCommentAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const rawFields = {
		postId: formData.get("postId"),
		authorName: formData.get("authorName"),
		body: formData.get("body"),
	};

	// MVP #8 REQUIREMENT: Parse inputs securely through the predefined schema
	const validatedFields = createCommentSchema.safeParse(rawFields);

	if (!validatedFields.success) {
		const flattened = z.flattenError(validatedFields.error);

		return {
			success: false,
			errors: {
				authorName: flattened.fieldErrors.authorName,
				body: flattened.fieldErrors.body,
			},
		};
	}

	const { postId, authorName, body } = validatedFields.data;

	try {
		// MVP #8 REQUIREMENT: Perform mutation securely via the Drizzle instance
		await db.insert(comments).values({
			postId,
			authorName,
			body,
		});

		// MVP #8 REQUIREMENT: Evict cached Next.js route payloads to pull fresh data immediately
		revalidatePath("/blog/[slug]", "page");

		return {
			success: true,
		};
	} catch (error) {
		console.error("❌ Database insertion failed:", error);
		return {
			success: false,
			errors: {
				global: [
					"Failed to submit comment due to a server error. Please try again.",
				],
			},
		};
	}
}
