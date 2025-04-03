import { ChatMessagesProps } from "@/types/gemini";
import { MessageList } from "../ui/message-list";

export function ChatMessages({ chatHistory, isLoading }: ChatMessagesProps) {
    return (
        <div className="flex-1 flex flex-col-reverse mb-4">
            <MessageList
                messages={chatHistory.map((msg, index) => ({
                    id: index.toString(),
                    role: msg.role,
                    content: msg.parts[0].text,
                }))}
                isTyping={isLoading}
            />
        </div>
    );
}
