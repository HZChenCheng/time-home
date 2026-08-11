import React from 'react';
import { Search as SearchIcon, ChevronLeft, X, TrendingUp } from 'lucide-react';
import { useApp, hotSearchWords, searchHistory, setSearchKeyword } from '../data';

const Search: React.FC = () => {
  const { navigate } = useApp();
  const [keyword, setKeyword] = React.useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setSearchKeyword(keyword.trim());
    navigate('search-results');
  };

  const handleWordClick = (word: string) => {
    setSearchKeyword(word);
    navigate('search-results');
  };

  return (
    <div className="ec-app" style={{ background: '#fff' }}>
      {/* 顶部搜索栏 */}
      <div className="ec-header">
        <div className="ec-header-back" onClick={() => navigate('home')}>
          <ChevronLeft size={24} />
        </div>
        <div className="ec-search-input" style={{ flex: 1 }}>
          <SearchIcon size={16} color="#999" />
          <input
            type="text"
            placeholder="搜索商品"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '13px',
              color: '#333',
            }}
          />
          {keyword && (
            <X size={14} color="#999" onClick={() => setKeyword('')} style={{ cursor: 'pointer' }} />
          )}
        </div>
        <span
          onClick={handleSearch}
          style={{ color: '#FF4400', fontSize: '15px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }}
        >
          搜索
        </span>
      </div>

      {/* 搜索历史 */}
      {searchHistory.length > 0 && (
        <div style={{ padding: '16px' }}>
          <div className="ec-flex ec-flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>搜索历史</span>
            <X size={18} color="#999" style={{ cursor: 'pointer' }} />
          </div>
          <div className="ec-flex" style={{ flexWrap: 'wrap', gap: '8px' }}>
            {searchHistory.map((word, i) => (
              <span
                key={i}
                onClick={() => handleWordClick(word)}
                style={{
                  padding: '6px 14px',
                  background: '#f5f5f5',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  color: '#666',
                  cursor: 'pointer',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 热搜榜 */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="ec-flex ec-flex-center ec-gap-sm" style={{ marginBottom: '12px' }}>
          <TrendingUp size={18} color="#FF4400" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>热搜榜</span>
        </div>
        <div className="ec-flex ec-flex-col">
          {hotSearchWords.map((word, i) => (
            <div
              key={i}
              onClick={() => handleWordClick(word)}
              className="ec-flex ec-flex-between"
              style={{
                padding: '10px 0',
                cursor: 'pointer',
                borderBottom: i < hotSearchWords.length - 1 ? '1px solid #f5f5f5' : 'none',
              }}
            >
              <div className="ec-flex ec-flex-center ec-gap-md">
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    width: '24px',
                    color: i < 3 ? '#FF4400' : '#999',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#333' }}>{word}</span>
              </div>
              {i < 3 && (
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    background: '#FFF0E8',
                    color: '#FF4400',
                    borderRadius: '3px',
                  }}
                >
                  热
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
