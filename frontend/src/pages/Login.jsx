import { useState } from 'react';
import api from '../api/axios';
import CenterLayout from '../components/CenterLayout';

const Login = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password, });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <CenterLayout>
      <h2>Sign In</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 20 }}>
        <button onClick={onBack}>← Back</button>
      </p>
    </CenterLayout>
  );
};

export default Login;
