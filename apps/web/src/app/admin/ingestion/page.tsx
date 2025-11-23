"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sparkles, ArrowRight, Database, CheckCircle2 } from "lucide-react";

export default function IngestionPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Data Ingestion</h1>
                <p className="text-sm text-slate-600 mt-1">Auto-populate your directory using AI and Brave Search.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-indigo-100 shadow-md">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-50">
                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                <Sparkles className="h-5 w-5" />
                                <span className="font-semibold text-sm uppercase tracking-wider">AI Discovery Engine</span>
                            </div>
                            <CardTitle className="text-xl">Start New Ingestion Job</CardTitle>
                            <CardDescription>Search for businesses to add to your directory.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label>Search Query</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input className="pl-10 h-12 text-lg" placeholder="e.g. Coffee shops in San Francisco" />
                                </div>
                                <p className="text-xs text-slate-500">Be specific. Include category and location.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Target Category</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cafe">Cafe</SelectItem>
                                            <SelectItem value="restaurant">Restaurant</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Max Results</Label>
                                    <Select defaultValue="50">
                                        <SelectTrigger>
                                            <SelectValue placeholder="50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700">
                                <Sparkles className="mr-2 h-5 w-5" /> Start Discovery
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Jobs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">"Coworking spaces in Austin"</div>
                                                <div className="text-xs text-slate-500">Completed 2 hours ago • 42 listings found</div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View Results <ArrowRight className="ml-2 h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-slate-900 text-white border-slate-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-indigo-400" />
                                Database Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-3xl font-bold">12,405</div>
                                <div className="text-sm text-slate-400">Total Listings</div>
                            </div>
                            <div className="h-px bg-slate-800" />
                            <div>
                                <div className="text-3xl font-bold text-green-400">850</div>
                                <div className="text-sm text-slate-400">Added this week</div>
                            </div>
                            <div className="h-px bg-slate-800" />
                            <div>
                                <div className="text-3xl font-bold text-yellow-400">124</div>
                                <div className="text-sm text-slate-400">Pending Review</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sources</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Brave Search</span>
                                <span className="text-sm text-slate-500">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }} />
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm font-medium">Manual Entry</span>
                                <span className="text-sm text-slate-500">15%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-slate-400 h-2 rounded-full" style={{ width: '15%' }} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
