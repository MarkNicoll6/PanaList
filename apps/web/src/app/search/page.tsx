"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchResult {
    id: string;
    normalized_json: {
        title: string;
        description: string;
    };
    last_synced_at: string;
}

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setSearching(true);
        try {
            const res = await api.get(`/federation/search?query=${encodeURIComponent(query)}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Global Search</h1>
                    <p className="text-xl text-muted-foreground">
                        Discover listings from across the PanaList Network.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        className="h-12 text-lg"
                        placeholder="Search for anything..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" size="lg" disabled={searching}>
                        <SearchIcon className="mr-2 h-5 w-5" />
                        {searching ? "Searching..." : "Search"}
                    </Button>
                </form>

                <div className="space-y-4">
                    {results.map((result) => (
                        <Card key={result.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
                            <CardHeader>
                                <CardTitle>{result.normalized_json.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {result.normalized_json.description}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        Federated
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {results.length === 0 && !searching && query && (
                        <div className="text-center text-muted-foreground py-12">
                            No results found. Try a different query.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
