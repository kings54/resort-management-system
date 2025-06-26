// App.jsx or index.jsx
import React, { useState } from 'react';
import './Authform.css';
import './RestaurantHome.css';
import AppRoutes from './Routes';
// NOTE: './RestaurantHome.jsx' shouldn't be imported like a CSS file

function App() {
  return <AppRoutes />;
}

export default App;

// Move this to a new file if needed: Authform.jsx
export function Authform() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password match validation only for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(isLogin ? 'Logging in' : 'Signing up', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? 'Welcome to quickbites' : 'Create account'}</h2>
        <p className="auth-subtitle">{isLogin ? 'Log in to continue' : 'Get started with us today'}</p>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <button type="submit" className="auth-button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-footer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
