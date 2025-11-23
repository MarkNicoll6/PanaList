"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SEOHealthPage() {
    const [health, setHealth] = useState<any>(null);

    useEffect(() => {
        fetchHealth();
    }, []);

    const fetchHealth = async () => {
        try {
            const res = await api.get("/admin/seo/health");
            setHealth(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!health) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">SEO Health</h1>
                <p className="text-sm text-slate-600 mt-1">Site-wide SEO performance score.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-3">
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl font-bold text-emerald-600 mb-2">{health.score}</div>
                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Overall Score</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-slate-500">Technical</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">{health.details.technical}%</div>
                        <Progress value={health.details.technical} className="h-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-slate-500">Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">{health.details.content}%</div>
                        <Progress value={health.details.content} className="h-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-slate-500">Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">{health.details.links}%</div>
                        <Progress value={health.details.links} className="h-2" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
