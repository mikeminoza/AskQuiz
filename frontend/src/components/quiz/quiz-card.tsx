import { Button } from "@/components/ui/button";
import { CalendarIcon, Edit, MoreVertical, Trash2 } from "lucide-react";
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

export function QuizCard() {
    return (
        <Card className="w-full transition-all hover:shadow-md">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold">
                            JavaScript Fundamentals
                        </CardTitle>
                        <CardDescription className="mt-2">
                            Test your knowledge of JavaScript basics including
                            variables, functions, and control flow.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary"
                        >
                            Programming
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>April 30, 2025</span>
                    <span className="mx-2">•</span>
                    <span>10 questions</span>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Preview</Button>
                <Button>Start Quiz</Button>
            </CardFooter>
        </Card>
    );
}
