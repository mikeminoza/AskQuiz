import {
    NotebookText,
    HomeIcon,
    HistoryIcon,
    MessageSquareMoreIcon,
} from "lucide-react";

// This is sample data
export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: HomeIcon,
            isActive: true,
        },
        {
            title: "My Quizzes",
            url: "/my-quizzes",
            icon: NotebookText,
            isActive: false,
        },
        {
            title: "Chat with AI",
            url: "/chat-with-ai",
            icon: MessageSquareMoreIcon,
            isActive: false,
        },
        {
            title: "History",
            url: "/history",
            icon: HistoryIcon,
            isActive: false,
        },
    ],
    mails: [
        {
            id: 1,
            name: "William Smith",
            email: "williamsmith@example.com",
            subject: "Meeting Tomorrow",
            date: "09:34 AM",
            teaser: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
    ],
};
