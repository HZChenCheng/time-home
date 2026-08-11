import React from 'react';
import { Search as SearchIcon, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp, products, setSelectedProduct, getSearchKeyword } from '../data';
import { ProductGrid } from '../components/ProductCard';

const SearchResults: React.FC = () => {
  const { navigate } = useApp();
  const [sortTab, setSortTab] = React.useState(0);
  const [priceAsc, setPriceAsc] = React.useState(true);

  const keyword = getSearchKeyword();

  const tabs = ['综合', '销量', '价格', '筛选'];
  const priceIconIndex = 2;

  const handleProductClick = (id: string) => {
    setSelectedProduct(id);
    navigate('product-detail');
  };

  let displayProducts = [...products];
  if (sortTab === 1) {
    displayProducts.sort((a, b) => b.sales - a.sales);
  } else if (sortTab === 2) {
    displayProducts.sort((a, b) => priceAsc ? a.price - b.price : b.price - a.price);
  }

  return (
    <div className="ec-app">
      {/* 顶部搜索栏 */}
      <div className="ec-header">
        <div className="ec-header-back" onClick={() => navigate('search')}>
          <ChevronLeft size={24} />
        </div>
        <div
          className="ec-search-input"
          style={{ flex: 1, cursor: 'pointer' }}
          onClick={() => navigate('search')}
        >
          <SearchIcon size={16} color="#999" />
          <span style={{ fontSize: '13px', color: keyword ? '#333' : '#999' }}>
            {keyword || '搜索商品'}
          </span>
        </div>
        <span
          onClick={() => navigate('search')}
          style={{ color: '#FF4400', fontSize: '15px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }}
        >
          搜索
        </span>
      </div>

      {/* 筛选排序栏 */}
      <div className="ec-order-tabs" style={{ position: 'sticky', top: '52px', zIndex: 89 }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`ec-order-tab ${sortTab === i ? 'ec-order-tab--active' : ''}`}
            onClick={() => {
              if (i === 2) {
                if (sortTab === 2) {
                  setPriceAsc(!priceAsc);
                } else {
                  setSortTab(2);
                  setPriceAsc(true);
                }
              } else {
                setSortTab(i);
              }
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}
          >
            <span>{tab}</span>
            {i === priceIconIndex && (
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
                <ChevronUp size={10} color={sortTab === 2 && priceAsc ? '#FF4400' : '#ccc'} />
                <ChevronDown size={10} color={sortTab === 2 && !priceAsc ? '#FF4400' : '#ccc'} />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 商品网格 */}
      <ProductGrid products={displayProducts} onProductClick={handleProductClick} />
    </div>
  );
};

export default SearchResults;
