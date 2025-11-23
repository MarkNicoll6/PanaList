"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewCategoryPage() {
    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/categories">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Add Category</h1>
                    <p className="text-sm text-slate-600 mt-1">Create a new category for your listings.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>Define the category name and hierarchy.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g. Restaurants" />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input placeholder="e.g. restaurants" />
                        <p className="text-xs text-slate-500">The URL-friendly version of the name.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Parent Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="None (Top Level)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None (Top Level)</SelectItem>
                                <SelectItem value="restaurants">Restaurants</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe this category..." />
                    </div>

                    <div className="space-y-2">
                        <Label>Icon</Label>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                Icon
                            </div>
                            <Button variant="outline">Select Icon</Button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" /> Create Category
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
