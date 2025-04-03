import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConversation } from "@/hooks/gemini/useConversation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function DeleteConversationDialog({
    isOpen,
    onClose,
    id,
}: {
    isOpen: boolean;
    onClose: () => void;
    id: number | null;
}) {
    const { deleteConversationFn } = useConversation();
    useEffect(() => {
        if (deleteConversationFn.isSuccess) {
            onClose();
        }
    }, [deleteConversationFn.isSuccess, onClose]);

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="w-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete your conversation
                        history? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={deleteConversationFn.isPending}
                        onClick={onClose}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={deleteConversationFn.isPending}
                        onClick={() => id && deleteConversationFn.mutate(id)}
                    >
                        {deleteConversationFn.isPending ? (
                            <span className="flex items-center gap-1">
                                <Loader2 size={20} className="animate-spin" />
                                Deleting...
                            </span>
                        ) : (
                            <span>Delete</span>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
