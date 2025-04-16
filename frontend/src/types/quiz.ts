import { QuizSchema } from "@/lib/zod-schemas/quizSchema";
import { z } from "zod";

export type Quiz = {
    id?: number;
    title: string;
    description?: string;
    category: string;
    is_public: boolean;
};

export type QuizFields = z.infer<typeof QuizSchema>;
