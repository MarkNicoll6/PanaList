"use client";

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email);
            setSent(true);
        } catch (err) {
            console.error(err);
            alert('Failed to send magic link');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/20">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your email to receive a magic link.</CardDescription>
                </CardHeader>
                <CardContent>
                    {sent ? (
                        <div className="text-center text-green-600">
                            Check your email for the magic link!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full">
                                Send Magic Link
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
