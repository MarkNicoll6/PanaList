"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, FileText, Eye } from "lucide-react";
import Link from "next/link";

export default function PagesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Pages</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage static pages like About, Contact, and Terms.</p>
                </div>
                <Link href="/admin/pages/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Page
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 border-0 bg-slate-50" placeholder="Search pages..." />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>URL Slug</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { title: "About Us", slug: "about", updated: "2 days ago", status: "published" },
                                { title: "Contact", slug: "contact", updated: "1 week ago", status: "published" },
                                { title: "Privacy Policy", slug: "privacy", updated: "1 month ago", status: "published" },
                                { title: "Terms of Service", slug: "terms", updated: "1 month ago", status: "draft" },
                            ].map((page) => (
                                <TableRow key={page.slug} className="group cursor-pointer hover:bg-slate-50">
                                    <TableCell className="font-medium">
                                        <Link href={`/admin/pages/${page.slug}`} className="flex items-center gap-3 w-full">
                                            <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{page.title}</div>
                                                {page.slug === "about" && <div className="text-xs text-slate-500">System Page</div>}
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-slate-500">/{page.slug}</TableCell>
                                    <TableCell>{page.updated}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                page.status === "published"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                                            }
                                        >
                                            {page.status === "published" ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/${page.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/pages/${page.slug}`}>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
