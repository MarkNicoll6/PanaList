"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, Globe, Palette, Settings as SettingsIcon, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Settings</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage your directory configuration and preferences.</p>
                </div>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="domain">Domain</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Information</CardTitle>
                            <CardDescription>Basic information about your directory website.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Site Name</Label>
                                <Input placeholder="My Awesome Directory" defaultValue="PanaList Directory" />
                            </div>
                            <div className="space-y-2">
                                <Label>Site Description</Label>
                                <Textarea placeholder="A brief description of your site..." defaultValue="The best place to find local businesses and services." />
                            </div>
                            <div className="space-y-2">
                                <Label>Support Email</Label>
                                <Input type="email" placeholder="support@example.com" defaultValue="help@panalist.com" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Settings</CardTitle>
                            <CardDescription>Set your default language and currency.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Input defaultValue="English (US)" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Currency</Label>
                                    <Input defaultValue="USD ($)" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="branding" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Logo & Icon</CardTitle>
                            <CardDescription>Upload your site logo and favicon.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="space-y-2">
                                    <Label>Logo</Label>
                                    <div className="h-24 w-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                                        Upload
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Favicon</Label>
                                    <div className="h-12 w-12 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                                        Icon
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Colors</CardTitle>
                            <CardDescription>Customize your brand colors.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <div className="flex gap-2">
                                        <div className="h-9 w-9 rounded border border-slate-200 bg-indigo-600"></div>
                                        <Input defaultValue="#4F46E5" className="font-mono" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="domain" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Domain</CardTitle>
                            <CardDescription>Connect your own domain name.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <Globe className="h-5 w-5 text-slate-500" />
                                <div className="flex-1">
                                    <div className="font-medium text-slate-900">panalist.com</div>
                                    <div className="text-xs text-slate-500">Primary Domain</div>
                                </div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>
                            <div className="space-y-2">
                                <Label>Add New Domain</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="e.g. directory.example.com" />
                                    <Button>Connect</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Global SEO</CardTitle>
                            <CardDescription>Default SEO settings for your directory.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Meta Title Template</Label>
                                <Input defaultValue="%s | PanaList Directory" />
                                <p className="text-xs text-slate-500">%s will be replaced by the page title.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Indexing</Label>
                                    <p className="text-xs text-slate-500">Allow search engines to index your site.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Sitemap</Label>
                                    <p className="text-xs text-slate-500">Automatically generate sitemap.xml.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
