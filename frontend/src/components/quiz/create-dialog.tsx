import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PlusCircle, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";

export function CreateDialog() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
    ];
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle />
                    Create Quiz
                </Button>
            </DialogTrigger>
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>New Quiz: Enter Details Below</DialogTitle>
                </DialogHeader>
                <div className="grid w-full items-center gap-3 my-6">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter quiz title"
                    />
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter quiz description"
                    />
                    <Label htmlFor="category">Category</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {value
                                    ? frameworks.find(
                                          (framework) =>
                                              framework.value === value
                                      )?.label
                                    : "Select category..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No Category found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setValue(
                                                        currentValue === value
                                                            ? ""
                                                            : currentValue
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                {framework.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value ===
                                                            framework.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Label htmlFor="isPublic">Quiz Visibility</Label>
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="r1" />
                            <Label htmlFor="r1">Public</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="r2" />
                            <Label htmlFor="r2">Private</Label>
                        </div>
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
