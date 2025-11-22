import { Route, Switch } from 'wouter';
import { AuthProvider } from '@/context/auth-context';
import LoginPage from '@/pages/auth/login';
import VerifyPage from '@/pages/auth/verify';
import AdminBillingPage from '@/pages/admin/billing';
import AdminAdsPage from '@/pages/admin/ads';
import AdminAnalyticsPage from '@/pages/admin/analytics';
import AdminPersonalisationPage from '@/pages/admin/personalisation';
import AdminMarketplacePage from '@/pages/admin/marketplace';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/verify" component={VerifyPage} />
          <Route path="/admin/billing" component={AdminBillingPage} />
          <Route path="/admin/ads" component={AdminAdsPage} />
          <Route path="/admin/analytics" component={AdminAnalyticsPage} />
          <Route path="/admin/personalisation" component={AdminPersonalisationPage} />
          <Route path="/admin/marketplace" component={AdminMarketplacePage} />
          <Route path="/">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p>Welcome to PanaDirectory</p>
              <div className="mt-4 space-x-4">
                <a href="/admin/billing" className="text-blue-600 hover:underline">Billing</a>
                <a href="/admin/ads" className="text-blue-600 hover:underline">Ads</a>
                <a href="/admin/analytics" className="text-blue-600 hover:underline">Analytics</a>
                <a href="/admin/personalisation" className="text-blue-600 hover:underline">Personalisation</a>
                <a href="/admin/marketplace" className="text-blue-600 hover:underline">Marketplace</a>
              </div>
            </div>
          </Route>
        </Switch>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
