import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LocationsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Locations</h1>
                <p className="text-sm text-slate-600 mt-1">Manage regions, cities, and neighborhoods.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Locations</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Location management coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
