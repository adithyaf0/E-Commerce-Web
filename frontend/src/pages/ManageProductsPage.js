import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, isCustomProduct, isDefaultProduct, loadProducts } from '../data/products';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);

  const refreshProducts = () => setProducts(loadProducts());

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleDelete = (productId) => {
    deleteProduct(productId);
    refreshProducts();
    alert('Product saved changes successfully.');
  };

  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <p className="breadcrumbs">Home / Manage Products</p>
          <h1>Manage Products</h1>
        </div>
        <Link to="/add-product" className="button button-primary">
          Add New Product
        </Link>
      </div>

      <div className="manage-card">
        <table className="manage-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const custom = isCustomProduct(product.id);
              const isDefault = isDefaultProduct(product.id);
              const canDelete = custom;
              return (
                <tr key={product.id}>
                  <td className="product-cell">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.description}</p>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{isDefault ? (custom ? 'Override' : 'Default') : 'Custom'}</td>
                  <td className="manage-actions">
                    <Link className="button button-secondary" to={`/edit-product/${product.id}`}>
                      Edit
                    </Link>
                    {canDelete ? (
                      <button
                        className="button button-danger"
                        type="button"
                        onClick={() => handleDelete(product.id)}
                      >
                        {isDefault ? 'Reset' : 'Delete'}
                      </button>
                    ) : (
                      <button className="button button-secondary disabled" type="button" disabled>
                        Locked
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
