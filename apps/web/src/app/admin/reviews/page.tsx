import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Reviews</h1>
                <p className="text-sm text-slate-600 mt-1">Moderate user reviews and ratings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Latest Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Review management coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
