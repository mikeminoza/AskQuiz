import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInputProps } from "@/types/gemini";
import { ArrowUp, Loader2 } from "lucide-react";

export default function ChatInput({
    input,
    setInput,
    sendMessage,
    isLoading,
}: ChatInputProps) {
    const handleSubmit = async () => {
        if (!input) return;

        sendMessage(input);
        setInput("");
    };

    return (
        <div className="sticky bottom-0 bg-background">
            <div className="relative flex w-full items-center space-x-2">
                <div className="relative flex-1">
                    <Textarea
                        aria-label="Write your prompt here"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="absolute right-4 top-3 z-20">
                    <Button
                        className="h-8 w-8"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <ArrowUp className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
