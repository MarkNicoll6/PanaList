"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, MapPin, Globe, Store } from "lucide-react";
import Link from "next/link";

export default function ListingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Listings</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage the businesses and places in your directory.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Link href="/admin/listings/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Listing
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 border-0 bg-slate-50" placeholder="Search listings by name, category, or location..." />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Store className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">Acme Coffee Co.</div>
                                            <div className="text-xs text-slate-500">acme-coffee-co</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Cafe</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-slate-600">
                                        <MapPin className="h-3 w-3 mr-1" /> San Francisco, CA
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Published</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Globe className="h-3 w-3 mr-1" /> AI Ingested
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Store className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">The Tech Hub</div>
                                            <div className="text-xs text-slate-500">the-tech-hub</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Coworking</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-slate-600">
                                        <MapPin className="h-3 w-3 mr-1" /> Austin, TX
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Review Needed</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Globe className="h-3 w-3 mr-1" /> AI Ingested
                                    </div>
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
