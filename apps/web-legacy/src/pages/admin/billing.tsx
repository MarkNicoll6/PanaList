import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function AdminBillingPage() {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const res = await api.post('/billing/checkout');
            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
            alert('Failed to start checkout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Billing & Plans</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For getting started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">$0/mo</div>
                        <Button disabled className="w-full">Current Plan</Button>
                    </CardContent>
                </Card>

                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For growing directories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">$29/mo</div>
                        <Button onClick={handleSubscribe} disabled={loading} className="w-full">
                            {loading ? 'Processing...' : 'Upgrade to Pro'}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Business</CardTitle>
                        <CardDescription>For large scale</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">$99/mo</div>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
