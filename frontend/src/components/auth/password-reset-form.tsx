"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordResetForm } from "@/hooks/form/auth/usePasswordResetForm";
import { Loader2 } from "lucide-react";
import { AuthAlert } from "../ui/auth-alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function PasswordResetForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const { form, onSubmit, passwordResetError } = usePasswordResetForm();

    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col gap-6", className)}
                {...props}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">
                        Reset Account Password
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Create a new password to secure your account. Make sure
                        it&apos;s strong and unique!
                    </p>
                </div>
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter new password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password_confirmation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter new password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {passwordResetError && (
                    <AuthAlert
                        message={passwordResetError}
                        redirectLink={"/forgot-password"}
                        redirectText={"Request a New Reset Link"}
                    />
                )}

                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full"
                >
                    {form.formState.isSubmitting && (
                        <Loader2 size={20} className="animate-spin" />
                    )}
                    {form.formState.isSubmitting
                        ? "Reseting Password..."
                        : "Reset Password"}
                </Button>
            </form>
        </Form>
    );
}
