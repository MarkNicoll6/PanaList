import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecommendedListings() {
    const { data: recommendations } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const res = await api.get('/recommendations');
            return res.data;
        },
    });

    if (!recommendations?.length) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {recommendations.map((rec: any) => (
                    <Card key={rec.id}>
                        <CardHeader>
                            <CardTitle>{rec.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{rec.summary}</p>
                            <div className="mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                                Match Score: {rec.score}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
