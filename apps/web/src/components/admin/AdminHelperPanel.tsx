"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HelpCircle, PlayCircle, FileText, ExternalLink, BookOpen, Video } from "lucide-react";
import { helperRegistry } from "@/helpers/helperRegistry";
// import GuidedTour from "../onboarding/GuidedTour"; // Re-enable when tours are ready
import { apiV1 as api } from "@/lib/api";

export default function AdminHelperPanel() {
    const [open, setOpen] = useState(false);
    const [activeTour, setActiveTour] = useState<string | null>(null);
    const [tourStates, setTourStates] = useState<Record<string, any>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock tour fetching for now
    /*
    useEffect(() => {
        if (open) {
            fetchTourStates();
        }
    }, [open]);

    const fetchTourStates = async () => {
        try {
            const res = await api.get("/onboarding/tours");
            const states = res.data.reduce((acc: any, state: any) => {
                acc[state.tour_id] = state;
                return acc;
            }, {});
            setTourStates(states);
        } catch (err) {
            console.error(err);
        }
    };
    */

    const startTour = (tourId: string) => {
        setOpen(false);
        setActiveTour(tourId);
    };

    if (!mounted) return null;

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[350px] sm:w-[400px]">
                    <SheetHeader className="mb-6">
                        <SheetTitle>Help & Resources</SheetTitle>
                    </SheetHeader>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Quick Start</h3>
                            <div className="space-y-3">
                                <div className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-medium text-sm text-slate-900">Directory Setup Tour</div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full justify-start h-8 text-xs"
                                        onClick={() => console.log("Start tour")}
                                    >
                                        <PlayCircle className="h-3 w-3 mr-2" />
                                        Start Tour
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Knowledge Base</h3>
                            <div className="space-y-2">
                                <a href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded hover:bg-slate-50">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Directory Builder Guide</span>
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                                </a>
                                <a href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded hover:bg-slate-50">
                                    <Video className="h-4 w-4" />
                                    <span>Video Tutorials</span>
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                                </a>
                                <a href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded hover:bg-slate-50">
                                    <FileText className="h-4 w-4" />
                                    <span>API Documentation</span>
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                                </a>
                            </div>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <h4 className="font-medium text-indigo-900 text-sm mb-1">Need support?</h4>
                            <p className="text-xs text-indigo-700 mb-3">Our team is available 24/7 to help you build your directory.</p>
                            <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* 
            {activeTour && (
                <GuidedTour
                    tourId={activeTour}
                    isOpen={!!activeTour}
                    onClose={() => setActiveTour(null)}
                />
            )} 
            */}
        </>
    );
}
