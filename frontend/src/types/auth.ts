import {
    ForgotPasswordSchema,
    LoginSchema,
    RegisterSchema,
    PasswordResetSchema,
} from "@/lib/zod-schemas/authSchema";
import { z } from "zod";

export type AuthCredentials = {
    name?: string;
    email: string;
    password: string;
    password_confirmation?: string;
};

// for the reset password api
export type PasswordResetData = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type SocialAuth = "google" | "facebook";

// for the reset password form
export type PasswordResetForm = Omit<PasswordResetData, "token" | "email">;

export type LoginFields = z.infer<typeof LoginSchema>;

export type RegisterFields = z.infer<typeof RegisterSchema>;

export type ForgotPasswordField = z.infer<typeof ForgotPasswordSchema>;

export type PasswordResetFields = z.infer<typeof PasswordResetSchema>;
