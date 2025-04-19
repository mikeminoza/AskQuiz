"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { QuizSchema } from "@/lib/zod-schemas/quizSchema";
import { Quiz, QuizFields } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuizInputField } from "@/types/quiz";

export function useQuizForm(quiz: Quiz | null) {
    const { createMutation, updateMutation } = useQuiz();

    const form = useForm<QuizFields>({
        resolver: zodResolver(QuizSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            is_public: false,
        },
    });

    // set default values when editing
    useEffect(() => {
        if (quiz) {
            form.reset({
                title: quiz.title,
                description: quiz.description,
                category: quiz.category,
                is_public: quiz.is_public,
            });
        }
    }, [quiz, form]);

    const onSubmit: SubmitHandler<QuizFields> = async (
        data: QuizInputField
    ) => {
        try {
            if (quiz) {
                await updateMutation.mutateAsync({ id: quiz.id, ...data });
            } else {
                await createMutation.mutateAsync(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = form.reset;

    return {
        form,
        onSubmit,
        resetForm,
        isSuccess: createMutation.isSuccess || updateMutation.isSuccess,
    };
}
