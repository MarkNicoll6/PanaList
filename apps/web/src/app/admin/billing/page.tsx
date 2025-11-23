import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Billing</h1>
                <p className="text-sm text-slate-600 mt-1">Manage your subscription and invoices.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">Billing details coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
