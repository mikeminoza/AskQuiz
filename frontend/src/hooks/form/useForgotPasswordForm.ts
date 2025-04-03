"use client";

import { useAuth } from "../useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPasswordField } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/lib/zod-schemas/authSchema";
import { AxiosError } from "axios";
import { useState } from "react";

export function useForgotPasswordForm() {
    const { forgotPasswordMutation } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const [forgotPasswordError, setForgotPasswordError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordField>({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit: SubmitHandler<ForgotPasswordField> = async (email) => {
        try {
            await forgotPasswordMutation.mutateAsync(email);
            setIsSuccess(true);
            setForgotPasswordError("");
        } catch (error) {
            const errorMsg = error as AxiosError;
            setIsSuccess(false);
            setForgotPasswordError(
                errorMsg.response?.data?.message || "Something went wrong!"
            );
            console.log(error);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isSuccess,
        forgotPasswordError,
    };
}
