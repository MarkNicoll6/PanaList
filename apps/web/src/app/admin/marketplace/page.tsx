import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketplacePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Marketplace</h1>
                <p className="text-sm text-slate-600 mt-1">Browse templates and plugins.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Available Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Marketplace coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
