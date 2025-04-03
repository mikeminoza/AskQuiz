"use client";

import { useAuth } from "../useAuth";
import { PasswordResetSchema } from "@/lib/zod-schemas/authSchema";
import { PasswordResetForm } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useParams, useSearchParams } from "next/navigation";

export function usePasswordResetForm() {
    const { passwordResetMutation } = useAuth();
    const [passwordResetError, setPasswordResetError] = useState("");
    const params = useParams();
    const searchParams = useSearchParams();

    // get password reset token and email from URL
    const token = params.token as string;
    const email = searchParams.get("email") || "";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PasswordResetForm>({
        resolver: zodResolver(PasswordResetSchema),
    });

    const onSubmit: SubmitHandler<PasswordResetForm> = async (data) => {
        try {
            await passwordResetMutation.mutateAsync({ token, email, ...data });
            setPasswordResetError("");
        } catch (error) {
            const errorMsg = error as AxiosError;
            setPasswordResetError(
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
        passwordResetError,
    };
}
