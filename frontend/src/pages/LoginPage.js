import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      alert('Successfully login');
      navigate('/');
    } catch (err) {
      setError(err.message);
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="page-shell auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue. Fast checkout and track your orders.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <div className="alert alert-error">{error}</div>}
          <button className="button button-primary" type="submit">
            Login
          </button>
          <div className="auth-help">
            <p>
              Don’t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
          <div className="social-login">
            <button type="button" className="button button-secondary">
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
