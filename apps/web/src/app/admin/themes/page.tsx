"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Layout, Check } from "lucide-react";

export default function ThemesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Themes</h1>
                    <p className="text-sm text-slate-600 mt-1">Choose the look and feel of your directory.</p>
                </div>
                <Button variant="outline">
                    <Palette className="mr-2 h-4 w-4" /> Customize Current Theme
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-indigo-600 shadow-lg relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Active
                    </div>
                    <div className="h-48 bg-slate-100 flex items-center justify-center border-b">
                        <Layout className="h-12 w-12 text-slate-300" />
                        {/* Placeholder for theme preview image */}
                    </div>
                    <CardHeader>
                        <CardTitle>Modern Directory</CardTitle>
                        <CardDescription>Clean, map-centric design perfect for city guides.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">Map View</Badge>
                            <Badge variant="secondary">Dark Mode</Badge>
                            <Badge variant="secondary">Grid Layout</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="secondary">Customize</Button>
                    </CardFooter>
                </Card>

                <Card className="hover:border-slate-300 transition-colors">
                    <div className="h-48 bg-slate-100 flex items-center justify-center border-b">
                        <Layout className="h-12 w-12 text-slate-300" />
                    </div>
                    <CardHeader>
                        <CardTitle>Minimalist List</CardTitle>
                        <CardDescription>Content-focused layout for niche directories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">List View</Badge>
                            <Badge variant="secondary">Typography</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Preview</Button>
                    </CardFooter>
                </Card>

                <Card className="hover:border-slate-300 transition-colors">
                    <div className="h-48 bg-slate-100 flex items-center justify-center border-b">
                        <Layout className="h-12 w-12 text-slate-300" />
                    </div>
                    <CardHeader>
                        <CardTitle>Marketplace Grid</CardTitle>
                        <CardDescription>Image-heavy design for product catalogs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">Gallery</Badge>
                            <Badge variant="secondary">Filters</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Preview</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
