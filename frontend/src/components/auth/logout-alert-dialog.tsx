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
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export function LogoutAlertDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { logoutMutation } = useAuth();
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="w-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={logoutMutation.isPending}
                        onClick={onClose}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={logoutMutation.isPending}
                        onClick={() => logoutMutation.mutate()}
                    >
                        {logoutMutation.isPending ? (
                            <span className="flex items-center gap-1">
                                <Loader2 size={20} className="animate-spin" />
                                Logging out...
                            </span>
                        ) : (
                            <span>Logout</span>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
