import { Skeleton } from "./skeleton";

export function TypingIndicator() {
    return (
        <div className="justify-left flex space-x-1">
            <Skeleton className="h-8 w-[265px]" />
        </div>
    );
}
