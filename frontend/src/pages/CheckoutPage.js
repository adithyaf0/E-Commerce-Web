import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.fullName || !form.address || !form.city || !form.zip) {
      alert('Please complete your shipping information.');
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items,
      total,
      shipping: {
        fullName: form.fullName,
        address: form.address,
        city: form.city,
        zip: form.zip,
      },
      paymentMethod: 'Credit Card',
      status: 'Processing',
    };

    const key = `orders_${user?.email || 'guest'}`;
    const previous = JSON.parse(window.localStorage.getItem(key) || '[]');
    window.localStorage.setItem(key, JSON.stringify([order, ...previous]));
    clearCart();
    alert('Your order has been placed successfully.');
    navigate('/order-confirmation', { state: { order } });
  };

  return (
    <div className="page-shell checkout-page">
      <div className="checkout-grid">
        <section className="checkout-form-card">
          <h1>Shipping Information</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input value={form.fullName} onChange={handleChange('fullName')} />
            </label>
            <label>
              Email Address
              <input value={form.email} onChange={handleChange('email')} />
            </label>
            <label>
              Street Address
              <input value={form.address} onChange={handleChange('address')} />
            </label>
            <div className="two-column">
              <label>
                City
                <input value={form.city} onChange={handleChange('city')} />
              </label>
              <label>
                ZIP Code
                <input value={form.zip} onChange={handleChange('zip')} />
              </label>
            </div>
            <h2>Payment Method</h2>
            <label>
              Card Number
              <input value={form.cardNumber} onChange={handleChange('cardNumber')} />
            </label>
            <div className="two-column">
              <label>
                Expiry
                <input value={form.expiry} onChange={handleChange('expiry')} />
              </label>
              <label>
                CVV
                <input value={form.cvv} onChange={handleChange('cvv')} />
              </label>
            </div>
            <button className="button button-primary" type="submit">
              Place Order
            </button>
          </form>
        </section>
        <aside className="checkout-summary-card">
          <h2>Order Summary</h2>
          <div className="order-summary-list">
            {items.map((item) => (
              <div key={item.id} className="order-summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p className="summary-note">Free shipping on all orders over $50.</p>
        </aside>
      </div>
    </div>
  );
}
