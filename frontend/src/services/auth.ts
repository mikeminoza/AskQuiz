import api from "@/app/api/axios";
import {
    AuthCredentials,
    ForgotPasswordField,
    PasswordResetData,
} from "@/types/auth";

const getCsrfToken = async () => {
    await api.get("/sanctum/csrf-cookie");
};

export const loginUser = async (credentials: AuthCredentials) => {
    await getCsrfToken();
    const response = await api.post("/login", credentials);
    return response.data;
};

export const registerUser = async (credentials: AuthCredentials) => {
    await getCsrfToken();
    const response = await api.post("/register", credentials);
    return response.data;
};

export const forgotPassword = async (email: ForgotPasswordField) => {
    await getCsrfToken();
    const response = await api.post("/forgot-password", email);
    return response.data;
};

export const passwordReset = async (credentials: PasswordResetData) => {
    await getCsrfToken();
    const response = await api.post("/reset-password", credentials);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get("/api/user");
    return response.data;
};

export const logoutUser = async () => {
    await getCsrfToken();
    const response = await api.post("/logout");
    return response.data;
};
