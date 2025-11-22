"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Check } from "lucide-react";

interface Item {
    id: string;
    name: string;
    description: string;
    price?: number;
}

export default function MarketplacePage() {
    const [themes, setThemes] = useState<Item[]>([]);
    const [blocks, setBlocks] = useState<Item[]>([]);
    const [installed, setInstalled] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCatalog();
    }, []);

    const fetchCatalog = async () => {
        try {
            const [themesRes, blocksRes] = await Promise.all([
                api.get("/market/themes"),
                api.get("/market/blocks")
            ]);
            setThemes(themesRes.data);
            setBlocks(blocksRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInstall = async (type: string, id: string) => {
        try {
            await api.post("/market/install", { type, id });
            setInstalled(prev => new Set(prev).add(id));
        } catch (err) {
            console.error(err);
            alert("Installation failed");
        }
    };

    const ItemCard = ({ item, type }: { item: Item, type: string }) => (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{item.name}</span>
                    {item.price ? (
                        <Badge variant="secondary">${item.price / 100}</Badge>
                    ) : (
                        <Badge variant="secondary">Free</Badge>
                    )}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    Preview Image
                </div>
            </CardContent>
            <CardFooter>
                {installed.has(item.id) ? (
                    <Button disabled className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Installed
                    </Button>
                ) : (
                    <Button className="w-full" onClick={() => handleInstall(type, item.id)}>
                        <Download className="mr-2 h-4 w-4" /> Install
                    </Button>
                )}
            </CardFooter>
        </Card>
    );

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">App Store</h1>
                    <p className="text-muted-foreground">
                        Extend your directory with themes and functional blocks.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="themes" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="themes">Themes</TabsTrigger>
                    <TabsTrigger value="blocks">Blocks</TabsTrigger>
                </TabsList>
                <TabsContent value="themes" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {themes.map(theme => (
                            <ItemCard key={theme.id} item={theme} type="theme" />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="blocks" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {blocks.map(block => (
                            <ItemCard key={block.id} item={block} type="block" />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
