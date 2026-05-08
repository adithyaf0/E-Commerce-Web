import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      alert(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="page-shell auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <h1>Create Account</h1>
          <p>Register now to start shopping with fast checkout and order tracking.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>
          {error && <div className="alert alert-error">{error}</div>}
          <button className="button button-primary" type="submit">
            Register
          </button>
          <div className="auth-help">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
