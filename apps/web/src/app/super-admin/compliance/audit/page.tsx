"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get("/compliance/audit");
                setLogs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Audit logs</h1>
                    <p className="text-sm text-slate-600 mt-1">Full global audit explorer.</p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>

            <Card>
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search logs..." className="pl-9" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4 text-slate-500" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Time</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                                <th className="px-6 py-3 font-medium">Resource</th>
                                <th className="px-6 py-3 font-medium">Actor</th>
                                <th className="px-6 py-3 font-medium">Tenant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                                        {new Date(log.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {log.resource}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">U</div>
                                            <span>User {log.actor_id?.substring(0, 4)}...</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <Badge variant="outline">Acme Corp</Badge>
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
