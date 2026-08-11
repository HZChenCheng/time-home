import React from 'react';
import { Home, Grid, ShoppingCart, ClipboardList, User } from 'lucide-react';

interface TabBarProps {
  current: string;
  onNavigate: (page: string) => void;
}

const tabs = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'category', label: '分类', icon: Grid },
  { id: 'cart', label: '购物车', icon: ShoppingCart, badge: 3 },
  { id: 'orders', label: '订单', icon: ClipboardList },
  { id: 'profile', label: '我的', icon: User },
];

export const TabBar: React.FC<TabBarProps> = ({ current, onNavigate }) => {
  return (
    <div className="ec-tab-bar">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = current === tab.id;
        return (
          <div
            key={tab.id}
            className={`ec-tab-item ${isActive ? 'ec-tab-item--active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            style={{ position: 'relative' }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="ec-tab-badge">{tab.badge}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
