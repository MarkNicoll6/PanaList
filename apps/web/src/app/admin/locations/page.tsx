"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default function LocationsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Locations</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage regions, cities, and neighborhoods.</p>
                </div>
                <Link href="/admin/locations/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Location
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 border-0 bg-slate-50" placeholder="Search locations..." />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Listings</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">United States</div>
                                            <div className="text-xs text-slate-500">Country</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">Country</Badge>
                                </TableCell>
                                <TableCell>12,450</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3 pl-8">
                                        <div className="h-8 w-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">California</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">Region</Badge>
                                </TableCell>
                                <TableCell>4,200</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3 pl-16">
                                        <div className="h-8 w-8 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">San Francisco</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">City</Badge>
                                </TableCell>
                                <TableCell>1,850</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
