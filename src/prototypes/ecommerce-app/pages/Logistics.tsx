import React from 'react';
import { Package } from 'lucide-react';
import { useApp } from '../data';
import { PageHeader } from '../components/PageHeader';

const Logistics: React.FC = () => {
  const { navigate } = useApp();

  const timeline = [
    { active: true, text: '【派送中】您的快件正在派送中，请保持电话畅通', time: '2026-08-10 14:30' },
    { active: false, text: '【运输中】快件已到达【深圳南山区营业点】', time: '2026-08-10 09:15' },
    { active: false, text: '【运输中】快件已从【广州转运中心】发出', time: '2026-08-09 22:30' },
    { active: false, text: '【运输中】快件已到达【广州转运中心】', time: '2026-08-09 18:00' },
    { active: false, text: '【已揽收】卖家已发货，快件已揽收', time: '2026-08-09 10:00' },
  ];

  return (
    <div className="ec-app">
      <PageHeader title="物流跟踪" onBack={() => navigate('orders')} />

      {/* 地图区域 */}
      <div className="ec-card" style={{ margin: '8px', height: '200px' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#e8e8e8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '12px',
          }}
        >
          <Package size={48} color="#999" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#666' }}>运输中</span>
        </div>
      </div>

      {/* 物流状态卡片 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>快递公司</span>
          <span style={{ color: '#333', fontWeight: '500' }}>顺丰速运</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>运单号</span>
          <span style={{ color: '#333', fontWeight: '500' }}>SF1234567890</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>当前状态</span>
          <span style={{ color: '#FF4400', fontWeight: '500' }}>运输中</span>
        </div>
      </div>

      {/* 物流时间线 */}
      <div className="ec-card" style={{ margin: '8px' }}>
        <div className="ec-timeline">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`ec-timeline-item ${item.active ? 'ec-timeline-item--active' : ''}`}
            >
              <div className="ec-timeline-dot" />
              <div className="ec-timeline-content">
                <div className="ec-timeline-time">{item.time}</div>
                <div className="ec-timeline-text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logistics;
