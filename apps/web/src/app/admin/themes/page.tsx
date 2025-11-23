"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Layout, Check, Map, Type, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function ThemesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Themes</h1>
                    <p className="text-sm text-slate-600 mt-1">Select a starting point for your directory. You can customize everything later.</p>
                </div>
                <Link href="/admin/design/editor">
                    <Button variant="outline">
                        <Palette className="mr-2 h-4 w-4" /> Open Design Editor
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Theme 1: Techno (SaaS/Resource) */}
                <Card className="border-2 border-indigo-600 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center z-10">
                        <Check className="h-3 w-3 mr-1" /> Active
                    </div>
                    <div className="h-56 bg-slate-900 relative overflow-hidden border-b">
                        {/* Abstract Preview of Techno */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 to-slate-900" />
                        <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded flex items-center px-2 gap-2">
                            <div className="h-4 w-12 bg-green-400/80 rounded" /> {/* Logo */}
                            <div className="flex-1" />
                            <div className="h-4 w-20 bg-white/20 rounded" /> {/* Button */}
                        </div>
                        <div className="absolute top-16 left-4 right-4 bottom-4 flex gap-4">
                            <div className="w-1/4 bg-white/5 rounded hidden md:block" /> {/* Sidebar */}
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <div className="bg-white/10 rounded border border-white/5" />
                                <div className="bg-white/10 rounded border border-white/5" />
                                <div className="bg-white/10 rounded border border-white/5" />
                                <div className="bg-white/10 rounded border border-white/5" />
                            </div>
                        </div>
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Techno</CardTitle>
                                <CardDescription className="mt-1">SaaS & Resource Directory</CardDescription>
                            </div>
                            <Badge variant="secondary" className="bg-violet-100 text-violet-700">v1.0</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-500 mb-4">
                            A dark-mode, card-based theme optimized for software directories, resource libraries, and digital assets.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="bg-slate-50">Sidebar Filters</Badge>
                            <Badge variant="outline" className="bg-slate-50">Dark Mode</Badge>
                            <Badge variant="outline" className="bg-slate-50">Grid Layout</Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button className="w-full" variant="secondary">Customize</Button>
                        <Button variant="outline" size="icon">
                            <MousePointer2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Theme 2: Horizon (Map/City) */}
                <Card className="hover:border-slate-300 transition-all duration-200 group">
                    <div className="h-56 bg-slate-50 relative overflow-hidden border-b">
                        {/* Abstract Preview of Horizon */}
                        <div className="absolute inset-0 bg-slate-100" />
                        <div className="absolute top-0 left-0 right-0 h-32 bg-emerald-50 border-b border-emerald-100 flex items-center justify-center">
                            <Map className="h-12 w-12 text-emerald-200" />
                        </div>
                        <div className="absolute top-24 left-4 right-4 bottom-0 bg-white rounded-t-xl shadow-sm border border-slate-200 p-3">
                            <div className="flex gap-3 overflow-hidden">
                                <div className="h-24 w-32 bg-slate-100 rounded flex-shrink-0" />
                                <div className="h-24 w-32 bg-slate-100 rounded flex-shrink-0" />
                                <div className="h-24 w-32 bg-slate-100 rounded flex-shrink-0" />
                            </div>
                        </div>
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Horizon</CardTitle>
                                <CardDescription className="mt-1">City & Travel Guide</CardDescription>
                            </div>
                            <Badge variant="secondary">v1.0</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-500 mb-4">
                            Map-centric design with a split view. Perfect for location-based directories, travel guides, and real estate.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="bg-slate-50">Map View</Badge>
                            <Badge variant="outline" className="bg-slate-50">Light Mode</Badge>
                            <Badge variant="outline" className="bg-slate-50">Geo-Search</Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button className="w-full" variant="outline">Activate</Button>
                        <Button variant="outline" size="icon">
                            <MousePointer2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Theme 3: Vanguard (Minimal/Content) */}
                <Card className="hover:border-slate-300 transition-all duration-200 group">
                    <div className="h-56 bg-white relative overflow-hidden border-b">
                        {/* Abstract Preview of Vanguard */}
                        <div className="absolute inset-0 p-6 flex flex-col gap-4">
                            <div className="h-8 w-32 bg-slate-900 rounded-sm" /> {/* Big Heading */}
                            <div className="h-4 w-48 bg-slate-200 rounded-sm" />
                            <div className="mt-4 space-y-3">
                                <div className="flex gap-4 items-center border-b border-slate-100 pb-3">
                                    <div className="h-12 w-12 bg-slate-100 rounded-full" />
                                    <div className="space-y-1">
                                        <div className="h-3 w-24 bg-slate-800 rounded-sm" />
                                        <div className="h-2 w-16 bg-slate-300 rounded-sm" />
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center border-b border-slate-100 pb-3">
                                    <div className="h-12 w-12 bg-slate-100 rounded-full" />
                                    <div className="space-y-1">
                                        <div className="h-3 w-24 bg-slate-800 rounded-sm" />
                                        <div className="h-2 w-16 bg-slate-300 rounded-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Vanguard</CardTitle>
                                <CardDescription className="mt-1">Curated List & Blog</CardDescription>
                            </div>
                            <Badge variant="secondary">v1.0</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-500 mb-4">
                            Minimalist, typography-focused theme. Ideal for curated lists, newsletters, and expert networks.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="bg-slate-50">List View</Badge>
                            <Badge variant="outline" className="bg-slate-50">Typography</Badge>
                            <Badge variant="outline" className="bg-slate-50">Minimal</Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button className="w-full" variant="outline">Activate</Button>
                        <Button variant="outline" size="icon">
                            <MousePointer2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
