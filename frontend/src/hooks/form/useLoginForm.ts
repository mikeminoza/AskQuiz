"use client";

import { useAuth } from "../useAuth";
import { LoginFields } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/zod-schemas/authSchema";
import { useState } from "react";
import { AxiosError } from "axios";

export function useLoginForm() {
    const [loginError, setLoginError] = useState("");
    const { loginMutation } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFields>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginFields> = async (data) => {
        try {
            await loginMutation.mutateAsync(data);
            setLoginError("");
        } catch (error) {
            const errorMsg = error as AxiosError;
            setLoginError(
                errorMsg.response?.data?.message || "Something went wrong!"
            );
            console.log(error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        loginError,
    };
}
