import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:4000/login', { username, password });
      onLogin(true);
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
