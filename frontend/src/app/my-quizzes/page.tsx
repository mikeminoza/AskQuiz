"use client";

import HomeLayout from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { QuizDialog } from "@/components/quiz/quiz-dialog";
import { Sort } from "@/components/quiz/sort";
import { Filter } from "@/components/quiz/filter";
import { QuizCard } from "@/components/quiz/quiz-card";
import { useQuery } from "@tanstack/react-query";
import { getUserQuiz } from "@/services/quiz";
import { QuizSkeleton } from "@/components/quiz/quiz-skeleton";
import { Quiz } from "@/types/quiz";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyQuizzesPage() {
    const breadcrumbs = [
        {
            label: "My Quizzes",
            href: "/my-quizzes",
        },
    ];
    const [openQuizDialog, setOpenQuizDialog] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState("newest"); // add types for the sort

    const { data, isLoading } = useQuery<{ quizzes: Quiz[] }>({
        queryKey: ["userQuizzes"],
        queryFn: getUserQuiz,
    });

    return (
        <HomeLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 mb-2 gap-2">
                <div className="flex flex-col">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Your Quizzes, All in One Place
                    </h4>
                    <p className="text-muted-foreground text-sm">
                        Easily create, edit, and review your quizzes whenever
                        you need them.
                    </p>
                </div>

                <Button
                    onClick={() => {
                        setOpenQuizDialog(true);
                    }}
                >
                    <PlusCircle />
                    Create Quiz
                </Button>
            </div>

            <div className="flex gap-3">
                <Input placeholder="Search quiz..." />
                <Sort sortBy={sortBy} setSortBy={setSortBy} />
                <Filter />
            </div>

            <div className="flex flex-col gap-4 mt-2">
                {isLoading ? (
                    <QuizSkeleton />
                ) : (
                    <QuizCard quizzes={data?.quizzes} />
                )}
            </div>

            {/* Create dialog  */}
            <QuizDialog
                quiz={null}
                openQuizDialog={openQuizDialog}
                setOpenQuizDialog={setOpenQuizDialog}
            />
        </HomeLayout>
    );
}
