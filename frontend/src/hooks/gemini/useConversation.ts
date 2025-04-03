import {
    createConversation,
    createMessage,
    deleteConverstation,
} from "@/services/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useConversation() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const createConversationFn = useMutation({
        mutationFn: createConversation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    const createMessageFn = useMutation({
        mutationFn: createMessage,
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    const deleteConversationFn = useMutation({
        mutationFn: deleteConverstation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            router.push("/chat-with-ai");
            toast.success("Converstaion Deleted Successfully!");
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error);
        },
    });

    return {
        createConversationFn,
        createMessageFn,
        deleteConversationFn,
    };
}
