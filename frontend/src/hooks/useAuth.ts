import {
    forgotPassword,
    loginUser,
    logoutUser,
    passwordReset,
    registerUser,
} from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth() {
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.push("/dashboard");
            toast.success("Login successfull!");
        },
        onError: () => {
            toast.error("Login failed!");
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push("/login");
            toast.success("Registration successfull!");
        },
        onError: () => {
            toast.error("Registration failed!");
        },
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success("Password reset link sent to your email.");
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });

    const passwordResetMutation = useMutation({
        mutationFn: passwordReset,
        onSuccess: () => {
            router.push("/login");
            toast.success("Password reset successfull!");
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push("/login");
            toast.success("Logged out successfully");
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });

    return {
        loginMutation,
        registerMutation,
        forgotPasswordMutation,
        passwordResetMutation,
        logoutMutation,
    };
}
