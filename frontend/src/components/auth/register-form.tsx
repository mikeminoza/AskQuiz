"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRegisterForm } from "@/hooks/form/auth/useRegisterForm";
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
import { SocialButtons } from "./social-buttons";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const { form, onSubmit, isSubmitting, registerError } = useRegisterForm();
    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col gap-6", className)}
                {...props}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your details below to register a new account
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter you name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter you email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter you password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Re-enter your password to confirm"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
            </form>
            <div className="flex flex-col gap-6 mt-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="text-muted-foreground relative z-10 px-2">
                        Or Continue With
                    </span>
                </div>
                <SocialButtons />
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/register"
                        className="underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </Form>
    );
}
