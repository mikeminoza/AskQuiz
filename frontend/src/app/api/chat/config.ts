import { Type } from "@google/genai";

export const geminiConfigs = {
    chat: {
        config: {
            systemInstruction:
                "You are an AI assistant. Keep responses concise and relevant.",
        },
    },
    json: {
        config: {
            systemInstruction:
                "Generate a valid multiple-choice question (MCQ) JSON response. If the user input cannot be converted into an MCQ, respond with an error message and set success to false. Ensure that exactly four answer choices are provided. Make sure that the generated question is related to the user input. If the user provided a question already, make sure to copy it all for the question.",
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    success: {
                        type: Type.BOOLEAN,
                        description:
                            "Indicates if the quiz was generated successfully.",
                    },
                    message: {
                        type: Type.STRING,
                        description:
                            "Success message if quiz was generated, or an error message if quiz generation failed.",
                    },
                    quiz: {
                        type: Type.OBJECT,
                        nullable: true,
                        properties: {
                            question: {
                                type: Type.STRING,
                                description: "The MCQ question.",
                            },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "Four answer choices.",
                            },
                            correctAnswer: {
                                type: Type.STRING,
                                description:
                                    "The correct answer (must be one of the options).",
                            },
                        },
                        required: ["question", "options", "correctAnswer"],
                    },
                },
                required: ["success", "message"],
            },
        },
    },
};
