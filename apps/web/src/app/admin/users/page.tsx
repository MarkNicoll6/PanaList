import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Users</h1>
                <p className="text-sm text-slate-600 mt-1">Manage registered users and members.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">User management coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}
