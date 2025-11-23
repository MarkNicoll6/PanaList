"use client";

import { useEffect, useState } from "react";
import { apiV3 as api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SEOSettingsPage() {
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/admin/seo/settings");
            setSettings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.post("/admin/seo/settings", settings);
            alert("Settings saved");
        } catch (err) {
            console.error(err);
            alert("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">SEO Settings</h1>
                <p className="text-sm text-slate-600 mt-1">Configure global SEO patterns and directives.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Global Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Site Title Pattern</Label>
                        <Input
                            value={settings.site_title_pattern || ""}
                            onChange={(e) => setSettings({ ...settings, site_title_pattern: e.target.value })}
                            placeholder="{{title}} | {{site_name}}"
                        />
                        <p className="text-xs text-slate-500">Variables: {"{{title}}, {{site_name}}, {{separator}}"}</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Meta Description Pattern</Label>
                        <Textarea
                            value={settings.meta_description_pattern || ""}
                            onChange={(e) => setSettings({ ...settings, meta_description_pattern: e.target.value })}
                            placeholder="{{excerpt}}"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Canonical Base URL</Label>
                        <Input
                            value={settings.canonical_base_url || ""}
                            onChange={(e) => setSettings({ ...settings, canonical_base_url: e.target.value })}
                            placeholder="https://example.com"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
