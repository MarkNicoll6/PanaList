import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingWizard";
import { ArrowRight, Upload, FileSpreadsheet } from "lucide-react";

interface DataImportStepProps {
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function DataImportStep({ data, updateData, onNext, onBack }: DataImportStepProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Import Data</h2>
                    <p className="text-slate-600">Optional: Upload a CSV to pre-fill your directory.</p>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <Upload className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Click to upload CSV</h3>
                        <p className="text-sm text-slate-500">or drag and drop file here</p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                        <p className="font-semibold">Don't have data yet?</p>
                        <p>No problem! You can use our AI Ingestion tool later to find listings automatically.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={onNext}>Skip for now</Button>
                    <Button onClick={onNext}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
