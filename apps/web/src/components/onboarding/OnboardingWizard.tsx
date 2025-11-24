"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeStep } from "./steps/WelcomeStep";
import { DirectoryDetailsStep } from "./steps/DirectoryDetailsStep";
import { ThemeSelectionStep } from "./steps/ThemeSelectionStep";
import { DataImportStep } from "./steps/DataImportStep";
import { CompletionStep } from "./steps/CompletionStep";

export type OnboardingData = {
    directoryName: string;
    niche: string;
    location: string;
    theme: string;
    importFile: File | null;
};

export function OnboardingWizard() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({
        directoryName: "",
        niche: "",
        location: "",
        theme: "techno",
        importFile: null,
    });

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const updateData = (newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const steps = [
        <WelcomeStep key="welcome" onNext={nextStep} />,
        <DirectoryDetailsStep key="details" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <ThemeSelectionStep key="theme" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <DataImportStep key="import" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <CompletionStep key="completion" data={data} />,
    ];

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px] flex flex-col">
            {/* Progress Bar */}
            <div className="h-1 bg-slate-100 w-full">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-8 md:p-12 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {steps[step]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
