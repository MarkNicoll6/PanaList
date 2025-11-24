import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

interface WelcomeStepProps {
    onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <Rocket className="h-10 w-10" />
            </div>

            <div className="space-y-4 max-w-md">
                <h1 className="text-3xl font-bold text-slate-900">Welcome to PanaList</h1>
                <p className="text-lg text-slate-600">
                    Let's get your new directory up and running in minutes. We'll guide you through the basics.
                </p>
            </div>

            <Button size="lg" onClick={onNext} className="rounded-full px-8 h-12 text-base">
                Let's Start <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
