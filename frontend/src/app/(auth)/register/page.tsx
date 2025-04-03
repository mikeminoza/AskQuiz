import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
