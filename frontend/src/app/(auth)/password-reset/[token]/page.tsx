import { Card, CardContent } from "@/components/ui/card";
import { PasswordResetForm } from "@/components/auth/password-reset-form";

export default function PasswordResetPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardContent>
                        <PasswordResetForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
