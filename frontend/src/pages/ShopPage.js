import { useMemo, useState } from 'react';
import { loadProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const products = useMemo(() => loadProducts(), []);
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((item) => item.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    const list = category === 'All' ? products : products.filter((product) => product.category === category);
    if (sortBy === 'price') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [category, sortBy, products]);

  return (
    <div className="page-shell">
      <div className="shop-header">
        <div>
          <p className="breadcrumbs">Home / Men’s Clothing</p>
          <h1>Men’s Clothing</h1>
        </div>
        <div className="shop-actions">
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Popular</option>
              <option value="price">Price</option>
            </select>
          </label>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="shop-filters">
          <div className="filter-card">
            <h3>Categories</h3>
            <div className="filter-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={item === category ? 'filter-button active' : 'filter-button'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-card">
            <h3>Filter by Price</h3>
            <p>From $20 to $100</p>
            <div className="price-bars">
              <span>$20</span>
              <span>$100</span>
            </div>
          </div>
          <div className="filter-card">
            <h3>Colors</h3>
            <div className="color-palette">
              <span className="color-dot black" />
              <span className="color-dot gray" />
              <span className="color-dot blue" />
              <span className="color-dot beige" />
            </div>
          </div>
        </aside>

        <section className="product-grid large-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
}
