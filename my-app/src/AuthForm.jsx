import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMsg(isLogin ? 'Logged in successfully!' : 'Account created!');
    setTimeout(() => {
      setMsg('');
      navigate('/');
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className="auth-toggle">
          {isLogin ? (
            <>
              <span>Don't have an account?</span>
              <button onClick={() => setIsLogin(false)}>Sign Up</button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button onClick={() => setIsLogin(true)}>Login</button>
            </>
          )}
        </div>
        {msg && <div className="auth-msg">{msg}</div>}
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    </div>
  );
}

export default AuthForm;
