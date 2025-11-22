"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface Trend {
    id: string;
    category_id: string;
    score: number;
    evidence_json: {
        keywords: string[];
        growth_rate: string;
    };
}

export default function TrendsPage() {
    const [trends, setTrends] = useState<Trend[]>([]);

    useEffect(() => {
        // Mock fetching trends since we didn't implement a seeder for this yet
        // In real app: fetchTrends();
        setTrends([
            {
                id: "1",
                category_id: "tech",
                score: 98.5,
                evidence_json: { keywords: ["AI Agents", "LLMs"], growth_rate: "+150%" }
            },
            {
                id: "2",
                category_id: "sustainability",
                score: 85.2,
                evidence_json: { keywords: ["Carbon Capture", "Green Tech"], growth_rate: "+45%" }
            }
        ]);
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Trend Radar</h1>
                    <p className="text-muted-foreground">
                        Predictive insights on emerging categories and topics.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trends.map((trend) => (
                    <Card key={trend.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Trend Score: {trend.score}
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">
                                {trend.evidence_json.keywords[0]}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {trend.evidence_json.keywords.map((k) => (
                                    <Badge key={k} variant="secondary" className="text-xs">
                                        {k}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Growth: <span className="text-green-600 font-bold">{trend.evidence_json.growth_rate}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
