import api from "@/app/api/axios";
import { ConversationType } from "@/types/gemini";

// chat history
export const getConversations = async () => {
    const response = await api.get("/api/conversations");
    return response.data;
};

// chat conversation
export const getConversation = async (id: number) => {
    const response = await api.get(`/api/conversations/${id}`);
    return response.data;
};

export const createConversation = async (data: ConversationType) => {
    const response = await api.post("/api/conversations", data);
    return response.data;
};

export const deleteConverstation = async (id: number) => {
    const response = await api.delete(`/api/conversations/${id}`);
    return response.data;
};

export const createMessage = async (data: ConversationType) => {
    const response = await api.post(
        `/api/conversations/${data.id}/messages`,
        data
    );
    return response.data;
};
