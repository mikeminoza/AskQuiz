"use client";

import { useAuth } from "../../useAuth";
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

    const form = useForm<ForgotPasswordField>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
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
        form,
        onSubmit,
        isSuccess,
        forgotPasswordError,
    };
}
