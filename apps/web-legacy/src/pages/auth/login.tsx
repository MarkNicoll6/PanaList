import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email);
        setSent(true);
    };

    if (sent) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Check your email</CardTitle>
                        <CardDescription>We sent a magic link to {email}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Enter your email to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">Sign in with Email</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
