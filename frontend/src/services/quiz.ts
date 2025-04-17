import api from "@/app/api/axios";
import { QuizInputField, Quiz } from "@/types/quiz";

export const getUserQuiz = async () => {
    const response = await api.get("/api/quizzes");
    return response.data;
};

export const createQuiz = async (data: QuizInputField) => {
    const response = await api.post("/api/quizzes", data);
    return response.data;
};

export const updateQuiz = async (data: Quiz) => {
    const response = await api.put(`/api/quizzes/${data.id}`, data);
    return response.data;
};

export const deleteQuiz = async (id: number) => {
    const response = await api.delete(`/api/quizzes/${id}`);
    return response.data;
};
