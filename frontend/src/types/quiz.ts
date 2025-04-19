import { QuizSchema } from "@/lib/zod-schemas/quizSchema";
import { z } from "zod";
import { Question } from "./question";
import React from "react";

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
    id?: number;
    title: string;
    description?: string;
    category: string;
    is_public: boolean;
};

export type QuizDialogProps = {
    quiz: Quiz | null;
    openQuizDialog: boolean;
    setOpenQuizDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteDialogProps = {
    quiz: Quiz;
    openDeleteDialog: boolean;
    setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type QuizFields = z.infer<typeof QuizSchema>;
