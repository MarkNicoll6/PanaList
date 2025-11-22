"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { verify } = useAuth();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        if (token) {
            verify(token);
            router.push('/');
        } else {
            setVerifying(false);
        }
    }, [token, verify, router]);

    if (!token) {
        return <div className="p-8 text-red-500">Invalid verification link.</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            {verifying ? 'Verifying...' : 'Redirecting...'}
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
