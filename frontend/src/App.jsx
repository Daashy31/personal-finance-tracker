import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );
  const [page, setPage] = useState('dashboard');
  
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <nav style={{ padding: 10 }}>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('budgets')}>Budgets</button>
      </nav>

      {page === 'dashboard' && <Dashboard />}
      {page === 'budgets' && <Budgets />}
    </>
  );
}

export default App;
