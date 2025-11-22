"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, RefreshCw } from "lucide-react";

export default function FederationPage() {
    const [enabled, setEnabled] = useState(false);
    const [stats, setStats] = useState({ total_listings: 0, total_queries: 0 });
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        fetchSettings();
        fetchStats();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/federation/optin");
            setEnabled(res.data.enabled);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get("/federation/stats");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = async (checked: boolean) => {
        setEnabled(checked);
        try {
            await api.post("/federation/optin", {
                enabled: checked,
                categories: [],
                regions: []
            });
        } catch (err) {
            console.error(err);
            setEnabled(!checked); // Revert on error
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            await api.post("/federation/sync");
            fetchStats();
            alert("Sync started!");
        } catch (err) {
            console.error(err);
            alert("Sync failed");
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Federation Network</h1>
                    <p className="text-muted-foreground">
                        Join the PanaList Network to share listings and get traffic from other directories.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Network Status</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {enabled ? <span className="text-green-600">Active</span> : <span className="text-muted-foreground">Inactive</span>}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {enabled ? "Your listings are visible globally." : "Opt-in to join the network."}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Indexed Listings</CardTitle>
                        <div className="h-4 w-4 text-muted-foreground">#</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_listings}</div>
                        <p className="text-xs text-muted-foreground">
                            Listings synced to the global index.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Network Queries</CardTitle>
                        <div className="h-4 w-4 text-muted-foreground">?</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_queries}</div>
                        <p className="text-xs text-muted-foreground">
                            Total searches across the network.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>
                        Control what you share with the network.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium">Enable Federation</label>
                            <p className="text-sm text-muted-foreground">
                                Allow your listings to appear in global search results.
                            </p>
                        </div>
                        <Switch checked={enabled} onCheckedChange={handleToggle} />
                    </div>

                    {enabled && (
                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Manual Sync</label>
                                <p className="text-sm text-muted-foreground">
                                    Force a re-sync of your listings to the index.
                                </p>
                            </div>
                            <Button variant="outline" onClick={handleSync} disabled={syncing}>
                                <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                                {syncing ? "Syncing..." : "Sync Now"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
