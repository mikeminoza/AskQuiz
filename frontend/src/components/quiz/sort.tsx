import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export function Sort({
    sortBy,
    setSortBy,
}: {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}) {
    return (
        <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-auto">
                <ArrowUpDown className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="a-z">Title (A-Z)</SelectItem>
                <SelectItem value="z-a">Title (Z-A)</SelectItem>
                <SelectItem value="most-questions">Most questions</SelectItem>
                <SelectItem value="least-questions">Least questions</SelectItem>
            </SelectContent>
        </Select>
    );
}
