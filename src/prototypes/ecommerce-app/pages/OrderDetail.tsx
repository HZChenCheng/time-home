import React from 'react';
import { MapPin, Truck } from 'lucide-react';
import { useApp, orders, getSelectedOrder, addresses } from '../data';
import { PageHeader } from '../components/PageHeader';

const OrderDetail: React.FC = () => {
  const { navigate } = useApp();
  const orderId = getSelectedOrder();
  const order = orders.find(o => o.id === orderId) || orders[0];
  const address = addresses[0];

  const totalQty = order.products.reduce((sum, p) => sum + p.qty, 0);
  const discount = Math.round(order.products.reduce((sum, p) => sum + p.price * p.qty, 0) - order.total);

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
              onClick={() => navigate('logistics')}
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

  const statusDescMap: Record<string, string> = {
    'pending-pay': '请尽快完成支付，超时订单将自动取消',
    'pending-ship': '商家正在备货中，请耐心等待',
    'pending-receive': '商品已发出，请注意查收',
    'completed': '订单已完成，期待再次购买',
  };

  return (
    <div className="ec-app" style={{ paddingBottom: '60px' }}>
      <PageHeader title="订单详情" onBack={() => navigate('orders')} />

      {/* 订单状态区域 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF4400 0%, #FF6E00 100%)',
          padding: '24px 16px',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: '22px', fontWeight: '700' }}>{order.statusText}</div>
        <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
          {statusDescMap[order.status]}
        </div>
      </div>

      {/* 收货地址区域 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div className="ec-flex ec-flex-center ec-gap-sm" style={{ marginBottom: '6px' }}>
          <MapPin size={16} color="#FF4400" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>
            {address.name}
            <span style={{ fontSize: '13px', fontWeight: '400', color: '#666', marginLeft: '8px' }}>
              {address.phone}
            </span>
          </span>
        </div>
        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4', paddingLeft: '22px' }}>
          {address.detail}
        </div>
      </div>

      {/* 商品列表区域 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div className="ec-flex ec-flex-between" style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{order.shop}</span>
        </div>
        {order.products.map((p, i) => (
          <div key={i} className="ec-order-product">
            <div className="ec-order-product-img" style={{ background: p.bgGradient }}>
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
      </div>

      {/* 订单信息区域 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>订单信息</div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>订单编号</span>
          <span style={{ color: '#333' }}>20260810{order.id.toUpperCase()}123456</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>创建时间</span>
          <span style={{ color: '#333' }}>{order.createTime}</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>支付方式</span>
          <span style={{ color: '#333' }}>在线支付</span>
        </div>
        <div className="ec-flex ec-flex-between ec-flex-center" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>配送方式</span>
          <span style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={14} />
            快递 免运费
          </span>
        </div>
      </div>

      {/* 金额明细区域 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>金额明细</div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>商品总额</span>
          <span>¥{order.products.reduce((s, p) => s + p.price * p.qty, 0)}</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>运费</span>
          <span>¥0</span>
        </div>
        <div className="ec-flex ec-flex-between" style={{ padding: '4px 0', fontSize: '13px', color: '#666' }}>
          <span>优惠</span>
          <span style={{ color: '#FF2741' }}>-¥{discount}</span>
        </div>
        <div
          className="ec-flex ec-flex-between ec-flex-center"
          style={{ padding: '8px 0 4px', marginTop: '4px', borderTop: '1px solid #f5f5f5', fontSize: '15px' }}
        >
          <span style={{ fontWeight: '600', color: '#333' }}>实付款</span>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#FF2741' }}>¥{order.total}</span>
        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '390px',
          height: '52px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 12px',
          gap: '8px',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
          zIndex: 200,
        }}
      >
        {renderOrderActions(order.status)}
      </div>
    </div>
  );
};

export default OrderDetail;
