const DEFAULT_PRODUCTS = [
  {
    id: 'denim-jacket',
    name: 'Denim Jacket',
    category: 'Jackets',
    price: 59.99,
    color: 'Blue',
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=700&q=80',
    description:
      'A classic denim jacket that never goes out of style. Perfect for every season and every occasion.',
  },
  {
    id: 'white-tshirt',
    name: 'Classic White T-Shirt',
    category: 'T-Shirts',
    price: 29.99,
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1520975918136-6c2e8ac45d01?auto=format&fit=crop&w=700&q=80',
    description: 'A perfect everyday tee in crisp white, comfortable and breathable.',
  },
  {
    id: 'casual-shirt',
    name: 'Casual Shirt',
    category: 'Shirts',
    price: 34.99,
    color: 'Gray',
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80',
    description: 'Lightweight casual shirt crafted for city outings and relaxed styling.',
  },
  {
    id: 'chino-pants',
    name: 'Chino Pants',
    category: 'Pants',
    price: 44.99,
    color: 'Beige',
    sizes: ['30', '32', '34', '36'],
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=701&q=80',
    description: 'Tailored chino pants that pair well with casual and semi-formal outfits.',
  },
  {
    id: 'casual-sneakers',
    name: 'Casual Sneakers',
    category: 'Shoes',
    price: 69.99,
    color: 'White',
    sizes: ['8', '9', '10', '11'],
    image:
      'https://images.unsplash.com/photo-1528701800489-20fc56d1366d?auto=format&fit=crop&w=700&q=80',
    description: 'Clean white sneakers designed for everyday comfort and style.',
  },
  {
    id: 'black-hoodie',
    name: 'Black Hoodie',
    category: 'Hoodies',
    price: 49.99,
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=702&q=80',
    description: 'Cozy hoodie perfect for layering in cooler weather or lounging at home.',
  },
];

const STORAGE_KEY = 'shoply_custom_products';

function getStoredProducts() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveStoredProducts(products) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function loadProducts() {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const stored = getStoredProducts();

  const baseMap = DEFAULT_PRODUCTS.map((item) => {
    const override = stored.find((custom) => custom.id === item.id);
    return override || item;
  });

  const extraProducts = stored.filter((custom) => !DEFAULT_PRODUCTS.some((item) => item.id === custom.id));
  return [...baseMap, ...extraProducts];
}

export function getProductById(id) {
  if (typeof window === 'undefined') return null;
  return loadProducts().find((product) => product.id === id) || null;
}

export function saveProduct(product) {
  const current = getStoredProducts();
  const next = current.filter((entry) => entry.id !== product.id);
  next.push(product);
  saveStoredProducts(next);
}

export function deleteProduct(id) {
  const current = getStoredProducts().filter((entry) => entry.id !== id);
  saveStoredProducts(current);
}

export function isCustomProduct(id) {
  return getStoredProducts().some((entry) => entry.id === id);
}

export function isDefaultProduct(id) {
  return DEFAULT_PRODUCTS.some((item) => item.id === id);
}

export default DEFAULT_PRODUCTS;
