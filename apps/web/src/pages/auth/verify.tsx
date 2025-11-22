import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/auth-context';

export default function VerifyPage() {
    const [_, setLocation] = useLocation();
    const { verify } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            verify(token).then(() => setLocation('/')).catch(console.error);
        }
    }, [verify, setLocation]);

    return <div className="flex items-center justify-center min-h-screen">Verifying...</div>;
}
