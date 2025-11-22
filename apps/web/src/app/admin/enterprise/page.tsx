"use client";

import { useState, useEffect } from "react";
import { apiV3 as api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, Copy } from "lucide-react";

export default function EnterprisePage() {
    const [ssoConfig, setSSOConfig] = useState({
        type: "saml",
        domain: "",
        metadata_url: "",
        client_id: "",
        client_secret: "",
        enabled: false
    });
    const [scimConfig, setSCIMConfig] = useState({ token: "", enabled: false });
    const [auditLogs, setAuditLogs] = useState<any[]>([]);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const [ssoRes, scimRes, auditRes] = await Promise.all([
                api.get("/enterprise/sso"),
                api.get("/enterprise/scim"),
                api.get("/enterprise/audit")
            ]);
            if (ssoRes.data) setSSOConfig(prev => ({ ...prev, ...ssoRes.data }));
            if (scimRes.data) setSCIMConfig(scimRes.data);
            setAuditLogs(auditRes.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const saveSSO = async () => {
        try {
            await api.post("/enterprise/sso", ssoConfig);
            alert("SSO Configuration Saved");
        } catch (err) {
            console.error(err);
            alert("Failed to save SSO");
        }
    };

    const generateSCIM = async () => {
        try {
            const res = await api.post("/enterprise/scim");
            setSCIMConfig(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to generate SCIM token");
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Enterprise Settings</h1>
                    <p className="text-muted-foreground">
                        Manage SSO, SCIM provisioning, and audit logs.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="sso" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="sso">Single Sign-On</TabsTrigger>
                    <TabsTrigger value="scim">SCIM Provisioning</TabsTrigger>
                    <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="sso">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" /> SAML / OIDC Configuration
                            </CardTitle>
                            <CardDescription>
                                Configure your Identity Provider (IdP) for employee access.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={ssoConfig.enabled}
                                    onCheckedChange={c => setSSOConfig({ ...ssoConfig, enabled: c })}
                                />
                                <span>Enable SSO</span>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Domain</label>
                                <Input
                                    placeholder="acme.com"
                                    value={ssoConfig.domain}
                                    onChange={e => setSSOConfig({ ...ssoConfig, domain: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Metadata URL (SAML)</label>
                                <Input
                                    placeholder="https://idp.example.com/metadata"
                                    value={ssoConfig.metadata_url}
                                    onChange={e => setSSOConfig({ ...ssoConfig, metadata_url: e.target.value })}
                                />
                            </div>
                            <Button onClick={saveSSO}>Save Configuration</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="scim">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" /> SCIM Provisioning
                            </CardTitle>
                            <CardDescription>
                                Automatically provision and deprovision users from your IdP.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!scimConfig.enabled ? (
                                <Button onClick={generateSCIM}>Generate SCIM Token</Button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-muted rounded-md break-all font-mono text-sm">
                                        {scimConfig.token}
                                    </div>
                                    <Button variant="outline" onClick={generateSCIM}>
                                        Regenerate Token
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="audit">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" /> Audit Logs
                            </CardTitle>
                            <CardDescription>
                                Track administrative actions within your organization.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {auditLogs.map(log => (
                                    <div key={log.id} className="flex justify-between items-start border-b pb-4 last:border-0">
                                        <div>
                                            <p className="font-medium">{log.action}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Resource: {log.resource}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline">{new Date(log.created_at).toLocaleDateString()}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {new Date(log.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
