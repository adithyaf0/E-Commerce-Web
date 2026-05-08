import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="topbar">
      <div className="brand" onClick={() => navigate('/')}>Shoply.</div>
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/manage-products">Manage Products</NavLink>
        <NavLink to="/add-product">Add Product</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <div className="top-actions">
        <button className="icon-button" onClick={() => navigate('/cart')}>
          Cart <span className="badge">{count}</span>
        </button>
        {user ? (
          <>
            <span className="user-badge">Hi, {user.name.split(' ')[0]}</span>
            <button className="logout-button" onClick={() => logout()}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
