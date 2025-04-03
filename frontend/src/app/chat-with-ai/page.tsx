"use client";

import HomeLayout from "@/components/layout/layout";
import { useGeminiChat } from "@/hooks/gemini/useGeminiChat";
import { useEffect, useRef, useState } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";

export default function ChatWithAiPage() {
    const breadcrumbs = [
        {
            label: "Chat with AI",
            href: "/chat-with-ai",
        },
    ];
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { chatHistory, sendMessage, isLoading } = useGeminiChat();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

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
