import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      draft: z.boolean().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const til = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/til" }),
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, til };
