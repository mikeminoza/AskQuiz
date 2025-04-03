export type ChatMessage = {
    role: "user" | "model";
    parts: { text: string }[];
};

export type ChatMessagesProps = {
    chatHistory: ChatMessage[];
    isLoading: boolean;
};

export type ChatInputProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (userInput: string) => Promise<void>;
    isLoading: boolean;
};

export type ConversationType = {
    id?: number;
    title?: string;
    role: "user" | "model";
    text: string;
};

export type ConversationHistory = {
    id: number;
    title: string;
    message: Message[];
};

type MessagePart = {
    text: string;
};

type Message = {
    parts: MessagePart[];
};
