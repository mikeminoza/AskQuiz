"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLoginForm } from "@/hooks/form/useLoginForm";
import { Loader2 } from "lucide-react";
import { AuthAlert } from "../ui/auth-alert";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isSubmitting,
        loginError,
    } = useLoginForm();

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
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
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className={`${
                                errors.password &&
                                "border-red-500 focus:ring-red-500"
                            }`}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                </div>

                {loginError && <AuthAlert message={loginError} />}

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                >
                    {isSubmitting && (
                        <Loader2 size={20} className="animate-spin" />
                    )}
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="text-muted-foreground relative z-10 px-2">
                        Or
                    </span>
                </div>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    );
}
