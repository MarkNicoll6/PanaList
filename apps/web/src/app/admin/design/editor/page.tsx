"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Smartphone, Monitor, Tablet, RotateCcw, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function DesignEditorContent() {
    const searchParams = useSearchParams();
    const theme = searchParams.get("theme");
    const [activeTab, setActiveTab] = useState("brand");
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

    // Theme State
    const [primaryColor, setPrimaryColor] = useState("#4F46E5");
    const [bgColor, setBgColor] = useState("#F8FAFC");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (theme === "techno") {
            setPrimaryColor("#8B5CF6"); // Violet
            setBgColor("#0F172A"); // Slate 900
            setIsDarkMode(true);
        }
    }, [theme]);

    useEffect(() => {
        const isNew = searchParams.get("new");
        if (isNew) {
            toast("Welcome to your new site!", {
                description: "This is your visual editor. Make changes here and see them live.",
                duration: 5000,
            });
            // Remove the query param to prevent toast on refresh (optional, but good UX)
            // For now, we'll keep it simple.
        }
    }, [searchParams]);

    return (
        <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col">
            {/* Top Bar */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/themes">
                        <Button variant="ghost" size="sm" className="text-slate-500">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Exit
                        </Button>
                    </Link>
                    <div className="h-6 w-px bg-slate-200" />
                    <span className="font-semibold text-slate-900">Design Editor</span>
                    {theme && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize">{theme} Theme</span>}
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
                    <Button
                        variant={viewMode === "desktop" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewMode("desktop")}
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500" disabled>
                        <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "mobile" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewMode("mobile")}
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <RotateCcw className="mr-2 h-3 w-3" /> Reset
                    </Button>
                    <Button size="sm">
                        <Save className="mr-2 h-3 w-3" /> Save Changes
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Controls */}
                <aside className="w-[320px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="px-4 pt-4">
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="brand">Brand</TabsTrigger>
                                <TabsTrigger value="type">Type</TabsTrigger>
                                <TabsTrigger value="layout">Layout</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-4 space-y-6">
                            <TabsContent value="brand" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Colors</h3>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs">Primary Color</Label>
                                            <div className="flex gap-2">
                                                <div
                                                    className="h-9 w-9 rounded border border-slate-200 shadow-sm cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-indigo-200 transition-all"
                                                    style={{ backgroundColor: primaryColor }}
                                                ></div>
                                                <Input
                                                    value={primaryColor}
                                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                                    className="font-mono text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Background Color</Label>
                                            <div className="flex gap-2">
                                                <div
                                                    className="h-9 w-9 rounded border border-slate-200 shadow-sm cursor-pointer"
                                                    style={{ backgroundColor: bgColor }}
                                                ></div>
                                                <Input
                                                    value={bgColor}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                    className="font-mono text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Logo</h3>
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                                            <Eye className="h-5 w-5" />
                                        </div>
                                        <p className="text-xs font-medium text-slate-900">Click to upload</p>
                                        <p className="text-[10px] text-slate-500">SVG, PNG, JPG (max 2MB)</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="type" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Font Family</h3>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs">Headings</Label>
                                            <Select defaultValue="inter">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="inter">Inter</SelectItem>
                                                    <SelectItem value="outfit">Outfit</SelectItem>
                                                    <SelectItem value="plus-jakarta">Plus Jakarta Sans</SelectItem>
                                                    <SelectItem value="playfair">Playfair Display</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Body</Label>
                                            <Select defaultValue="inter">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="inter">Inter</SelectItem>
                                                    <SelectItem value="roboto">Roboto</SelectItem>
                                                    <SelectItem value="open-sans">Open Sans</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Sizing</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label className="text-xs">Base Size</Label>
                                                <span className="text-xs text-slate-500">16px</span>
                                            </div>
                                            <Slider defaultValue={[16]} max={20} min={12} step={1} />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="layout" className="space-y-6 mt-0">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Navigation</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="border border-indigo-600 bg-indigo-50 rounded p-2 cursor-pointer">
                                            <div className="h-2 w-full bg-indigo-200 rounded mb-1"></div>
                                            <div className="text-[10px] text-center font-medium text-indigo-700">Top Bar</div>
                                        </div>
                                        <div className="border border-slate-200 hover:border-slate-300 rounded p-2 cursor-pointer">
                                            <div className="flex h-full gap-1">
                                                <div className="w-2 h-full bg-slate-200 rounded"></div>
                                                <div className="flex-1"></div>
                                            </div>
                                            <div className="text-[10px] text-center font-medium text-slate-600 mt-1">Sidebar</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-900">Components</h3>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs">Rounded Corners</Label>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs">Card Shadows</Label>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </aside>

                {/* Preview Area */}
                <main className="flex-1 bg-slate-100 p-8 flex items-center justify-center overflow-auto">
                    <div
                        className={`h-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-slate-200 transform origin-top transition-all duration-300 ${viewMode === "mobile" ? "w-[375px]" : "w-full max-w-5xl scale-[0.95]"
                            }`}
                    >
                        {/* Mock Browser Header */}
                        <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-3 gap-2">
                            <div className="flex gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="h-5 w-64 bg-white border border-slate-200 rounded text-[10px] flex items-center justify-center text-slate-400">
                                    panalist.com
                                </div>
                            </div>
                        </div>

                        {/* Mock Content Preview */}
                        <div
                            className="flex-1 overflow-y-auto transition-colors duration-300"
                            style={{ backgroundColor: isDarkMode ? bgColor : '#F8FAFC' }}
                        >
                            {/* Navbar */}
                            <div
                                className={`h-16 border-b flex items-center justify-between px-8 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                            >
                                <div className="font-bold text-xl" style={{ color: primaryColor }}>PanaList</div>
                                <div className={`flex gap-6 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    <span>Explore</span>
                                    <span>Categories</span>
                                    <span>About</span>
                                    <span style={{ color: primaryColor }}>Sign In</span>
                                </div>
                            </div>

                            {/* Hero */}
                            <div className="py-20 px-8 text-center" style={{ backgroundColor: isDarkMode ? '#1E293B' : primaryColor, color: 'white' }}>
                                <h1 className="text-4xl font-bold mb-4">Discover Amazing Places</h1>
                                <p className="opacity-90 max-w-xl mx-auto mb-8">Find the best local businesses, services, and events in your area. Curated by experts.</p>
                                <div className="max-w-md mx-auto bg-white rounded-lg p-2 flex gap-2">
                                    <input className="flex-1 px-4 text-slate-900 outline-none bg-transparent" placeholder="What are you looking for?" />
                                    <button
                                        className="text-white px-6 py-2 rounded font-medium transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: isDarkMode ? primaryColor : '#0F172A' }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="py-16 px-8 max-w-6xl mx-auto">
                                <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Browse Categories</h2>
                                <div className="grid grid-cols-4 gap-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`p-6 rounded-lg shadow-sm border transition-shadow cursor-pointer hover:shadow-md ${isDarkMode
                                                ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                                : 'bg-white border-slate-200'
                                                }`}
                                        >
                                            <div
                                                className="h-10 w-10 rounded-lg mb-4 flex items-center justify-center"
                                                style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#F1F5F9' }}
                                            >
                                                <div className="h-5 w-5 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                                            </div>
                                            <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Category {i}</div>
                                            <div className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>120 Listings</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Footer */}
                            <div className={`py-12 px-8 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                <div className="grid grid-cols-4 gap-8 mb-8">
                                    <div className="col-span-2">
                                        <div className="font-bold text-xl mb-4" style={{ color: primaryColor }}>PanaList</div>
                                        <p className="text-sm max-w-xs">The best place to find local businesses and services. Trusted by thousands of users.</p>
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Company</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>About Us</li>
                                            <li>Careers</li>
                                            <li>Contact</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>Privacy Policy</li>
                                            <li>Terms of Service</li>
                                            <li>Cookie Policy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-xs text-center pt-8 border-t border-slate-200/10">
                                    © 2024 PanaList Directory. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function DesignEditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DesignEditorContent />
        </Suspense>
    );
}
