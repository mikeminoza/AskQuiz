import { Card, CardContent } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardContent>
                        <ForgotPasswordForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
