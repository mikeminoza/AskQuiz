import api from "@/app/api/axios";
import {
    AuthCredentials,
    ForgotPasswordField,
    PasswordResetData,
    SocialAuth,
} from "@/types/auth";

const getCsrfToken = async () => {
    await api.get("/sanctum/csrf-cookie");
};

export const loginUser = async (credentials: AuthCredentials) => {
    await getCsrfToken();
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const registerUser = async (credentials: AuthCredentials) => {
    await getCsrfToken();
    const response = await api.post("/auth/register", credentials);
    return response.data;
};

export const forgotPassword = async (email: ForgotPasswordField) => {
    await getCsrfToken();
    const response = await api.post("/auth/forgot-password", email);
    return response.data;
};

export const passwordReset = async (credentials: PasswordResetData) => {
    await getCsrfToken();
    const response = await api.post("/auth/reset-password", credentials);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get("/auth/api/user");
    return response.data;
};

export const logoutUser = async () => {
    await getCsrfToken();
    const response = await api.post("/auth/logout");
    return response.data;
};

export const handleSocialLogin = (provider: SocialAuth) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/redirect`;
};
