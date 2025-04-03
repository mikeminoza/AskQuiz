/* eslint-disable indent */
import { GeminiAi } from "@/app/api/chat/gemini";
import { useEffect, useState } from "react";
import { ChatMessage } from "@/types/gemini";
import { useConversation } from "./useConversation";
import { usePathname } from "next/navigation";

export function useGeminiChat(
    conversationHistory: ChatMessage[] | null = null
) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const { createConversationFn, createMessageFn } = useConversation();
    const pathname = usePathname();

    useEffect(() => {
        if (conversationHistory) {
            setChatHistory(conversationHistory);
        }
    }, [conversationHistory]);

    useEffect(() => {
        const idParam = Number(pathname.split("/").pop());
        if (!isNaN(idParam)) {
            setConversationId(idParam);
        }
    }, [pathname]);

    const sendMessage = async (userInput: string) => {
        setIsLoading(true);
        const newUserMessage: ChatMessage = {
            role: "user",
            parts: [{ text: userInput }],
        };
        setChatHistory((prev) => [...prev, newUserMessage]);

        const { chatGemini } = await GeminiAi(
            [...chatHistory, newUserMessage],
            "chat"
        );

        // send user input
        const response = await chatGemini?.sendMessageStream({
            message: userInput,
        });

        setIsLoading(false);
        // create empty ai response
        setChatHistory((prev) => [
            ...prev,
            { role: "model", parts: [{ text: "" }] },
        ]);

        // stream ai response
        let aiResponse = "";
        if (response) {
            for await (const chunk of response) {
                aiResponse += chunk.text;
                setChatHistory((prev) =>
                    prev.map((msg, i) =>
                        i === prev.length - 1
                            ? {
                                  ...msg,
                                  parts: [{ text: aiResponse }],
                              }
                            : msg
                    )
                );
            }
        }

        let newConversationId = conversationId;
        if (newConversationId) {
            try {
                const createResponse = await createMessageFn.mutateAsync({
                    id: newConversationId,
                    role: "user",
                    text: userInput,
                });
                newConversationId = createResponse.conversation.id;
                setConversationId(newConversationId);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const createResponse = await createConversationFn.mutateAsync({
                    title: "New Chat",
                    role: "user",
                    text: userInput,
                });
                newConversationId = createResponse.conversation.id;
                setConversationId(newConversationId);
            } catch (error) {
                console.log(error);
            }
        }

        // update route with the conversation id
        if (typeof window !== "undefined" && newConversationId) {
            window.history.replaceState(
                null,
                "",
                `/chat-with-ai/${newConversationId}`
            );
        }
        // save ai response
        if (aiResponse.trim() !== "" && newConversationId) {
            await createAiMessage(aiResponse, newConversationId);
        }
    };

    const createAiMessage = async (
        aiResponse: string,
        newConversationId: number
    ) => {
        await createMessageFn.mutateAsync({
            id: newConversationId,
            role: "model",
            text: aiResponse,
        });
    };

    return { chatHistory, sendMessage, isLoading };
}
