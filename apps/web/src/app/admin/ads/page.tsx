"use client";

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminAdsPage() {
    const { data: zones } = useQuery({
        queryKey: ['ad-zones'],
        queryFn: async () => {
            const res = await api.get('/ads/zones');
            return res.data;
        },
    });

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Ad Zones</h1>
                <Button>Create Zone</Button>
            </div>

            <div className="grid gap-4">
                {zones?.length ? (
                    zones.map((zone: any) => (
                        <Card key={zone.id}>
                            <CardHeader>
                                <CardTitle>{zone.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Type: {zone.type}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No ad zones configured.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
