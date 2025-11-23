import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, RefreshCw } from "lucide-react";

export default function DevelopersPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Developers</h1>
                    <p className="text-sm text-slate-600 mt-1">Manage API keys and webhooks for your integrations.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create API Key
                </Button>
            </div>

            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>Active keys for accessing the PanaList API.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Prefix</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Production Key</TableCell>
                                    <TableCell className="font-mono text-xs">pk_live_...</TableCell>
                                    <TableCell>Oct 24, 2024</TableCell>
                                    <TableCell>Just now</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Revoke</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Test Key</TableCell>
                                    <TableCell className="font-mono text-xs">pk_test_...</TableCell>
                                    <TableCell>Oct 24, 2024</TableCell>
                                    <TableCell>2 days ago</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Revoke</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Webhooks</CardTitle>
                                <CardDescription>Listen for events on your directory.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Endpoint
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <RefreshCw className="h-6 w-6 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No webhooks configured</h3>
                            <p className="text-sm text-slate-500 max-w-sm">
                                Receive real-time updates when listings are created, updated, or deleted.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
