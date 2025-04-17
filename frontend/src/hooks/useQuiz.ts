import { createQuiz, updateQuiz, deleteQuiz } from "@/services/quiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useQuiz() {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
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
            queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
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
            queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
            toast.success("Quiz deleted successfully!");
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    return { createMutation, updateMutation, deleteMutation };
}
