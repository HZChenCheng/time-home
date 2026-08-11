import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { useApp, coupons } from '../data';

const Profile: React.FC = () => {
  const { navigate, favorites } = useApp();

  const availableCoupons = coupons.filter(c => c.status === 'available').length;

  const stats = [
    { num: favorites.length, label: '收藏夹', action: () => navigate('favorites') },
    { num: 12, label: '关注', action: () => {} },
    { num: 86, label: '浏览足迹', action: () => {} },
    { num: availableCoupons, label: '优惠券', action: () => navigate('coupons') },
  ];

  const orderIcons = [
    { icon: '💰', label: '待付款' },
    { icon: '📦', label: '待发货' },
    { icon: '🚚', label: '待收货' },
    { icon: '↩️', label: '退款/售后' },
  ];

  const tools = [
    { icon: '📋', label: '每日签到', color: '#FFF0E8', action: () => navigate('checkin') },
    { icon: '🎫', label: '领券中心', color: '#E8F0FF', action: () => navigate('coupons') },
    { icon: '💝', label: '我的收藏', color: '#FFE8F0', action: () => navigate('favorites') },
    { icon: '📍', label: '地址管理', color: '#E8F8EE', action: () => {} },
    { icon: '🎧', label: '客服中心', color: '#FFF8E8', action: () => {} },
    { icon: '✏️', label: '意见反馈', color: '#F8E8FF', action: () => {} },
    { icon: 'ℹ️', label: '关于我们', color: '#E8FFFE', action: () => {} },
    { icon: '⚙️', label: '设置', color: '#F0F0FF', action: () => {} },
  ];

  return (
    <>
      {/* 顶部渐变背景 */}
      <div className="ec-profile-header" data-annotation-id="profile-header" style={{ paddingTop: '44px' }}>
        <div className="ec-flex ec-flex-between" style={{ alignItems: 'center' }}>
          <div className="ec-flex ec-gap-md" style={{ alignItems: 'center' }}>
            <div className="ec-profile-avatar">😊</div>
            <div>
              <div className="ec-profile-name">小明同学</div>
              <span
                className="ec-tag"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  marginTop: '4px',
                  display: 'inline-block',
                }}
              >
                黄金会员
              </span>
            </div>
          </div>
          <Settings size={24} color="white" />
        </div>
      </div>

      {/* 数据统计 */}
      <div className="ec-profile-stats" data-annotation-id="profile-stats">
        {stats.map((stat, i) => (
          <div key={i} className="ec-profile-stat" onClick={stat.action}>
            <div className="ec-profile-stat-num">{stat.num}</div>
            <div className="ec-profile-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 我的订单 */}
      <div className="ec-card" style={{ margin: '8px' }}>
        <div
          className="ec-flex ec-flex-between ec-p-lg"
          style={{ borderBottom: '1px solid var(--ec-border-light)', alignItems: 'center' }}
        >
          <span className="ec-font-semibold ec-text-md">我的订单</span>
          <div
            className="ec-flex ec-flex-center ec-gap-xs"
            onClick={() => navigate('orders')}
            style={{ cursor: 'pointer' }}
          >
            <span className="ec-text-sm ec-text-tertiary">查看全部订单</span>
            <ChevronRight size={16} color="var(--ec-ink-tertiary)" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 0' }}>
          {orderIcons.map((item, i) => (
            <div
              key={i}
              className="ec-quick-entry-item"
              onClick={() => navigate('orders')}
            >
              <div className="ec-quick-entry-icon" style={{ background: '#FFF0E8' }}>
                {item.icon}
              </div>
              <span className="ec-quick-entry-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 常用工具 */}
      <div className="ec-card" data-annotation-id="profile-tools" style={{ margin: '8px 8px 60px' }}>
        <div
          className="ec-p-lg ec-font-semibold ec-text-md"
          style={{ borderBottom: '1px solid var(--ec-border-light)' }}
        >
          常用工具
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 0' }}>
          {tools.map((tool, i) => (
            <div key={i} className="ec-quick-entry-item" onClick={tool.action}>
              <div className="ec-quick-entry-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>
              <span className="ec-quick-entry-text">{tool.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
