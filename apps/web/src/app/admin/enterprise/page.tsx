import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnterprisePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Enterprise</h1>
                <p className="text-sm text-slate-600 mt-1">SSO and advanced security settings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Enterprise features coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
