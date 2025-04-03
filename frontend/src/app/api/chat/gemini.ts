import { ChatMessage } from "@/types/gemini";
import { GoogleGenAI } from "@google/genai";
import { geminiConfigs } from "./config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GeminiAi(
    chatHistory: ChatMessage[] = [],
    mode: "chat" | "json",
    prompt: string = ""
) {
    let chatGemini;
    let jsonGemini;
    if (mode === "chat") {
        chatGemini = ai.chats.create({
            model: "gemini-2.0-flash",
            config: geminiConfigs.chat.config,
            history: chatHistory,
        });
    } else if (mode === "json") {
        jsonGemini = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            config: geminiConfigs.json.config,
            contents: prompt,
        });
    }
    return { chatGemini, jsonGemini };
}
