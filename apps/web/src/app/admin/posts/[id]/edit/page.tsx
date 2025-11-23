"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
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
        content: "",
        status: ""
    });

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await api.get(`/admin/posts/${id}`);
            const post = res.data;

            // Parse content JSON
            let content = "";
            try {
                // Assuming content_json is a byte array or object
                // If it's a byte array from Go, it might come as base64 or number array
                // But here we just need to handle what we sent.
                // If we sent { markdown: "..." }, we extract it.
                // If it's raw bytes, we might need to decode.
                // For this demo, let's assume the API returns the JSON object directly if it's JSONB
                if (post.content_json && post.content_json.markdown) {
                    content = post.content_json.markdown;
                }
            } catch (e) {
                console.error("Error parsing content", e);
            }

            setFormData({
                title: post.title || "",
                slug: post.slug || "",
                excerpt: post.excerpt || "",
                sector: post.sector || "",
                tags: post.tags ? post.tags.join(", ") : "",
                meta_description: post.meta_description || "",
                custom_meta_tags: post.custom_meta_tags || "",
                og_image_url: post.og_image_url || "",
                content: content,
                status: post.status || "DRAFT"
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (status: string) => {
        setLoading(true);
        try {
            const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);

            const contentJson = new TextEncoder().encode(JSON.stringify({ markdown: formData.content }));

            const payload = {
                ...formData,
                tags: tagsArray,
                content_json: Array.from(contentJson),
                status
            };

            await api.put(`/admin/posts/${id}`, payload);

            if (status === 'PUBLISHED' && formData.status !== 'PUBLISHED') {
                await api.post(`/admin/posts/${id}/publish`);
            }

            router.push("/admin/posts");
        } catch (err) {
            console.error(err);
            alert("Failed to update post");
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
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Edit Post</h1>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={loading}>
                        Save Draft
                    </Button>
                    <Button onClick={() => handleSubmit("PUBLISHED")} disabled={loading}>
                        {formData.status === 'PUBLISHED' ? 'Update' : 'Publish'}
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
                                <Input name="title" value={formData.title} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug</Label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Excerpt</Label>
                                <Textarea name="excerpt" value={formData.excerpt} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Content (Markdown)</Label>
                                <Textarea name="content" value={formData.content} onChange={handleChange} className="min-h-[400px] font-mono" />
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
                                <Input name="sector" value={formData.sector} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <Input name="tags" value={formData.tags} onChange={handleChange} />
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
                                <Textarea name="meta_description" value={formData.meta_description} onChange={handleChange} />
                                <div className="text-xs text-right text-slate-400">{formData.meta_description.length} chars</div>
                            </div>
                            <div className="space-y-2">
                                <Label>OG Image URL</Label>
                                <Input name="og_image_url" value={formData.og_image_url} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Custom Meta Tags</Label>
                                <Textarea name="custom_meta_tags" value={formData.custom_meta_tags} onChange={handleChange} className="font-mono text-xs" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
