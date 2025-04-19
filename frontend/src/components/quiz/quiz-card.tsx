import { Button } from "@/components/ui/button";
import {
    CalendarIcon,
    Edit,
    MoreVertical,
    NotepadText,
    Trash2,
} from "lucide-react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Quiz, QuizCardProps } from "@/types/quiz";
import { DeleteDialog } from "./delete-dialog";
import { useState } from "react";
import { QuizDialog } from "./quiz-dialog";

export function QuizCard({ quizzes }: QuizCardProps) {
    const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
    const [openQuizDialog, setOpenQuizDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4">
            {quizzes?.length === 0 ? (
                <div className="flex mt-40 justify-center items-center text-gray-400 gap-3">
                    <NotepadText size={50} />{" "}
                    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
                        No Quiz found
                    </h1>
                </div>
            ) : (
                quizzes?.map((quiz) => (
                    <Card
                        className="w-full transition-all hover:shadow-md"
                        key={quiz.id}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl font-bold">
                                        {quiz.title}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="bg-primary/10 text-primary"
                                    >
                                        {quiz.category}
                                    </Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setEditQuiz(quiz);
                                                    setOpenQuizDialog(true);
                                                }}
                                            >
                                                <Edit />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenDeleteDialog(true);
                                                }}
                                            >
                                                <Trash2 /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <CardDescription className="w-full">
                                {quiz.description}
                            </CardDescription>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                <span>{quiz.created_at}</span>
                                <span className="mx-2">•</span>
                                <span>{quiz.questions.length} Question(s)</span>
                                <span className="mx-2">•</span>
                                <span className="font-bold">
                                    {quiz.is_public ? "PUBLIC" : "PRIVATE"}
                                </span>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Preview</Button>
                            <Button>Start Quiz</Button>
                        </CardFooter>

                        {/* Edit Dialog  */}
                        <QuizDialog
                            quiz={editQuiz}
                            openQuizDialog={openQuizDialog}
                            setOpenQuizDialog={setOpenQuizDialog}
                        />
                        {/* Delete Dialog  */}
                        <DeleteDialog
                            quiz={quiz}
                            openDeleteDialog={openDeleteDialog}
                            setOpenDeleteDialog={setOpenDeleteDialog}
                        />
                    </Card>
                ))
            )}
        </div>
    );
}
