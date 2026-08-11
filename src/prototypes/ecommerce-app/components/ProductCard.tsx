import React from 'react';
import { useApp, Product } from '../data';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="ec-product-card" onClick={onClick}>
      <div className="ec-product-img" style={{ background: product.bgGradient }}>
        {product.emoji}
      </div>
      <div className="ec-product-info">
        <div className="ec-product-title">{product.title}</div>
        <div className="ec-flex ec-flex-between" style={{ alignItems: 'flex-end' }}>
          <div>
            <span className="ec-product-price">
              <span className="ec-product-price-symbol">¥</span>
              {product.price}
            </span>
            <span className="ec-product-price-original">¥{product.originalPrice}</span>
          </div>
        </div>
        <div className="ec-product-sales">已售{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales}件</div>
        {product.tags.length > 0 && (
          <div className="ec-product-tags">
            {product.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className={`ec-tag ${i === 0 ? 'ec-tag--primary' : 'ec-tag--price'}`}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductGrid: React.FC<{ products: Product[]; onProductClick?: (id: string) => void }> = ({ products, onProductClick }) => {
  return (
    <div className="ec-product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick?.(product.id)} />
      ))}
    </div>
  );
};
