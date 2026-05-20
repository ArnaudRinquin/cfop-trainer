import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    estimate: z.string(),
    goal: z.string(),
    practiceAlgs: z.string().optional(),
    practiceAlgs2: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { lessons };
