import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";

export function Filter() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filter Quizzes</SheetTitle>
                    <SheetDescription>
                        Filter your quizzes by category
                    </SheetDescription>
                </SheetHeader>
                <div className="p-5 ">
                    <h3 className="mb-4 text-sm font-medium">Categories</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="{`category-${category}`}" />
                            <Label htmlFor="sample">Sample Category</Label>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline">Clear Filters</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
