"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";

export default function ComplianceDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [tenants, setTenants] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, tenantsRes] = await Promise.all([
                    api.get("/compliance/stats"),
                    api.get("/compliance/tenants")
                ]);
                setStats(statsRes.data);
                setTenants(tenantsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Compliance overview</h1>
                <p className="text-sm text-slate-600 mt-1">High-level SOC 2 compliance indicators and activity.</p>
            </div>

            {/* Metric Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="text-sm font-medium text-slate-500">Tenants monitored</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-slate-900">{stats.tenants_monitored}</span>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">+2 this week</Badge>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-sm font-medium text-slate-500">Passing controls</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-slate-900">{stats.passing_controls}%</span>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${stats.passing_controls}%` }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-sm font-medium text-slate-500">Open actions</div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-slate-900">{stats.open_actions}</span>
                            <span className="text-xs text-slate-400">Requires attention</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-sm font-medium text-slate-500">Last evidence export</div>
                        <div className="mt-2">
                            <span className="text-sm font-medium text-slate-900">
                                {new Date(stats.last_export).toLocaleDateString()}
                            </span>
                            <Button variant="link" className="h-auto p-0 ml-2 text-xs text-blue-600">View</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tenant Health & Risk Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">Tenant health</h2>
                        <Button variant="outline" size="sm">View all</Button>
                    </div>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Tenant</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Last Scan</th>
                                        <th className="px-6 py-3 font-medium">Open Issues</th>
                                        <th className="px-6 py-3 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tenants.map((tenant) => (
                                        <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{tenant.name}</div>
                                                <div className="text-xs text-slate-500">{tenant.domain}</div>
                                            </td>
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

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900">Risk snapshot</h2>
                    <Card className="h-full">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Fully compliant</span>
                                    <span className="font-medium text-slate-900">85%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Minor issues</span>
                                    <span className="font-medium text-slate-900">10%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Needs attention</span>
                                    <span className="font-medium text-slate-900">5%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500" style={{ width: '5%' }}></div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-medium text-slate-900 mb-3">Top risk areas</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        <span>Missing 2FA on 3 accounts</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        <span>Access review overdue (2 days)</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
