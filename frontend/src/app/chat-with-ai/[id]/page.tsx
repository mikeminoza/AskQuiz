"use client";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import HomeLayout from "@/components/layout/layout";
import { useGeminiChat } from "@/hooks/gemini/useGeminiChat";
import { getConversation } from "@/services/chat";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatConversation() {
    const [input, setInput] = useState("");
    const [oldChatHistory, setOldChatHistory] = useState([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasInitialized, setHasIntialized] = useState(false);
    const { chatHistory, sendMessage, isLoading } =
        useGeminiChat(oldChatHistory);
    //get id from url
    const pathname = usePathname();
    const conversationId = Number(pathname.split("/").pop());

    const { data, isSuccess } = useQuery({
        queryFn: () => getConversation(conversationId),
        queryKey: ["conversation", conversationId],
        enabled: !isNaN(conversationId),
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isSuccess && !hasInitialized) {
            setOldChatHistory(data.conversation.messages);
            setHasIntialized(true);
        }
    }, [isSuccess, hasInitialized, data]);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const breadcrumbs = [
        {
            label: "Chat with AI",
            href: "/chat-with-ai",
        },
        {
            label: data?.conversation?.title || "Loading...",
            href: "",
        },
    ];
    return (
        <HomeLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col px-4">
                {/* Scrollable Message List */}
                <ChatMessages chatHistory={chatHistory} isLoading={isLoading} />
                {/* Chat Message Input  */}
                <ChatInput
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    isLoading={isLoading}
                />
            </div>
            <div ref={messagesEndRef} />
        </HomeLayout>
    );
}
