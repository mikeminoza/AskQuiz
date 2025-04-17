import { Skeleton } from "../ui/skeleton";

export function QuizSkeleton() {
    return (
        <>
            <Skeleton className="h-[130px] w-full rounded-xl" />
            <Skeleton className="h-[130px] w-full rounded-xl" />
        </>
    );
}
