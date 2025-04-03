import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function AuthAlert({
    message = "Something went wrong!",
    type = "error",
    redirectLink = "",
    redirectText = "",
}) {
    return (
        <Alert
            className={
                type == "error"
                    ? "bg-destructive/10 dark:bg-destructive/20 border-none"
                    : "bg-green-100 dark:bg-green-900/20 border-none"
            }
        >
            {type == "error" && (
                <AlertCircle className="h-4 w-4 !text-destructive" />
            )}
            <AlertDescription
                className={
                    type == "error"
                        ? "!text-destructive"
                        : "text-green-700 dark:text-green-400"
                }
            >
                <span>
                    {message}
                    {redirectLink && (
                        <Link
                            href={redirectLink}
                            className="text-sm underline-offset-4 underline"
                        >
                            {redirectText}
                        </Link>
                    )}
                </span>
            </AlertDescription>
        </Alert>
    );
}
