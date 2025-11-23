import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PagesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Pages</h1>
                <p className="text-sm text-slate-600 mt-1">Manage static pages (About, Contact, Terms).</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Pages</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Page management coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
