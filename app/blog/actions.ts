// app/blog/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

// MVP 8 Compliant Schema: Strict character min/max constraint definitions
const createCommentSchema = z.object({
	postId: z.uuid({ error: "Invalid post identifier." }),
	authorName: z
		.string()
		.trim()
		.min(1, "Name must be at least 1 character long.")
		.max(80, "Name cannot exceed 80 characters."),
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
 * Server Action to securely insert a comment into the Neon database
 * Fully Compliant with MVP 8 Specs
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
		await db.insert(comments).values({
			postId,
			authorName,
			body,
		});

		// MVP 8 Compliant: Target layout pathway clear cache invocation
		revalidatePath("/blog/[slug]");

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
