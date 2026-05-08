import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="page-shell">
        <div className="confirmation-card">
          <h1>Order not found</h1>
          <p>We could not locate your order details.</p>
          <Link to="/shop" className="button button-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell confirmation-page">
      <div className="confirmation-card">
        <span className="success-badge">Thank You!</span>
        <h1>Your order has been placed successfully.</h1>
        <p>We have sent an order confirmation email to your address.</p>
        <div className="order-details-card">
          <div>
            <strong>Order Number</strong>
            <p>{order.id}</p>
          </div>
          <div>
            <strong>Date</strong>
            <p>{order.date}</p>
          </div>
          <div>
            <strong>Total Amount</strong>
            <p>${order.total.toFixed(2)}</p>
          </div>
          <div>
            <strong>Payment Method</strong>
            <p>{order.paymentMethod}</p>
          </div>
        </div>
        <Link to="/" className="button button-primary">
          Continue Shopping
        </Link>
        <Link to="/orders" className="link-button">
          View Your Orders
        </Link>
      </div>
    </div>
  );
}
