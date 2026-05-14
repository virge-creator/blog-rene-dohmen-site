import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('René Dohmen'),
    category: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    status: z.string().default('published'),
  }),
});

export const collections = {
  blog,
};
