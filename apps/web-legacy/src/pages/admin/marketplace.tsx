import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminMarketplacePage() {
    const [installing, setInstalling] = useState<string | null>(null);

    const { data: themes } = useQuery({
        queryKey: ['market-themes'],
        queryFn: async () => {
            const res = await api.get('/market/themes');
            return res.data.length ? res.data : [
                { id: '1', name: 'Minimalist Directory', price_cents: 0, author: 'PanaTeam' },
                { id: '2', name: 'Dark Mode Pro', price_cents: 2900, author: 'ThemeCorp' },
            ];
        },
    });

    const { data: blocks } = useQuery({
        queryKey: ['market-blocks'],
        queryFn: async () => {
            const res = await api.get('/market/blocks');
            return res.data.length ? res.data : [
                { id: '1', name: 'Hero Slider', price_cents: 0, version: '1.0.0' },
                { id: '2', name: 'Pricing Table', price_cents: 1000, version: '2.1.0' },
            ];
        },
    });

    const handleInstall = async (type: string, id: string) => {
        setInstalling(id);
        try {
            await api.post('/market/install', { type, id });
            alert('Installed successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to install');
        } finally {
            setInstalling(null);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <Button variant="outline">Publish Your Own</Button>
            </div>

            <Tabs defaultValue="themes">
                <TabsList>
                    <TabsTrigger value="themes">Themes</TabsTrigger>
                    <TabsTrigger value="blocks">Blocks</TabsTrigger>
                </TabsList>

                <TabsContent value="themes" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {themes?.map((theme: any) => (
                            <Card key={theme.id}>
                                <div className="h-32 bg-muted w-full" />
                                <CardHeader>
                                    <CardTitle>{theme.name}</CardTitle>
                                    <CardDescription>by {theme.author}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="font-bold">
                                        {theme.price_cents === 0 ? 'Free' : `$${theme.price_cents / 100}`}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        onClick={() => handleInstall('theme', theme.id)}
                                        disabled={installing === theme.id}
                                    >
                                        {installing === theme.id ? 'Installing...' : 'Install Theme'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="blocks" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {blocks?.map((block: any) => (
                            <Card key={block.id}>
                                <CardHeader>
                                    <CardTitle>{block.name}</CardTitle>
                                    <CardDescription>v{block.version}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="font-bold">
                                        {block.price_cents === 0 ? 'Free' : `$${block.price_cents / 100}`}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant="secondary"
                                        onClick={() => handleInstall('block', block.id)}
                                        disabled={installing === block.id}
                                    >
                                        {installing === block.id ? 'Installing...' : 'Install Block'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
