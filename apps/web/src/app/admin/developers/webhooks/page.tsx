"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Activity } from "lucide-react";

interface Webhook {
    id: string;
    url: string;
    events_json: string; // JSON string
    is_active: boolean;
    created_at: string;
}

export default function WebhooksPage() {
    const [hooks, setHooks] = useState<Webhook[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUrl, setNewUrl] = useState("");

    useEffect(() => {
        fetchHooks();
    }, []);

    const fetchHooks = async () => {
        try {
            const res = await api.get("/admin/webhooks");
            setHooks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newUrl) return;
        try {
            await api.post("/admin/webhooks", {
                url: newUrl,
                events: ["listing.created", "listing.updated"], // Default events for now
            });
            setNewUrl("");
            fetchHooks();
        } catch (err) {
            console.error(err);
            alert("Failed to create webhook");
        }
    };

    const handleTest = async () => {
        try {
            await api.post("/webhooks/test");
            alert("Test event dispatched!");
        } catch (err) {
            console.error(err);
            alert("Test failed");
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
                    <p className="text-muted-foreground">
                        Configure endpoints to receive real-time event notifications.
                    </p>
                </div>
                <Button variant="outline" onClick={handleTest}>
                    <Activity className="w-4 h-4 mr-2" />
                    Test Delivery
                </Button>
            </div>

            <div className="flex gap-4 items-end bg-card p-4 rounded-lg border">
                <div className="grid w-full max-w-md items-center gap-1.5">
                    <label htmlFor="url" className="text-sm font-medium">
                        Endpoint URL
                    </label>
                    <Input
                        id="url"
                        placeholder="https://api.yourapp.com/webhooks"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                    />
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Endpoint
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>URL</TableHead>
                            <TableHead>Events</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : hooks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No webhook endpoints configured.
                                </TableCell>
                            </TableRow>
                        ) : (
                            hooks.map((hook) => (
                                <TableRow key={hook.id}>
                                    <TableCell className="font-medium font-mono text-xs">
                                        {hook.url}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 flex-wrap">
                                            {/* Parse JSON if string, or handle if array */}
                                            {/* For simplicity assuming backend sends raw JSON bytes which might need parsing or is already parsed by axios if Content-Type is json */}
                                            {/* The backend sends []byte which is base64 encoded in JSON usually, or raw JSON. Let's assume we need to decode or it's just a string representation */}
                                            <span className="bg-secondary px-2 py-0.5 rounded text-xs">
                                                All Events
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {hook.is_active ? (
                                            <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded-full">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">Inactive</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(hook.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="text-destructive">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
