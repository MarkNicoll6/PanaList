"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        sector: "",
        tags: "",
        meta_description: "",
        custom_meta_tags: "",
        og_image_url: "",
        content: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        setFormData({ ...formData, slug });
    };

    const handleSubmit = async (status: string) => {
        setLoading(true);
        try {
            const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);

            // Convert content to JSON byte array (mocking rich text structure or just raw text)
            // For simplicity, we'll just store the raw text in a JSON wrapper
            const contentJson = new TextEncoder().encode(JSON.stringify({ markdown: formData.content }));

            const payload = {
                ...formData,
                tags: tagsArray,
                content_json: Array.from(contentJson), // Convert Uint8Array to regular array for JSON serialization
                status
            };

            await api.post("/admin/posts", payload);
            router.push("/admin/posts");
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/posts">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">New Post</h1>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={loading}>
                        Save Draft
                    </Button>
                    <Button onClick={() => handleSubmit("PUBLISHED")} disabled={loading}>
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" value={formData.title} onChange={handleChange} onBlur={generateSlug} placeholder="Enter post title" />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug</Label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="url-friendly-slug" />
                            </div>
                            <div className="space-y-2">
                                <Label>Excerpt</Label>
                                <Textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Short summary for cards and meta..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Content (Markdown)</Label>
                                <Textarea name="content" value={formData.content} onChange={handleChange} className="min-h-[400px] font-mono" placeholder="# Write your post here..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Sector</Label>
                                <Input name="sector" value={formData.sector} onChange={handleChange} placeholder="e.g. Consulting" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <Input name="tags" value={formData.tags} onChange={handleChange} placeholder="Comma separated tags" />
                            </div>
                            <div className="space-y-2">
                                <Label>Author</Label>
                                <div className="text-sm text-slate-500">Current User (Default)</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO & Social</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Meta Description</Label>
                                <Textarea name="meta_description" value={formData.meta_description} onChange={handleChange} placeholder="150-160 characters" />
                                <div className="text-xs text-right text-slate-400">{formData.meta_description.length} chars</div>
                            </div>
                            <div className="space-y-2">
                                <Label>OG Image URL</Label>
                                <Input name="og_image_url" value={formData.og_image_url} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Custom Meta Tags</Label>
                                <Textarea name="custom_meta_tags" value={formData.custom_meta_tags} onChange={handleChange} placeholder='<meta property="og:type" content="article" />' className="font-mono text-xs" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
