import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteDialogProps } from "@/types/quiz";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "../ui/button";

export function DeleteDialog({
    quiz,
    openDeleteDialog,
    setOpenDeleteDialog,
}: DeleteDialogProps) {
    const { deleteMutation } = useQuiz();

    useEffect(() => {
        if (deleteMutation.isSuccess) setOpenDeleteDialog(false);
    }, [deleteMutation.isSuccess, setOpenDeleteDialog]);

    return (
        <>
            <AlertDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
            >
                <AlertDialogContent className="w-sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete quiz &quot;{quiz.title}&quot;.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            onClick={() =>
                                quiz.id && deleteMutation.mutate(quiz.id)
                            }
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? (
                                <span className="flex items-center gap-1">
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Deleting
                                </span>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
