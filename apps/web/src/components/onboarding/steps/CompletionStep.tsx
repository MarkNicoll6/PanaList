import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingWizard";
import { CheckCircle, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CompletionStepProps {
    data: OnboardingData;
}

export function CompletionStep({ data }: CompletionStepProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to create directory
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                <h2 className="text-2xl font-bold text-slate-900">Setting up your directory...</h2>
                <p className="text-slate-600">Applying theme: {data.theme}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 animate-in zoom-in duration-300">
                <CheckCircle className="h-10 w-10" />
            </div>

            <div className="space-y-4 max-w-md">
                <h1 className="text-3xl font-bold text-slate-900">You're all set!</h1>
                <p className="text-lg text-slate-600">
                    <span className="font-semibold text-slate-900">{data.directoryName}</span> has been created successfully.
                </p>
            </div>

            <Link href="/admin/design/editor?new=true">
                <Button size="lg" className="rounded-full px-8 h-12 text-base bg-indigo-600 hover:bg-indigo-700">
                    Customize My Site <LayoutDashboard className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
    );
}
