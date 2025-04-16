"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PlusCircle, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { quizCategories } from "@/data/quizCategory";
import { useCreateQuizForm } from "@/hooks/form/quiz/useCreateQuizForm";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function CreateDialog() {
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const { form, onSubmit, isSuccess, resetForm } = useCreateQuizForm();

    useEffect(() => {
        if (isSuccess) {
            setOpenDialog(false);
            resetForm();
        }
    }, [isSuccess, resetForm]);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle />
                    Create Quiz
                </Button>
            </DialogTrigger>
            <DialogContent className="w-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>New Quiz</DialogTitle>
                            <DialogDescription>
                                Enter Quiz Details Below
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid w-full items-center gap-4 my-6">
                            <FormField
                                name="title"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter quiz title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter quiz description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => {
                                    const selectedCategory =
                                        quizCategories.find(
                                            (cat) => cat.value === field.value
                                        );
                                    return (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={open}
                                                    onOpenChange={setOpen}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className="w-full justify-between"
                                                        >
                                                            {selectedCategory?.label ||
                                                                "Select category..."}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search category..." />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    No Category
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {quizCategories.map(
                                                                        (
                                                                            category
                                                                        ) => (
                                                                            <CommandItem
                                                                                key={
                                                                                    category.value
                                                                                }
                                                                                value={
                                                                                    category.value
                                                                                }
                                                                                onSelect={() => {
                                                                                    field.onChange(
                                                                                        category.value
                                                                                    );
                                                                                    setOpen(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    category.label
                                                                                }
                                                                                <Check
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        field.value ===
                                                                                            category.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        )
                                                                    )}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                name="is_public"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex">
                                        <FormControl>
                                            <Checkbox
                                                id="is_public"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Make this public</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting && (
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                )}
                                {form.formState.isSubmitting
                                    ? "Creating..."
                                    : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
