import { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('landing');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setPage('app');
    }
  }, []);

  return (
    <>
      <ThemeToggle />

      {!isAuthenticated && page === 'landing' && (
        <Landing
          onSignIn={() => setPage('login')}
          onSignUp={() => setPage('register')}
        />
      )}

      {!isAuthenticated && page === 'login' && (
        <Login
          onLogin={() => {
            setIsAuthenticated(true);
            setPage('app');
          }}
          onBack={() => setPage('landing')}
        />
      )}

      {!isAuthenticated && page === 'register' && (
        <Register
          onSuccess={() => setPage('login')}
          onBack={() => setPage('landing')}
        />
      )}

      {isAuthenticated && page === 'app' && (
        <>
          <Dashboard />
          <Budgets />
        </>
      )}
    </>
  );
}

export default App;
