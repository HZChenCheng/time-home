import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '../data';

const Checkin: React.FC = () => {
  const { navigate } = useApp();
  const [signedToday, setSignedToday] = useState(true);

  const today = 10;
  const daysInMonth = 31;
  const firstDayOfWeek = 6; // 2026年8月1日是周六

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const tasks = [
    { icon: '👀', label: '浏览商品', points: 5, done: false },
    { icon: '📤', label: '分享好友', points: 10, done: false },
    { icon: '⭐', label: '完成评价', points: 5, done: true },
    { icon: '🛒', label: '完成下单', points: 20, done: false },
    { icon: '✅', label: '每日签到', points: 2, done: true },
  ];

  return (
    <>
      {/* 顶部渐变区域 */}
      <div
        style={{
          background: 'var(--ec-gradient)',
          padding: '44px 16px 48px',
          color: 'white',
          position: 'relative',
        }}
      >
        <div
          onClick={() => navigate('profile')}
          style={{ height: '32px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <ChevronLeft size={24} color="white" />
        </div>
        <div className="ec-text-center" style={{ marginTop: '8px' }}>
          <div style={{ fontSize: '36px', fontWeight: 700 }}>2,580</div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>积分</div>
        </div>
      </div>

      {/* 签到卡片 */}
      <div
        className="ec-card"
        style={{ margin: '-24px 8px 0', position: 'relative', zIndex: 1 }}
      >
        <div className="ec-flex ec-flex-between ec-p-lg">
          <span className="ec-font-semibold ec-text-md">每日签到</span>
          <span className="ec-text-sm ec-text-tertiary">已连续签到5天</span>
        </div>
        {/* 星期标题 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            padding: '0 12px',
          }}
        >
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div
              key={d}
              className="ec-text-center ec-text-sm ec-text-tertiary"
              style={{ padding: '4px 0' }}
            >
              {d}
            </div>
          ))}
        </div>
        {/* 签到日历 */}
        <div className="ec-checkin-calendar" style={{ paddingTop: '4px' }}>
          {calendarDays.map((day, i) => {
            if (day === null) {
              return <div key={i} />;
            }
            const isChecked = day < today;
            const isToday = day === today;
            return (
              <div
                key={i}
                className={`ec-checkin-day ${isChecked ? 'ec-checkin-day--checked' : ''} ${
                  isToday ? 'ec-checkin-day--today' : ''
                }`}
              >
                <span>{day}</span>
                {isChecked || isToday ? (
                  <span style={{ fontSize: '10px', marginTop: '2px' }}>✓</span>
                ) : (
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--ec-ink-quaternary)',
                      marginTop: '2px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* 签到按钮 */}
        <div className="ec-p-lg">
          <button
            className={`ec-btn ec-btn--lg ec-btn--block ${signedToday ? 'ec-btn--ghost' : 'ec-btn--primary'}`}
            onClick={() => !signedToday && setSignedToday(true)}
            style={signedToday ? { cursor: 'default' } : undefined}
          >
            {signedToday ? '今日已签到' : '立即签到'}
          </button>
        </div>
      </div>

      {/* 积分任务 */}
      <div className="ec-card" style={{ margin: '8px' }}>
        <div className="ec-p-lg ec-font-semibold ec-text-md">积分任务</div>
        {tasks.map((task, i) => (
          <div
            key={i}
            className="ec-list-item"
            style={{
              borderBottom: i < tasks.length - 1 ? '1px solid var(--ec-border-light)' : 'none',
            }}
          >
            <span style={{ fontSize: '24px' }}>{task.icon}</span>
            <div style={{ flex: 1 }}>
              <div className="ec-text-md">{task.label}</div>
              <div className="ec-text-sm ec-text-tertiary">+{task.points}积分</div>
            </div>
            {task.done ? (
              <button className="ec-btn ec-btn--ghost ec-btn--sm" style={{ cursor: 'default' }}>
                已完成
              </button>
            ) : (
              <button className="ec-btn ec-btn--outline ec-btn--sm">去完成</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Checkin;
