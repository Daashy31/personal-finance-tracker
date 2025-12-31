import { useState } from 'react';
import api from '../api/axios';
import CenterLayout from '../components/CenterLayout';

const Register = ({ onSuccess, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <CenterLayout>
      <h2>Sign Up</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br /><br />

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

        <button type="submit">Create Account</button>
      </form>

      <p style={{ marginTop: 20 }}>
        <button onClick={onBack}>← Back</button>
      </p>
    </CenterLayout>
  );
};

export default Register;
