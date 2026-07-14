// app/actions.ts
"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

// Post Validation Schema (Title and Body criteria)
const createPostSchema = z.object({
	title: z.string().min(5, "Title must be at least 5 characters long").max(100),
	body: z.string().min(20, "Content must be at least 20 characters long"),
	password: z.string().min(1, "Admin password is required"),
});

export type ActionState = {
	success: boolean;
	errors?: {
		title?: string[];
		body?: string[];
		password?: string[];
		global?: string[];
	};
	// Keep track of the inputs to restore them on failure
	fields?: {
		title?: string;
		body?: string;
	};
	redirectTo?: string;
};

export async function createPost(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	// Extract raw values first so we can return them if validation fails
	const rawTitle = formData.get("title")?.toString() || "";
	const rawBody = formData.get("body")?.toString() || "";

	const validatedFields = createPostSchema.safeParse({
		title: rawTitle,
		body: rawBody,
		password: formData.get("password")?.toString() || "",
	});

	if (!validatedFields.success) {
		return {
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
			fields: {
				title: rawTitle,
				body: rawBody,
			},
		};
	}

	const { title, body, password } = validatedFields.data;

	const ADMIN_PASSWORD = process.env.ADMIN_SECRET || "tavern2026";
	if (password !== ADMIN_PASSWORD) {
		return {
			success: false,
			errors: {
				password: ["The gatekeeper rejects your password! Access denied."],
			},
			// Retain the fields so they don't clear out on password failure
			fields: {
				title,
				body,
			},
		};
	}

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
				fields: { title, body },
			};
		}

		await db.insert(posts).values({
			title,
			slug,
			body,
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
			fields: { title, body },
		};
	}
}
