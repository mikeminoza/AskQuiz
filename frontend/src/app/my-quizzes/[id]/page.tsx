"use client";

import HomeLayout from "@/components/layout/layout";
import { GeminiAi } from "@/app/api/chat/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuizPage() {
    const breadcrumbs = [
        {
            label: "My Quizzes",
            href: "/my-quizzes",
        },
    ];
    const [input, setInput] = useState("");

    const handleGenerateQuiz = async () => {
        if (!input.trim()) return;
        try {
            const { jsonGemini } = await GeminiAi([], "json", input);
            if (jsonGemini) console.log(jsonGemini.text);
        } catch (error) {
            console.log(`JSON GEMINI ERROR: ${error}`);
        }
    };

    return (
        <HomeLayout breadcrumbs={breadcrumbs}>
            <p>Enter quiz prompt</p>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="propmt here"
            />
            <Button onClick={handleGenerateQuiz}>Generate</Button>
        </HomeLayout>
    );
}
