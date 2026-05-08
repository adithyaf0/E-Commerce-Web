import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadProducts } from '../data/products';
import useCart from '../hooks/useCart';

export default function ProductPage() {
  const { productId } = useParams();
  const products = useMemo(() => loadProducts(), []);
  const product = useMemo(() => products.find((item) => item.id === productId), [products, productId]);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="page-shell">
        <h2>Product not found</h2>
        <button className="button button-secondary" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="page-shell product-detail-page">
      <div className="detail-panel">
        <img src={product.image} alt={product.name} />
        <div className="detail-copy">
          <p className="breadcrumbs">Home / Men’s Clothing / {product.name}</p>
          <h1>{product.name}</h1>
          <p className="product-rating">4.5 ★ (92 reviews)</p>
          <p className="product-price-large">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <div className="product-meta">
            <div>
              <strong>Color:</strong> {product.color}
            </div>
            <div>
              <strong>Size:</strong>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button key={size} type="button">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="quantity-input">
              <strong>Quantity:</strong>
              <div>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>
          <div className="action-group">
            <button
              className="button button-primary"
              onClick={() => {
                addItem(product, quantity);
                navigate('/cart');
              }}
            >
              Add to Cart
            </button>
            <button className="button button-secondary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
          <div className="feature-list">
            <div>
              <strong>Free Shipping</strong>
              <p>On orders over $50</p>
            </div>
            <div>
              <strong>Easy Returns</strong>
              <p>30 days return policy</p>
            </div>
            <div>
              <strong>Secure Payment</strong>
              <p>100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
