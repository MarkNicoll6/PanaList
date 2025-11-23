"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/listings">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Add Listing</h1>
                    <p className="text-sm text-slate-600 mt-1">Create a new entry in your directory.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>The core details of the listing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Business Name</Label>
                        <Input placeholder="e.g. The Coffee House" />
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cafe">Cafe</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe the business..." className="min-h-[100px]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>City</Label>
                            <Input placeholder="e.g. San Francisco" />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input placeholder="https://..." />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button className="w-full">
                            <Save className="mr-2 h-4 w-4" /> Create Listing
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
