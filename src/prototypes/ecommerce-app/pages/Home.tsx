import React from 'react';
import { Search, ScanLine, MessageCircle, ChevronRight } from 'lucide-react';
import { useApp, products, setSelectedProduct } from '../data';
import { ProductGrid } from '../components/ProductCard';

const quickEntries = [
  { icon: '🆕', text: '天猫新品', bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' },
  { icon: '💰', text: '聚划算', bg: 'linear-gradient(135deg, #FF9500 0%, #FF5E3A 100%)' },
  { icon: '补贴', text: '百亿补贴', bg: 'linear-gradient(135deg, #FF2741 0%, #FF4400 100%)' },
  { icon: '🏪', text: '天猫超市', bg: 'linear-gradient(135deg, #00B894 0%, #00CDCD 100%)' },
  { icon: '充值', text: '充值中心', bg: 'linear-gradient(135deg, #6C5CE7 0%, #A36BD8 100%)' },
];

const Home: React.FC = () => {
  const { navigate } = useApp();
  const flashSaleProducts = products.slice(0, 4);

  const handleProductClick = (id: string) => {
    setSelectedProduct(id);
    navigate('product-detail');
  };

  return (
    <div>
      {/* 顶部渐变搜索栏 */}
      <div className="ec-search-bar" data-annotation-id="home-search-bar">
        <ScanLine size={22} color="#fff" strokeWidth={2} />
        <div className="ec-search-input" onClick={() => navigate('search')}>
          <Search size={16} color="#999" />
          <span>搜索商品</span>
        </div>
        <MessageCircle size={22} color="#fff" strokeWidth={2} />
      </div>

      {/* 轮播图 */}
      <div style={{ padding: '8px' }}>
        <div
          className="ec-banner"
          data-annotation-id="home-banner"
          style={{ background: 'linear-gradient(135deg, #FF4400 0%, #FF6E00 50%, #FF9500 100%)' }}
        >
          <div className="ec-text-center">
            <div style={{ fontSize: '22px', fontWeight: 700 }}>限时特惠 全场低至5折</div>
            <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>精选好物 抢完即止</div>
          </div>
        </div>
      </div>

      {/* 金刚位 */}
      <div className="ec-quick-entry" data-annotation-id="home-quick-entry">
        {quickEntries.map((item, i) => (
          <div key={i} className="ec-quick-entry-item">
            <div className="ec-quick-entry-icon" style={{ background: item.bg, color: '#fff', fontSize: '16px', fontWeight: 700 }}>
              {item.icon}
            </div>
            <div className="ec-quick-entry-text">{item.text}</div>
          </div>
        ))}
      </div>

      {/* 限时秒杀 */}
      <div className="ec-flash-sale" data-annotation-id="home-flash-sale">
        <div className="ec-flash-sale-header">
          <div className="ec-flash-sale-title">
            ⚡ 限时秒杀
          </div>
          <div className="ec-flex ec-flex-center ec-gap-xs" style={{ background: '#333', borderRadius: '9999px', padding: '4px 10px', color: '#fff', fontSize: '12px', fontWeight: 600 }}>
            <span>02:35:48</span>
          </div>
        </div>
        <div className="ec-flash-sale-list">
          {flashSaleProducts.map(product => (
            <div
              key={product.id}
              className="ec-flash-sale-item"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="ec-flash-sale-item-img" style={{ background: product.bgGradient }}>
                {product.emoji}
              </div>
              <div className="ec-flash-sale-item-price">¥{Math.floor(product.price * 0.8)}</div>
              <div className="ec-flash-sale-item-original">¥{product.originalPrice}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 为你推荐标题 */}
      <div className="ec-flex ec-flex-center" style={{ padding: '16px 0 4px', gap: '8px' }}>
        <div style={{ width: '24px', height: '1px', background: '#ddd' }} />
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#333' }}>为你推荐</span>
        <div style={{ width: '24px', height: '1px', background: '#ddd' }} />
      </div>

      {/* 商品瀑布流 */}
      <div data-annotation-id="home-product-grid">
        <ProductGrid products={products} onProductClick={handleProductClick} />
      </div>
    </div>
  );
};

export default Home;
