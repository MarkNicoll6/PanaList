"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function TopicClustersPage() {
    const [clusters, setClusters] = useState<any[]>([]);

    useEffect(() => {
        fetchClusters();
    }, []);

    const fetchClusters = async () => {
        try {
            const res = await api.get("/admin/seo/clusters");
            setClusters(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Topic Clusters</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage content hubs and spokes.</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" /> New Cluster
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clusters.map((cluster) => (
                    <Card key={cluster.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base font-medium">{cluster.title}</CardTitle>
                                <Badge variant="outline">{cluster.type}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-slate-500 mb-4">/{cluster.slug}</div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{cluster.status}</span>
                                <span>{new Date(cluster.updated_at).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {clusters.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        No topic clusters found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
