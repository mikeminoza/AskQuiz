"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForgotPasswordForm } from "@/hooks/form/auth/useForgotPasswordForm";
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

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const { form, onSubmit, isSuccess, forgotPasswordError } =
        useForgotPasswordForm();

    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col gap-6", className)}
                {...props}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-xl font-bold">Forgot Password?</h1>
                    <div className="text-center text-sm text-gray-500">
                        No problem. Just let us know your email address and we
                        will email you a password reset link that will allow you
                        to choose a new one.
                    </div>
                </div>
                <div className="flex flex-col">
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Link
                        href="/login"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                        Remember your password?
                    </Link>
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
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full"
                >
                    {form.formState.isSubmitting && (
                        <Loader2 size={20} className="animate-spin" />
                    )}
                    {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Reset Link"}
                </Button>
            </form>
        </Form>
    );
}
