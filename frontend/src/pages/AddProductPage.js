import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, saveProduct } from '../data/products';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function AddProductPage() {
  const { productId } = useParams();
  const existingProduct = useMemo(() => (productId ? getProductById(productId) : null), [productId]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    color: '',
    image: '',
    sizes: '',
    description: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  useEffect(() => {
    if (isEditing) {
      if (!existingProduct) {
        setError('Product not found.');
        return;
      }
      setForm({
        name: existingProduct.name,
        category: existingProduct.category,
        price: existingProduct.price.toString(),
        color: existingProduct.color,
        image: existingProduct.image,
        sizes: existingProduct.sizes.join(', '),
        description: existingProduct.description,
      });
    }
  }, [existingProduct, isEditing]);

  if (isEditing && !existingProduct) {
    return (
      <div className="page-shell auth-page">
        <div className="auth-card">
          <div className="auth-copy">
            <h1>Product not found</h1>
            <p>The product you are trying to edit does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const sizes = form.sizes.split(',').map((size) => size.trim()).filter(Boolean);
    if (!form.name || !form.category || !form.price || !form.color || !sizes.length || !form.description) {
      setError('Please complete all fields and provide at least one size.');
      return;
    }

    const price = parseFloat(form.price);
    if (Number.isNaN(price) || price <= 0) {
      setError('Price must be a valid number greater than zero.');
      return;
    }

    const product = {
      id: isEditing ? productId : `${slugify(form.name)}-${Date.now()}`,
      name: form.name,
      category: form.category,
      price,
      color: form.color,
      sizes,
      image: form.image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80',
      description: form.description,
    };

    saveProduct(product);

    if (isEditing) {
      alert('Product updated successfully.');
    } else {
      alert('Product added successfully.');
    }
    navigate('/shop');
  };

  return (
    <div className="page-shell auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          <p>{isEditing ? 'Update the product details and save your changes.' : 'Create a new item and make it available immediately in the shop catalog.'}</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input type="text" value={form.name} onChange={handleChange('name')} required />
          </label>
          <label>
            Category
            <input type="text" value={form.category} onChange={handleChange('category')} required />
          </label>
          <label>
            Price
            <input type="number" step="0.01" value={form.price} onChange={handleChange('price')} required />
          </label>
          <label>
            Color
            <input type="text" value={form.color} onChange={handleChange('color')} required />
          </label>
          <label>
            Image URL
            <input type="url" value={form.image} onChange={handleChange('image')} placeholder="Optional image URL" />
          </label>
          <label>
            Sizes (comma separated)
            <input type="text" value={form.sizes} onChange={handleChange('sizes')} placeholder="S, M, L" required />
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={handleChange('description')} rows={5} required />
          </label>
          {error && <div className="alert alert-error">{error}</div>}
          <button className="button button-primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
