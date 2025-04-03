"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRegisterForm } from "@/hooks/form/useRegisterForm";
import { Loader2 } from "lucide-react";
import { AuthAlert } from "../ui/auth-alert";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        registerError,
    } = useRegisterForm();

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to register a new account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <div>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className={`${
                                errors.name &&
                                "border-red-500 focus:ring-red-500"
                            }`}
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                </div>
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
                    <Label htmlFor="password">Password</Label>
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
                <div className="grid gap-3">
                    <Label htmlFor="password">Confirm Password</Label>
                    <div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Re-enter your password to confirm"
                            className={`${
                                errors.password_confirmation &&
                                "border-red-500 focus:ring-red-500"
                            }`}
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation && (
                            <span className="text-red-500 text-sm">
                                {errors.password_confirmation.message}
                            </span>
                        )}
                    </div>
                </div>

                {registerError && <AuthAlert message={registerError} />}

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                >
                    {isSubmitting && (
                        <Loader2 size={20} className="animate-spin" />
                    )}
                    {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="text-muted-foreground relative z-10 px-2">
                        Or
                    </span>
                </div>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </form>
    );
}
