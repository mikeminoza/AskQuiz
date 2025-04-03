import HomeLayout from "@/components/layout/layout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function DashboardPage() {
    const breadcrumbs = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
    ];
    return (
        <HomeLayout breadcrumbs={breadcrumbs}>
            <h1>Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
                {/* Sidebar Card (Takes full height of the grid) */}
                <div className="row-span-3">
                    <Card className="w-full h-full">
                        <CardHeader>
                            <CardTitle>Total PDFs Uploaded</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* Top Right Card */}
                <div className="col-span-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Generated Quizzes</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* Bottom Right Large Card */}
                <div className="col-span-2 row-span-2">
                    <Card className="w-full h-full">
                        <CardHeader>
                            <CardTitle>AI Accuracy</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </HomeLayout>
    );
}
