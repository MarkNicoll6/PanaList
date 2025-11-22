"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
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
import { Plus, Copy, Trash } from "lucide-react";

interface APIKey {
    id: string;
    name: string;
    hash: string;
    created_at: string;
    last_used_at: string | null;
}

export default function APIKeysPage() {
    const [keys, setKeys] = useState<APIKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [newKeyName, setNewKeyName] = useState("");
    const [createdToken, setCreatedToken] = useState<string | null>(null);

    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        try {
            const res = await api.get("/admin/api-keys");
            setKeys(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newKeyName) return;
        try {
            const res = await api.post("/admin/api-keys", { name: newKeyName });
            setCreatedToken(res.data.token);
            setNewKeyName("");
            fetchKeys();
        } catch (err) {
            console.error(err);
            alert("Failed to create key");
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
                    <p className="text-muted-foreground">
                        Manage API keys for accessing the PanaList API.
                    </p>
                </div>
            </div>

            {createdToken && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-md flex flex-col gap-2">
                    <p className="text-green-800 font-medium">API Key Created!</p>
                    <p className="text-sm text-green-700">
                        Copy this key now. You won't be able to see it again.
                    </p>
                    <div className="flex items-center gap-2">
                        <code className="bg-white px-2 py-1 rounded border border-green-200 font-mono text-sm flex-1">
                            {createdToken}
                        </code>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(createdToken)}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="self-start text-green-700 hover:text-green-800 hover:bg-green-100"
                        onClick={() => setCreatedToken(null)}
                    >
                        Dismiss
                    </Button>
                </div>
            )}

            <div className="flex gap-4 items-end bg-card p-4 rounded-lg border">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="keyName" className="text-sm font-medium">
                        New Key Name
                    </label>
                    <Input
                        id="keyName"
                        placeholder="e.g. Mobile App"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                    />
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Key
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Prefix</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Last Used</TableHead>
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
                        ) : keys.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No API keys found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            keys.map((key) => (
                                <TableRow key={key.id}>
                                    <TableCell className="font-medium">{key.name}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {key.hash.substring(0, 8)}...
                                    </TableCell>
                                    <TableCell>
                                        {new Date(key.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {key.last_used_at
                                            ? new Date(key.last_used_at).toLocaleDateString()
                                            : "Never"}
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
