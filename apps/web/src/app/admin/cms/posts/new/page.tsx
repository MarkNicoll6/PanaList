"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/rich-text-editor'), { ssr: false });

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('<p>Start writing...</p>');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.post('/cms/posts', {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-'),
                content,
                excerpt: '',
            });
            router.push('/admin/cms/posts');
        } catch (err) {
            console.error(err);
            alert('Failed to save post');
        } finally {
            setSaving(false);
        }
    };

    const handleAI = async () => {
        const prompt = window.prompt("Enter a prompt for the AI:");
        if (!prompt) return;

        try {
            const res = await api.post('/ai/generate', { prompt, context: "" });
            setContent(res.data.content);
        } catch (err) {
            console.error(err);
            alert('AI generation failed');
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">New Post</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button variant="secondary" onClick={handleAI}>AI Assistant</Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Publish'}
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <Input
                    placeholder="Post Title"
                    className="text-2xl font-bold h-14"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    placeholder="slug-url"
                    className="font-mono text-sm text-muted-foreground"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
                <textarea
                    className="w-full min-h-[300px] p-4 border rounded-md font-mono"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here (HTML supported)..."
                />
            </div>
        </div>
    );
}
