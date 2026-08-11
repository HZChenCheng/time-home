import React from 'react';
import { Store, Headphones, Heart, ChevronRight, ShoppingBag, CreditCard } from 'lucide-react';
import { useApp, getSelectedProduct } from '../data';
import { PageHeader } from '../components/PageHeader';

const ProductDetail: React.FC = () => {
  const { navigate, addToCart, getProduct, favorites, toggleFavorite } = useApp();
  const productId = getSelectedProduct();
  const product = getProduct(productId);

  if (!product) {
    return (
      <div>
        <PageHeader title="商品详情" onBack={() => navigate('home')} rightIcon={false} />
        <div className="ec-empty">
          <div className="ec-empty-icon">📦</div>
          <div className="ec-empty-text">商品不存在</div>
        </div>
      </div>
    );
  }

  const isFavorited = favorites.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, '默认');
    navigate('cart');
  };

  const handleBuyNow = () => {
    addToCart(product.id, '默认');
    navigate('checkout');
  };

  return (
    <div style={{ paddingBottom: '56px' }}>
      {/* 顶部导航栏 */}
      <PageHeader title="商品详情" onBack={() => navigate('home')} />

      {/* 商品主图 */}
      <div
        style={{
          width: '100%',
          height: '375px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          background: product.bgGradient,
        }}
      >
        {product.emoji}
      </div>

      {/* 价格区域 */}
      <div className="ec-card" data-annotation-id="product-detail-price" style={{ borderRadius: 0, margin: 0, padding: '16px', boxShadow: 'none' }}>
        <div className="ec-flex ec-flex-between" style={{ alignItems: 'flex-end' }}>
          <div className="ec-flex ec-flex-center" style={{ gap: '8px', alignItems: 'baseline' }}>
            <span className="ec-price" style={{ fontSize: '32px', fontWeight: 700 }}>
              <span style={{ fontSize: '18px' }}>¥</span>{product.price}
            </span>
            <span className="ec-price-original">¥{product.originalPrice}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            已售{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales}件
          </div>
        </div>
        <div className="ec-flex ec-gap-xs ec-mt-sm" style={{ flexWrap: 'wrap' }}>
          <span className="ec-tag ec-tag--price">限时立减¥{product.originalPrice - product.price}</span>
          <span className="ec-tag ec-tag--primary">满3000减200</span>
        </div>
      </div>

      {/* 商品标题 */}
      <div style={{ padding: '12px 16px', background: '#fff' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.4, color: '#333' }}>
          {product.title}
        </div>
      </div>

      {/* 店铺信息 */}
      <div className="ec-flex ec-flex-between" style={{ padding: '12px 16px', background: '#fff', marginTop: '8px', alignItems: 'center' }}>
        <div className="ec-flex ec-flex-center ec-gap-sm">
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ec-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
            {product.shop.charAt(0)}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{product.shop}</span>
        </div>
        <button className="ec-btn ec-btn--outline ec-btn--sm">进店</button>
      </div>

      {/* 规格选择行 */}
      <div className="ec-flex ec-flex-between" style={{ padding: '12px 16px', background: '#fff', marginTop: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>已选：默认</span>
        <ChevronRight size={18} color="#999" />
      </div>

      {/* Tab 栏 */}
      <div className="ec-flex" style={{ padding: '0 16px', background: '#fff', marginTop: '8px', borderBottom: '1px solid #f5f5f5' }}>
        {['详情', '评价', '推荐'].map((tab, i) => (
          <div
            key={tab}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? 'var(--ec-primary)' : '#666',
              borderBottom: i === 0 ? '2px solid var(--ec-primary)' : '2px solid transparent',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 详情内容区域 */}
      <div style={{ padding: '16px', background: '#fff' }}>
        <div style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, marginBottom: '12px' }}>
          {product.description || `${product.title}，品质保证，正品行货，全国联保。享受7天无理由退换货服务，让您购物无忧。`}
        </div>
        <div
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '8px',
            background: product.bgGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            marginBottom: '12px',
          }}
        >
          {product.emoji}
        </div>
        <div style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
          商品实拍图 · 高品质展示
        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div className="ec-detail-bar" data-annotation-id="product-detail-bar">
        <div className="ec-detail-bar-icon" onClick={() => navigate('home')}>
          <Store size={20} color="#666" />
          <span>店铺</span>
        </div>
        <div className="ec-detail-bar-icon">
          <Headphones size={20} color="#666" />
          <span>客服</span>
        </div>
        <div className="ec-detail-bar-icon" onClick={() => toggleFavorite(product.id)}>
          <Heart size={20} color={isFavorited ? '#FF2741' : '#666'} fill={isFavorited ? '#FF2741' : 'none'} />
          <span style={{ color: isFavorited ? '#FF2741' : '#666' }}>收藏</span>
        </div>
        <button
          className="ec-btn ec-btn--outline"
          style={{ flex: 1, padding: '10px 0', fontWeight: 600 }}
          onClick={handleAddToCart}
        >
          加入购物车
        </button>
        <button
          className="ec-btn ec-btn--primary"
          style={{ flex: 1, padding: '10px 0', fontWeight: 600 }}
          onClick={handleBuyNow}
        >
          立即购买
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
