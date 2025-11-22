"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalyticsPage() {
    const [insight, setInsight] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    const { data: overview } = useQuery({
        queryKey: ['analytics-overview'],
        queryFn: async () => {
            const res = await api.get('/analytics/overview');
            // Mock data if empty for demo
            return res.data.length ? res.data : [
                { date: '2023-01-01', pageviews: 100 },
                { date: '2023-01-02', pageviews: 150 },
                { date: '2023-01-03', pageviews: 120 },
                { date: '2023-01-04', pageviews: 200 },
                { date: '2023-01-05', pageviews: 180 },
            ];
        },
    });

    const handleGenerateInsight = async () => {
        setGenerating(true);
        try {
            const res = await api.post('/insights/weekly-generate');
            setInsight(res.data.summary);
        } catch (err) {
            console.error(err);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Analytics</h1>
                <Button onClick={handleGenerateInsight} disabled={generating}>
                    {generating ? 'Generating...' : 'Generate Weekly Insight'}
                </Button>
            </div>

            {insight && (
                <Card className="bg-muted/50 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-lg">AI Insight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{insight}</p>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Traffic Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={overview}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="pageviews" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No data available yet.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
