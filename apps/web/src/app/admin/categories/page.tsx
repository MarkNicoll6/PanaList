"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, Folder, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Categories</h1>
                    <p className="text-sm text-slate-600 mt-1">Organize your listings into a hierarchy.</p>
                </div>
                <Link href="/admin/categories/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 border-0 bg-slate-50" placeholder="Search categories..." />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Listings</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Folder className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">Restaurants</div>
                                            <div className="text-xs text-slate-500">Parent Category</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">restaurants</TableCell>
                                <TableCell>1,240</TableCell>
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
                                            <FolderOpen className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">Cafes</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">restaurants/cafes</TableCell>
                                <TableCell>450</TableCell>
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
                                            <FolderOpen className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">Fine Dining</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">restaurants/fine-dining</TableCell>
                                <TableCell>120</TableCell>
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
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Folder className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">Retail</div>
                                            <div className="text-xs text-slate-500">Parent Category</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">retail</TableCell>
                                <TableCell>850</TableCell>
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
