"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpRight } from "lucide-react";

export default function TenantsPage() {
    const [tenants, setTenants] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const res = await api.get("/compliance/tenants");
                setTenants(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTenants();
    }, []);

    const filteredTenants = tenants.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.domain.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Tenant list</h1>
                    <p className="text-sm text-slate-600 mt-1">Global list of tenants with compliance status.</p>
                </div>
                <Button>Export CSV</Button>
            </div>

            <Card>
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search tenants..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4 text-slate-500" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Tenant</th>
                                <th className="px-6 py-3 font-medium">Region</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Last Scan</th>
                                <th className="px-6 py-3 font-medium">Open Issues</th>
                                <th className="px-6 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{tenant.name}</div>
                                        <div className="text-xs text-slate-500">{tenant.domain}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">US-East-1</td>
                                    <td className="px-6 py-4">
                                        {tenant.status === 'compliant' ? (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Compliant</Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100">Warning</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {new Date(tenant.last_scan).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {tenant.open_issues}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ArrowUpRight className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
