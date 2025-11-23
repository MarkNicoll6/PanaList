"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, MapPin, Phone, Mail, Save, Eye } from "lucide-react";

export default function ListingPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">My Listing</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage your company profile and directory presence.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Details</CardTitle>
                            <CardDescription>Basic information about your business.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Company Name</Label>
                                <Input placeholder="Acme Corp" defaultValue="PanaList" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tagline</Label>
                                <Input placeholder="We build things." defaultValue="Build beautiful directories. Automate everything." />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    className="min-h-[150px]"
                                    placeholder="Tell us about your company..."
                                    defaultValue="PanaList is the ultimate directory builder for modern businesses."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input defaultValue="Software" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Founded Year</Label>
                                    <Input defaultValue="2024" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>How customers can reach you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Website</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input className="pl-9" placeholder="https://..." defaultValue="https://panalist.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input className="pl-9" placeholder="contact@..." defaultValue="hello@panalist.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input className="pl-9" placeholder="+1..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input className="pl-9" placeholder="123 Main St..." defaultValue="San Francisco, CA" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="media">
                    <Card>
                        <CardHeader>
                            <CardTitle>Media Assets</CardTitle>
                            <CardDescription>Logos and gallery images.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="aspect-square rounded-md border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                    Upload Logo
                                </div>
                                <div className="aspect-square rounded-md border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                    Add Photo
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                            <CardDescription>Optimize your listing for search engines.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Meta Title</Label>
                                <Input defaultValue="PanaList - The Ultimate Directory Builder" />
                            </div>
                            <div className="space-y-2">
                                <Label>Meta Description</Label>
                                <Textarea defaultValue="Build beautiful directories with PanaList." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
