import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );

  return loggedIn
    ? <Dashboard />
    : <Login onLogin={() => setLoggedIn(true)} />;
}

export default App;
