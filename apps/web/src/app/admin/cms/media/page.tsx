"use client";

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminMediaPage() {
    const { data: media, refetch } = useQuery({
        queryKey: ['cms-media'],
        queryFn: async () => {
            const res = await api.get('/cms/media');
            return res.data;
        },
    });

    const handleUpload = async () => {
        const filename = prompt('Enter filename (mock upload):');
        if (!filename) return;

        try {
            await api.post('/cms/media', { filename });
            refetch();
        } catch (err) {
            console.error(err);
            alert('Failed to upload');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Media Library</h1>
                <Button onClick={handleUpload}>Upload Media</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {media?.length ? (
                    media.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="aspect-square bg-muted relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.url}
                                    alt={item.filename}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <CardContent className="p-2">
                                <p className="text-sm truncate">{item.filename}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No media uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
}
