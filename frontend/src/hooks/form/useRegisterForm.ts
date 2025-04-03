"use client";

import { useAuth } from "../useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFields } from "@/types/auth";
import { RegisterSchema } from "@/lib/zod-schemas/authSchema";
import { useState } from "react";
import { AxiosError } from "axios";

export function useRegisterForm() {
    const { registerMutation } = useAuth();
    const [registerError, setRegisterError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFields>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
        try {
            await registerMutation.mutateAsync(data);
            setRegisterError("");
        } catch (error) {
            const errorMsg = error as AxiosError;
            setRegisterError(
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
        registerError,
    };
}
