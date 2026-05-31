import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('René Dohmen'),
    // Accept a single category (string) or several (array); always normalize to an array.
    category: z
      .union([z.string(), z.array(z.string())])
      .transform((c) => (Array.isArray(c) ? c : [c])),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    status: z.string().default('published'),
  }),
});

export const collections = {
  blog,
};
