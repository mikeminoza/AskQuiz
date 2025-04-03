"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordResetForm } from "@/hooks/form/usePasswordResetForm";
import { Loader2 } from "lucide-react";
import { AuthAlert } from "../ui/auth-alert";

export function PasswordResetForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        passwordResetError,
    } = usePasswordResetForm();

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Account Password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Create a new password to secure your account. Make sure
                    it&apos;s strong and unique!
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="password">New Password</Label>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your new password"
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
                    <Label htmlFor="password_confirmation">
                        Confirm New Password
                    </Label>
                    <div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Re-enter your new password to confirm"
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

                {passwordResetError && (
                    <AuthAlert
                        message={passwordResetError}
                        redirectLink={"/forgot-password"}
                        redirectText={"Request a New Reset Link"}
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
                    {isSubmitting ? "Reseting Password..." : "Reset Password"}
                </Button>
            </div>
        </form>
    );
}
