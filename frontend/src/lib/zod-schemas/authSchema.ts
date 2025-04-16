import { z } from "zod";

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .min(10, { message: "Name must be at least 10 characters" })
            .max(50, { message: "Name must be at most 50 characters" })
            .trim(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Your password must be at least 8 characters" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one digit",
            })
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character"
            ),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Your password must be at least 8 characters"),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const PasswordResetSchema = z
    .object({
        password: z
            .string()
            .min(8, {
                message: "Your new password must be at least 8 characters",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one digit",
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain at least one special character",
            }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });
