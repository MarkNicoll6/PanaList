import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Settings</h1>
                <p className="text-sm text-slate-600 mt-1">General configuration for your directory.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Settings coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
