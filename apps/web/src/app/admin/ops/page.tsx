"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Play } from "lucide-react";

interface Finding {
    id: string;
    type: string;
    entity: string;
    severity: string;
    details_json: {
        url?: string;
        suggestion?: string;
    };
    status: string;
    created_at: string;
}

export default function OpsCentrePage() {
    const [findings, setFindings] = useState<Finding[]>([]);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        fetchFindings();
    }, []);

    const fetchFindings = async () => {
        try {
            const res = await api.get("/ops/findings");
            setFindings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleScan = async () => {
        setScanning(true);
        try {
            await api.post("/ops/scan");
            fetchFindings();
        } catch (err) {
            console.error(err);
            alert("Scan failed");
        } finally {
            setScanning(false);
        }
    };

    const handleFix = async (id: string) => {
        try {
            await api.post("/ops/apply-fix", { finding_id: id });
            fetchFindings();
        } catch (err) {
            console.error(err);
            alert("Fix failed");
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ops Centre</h1>
                    <p className="text-muted-foreground">
                        AI-powered content health monitoring and automated fixes.
                    </p>
                </div>
                <Button onClick={handleScan} disabled={scanning}>
                    <Play className={`mr-2 h-4 w-4 ${scanning ? "animate-spin" : ""}`} />
                    {scanning ? "Scanning..." : "Run AI Scan"}
                </Button>
            </div>

            <div className="grid gap-4">
                {findings.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <CheckCircle className="h-8 w-8 mb-2 text-green-500" />
                            <p>All systems operational. No issues found.</p>
                        </CardContent>
                    </Card>
                ) : (
                    findings.map((finding) => (
                        <Card key={finding.id} className="border-l-4 border-l-red-500">
                            <CardHeader className="flex flex-row items-start justify-between pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-medium flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                        {finding.type.replace("_", " ").toUpperCase()}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {finding.details_json.suggestion}
                                    </p>
                                </div>
                                <Badge variant={finding.severity === "high" ? "destructive" : "secondary"}>
                                    {finding.severity}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                        {finding.details_json.url || "N/A"}
                                    </div>
                                    <Button size="sm" onClick={() => handleFix(finding.id)}>
                                        Fix Issue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
