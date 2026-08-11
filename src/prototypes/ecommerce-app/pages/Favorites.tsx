import React from 'react';
import { useApp, setSelectedProduct } from '../data';
import { PageHeader } from '../components/PageHeader';
import { ProductGrid } from '../components/ProductCard';

const Favorites: React.FC = () => {
  const { navigate, getProduct, favorites } = useApp();

  const favoriteProducts = favorites
    .map((id: string) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleProductClick = (id: string) => {
    setSelectedProduct(id);
    navigate('product-detail');
  };

  return (
    <>
      <PageHeader title="我的收藏" onBack={() => navigate('profile')} />
      {favoriteProducts.length === 0 ? (
        <div className="ec-empty">
          <div className="ec-empty-icon">💝</div>
          <div className="ec-empty-text">还没有收藏商品</div>
        </div>
      ) : (
        <ProductGrid products={favoriteProducts} onProductClick={handleProductClick} />
      )}
    </>
  );
};

export default Favorites;
