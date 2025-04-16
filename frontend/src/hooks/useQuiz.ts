import { createQuiz, updateQuiz, deleteQuiz } from "@/services/quiz";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useQuiz() {
    const createMutation = useMutation({
        mutationFn: createQuiz,
        onSuccess: () => {
            toast.success("Quiz added successfully!");
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateQuiz,
        onSuccess: () => {
            toast.success("Quiz updated successfully!");
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteQuiz,
        onSuccess: () => {
            toast.success("Quiz deleted successfully!");
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    return { createMutation, updateMutation, deleteMutation };
}
