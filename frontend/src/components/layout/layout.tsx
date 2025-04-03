import { AppSidebar } from "./app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-toggle";
import { BreadcrumItemProps } from "@/types/pages";
import React from "react";

export default function HomeLayout({
    children,
    breadcrumbs,
}: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumItemProps[];
}) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "350px",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 z-50 flex shrink-0 items-center justify-between gap-2 border-b p-4">
                    <div className="flex items-center">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs?.map((item, index) => (
                                    <React.Fragment key={item.href || index}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={item.href}>
                                                {item.label}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 && (
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4 py-2">
                    {/* children component  */}
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
