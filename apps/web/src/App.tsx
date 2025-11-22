import { Route, Switch } from 'wouter';
import { AuthProvider } from '@/context/auth-context';
import LoginPage from '@/pages/auth/login';
import VerifyPage from '@/pages/auth/verify';

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/verify" component={VerifyPage} />
        <Route path="/">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to PanaDirectory</p>
          </div>
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
