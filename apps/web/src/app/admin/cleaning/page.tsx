"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function CleaningPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Data Cleaning</h1>
                    <p className="text-sm text-slate-600 mt-1">AI-powered tools to keep your directory data clean and consistent.</p>
                </div>
                <Button>
                    <Sparkles className="mr-2 h-4 w-4" /> Run Auto-Clean
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Duplicate Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-slate-500 mt-1">Potential matches found</p>
                        <Button variant="link" className="px-0 h-auto mt-2 text-indigo-600">Review Matches</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Missing Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-slate-500 mt-1">Listings without photos</p>
                        <Button variant="link" className="px-0 h-auto mt-2 text-indigo-600">Auto-Fetch Images</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Broken Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-slate-500 mt-1">Websites not resolving</p>
                        <Button variant="link" className="px-0 h-auto mt-2 text-indigo-600">View Report</Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cleaning Log</CardTitle>
                    <CardDescription>Recent automated actions taken by the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Merged duplicate listing "Cafe Nero"</p>
                                    <p className="text-xs text-slate-500">2 hours ago • Confidence Score: 98%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
