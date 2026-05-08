import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const products = useMemo(() => loadProducts(), []);

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">New Collection</span>
          <h1>Discover Style & Comfort</h1>
          <p>Explore the latest trends in fashion. Shop your favorite looks now.</p>
          <div className="hero-actions">
            <Link to="/shop" className="button button-primary">
              Shop Now
            </Link>
            <Link to="/orders" className="button button-secondary">
              My Orders
            </Link>
          </div>
        </div>
        <div className="hero-image-box">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
            alt="Shoply fashion"
          />
        </div>
      </section>

      <section className="category-grid">
        <div className="category-card">
          <h3>Men</h3>
          <p>Clean essentials and standout outerwear.</p>
        </div>
        <div className="category-card">
          <h3>Women</h3>
          <p>Everyday looks designed for comfort.</p>
        </div>
        <div className="category-card">
          <h3>Shoes</h3>
          <p>Fresh sneakers, boots, and casual styles.</p>
        </div>
        <div className="category-card">
          <h3>Accessories</h3>
          <p>Perfect finishing touches for every outfit.</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Best picks for you.</p>
          </div>
          <Link to="/shop" className="link-button">
            View All
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
