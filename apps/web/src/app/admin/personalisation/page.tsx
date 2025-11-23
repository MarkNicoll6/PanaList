import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PersonalisationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Personalisation</h1>
                <p className="text-sm text-slate-600 mt-1">Customize user experiences.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Rules & Segments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Personalisation engine coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
