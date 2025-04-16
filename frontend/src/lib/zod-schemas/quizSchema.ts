import { z } from "zod";

export const QuizSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required!")
        .max(255, "Title must be at most 255 characters!"),
    description: z
        .string()
        .max(255, "Description must be at most 255 characters!")
        .optional(),
    category: z
        .string()
        .trim()
        .min(1, "Category is required!")
        .max(255, "Category must be at most 255 characters!"),
    is_public: z.boolean(),
});
