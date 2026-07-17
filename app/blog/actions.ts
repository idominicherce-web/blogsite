// app/blog/actions.ts
"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

const createCommentSchema = z
	.object({
		postId: z.uuid({ error: "Invalid post identifier." }),
		parentId: z
			.string()
			.uuid({ error: "Invalid parent comment identifier." })
			.optional()
			.nullable(),
		authorName: z
			.string()
			.trim()
			.min(1, "Name must be at least 1 character long.")
			.max(80, "Name cannot exceed 80 characters."),
		body: z.string().trim().max(2000, "Comment cannot exceed 2000 characters."),
	})
	.superRefine((data, ctx) => {
		const isReply = !!data.parentId;
		const minLength = isReply ? 1 : 10;

		if (data.body.length < minLength) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: isReply
					? "Reply must be at least 1 character long."
					: "Comment must be at least 10 characters long.",
				path: ["body"],
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
		await db.insert(comments).values({
			postId,
			parentId: parentId || null,
			authorName,
			body,
			approved: true,
		});

		revalidateTag("blog-posts", "max");
		revalidatePath("/blog/[slug]", "page");

		return { success: true };
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
	newCoins?: number;
	error?: string;
};

export async function tossCoinAction(
	postId: string,
	postSlug?: string,
): Promise<CoinState> {
	const cookieStore = await cookies();
	const cookieName = `tossed_coin_${postId}`;

	if (cookieStore.has(cookieName)) {
		return {
			success: false,
			error:
				"You have already tossed a coin to this chronicle during this visit!",
		};
	}

	try {
		const updatedPosts = await db
			.update(posts)
			.set({ coins: sql`${posts.coins} + 1` })
			.where(eq(posts.id, postId))
			.returning({
				coins: posts.coins,
				slug: posts.slug,
			});

		const currentSlug = postSlug || updatedPosts[0]?.slug;

		revalidateTag("blog-posts", "max");

		if (currentSlug) {
			revalidateTag(`post-${currentSlug}`, "max");
		}

		revalidatePath("/blog/[slug]", "page");
		revalidatePath("/blog", "page");

		return {
			success: true,
			newCoins: updatedPosts[0]?.coins ?? 0,
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			error: "The dynamic registry rejected your coin. Try again!",
		};
	}
}
