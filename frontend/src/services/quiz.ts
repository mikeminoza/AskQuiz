import api from "@/app/api/axios";
import { Quiz } from "@/types/quiz";

export const createQuiz = async (data: Quiz) => {
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
