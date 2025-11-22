import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAdsPage() {
    const { data: zones, isLoading } = useQuery({
        queryKey: ['ad-zones'],
        queryFn: async () => {
            const res = await api.get('/ads/zones');
            return res.data;
        },
    });

    if (isLoading) return <div className="p-8">Loading zones...</div>;

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Ad Zones</h1>

            <div className="grid gap-4">
                {zones?.length === 0 ? (
                    <p>No ad zones configured.</p>
                ) : (
                    zones?.map((zone: any) => (
                        <Card key={zone.id}>
                            <CardHeader>
                                <CardTitle>{zone.name} ({zone.code})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Placement: {zone.placement}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
