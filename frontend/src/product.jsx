import React from 'react';

function ProductList({ products }) {
  return (
    <div className="product-container">
      <div className="product-grid">
        {products.map((product) => {
          const discount = product.discountPercentage ? Math.round(product.discountPercentage) : null;
          const isInStock = product.stock > 0;
          const imageUrl = product.thumbnail || (product.images && product.images[0]) || '';

          return (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrap">
                {discount && <span className="discount-tag">-{discount}%</span>}
                <img 
                  src={imageUrl || 'https://placehold.co/400x400/1e293b/94a3b8?text=Product'} 
                  alt={product.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/1e293b/94a3b8?text=No+Image';
                  }}
                />
              </div>

              <div className="product-body">
                <div className="meta-row">
                  {product.category && <span className="badge category-badge">{product.category}</span>}
                  {product.brand && <span className="badge brand-badge">{product.brand}</span>}
                </div>

                <h2 className="product-title" title={product.title}>{product.title}</h2>

                <p className="product-description" title={product.description}>
                  {product.description}
                </p>

                <div className="product-stats">
                  <div className="price-box">
                    <span className="price-label">Price</span>
                    <span className="price">${Number(product.price).toFixed(2)}</span>
                  </div>

                  <div className="rating-box">
                    <span className="rating-label">Rating</span>
                    <span className="rating">★ {product.rating ? Number(product.rating).toFixed(1) : 'N/A'}</span>
                  </div>
                </div>

                <div className="product-footer-info">
                  <span className={`stock-status ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
                    <span className="status-dot"></span>
                    {isInStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>

                  {product.sku && (
                    <span className="sku-text" title={`SKU: ${product.sku}`}>
                      SKU: {product.sku}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;