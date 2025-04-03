import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/layout/theme-toggle";

export default function LoginPage() {
    return (
        <>
            <div className="flex justify-end p-4">
                <ModeToggle />
            </div>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
