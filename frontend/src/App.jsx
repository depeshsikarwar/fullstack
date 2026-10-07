import React, { useState, useEffect } from 'react';
import ProductList from './product';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://fullstack-i75u.onrender.com/api/products");
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to connect to https://fullstack-i75u.onrender.com/api/products. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Products Data</h1>
        <p className="subtitle">
          {loading ? 'Fetching products...' : `${products.length} Products Loaded`}
        </p>
      </header>

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProducts}>
            Retry
          </button>
        </div>
      )}

      {loading && !error && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <p>No products available to display.</p>
        </div>
      )}
    </div>
  );
}

export default App;
