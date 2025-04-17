"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Quiz } from "@/types/quiz";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "../ui/button";

export function DeleteDialog({ quiz }: { quiz: Quiz }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { deleteMutation } = useQuiz();

    useEffect(() => {
        if (deleteMutation.isSuccess) setOpenDialog(false);
    }, [deleteMutation.isSuccess]);

    return (
        <>
            <DropdownMenuItem
                onSelect={(e) => {
                    e.preventDefault();
                    setOpenDialog(true);
                }}
            >
                <Trash2 /> Delete
            </DropdownMenuItem>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
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
