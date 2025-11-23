"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewLocationPage() {
    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/locations">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Add Location</h1>
                    <p className="text-sm text-slate-600 mt-1">Add a new region or city to your directory.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                    <CardDescription>Define the location name and hierarchy.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g. San Francisco" />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input placeholder="e.g. san-francisco" />
                    </div>

                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="country">Country</SelectItem>
                                <SelectItem value="region">Region / State</SelectItem>
                                <SelectItem value="city">City</SelectItem>
                                <SelectItem value="neighborhood">Neighborhood</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Parent Location</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="None (Top Level)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None (Top Level)</SelectItem>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">California</SelectItem>
                                <SelectItem value="ny">New York</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe this location..." />
                    </div>

                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <div className="h-32 w-full rounded bg-slate-100 border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                            Upload Image
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" /> Create Location
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
