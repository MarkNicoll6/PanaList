"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function RBACPage() {
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get("/compliance/rbac");
                setRoles(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRoles();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Roles & access</h1>
                <p className="text-sm text-slate-600 mt-1">Role-permission matrix and access review.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold">Role Matrix</CardTitle>
                            <Button size="sm">Add Role</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Role</th>
                                            <th className="px-6 py-3 font-medium">Description</th>
                                            <th className="px-6 py-3 font-medium">Type</th>
                                            <th className="px-6 py-3 font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {roles.map((role) => (
                                            <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{role.name}</td>
                                                <td className="px-6 py-4 text-slate-600">{role.description}</td>
                                                <td className="px-6 py-4">
                                                    {role.is_system ? (
                                                        <Badge variant="secondary">System</Badge>
                                                    ) : (
                                                        <Badge variant="outline">Custom</Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {roles.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                                    No roles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Access Review</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-medium text-amber-900">Review Overdue</h4>
                                    <p className="text-xs text-amber-700 mt-1">Last review was 95 days ago. SOC 2 requires quarterly reviews.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Elevated accounts</span>
                                    <span className="font-medium text-slate-900">4</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Accounts without 2FA</span>
                                    <span className="font-medium text-slate-900 text-rose-600">3</span>
                                </div>
                            </div>

                            <Button className="w-full">Start Access Review</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
