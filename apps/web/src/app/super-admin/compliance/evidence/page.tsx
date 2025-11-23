"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, Download, FileText } from "lucide-react";

export default function EvidencePage() {
    const [exports, setExports] = useState<any[]>([]);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchExports();
    }, []);

    const fetchExports = async () => {
        try {
            const res = await api.get("/compliance/evidence");
            setExports(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const generateExport = async (template: string) => {
        setGenerating(true);
        try {
            await api.post("/compliance/evidence", { template, format: "pdf" });
            // Mock wait
            setTimeout(() => {
                setGenerating(false);
                fetchExports(); // Refresh
                alert("Export generated");
            }, 2000);
        } catch (err) {
            console.error(err);
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Evidence exports</h1>
                <p className="text-sm text-slate-600 mt-1">Generate SOC 2 evidence bundles.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Available Templates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900">Full SOC 2 Type II Bundle</div>
                                        <div className="text-xs text-slate-500">Includes all controls, policies, and audit logs.</div>
                                    </div>
                                </div>
                                <Button onClick={() => generateExport("soc2_type2")} disabled={generating}>
                                    Generate
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900">Access Review Report</div>
                                        <div className="text-xs text-slate-500">User roles, permissions, and login activity.</div>
                                    </div>
                                </div>
                                <Button onClick={() => generateExport("access_review")} disabled={generating}>
                                    Generate
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900">Config Integrity Report</div>
                                        <div className="text-xs text-slate-500">Scan results for all tenants.</div>
                                    </div>
                                </div>
                                <Button onClick={() => generateExport("config_integrity")} disabled={generating}>
                                    Generate
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Export History</CardTitle>
                        </CardHeader>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium">Template</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {exports.map((exp) => (
                                        <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-slate-600">
                                                {new Date(exp.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-900 capitalize">
                                                {exp.template.replace(/_/g, " ")}
                                            </td>
                                            <td className="px-6 py-4">
                                                {exp.status === 'completed' && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Ready</Badge>}
                                                {exp.status === 'generating' && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">Generating</Badge>}
                                                {exp.status === 'failed' && <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-100">Failed</Badge>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {exp.status === 'completed' && (
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="h-4 w-4 mr-2" /> Download
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {exports.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                                No exports found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="bg-slate-900 text-white border-slate-800">
                        <CardContent className="p-6 space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <Archive className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold">Evidence Bundle</h3>
                            <p className="text-sm text-slate-400">
                                Generated bundles are encrypted and stored for 7 years.
                                Access is logged in the audit trail.
                            </p>
                            <div className="pt-4">
                                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Includes</div>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">✓ Policy documents</li>
                                    <li className="flex items-center gap-2">✓ Access logs</li>
                                    <li className="flex items-center gap-2">✓ Config snapshots</li>
                                    <li className="flex items-center gap-2">✓ Incident reports</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
