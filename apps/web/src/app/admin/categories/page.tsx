import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Categories</h1>
                <p className="text-sm text-slate-600 mt-1">Organize your listings into a hierarchy.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Category management coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
