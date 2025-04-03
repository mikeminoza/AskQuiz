"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForgotPasswordForm } from "@/hooks/form/useForgotPasswordForm";
import { Loader2 } from "lucide-react";
import { AuthAlert } from "../ui/auth-alert";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isSuccess,
        forgotPasswordError,
    } = useForgotPasswordForm();

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-xl font-bold">Forgot Password?</h1>
                        <div className="text-center text-sm text-gray-500">
                            No problem. Just let us know your email address and
                            we will email you a password reset link that will
                            allow you to choose a new one.
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="email">Email</Label>
                                <Link
                                    href="/login"
                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                >
                                    Remember your password?
                                </Link>
                            </div>
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`${
                                        errors.email &&
                                        "border-red-500 focus:ring-red-500"
                                    }`}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {(isSuccess || forgotPasswordError) && (
                            <AuthAlert
                                message={
                                    isSuccess
                                        ? "A password reset link has been sent to your email. Please check your inbox."
                                        : forgotPasswordError
                                }
                                type={isSuccess ? "success" : "error"}
                            />
                        )}

                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            {isSubmitting && (
                                <Loader2 size={20} className="animate-spin" />
                            )}
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
