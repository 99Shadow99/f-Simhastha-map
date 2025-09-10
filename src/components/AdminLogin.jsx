import { useState, useEffect } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, secret })
      });
      const data = await res.json();
      if (res.ok) {
        setError('✅ Admin registered! You can now log in.');
        setIsRegister(false);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={isRegister ? handleRegister : handleLogin} style={{ maxWidth: 300, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{isRegister ? 'Admin Registration' : 'Admin Login'}</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" style={{ width: '100%', marginBottom: 10 }} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', marginBottom: 10 }} />
      {isRegister && (
        <input value={secret} onChange={e => setSecret(e.target.value)} placeholder="Admin Secret" style={{ width: '100%', marginBottom: 10 }} />
      )}
      <button type="submit" style={{ width: '100%' }}>{isRegister ? 'Register' : 'Login'}</button>
      <button type="button" style={{ width: '100%', marginTop: 8 }} onClick={() => { setIsRegister(!isRegister); setError(''); }}>
        {isRegister ? 'Back to Login' : 'Register as Admin'}
      </button>
      {error && <div style={{ color: error.startsWith('✅') ? 'green' : 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
}
