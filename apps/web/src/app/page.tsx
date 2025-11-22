"use client";

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20">
        <h1 className="text-4xl font-bold mb-4">PanaDirectory</h1>
        <p className="text-muted-foreground mb-8">The Notion-inspired directory builder.</p>
        <Link href="/auth/login" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
          Login to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/billing" className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Billing</h2>
          <p className="text-muted-foreground">Manage subscriptions and plans.</p>
        </Link>
        <Link href="/admin/ads" className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Ads</h2>
          <p className="text-muted-foreground">Configure ad zones and creatives.</p>
        </Link>
        <Link href="/admin/analytics" className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-muted-foreground">View traffic and insights.</p>
        </Link>
        <Link href="/admin/personalisation" className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Personalisation</h2>
          <p className="text-muted-foreground">Manage rules and recommendations.</p>
        </Link>
        <Link href="/admin/marketplace" className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Marketplace</h2>
          <p className="text-muted-foreground">Install themes and blocks.</p>
        </Link>
      </div>
    </div>
  );
}
