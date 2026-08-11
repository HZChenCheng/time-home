import React from 'react';
import { Package } from 'lucide-react';
import { useProtoDevState, setProtoDevState } from '@axhub/annotation';
import { useApp, orders, setSelectedOrder } from '../data';
import { PageHeader } from '../components/PageHeader';

const tabs = ['全部', '待付款', '待发货', '待收货', '已完成'];
const statusValues = ['all', 'pending-pay', 'pending-ship', 'pending-receive', 'completed'];
const statusMap: Record<number, string | undefined> = {
  0: undefined,
  1: 'pending-pay',
  2: 'pending-ship',
  3: 'pending-receive',
  4: 'completed',
};

const OrderList: React.FC = () => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = React.useState(0);
  const protoState = useProtoDevState<{ order_status?: string }>();

  React.useEffect(() => {
    if (protoState.order_status) {
      const idx = statusValues.indexOf(protoState.order_status);
      if (idx >= 0 && idx !== activeTab) {
        setActiveTab(idx);
      }
    }
  }, [protoState.order_status]);

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setProtoDevState({ order_status: statusValues[i] });
  };

  const filteredOrders = activeTab === 0
    ? orders
    : orders.filter(o => o.status === statusMap[activeTab]);

  const handleCardClick = (id: string) => {
    setSelectedOrder(id);
    navigate('order-detail');
  };

  const renderOrderActions = (status: string) => {
    switch (status) {
      case 'pending-pay':
        return (
          <>
            <button className="ec-btn ec-btn--ghost ec-btn--sm">取消订单</button>
            <button className="ec-btn ec-btn--primary ec-btn--sm">去支付</button>
          </>
        );
      case 'pending-ship':
        return <button className="ec-btn ec-btn--ghost ec-btn--sm">提醒发货</button>;
      case 'pending-receive':
        return (
          <>
            <button
              className="ec-btn ec-btn--ghost ec-btn--sm"
              onClick={(e) => { e.stopPropagation(); navigate('logistics'); }}
            >
              查看物流
            </button>
            <button className="ec-btn ec-btn--primary ec-btn--sm">确认收货</button>
          </>
        );
      case 'completed':
        return (
          <>
            <button className="ec-btn ec-btn--ghost ec-btn--sm">再次购买</button>
            <button className="ec-btn ec-btn--primary ec-btn--sm">评价</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ec-app">
      <PageHeader title="我的订单" onBack={() => navigate('profile')} />

      {/* 订单状态Tab栏 */}
      <div className="ec-order-tabs" data-annotation-id="order-tabs" style={{ position: 'sticky', top: '52px', zIndex: 89 }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`ec-order-tab ${activeTab === i ? 'ec-order-tab--active' : ''}`}
            onClick={() => handleTabChange(i)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 订单列表 */}
      {filteredOrders.length === 0 ? (
        <div className="ec-empty">
          <Package size={64} color="#ccc" />
          <div className="ec-empty-text">暂无相关订单</div>
        </div>
      ) : (
        filteredOrders.map(order => {
          const totalQty = order.products.reduce((sum, p) => sum + p.qty, 0);
          return (
            <div
              key={order.id}
              className="ec-order-card"
              data-annotation-id={order.id === filteredOrders[0]?.id ? "order-card" : undefined}
              onClick={() => handleCardClick(order.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* 卡片头部 */}
              <div className="ec-order-card-header">
                <span className="ec-order-shop">{order.shop}</span>
                <span className="ec-order-status">{order.statusText}</span>
              </div>

              {/* 商品列表 */}
              {order.products.map((p, i) => (
                <div key={i} className="ec-order-product">
                  <div
                    className="ec-order-product-img"
                    style={{ background: p.bgGradient }}
                  >
                    {p.emoji}
                  </div>
                  <div className="ec-order-product-info">
                    <div className="ec-order-product-title">{p.title}</div>
                    <div className="ec-order-product-spec">{p.spec}</div>
                  </div>
                  <div className="ec-order-product-price">
                    <div style={{ fontSize: '14px', color: '#333' }}>¥{p.price}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>x{p.qty}</div>
                  </div>
                </div>
              ))}

              {/* 卡片底部 */}
              <div className="ec-order-footer">
                <div className="ec-order-total">
                  共{totalQty}件 合计 <span className="ec-order-total-price">¥{order.total}</span>
                </div>
                <div className="ec-order-actions" onClick={(e) => e.stopPropagation()}>
                  {renderOrderActions(order.status)}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderList;
