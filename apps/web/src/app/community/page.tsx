"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    upvotes: number;
    created_at: string;
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState({ title: "", content: "", category: "question" });
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/community/posts");
            setPosts(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) return;

        setPosting(true);
        try {
            await api.post("/community/posts", newPost);
            setNewPost({ title: "", content: "", category: "question" });
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert("Failed to post");
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Community Forum</h1>
                    <p className="text-xl text-muted-foreground">
                        Ask questions, share ideas, and connect with other users.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Start a Discussion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <Input
                                placeholder="Title"
                                value={newPost.title}
                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            <textarea
                                className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                                placeholder="What's on your mind?"
                                value={newPost.content}
                                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={posting}>
                                    {posting ? "Posting..." : "Post"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {posts.map(post => (
                        <Card key={post.id}>
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-medium">
                                        {post.title}
                                    </CardTitle>
                                    <Badge variant="outline">{post.category}</Badge>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    {post.upvotes}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {post.content}
                                </p>
                                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                    <MessageSquare className="mr-1 h-3 w-3" />
                                    0 comments
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
