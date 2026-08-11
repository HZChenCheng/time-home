import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useApp, orders, getSelectedOrder } from '../data';
import { PageHeader } from '../components/PageHeader';

const AfterSale: React.FC = () => {
  const { navigate } = useApp();
  const [refundType, setRefundType] = React.useState<'refund-only' | 'refund-return'>('refund-only');
  const [received, setReceived] = React.useState<'yes' | 'no'>('yes');
  const [reason, setReason] = React.useState('');
  const [reasonOpen, setReasonOpen] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);

  const orderId = getSelectedOrder();
  const order = orders.find(o => o.id === orderId) || orders[0];

  const reasons = ['商品质量问题', '不想要了', '尺码不合适', '与描述不符', '快递问题'];
  const maxRefund = order.products.reduce((s, p) => s + p.price * p.qty, 0);

  const toggleProduct = (idx: string) => {
    setSelectedProducts(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="ec-app" style={{ paddingBottom: '60px' }}>
      <PageHeader title="申请售后" onBack={() => navigate('orders')} />

      {/* 售后类型选择 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>退款类型</div>
        <div className="ec-flex ec-gap-md">
          <div
            onClick={() => setRefundType('refund-only')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: refundType === 'refund-only' ? '2px solid #FF4400' : '1px solid #eee',
              textAlign: 'center',
              fontSize: '14px',
              color: refundType === 'refund-only' ? '#FF4400' : '#666',
              cursor: 'pointer',
              fontWeight: refundType === 'refund-only' ? '600' : '400',
            }}
          >
            仅退款
          </div>
          <div
            onClick={() => setRefundType('refund-return')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: refundType === 'refund-return' ? '2px solid #FF4400' : '1px solid #eee',
              textAlign: 'center',
              fontSize: '14px',
              color: refundType === 'refund-return' ? '#FF4400' : '#666',
              cursor: 'pointer',
              fontWeight: refundType === 'refund-return' ? '600' : '400',
            }}
          >
            退货退款
          </div>
        </div>
      </div>

      {/* 货物状态选择 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>收到货了吗？</div>
        <div className="ec-flex ec-gap-md">
          <div
            onClick={() => setReceived('yes')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: received === 'yes' ? '2px solid #FF4400' : '1px solid #eee',
              textAlign: 'center',
              fontSize: '14px',
              color: received === 'yes' ? '#FF4400' : '#666',
              cursor: 'pointer',
              fontWeight: received === 'yes' ? '600' : '400',
            }}
          >
            已收到货
          </div>
          <div
            onClick={() => setReceived('no')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: received === 'no' ? '2px solid #FF4400' : '1px solid #eee',
              textAlign: 'center',
              fontSize: '14px',
              color: received === 'no' ? '#FF4400' : '#666',
              cursor: 'pointer',
              fontWeight: received === 'no' ? '600' : '400',
            }}
          >
            未收到货
          </div>
        </div>
      </div>

      {/* 退款原因 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>退款原因</div>
        <div
          onClick={() => setReasonOpen(!reasonOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '14px', color: reason ? '#333' : '#999' }}>
            {reason || '请选择退款原因'}
          </span>
          <ChevronDown size={16} color="#999" />
        </div>
        {reasonOpen && (
          <div style={{ marginTop: '4px', borderRadius: '8px', overflow: 'hidden' }}>
            {reasons.map((r, i) => (
              <div
                key={i}
                onClick={() => { setReason(r); setReasonOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: '#fff',
                  borderBottom: i < reasons.length - 1 ? '1px solid #f5f5f5' : 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <span>{r}</span>
                {reason === r && <Check size={16} color="#FF4400" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 商品选择区域 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>申请售后的商品</div>
        {order.products.map((p, i) => {
          const idx = String(i);
          const checked = selectedProducts.includes(idx);
          return (
            <div key={i} className="ec-flex ec-flex-center ec-gap-sm" style={{ padding: '8px 0', cursor: 'pointer' }} onClick={() => toggleProduct(idx)}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: checked ? 'none' : '2px solid #ccc',
                  background: checked ? '#FF4400' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {checked && <Check size={12} color="#fff" />}
              </div>
              <div className="ec-order-product-img" style={{ background: p.bgGradient, width: '56px', height: '56px', fontSize: '24px' }}>
                {p.emoji}
              </div>
              <div className="ec-order-product-info">
                <div className="ec-order-product-title">{p.title}</div>
                <div className="ec-order-product-spec">{p.spec}</div>
              </div>
              <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>¥{p.price}</div>
            </div>
          );
        })}
      </div>

      {/* 退款金额 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div className="ec-flex ec-flex-between ec-flex-center">
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>退款金额</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#FF2741' }}>¥{maxRefund}</div>
            <div style={{ fontSize: '11px', color: '#999' }}>最多可退¥{maxRefund}</div>
          </div>
        </div>
      </div>

      {/* 退款说明 */}
      <div className="ec-card" style={{ margin: '8px', padding: '12px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>退款说明</div>
        <textarea
          placeholder="请描述退款原因（选填）"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{
            width: '100%',
            minHeight: '80px',
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '13px',
            color: '#333',
            outline: 'none',
            resize: 'none',
            background: '#f5f5f5',
          }}
        />
      </div>

      {/* 底部固定栏 */}
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
          padding: '0 12px',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
          zIndex: 200,
        }}
      >
        <button className="ec-btn ec-btn--primary ec-btn--lg ec-btn--block" onClick={() => navigate('orders')}>
          提交申请
        </button>
      </div>
    </div>
  );
};

export default AfterSale;
