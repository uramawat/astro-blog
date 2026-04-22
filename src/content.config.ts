import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load data from the blog directory
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		showDescription: z.boolean().optional(),
	}),
});

export const collections = { blog };
