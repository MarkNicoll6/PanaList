"use client";

import { useState, useEffect } from "react";
import { helperRegistry, TourData } from "@/helpers/helperRegistry";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { apiV1 as api } from "@/lib/api";

interface GuidedTourProps {
    tourId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function GuidedTour({ tourId, isOpen, onClose }: GuidedTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const tour = helperRegistry.tours[tourId];

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
        }
    }, [isOpen]);

    if (!isOpen || !tour) return null;

    const step = tour.steps[currentStep];
    const isLastStep = currentStep === tour.steps.length - 1;

    const handleNext = async () => {
        try {
            if (isLastStep) {
                await api.post(`/onboarding/tours/${tourId}/state`, {
                    status: "COMPLETED",
                    last_step_index: currentStep,
                });
                onClose();
            } else {
                await api.post(`/onboarding/tours/${tourId}/state`, {
                    status: "IN_PROGRESS",
                    last_step_index: currentStep + 1,
                });
                setCurrentStep(prev => prev + 1);
            }
        } catch (err) {
            console.error("Failed to update tour state:", err);
            // Allow proceeding even if API fails
            if (!isLastStep) {
                setCurrentStep(prev => prev + 1);
            } else {
                onClose();
            }
        }
    };

    const handleSkip = async () => {
        await api.post(`/onboarding/tours/${tourId}/state`, {
            status: "COMPLETED", // Or skipped
            last_step_index: currentStep,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-sm w-full relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="mb-4">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Step {currentStep + 1} of {tour.steps.length}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 mt-1">{step.title}</h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.body}
                </p>

                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-500">
                        Skip
                    </Button>
                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <Button variant="outline" size="sm" onClick={() => setCurrentStep(prev => prev - 1)}>
                                Back
                            </Button>
                        )}
                        <Button size="sm" onClick={handleNext}>
                            {isLastStep ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
