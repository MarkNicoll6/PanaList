import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingWizard";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSelectionStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function ThemeSelectionStep({ data, updateData, onNext, onBack }: ThemeSelectionStepProps) {
    const themes = [
        { id: "techno", name: "Techno", color: "bg-slate-900", desc: "Dark, modern, tech-focused." },
        { id: "horizon", name: "Horizon", color: "bg-blue-600", desc: "Clean, professional, airy." },
        { id: "vanguard", name: "Vanguard", color: "bg-emerald-600", desc: "Bold, energetic, startup-vibe." },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Choose a Theme</h2>
                    <p className="text-slate-600">Pick a starting look. You can customize this later.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            onClick={() => updateData({ theme: theme.id })}
                            className={cn(
                                "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-indigo-200 relative overflow-hidden group",
                                data.theme === theme.id ? "border-indigo-600 bg-indigo-50/30" : "border-slate-100 bg-white"
                            )}
                        >
                            {data.theme === theme.id && (
                                <div className="absolute top-3 right-3 h-6 w-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                            <div className={`h-32 w-full rounded-lg mb-4 ${theme.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                            <h3 className="font-bold text-slate-900">{theme.name}</h3>
                            <p className="text-sm text-slate-500">{theme.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={onNext}>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
