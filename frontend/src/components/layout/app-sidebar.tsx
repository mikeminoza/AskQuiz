/* eslint-disable indent */
"use client";

import * as React from "react";
import { Command } from "lucide-react";
import { NavUser } from "./nav-user";
import { Label } from "@/components/ui/label";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ChatSideHistory from "../chat/chat-side-history";
import { data } from "@/data/navigationData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpen } = useSidebar();
    const mails = data.mails;
    const currentPath = usePathname();
    const currentPage = data.navMain.find((item) => item.url === currentPath);
    //get id from url
    const pathname = usePathname();
    const conversationId = Number(pathname.split("/").pop());

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
            {...props}
        >
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                className="md:h-8 md:p-0"
                            >
                                <a href="#">
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            DocuQuiz
                                        </span>
                                        <span className="truncate text-xs">
                                            AI-Powered Quiz Maker
                                        </span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <Link href={item.url}>
                                            <SidebarMenuButton
                                                tooltip={{
                                                    children: item.title,
                                                    hidden: false,
                                                }}
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                                isActive={
                                                    item.url === currentPath
                                                }
                                                className="px-2.5 md:px-2"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </Sidebar>

            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-foreground text-base font-medium">
                            {currentPage?.title}
                        </div>
                        <Label className="flex items-center gap-2 text-sm">
                            <span>Unreads</span>
                            <Switch className="shadow-none" />
                        </Label>
                    </div>
                    <SidebarInput placeholder="Type to search..." />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        {currentPath === "/chat-with-ai" ||
                        currentPath === `/chat-with-ai/${conversationId}` ? (
                            <ChatSideHistory />
                        ) : (
                            <SidebarGroupContent>
                                {mails.map((mail) => (
                                    <a
                                        href="#"
                                        key={mail.email}
                                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-medium truncate">
                                                {mail.subject}
                                            </span>
                                        </div>
                                        <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                                            {mail.teaser}
                                        </span>
                                    </a>
                                ))}
                            </SidebarGroupContent>
                        )}
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    );
}
