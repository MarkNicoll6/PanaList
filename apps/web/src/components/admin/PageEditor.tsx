"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

interface PageData {
    title: string;
    content: string;
    slug: string;
    status: "draft" | "published" | "archived";
    visibility: "public" | "private" | "password";
    metaTitle: string;
    metaDescription: string;
}

interface PageEditorProps {
    initialData?: PageData;
    isEditing?: boolean;
    onSave?: (data: PageData) => void;
}

export default function PageEditor({ initialData, isEditing = false, onSave }: PageEditorProps) {
    const [data, setData] = useState<PageData>(initialData || {
        title: "",
        content: "",
        slug: "",
        status: "draft",
        visibility: "public",
        metaTitle: "",
        metaDescription: "",
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: data.content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setData((prev) => ({ ...prev, content: editor.getHTML() }));
        },
        editorProps: {
            attributes: {
                class: "min-h-[400px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm max-w-none",
            },
        },
    });

    const handleSave = () => {
        if (onSave) {
            onSave(data);
        }
        console.log("Saving page data:", data);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                            {isEditing ? "Edit Page" : "Create Page"}
                        </h1>
                        <p className="text-sm text-slate-600 mt-1">
                            {isEditing ? "Update existing page content." : "Add a new static page to your directory."}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Save Page
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>Write the content for your page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    placeholder="e.g. About Us"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Content</Label>
                                <div className="space-y-2">
                                    {/* Simple Toolbar */}
                                    <div className="flex gap-1 border border-slate-200 rounded-t-md p-1 bg-slate-50">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleBold().run()}
                                            className={editor?.isActive("bold") ? "bg-slate-200" : ""}
                                        >
                                            Bold
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                                            className={editor?.isActive("italic") ? "bg-slate-200" : ""}
                                        >
                                            Italic
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                                            className={editor?.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""}
                                        >
                                            H2
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                            className={editor?.isActive("bulletList") ? "bg-slate-200" : ""}
                                        >
                                            List
                                        </Button>
                                    </div>
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Search Engine Optimization (SEO)</CardTitle>
                            <CardDescription>Optimize your page for search engines.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Meta Title</Label>
                                <Input
                                    value={data.metaTitle}
                                    onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
                                    placeholder="e.g. About Us - My Directory"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Meta Description</Label>
                                <Textarea
                                    value={data.metaDescription}
                                    onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
                                    placeholder="Brief summary of the page content..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value: any) => setData({ ...data, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>URL Slug</Label>
                                <Input
                                    value={data.slug}
                                    onChange={(e) => setData({ ...data, slug: e.target.value })}
                                    placeholder="e.g. about-us"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Visibility</Label>
                                <Select
                                    value={data.visibility}
                                    onValueChange={(value: any) => setData({ ...data, visibility: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private (Admin only)</SelectItem>
                                        <SelectItem value="password">Password Protected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
