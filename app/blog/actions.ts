// app/blog/actions.ts
"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

/**
 * ============================================================================
 * MVP FEATURE #8: ZOD INPUT VALIDATION SCHEMA (DYNAMIC REPLIES)
 * * Strictly validates types and sizes on the server before mutating the database.
 * * Dynamically enforces a min length of 10 for parents, but only 1 for replies.
 * ============================================================================
 */
const createCommentSchema = z
	.object({
		postId: z.uuid({ error: "Invalid post identifier." }),

		// Verify parentId is a valid UUID structure if provided
		parentId: z
			.string()
			.uuid({ error: "Invalid parent comment identifier." })
			.optional()
			.nullable(),

		// MVP #8 REQUIREMENT: authorName must be between 1 and 80 characters
		authorName: z
			.string()
			.trim()
			.min(1, "Name must be at least 1 character long.")
			.max(80, "Name cannot exceed 80 characters."),

		// Enforce maximum buffer overflow limit beforehand
		body: z.string().trim().max(2000, "Comment cannot exceed 2000 characters."),
	})
	.superRefine((data, ctx) => {
		// If parentId is present and valid, this is a nested reply echo
		const isReply = !!data.parentId;
		const minLength = isReply ? 1 : 10;

		if (data.body.length < minLength) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: isReply
					? "Reply must be at least 1 character long."
					: "Comment must be at least 10 characters long.",
				path: ["body"], // Targets the exact input field on our client forms
			});
		}
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
		parentId: formData.get("parentId") || null,
		authorName: formData.get("authorName"),
		body: formData.get("body"),
	};

	// Parse inputs securely through the conditional refinement schema
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

	const { postId, parentId, authorName, body } = validatedFields.data;

	try {
		// Perform mutation securely via the Drizzle instance
		await db.insert(comments).values({
			postId,
			parentId: parentId || null,
			authorName,
			body,
			approved: true, // Auto-approved by default
		});

		// Evict cached Next.js route payloads to pull fresh data immediately
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

export type CoinState = {
	success: boolean;
	newCoins?: number; // Safely returns the fresh database coin count to the client
	error?: string;
};

/**
 * ============================================================================
 * SECURED COIN TOSS MUTATION
 * * Enforces a strict "one coin per post per session" rule.
 * * Prevents API request spoofing and bot spam.
 * ============================================================================
 */
export async function tossCoinAction(postId: string): Promise<CoinState> {
	const cookieStore = await cookies();
	const cookieName = `tossed_coin_${postId}`;

	// 🛡️ 1. SERVER-SIDE CHECK: Verify if session cookie already exists
	if (cookieStore.has(cookieName)) {
		return {
			success: false,
			error:
				"You have already tossed a coin to this chronicle during this visit!",
		};
	}

	try {
		// 2. Perform the update mutation and extract the returned update count directly
		const updatedPosts = await db
			.update(posts)
			.set({
				coins: sql`${posts.coins} + 1`,
			})
			.where(eq(posts.id, postId))
			.returning({
				coins: posts.coins,
			});

		const newCoinCount = updatedPosts[0]?.coins ?? 0;

		// 3. WRITE THE LOCK: Set session cookie (active only for the current browser session)
		cookieStore.set({
			name: cookieName,
			value: "tossed",
			httpOnly: true, // Prevents client-side JS read exploits (XSS protection)
			secure: process.env.NODE_ENV === "production", // Only transmit over HTTPS in production
			sameSite: "lax", // Prevent CSRF attacks
			path: "/", // Scope cookie site-wide
		});

		// 4. Revalidate ONLY the index page so that when we navigate back, the notice board updates
		revalidatePath("/blog", "page");

		return {
			success: true,
			newCoins: newCoinCount,
		};
	} catch (error) {
		console.error("❌ Failed to toss coin:", error);
		return {
			success: false,
			error: "The dynamic registry rejected your coin. Try again!",
		};
	}
}
