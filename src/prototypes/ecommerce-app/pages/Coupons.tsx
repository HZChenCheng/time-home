import React, { useState } from 'react';
import { useApp, coupons } from '../data';
import { PageHeader } from '../components/PageHeader';

const tabs = [
  { id: 'available', label: '可使用' },
  { id: 'used', label: '已使用' },
  { id: 'expired', label: '已过期' },
] as const;

const Coupons: React.FC = () => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<string>('available');

  const filteredCoupons = coupons.filter(c => c.status === activeTab);

  return (
    <>
      <PageHeader title="我的优惠券" onBack={() => navigate('profile')} />
      <div className="ec-order-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`ec-order-tab ${activeTab === tab.id ? 'ec-order-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {filteredCoupons.length === 0 ? (
        <div className="ec-empty">
          <div className="ec-empty-icon">🎫</div>
          <div className="ec-empty-text">暂无优惠券</div>
        </div>
      ) : (
        filteredCoupons.map(coupon => (
          <div
            key={coupon.id}
            className="ec-coupon-card"
            style={coupon.status !== 'available' ? { opacity: 0.6 } : undefined}
          >
            <div
              className="ec-coupon-left"
              style={coupon.status !== 'available' ? { background: '#bbb' } : undefined}
            >
              <div className="ec-coupon-amount">
                <span className="ec-coupon-amount-symbol">¥</span>
                {coupon.amount}
              </div>
              <div className="ec-coupon-condition">{coupon.condition}</div>
            </div>
            <div className="ec-coupon-right">
              <div className="ec-flex ec-flex-col ec-gap-xs">
                <div className="ec-coupon-name">{coupon.name}</div>
                <div className="ec-coupon-desc">{coupon.desc}</div>
                <div className="ec-coupon-expire">有效期至 {coupon.expire}</div>
              </div>
              {coupon.status === 'available' ? (
                <button className="ec-btn ec-btn--primary ec-btn--sm" onClick={() => navigate('home')}>
                  立即使用
                </button>
              ) : (
                <span className="ec-text-sm ec-text-tertiary ec-font-semibold">
                  {coupon.status === 'used' ? '已使用' : '已过期'}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Coupons;
