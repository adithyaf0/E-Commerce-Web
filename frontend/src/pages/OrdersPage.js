import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function OrdersPage() {
  const { user } = useAuth();

  const orders = useMemo(() => {
    if (!user) return [];
    const key = `orders_${user.email}`;
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  }, [user]);

  return (
    <div className="page-shell orders-page">
      <div className="section-header">
        <div>
          <p className="breadcrumbs">Home / Dashboard</p>
          <h1>My Orders</h1>
        </div>
        <Link to="/shop" className="link-button">
          Continue Shopping
        </Link>
      </div>
      <div className="orders-grid">
        {user ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <strong>{order.id}</strong>
                    <p>{order.date}</p>
                  </div>
                  <span className="order-status">{order.status}</span>
                </div>
                <div className="order-summary-list">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-summary-item">
                      <span>{item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <strong>${order.total.toFixed(2)}</strong>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h2>No orders yet.</h2>
              <p>Place your first order to see it here.</p>
            </div>
          )
        ) : (
          <div className="empty-state">
            <h2>Please log in to see your orders.</h2>
            <Link to="/login" className="button button-primary">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
