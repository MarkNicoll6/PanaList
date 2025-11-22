import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminPersonalisationPage() {
    const [rules] = useState([
        { id: 1, name: 'Local Visitors', condition: 'Location is UK', action: 'Show UK Hero' },
        { id: 2, name: 'Mobile Users', condition: 'Device is Mobile', action: 'Show App Banner' },
    ]);

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Personalisation Rules</h1>
                <Button>Create New Rule</Button>
            </div>

            <div className="grid gap-4">
                {rules.map((rule) => (
                    <Card key={rule.id}>
                        <CardHeader>
                            <CardTitle>{rule.name}</CardTitle>
                            <CardDescription>{rule.condition} → {rule.action}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rule Builder Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Condition</label>
                            <Input placeholder="e.g. Location is London" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Action</label>
                            <Input placeholder="e.g. Boost 'Coffee' category" />
                        </div>
                    </div>
                    <Button disabled>Save Rule (Demo)</Button>
                </CardContent>
            </Card>
        </div>
    );
}
