"use client";

import { getConversations } from "@/services/chat";
import { useQuery } from "@tanstack/react-query";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ArchiveIcon, TrashIcon } from "lucide-react";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ConversationHistory } from "@/types/gemini";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { DeleteConversationDialog } from "./delete-conversation-dialog";

export default function ChatSideHistory() {
    const [chatHistory, setChatHistory] = useState<ConversationHistory[]>([]);
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryFn: getConversations,
        queryKey: ["conversations"], // put the user id in the query key for uniqueness
    });

    useEffect(() => {
        if (data && data.conversations) {
            setChatHistory(data.conversations);
        }
    }, [data]);

    if (isLoading)
        return (
            <div className="flex flex-col gap-4 p-5">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-7 w-[265px]" />
                    </div>
                ))}
            </div>
        );

    return (
        <>
            <SidebarGroupContent>
                {chatHistory.map((conversation) => {
                    // Get the last message from the conversation
                    const latestMessage =
                        conversation.message?.[conversation.message.length - 1]
                            ?.parts?.[0]?.text || "No message";

                    return (
                        <div
                            key={conversation.id}
                            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 cursor-pointer"
                            onMouseEnter={() => setIsHovered(conversation.id)}
                            onClick={() =>
                                router.push(`/chat-with-ai/${conversation.id}`)
                            }
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="font-medium truncate">
                                    {conversation.title}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        {isHovered === conversation.id && (
                                            <MoreVertical className="size-4" />
                                        )}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <ArchiveIcon />
                                            Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setShowDeleteDialog(true);
                                                setDeleteId(conversation.id);
                                            }}
                                        >
                                            <TrashIcon />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                                {latestMessage}
                            </span>
                        </div>
                    );
                })}
            </SidebarGroupContent>

            <DeleteConversationDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                id={deleteId}
            />
        </>
    );
}
