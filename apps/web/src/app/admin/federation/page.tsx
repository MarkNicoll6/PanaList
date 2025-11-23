import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FederationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Federation</h1>
                <p className="text-sm text-slate-600 mt-1">Connect with other directories.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Network Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Federation settings coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
