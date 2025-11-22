"use client";

import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminBillingPage() {
    const handleSubscribe = async (priceId: string) => {
        try {
            const res = await api.post('/billing/checkout', { price_id: priceId });
            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
            alert('Failed to start checkout');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Billing & Plans</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For hobbyists</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" disabled>Current Plan</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For serious creators</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleSubscribe('price_pro_mock')}>Upgrade to Pro</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Business</CardTitle>
                        <CardDescription>For agencies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">$99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline">Contact Sales</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
