import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <div>
          <h3>{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
        <div className="product-card-actions">
          <button className="button button-primary" onClick={() => addItem(product)}>
            Add to Cart
          </button>
          <Link className="button button-secondary" to={`/edit-product/${product.id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
