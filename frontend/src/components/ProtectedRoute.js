import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  if (authLoading) {
    return <div className="page-shell">Loading account information...</div>;
  }
  return user ? children : <Navigate to="/login" replace />;
}
