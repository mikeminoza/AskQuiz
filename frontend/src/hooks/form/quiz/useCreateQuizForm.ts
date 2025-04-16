"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { QuizSchema } from "@/lib/zod-schemas/quizSchema";
import { QuizFields } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function useCreateQuizForm() {
    const [createError, setCreateError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { createMutation } = useQuiz();

    const form = useForm<QuizFields>({
        resolver: zodResolver(QuizSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            is_public: false,
        },
    });

    const onSubmit: SubmitHandler<QuizFields> = async (data) => {
        try {
            await createMutation.mutateAsync(data);
            setCreateError("");
            setIsSuccess(true);
        } catch (error) {
            const errorMsg = error as AxiosError;
            setCreateError(
                errorMsg.response?.data?.message || "Something went wrong!"
            );
            setIsSuccess(false);
            console.log(error);
        }
    };

    const resetForm = form.reset;

    return {
        form,
        onSubmit,
        resetForm,
        isSuccess,
        createError,
    };
}
