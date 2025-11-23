"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radar, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function ConfigScannerPage() {
    const [issues, setIssues] = useState<any[]>([]);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const res = await api.get("/compliance/config");
            setIssues(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const runScan = async () => {
        setScanning(true);
        try {
            await api.post("/compliance/run-scan");
            // Mock wait
            setTimeout(() => {
                setScanning(false);
                fetchIssues(); // Refresh
                alert("Scan completed");
            }, 2000);
        } catch (err) {
            console.error(err);
            setScanning(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Config scanner</h1>
                    <p className="text-sm text-slate-600 mt-1">Tenant configuration integrity checks.</p>
                </div>
                <Button onClick={runScan} disabled={scanning}>
                    {scanning ? "Scanning..." : "Run Full Scan"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-slate-900">12</div>
                            <div className="text-xs text-slate-500">Domains Secure</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-slate-900">3</div>
                            <div className="text-xs text-slate-500">API Key Warnings</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                            <XCircle className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-slate-900">1</div>
                            <div className="text-xs text-slate-500">Critical Issues</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Detected Issues</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Severity</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Description</th>
                                <th className="px-6 py-3 font-medium">Detected</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {issues.map((issue) => (
                                <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {issue.severity === 'critical' && <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-0">Critical</Badge>}
                                        {issue.severity === 'high' && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">High</Badge>}
                                        {issue.severity === 'medium' && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Medium</Badge>}
                                        {issue.severity === 'low' && <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">Low</Badge>}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 capitalize">{issue.category}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{issue.description}</td>
                                    <td className="px-6 py-4 text-slate-600">{new Date(issue.detected_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-slate-600 capitalize">{issue.status}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="outline" size="sm">Fix</Button>
                                    </td>
                                </tr>
                            ))}
                            {issues.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No issues detected.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
