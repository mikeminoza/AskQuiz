import { QuizSchema } from "@/lib/zod-schemas/quizSchema";
import { z } from "zod";
import { Question } from "./question";

export type Quiz = {
    id?: number;
    title: string;
    description?: string;
    category: string;
    is_public: boolean;
    status?: "draft" | "published" | "archived";
    user_id?: number;
    created_at?: string;
    updated_at?: string;
    questions: Question[];
};

export type QuizCardProps = {
    quizzes?: Quiz[];
};

export type QuizInputField = {
    title: string;
    description?: string;
    category: string;
    is_public: boolean;
};

export type QuizFields = z.infer<typeof QuizSchema>;
