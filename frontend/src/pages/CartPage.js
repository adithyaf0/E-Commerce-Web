import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="cart-layout">
        <section className="cart-list">
          <div className="section-header">
            <h1>Your Cart</h1>
            <p>Review the items before checkout.</p>
          </div>
          {items.length === 0 ? (
            <div className="empty-state">
              <h2>Your cart is empty.</h2>
              <button className="button button-primary" onClick={() => navigate('/shop')}>
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
              />
            ))
          )}
        </section>
        {items.length > 0 && (
          <aside className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total-row">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button className="button button-primary" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
