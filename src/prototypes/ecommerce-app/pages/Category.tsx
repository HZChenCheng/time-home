import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useApp, categories } from '../data';

const Category: React.FC = () => {
  const { navigate } = useApp();
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory = categories.find(c => c.id === activeId) || categories[0];

  return (
    <div>
      {/* 顶部白色搜索栏 */}
      <div className="ec-header" style={{ background: '#fff' }}>
        <div className="ec-search-input" style={{ flex: 1, height: '34px' }} onClick={() => navigate('search')}>
          <Search size={16} color="#999" />
          <span>搜索商品</span>
        </div>
      </div>

      {/* 左右布局 */}
      <div className="ec-category-layout">
        {/* 左侧分类列表 */}
        <div className="ec-category-sidebar" data-annotation-id="category-sidebar">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`ec-category-side-item ${cat.id === activeId ? 'ec-category-side-item--active' : ''}`}
              onClick={() => setActiveId(cat.id)}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* 右侧内容区 */}
        <div className="ec-category-content">
          {/* 促销 banner */}
          <div
            className="ec-banner"
            style={{
              background: 'linear-gradient(135deg, #FF4400 0%, #FF6E00 100%)',
              marginBottom: '12px',
              height: '100px',
              aspectRatio: 'unset',
              fontSize: '16px',
            }}
          >
            {activeCategory.name} · 精选好物
          </div>

          {/* 子分类网格 */}
          <div className="ec-category-sub-grid" data-annotation-id="category-sub-grid">
            {activeCategory.subCategories.map(sub => (
              <div key={sub.id} className="ec-category-sub-item">
                <div
                  className="ec-category-sub-icon"
                  style={{ background: 'linear-gradient(135deg, #FFF0E8 0%, #FFE8D9 100%)' }}
                >
                  {sub.icon}
                </div>
                <div className="ec-category-sub-text">{sub.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
