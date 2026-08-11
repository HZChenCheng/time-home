import React from 'react';
import { MapPin, ChevronRight, Truck, Ticket, Edit3 } from 'lucide-react';
import { useApp, addresses } from '../data';
import { PageHeader } from '../components/PageHeader';

const Checkout: React.FC = () => {
  const { navigate, cart, getProduct } = useApp();

  const selectedItems = cart.filter(item => item.selected);
  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
  const shippingFee = 0;
  const discount = 50;
  const productTotal = selectedItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const finalPrice = productTotal + shippingFee - discount;

  return (
    <div style={{ paddingBottom: '56px' }}>
      {/* 顶部导航栏 */}
      <PageHeader title="确认订单" onBack={() => navigate('cart')} />

      {/* 收货地址区域 */}
      <div className="ec-checkout-section" data-annotation-id="checkout-address">
        <div className="ec-address-card">
          <MapPin size={24} color="var(--ec-primary)" />
          <div className="ec-address-info">
            <div className="ec-address-name">
              {defaultAddress.name}
              <span className="ec-address-phone">{defaultAddress.phone}</span>
              <span
                className="ec-tag ec-tag--primary"
                style={{ marginLeft: '4px' }}
              >
                {defaultAddress.tag}
              </span>
            </div>
            <div className="ec-address-detail">{defaultAddress.detail}</div>
          </div>
          <ChevronRight size={20} color="#ccc" />
        </div>
      </div>

      {/* 商品列表区域 */}
      <div className="ec-checkout-section">
        <div className="ec-checkout-section-title">商品信息</div>
        {selectedItems.map(item => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <div
              key={`${item.productId}-${item.spec}`}
              className="ec-flex ec-gap-sm"
              style={{ padding: '8px 0', alignItems: 'flex-start' }}
            >
              <div
                className="ec-cart-item-img"
                style={{ width: '64px', height: '64px', fontSize: '28px', background: product.bgGradient }}
              >
                {product.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ec-line-clamp-2" style={{ fontSize: '13px', color: '#333', lineHeight: 1.4 }}>
                  {product.title}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{item.spec}</div>
                <div className="ec-flex ec-flex-between" style={{ marginTop: '4px' }}>
                  <span className="ec-price" style={{ fontSize: '15px', fontWeight: 700 }}>
                    <span style={{ fontSize: '11px' }}>¥</span>{product.price}
                  </span>
                  <span style={{ fontSize: '13px', color: '#999' }}>x{item.qty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 配送方式 / 优惠券 / 订单备注 */}
      <div className="ec-checkout-section">
        <div className="ec-flex ec-flex-between" style={{ padding: '8px 0', alignItems: 'center' }}>
          <div className="ec-flex ec-flex-center ec-gap-sm">
            <Truck size={18} color="#999" />
            <span style={{ fontSize: '14px', color: '#333' }}>配送方式</span>
          </div>
          <span style={{ fontSize: '13px', color: '#666' }}>快递 免运费</span>
        </div>
        <div className="ec-divider" style={{ height: '1px', margin: '0' }} />
        <div className="ec-flex ec-flex-between" style={{ padding: '8px 0', alignItems: 'center' }}>
          <div className="ec-flex ec-flex-center ec-gap-sm">
            <Ticket size={18} color="#999" />
            <span style={{ fontSize: '14px', color: '#333' }}>优惠券</span>
          </div>
          <div className="ec-flex ec-flex-center ec-gap-xs">
            <span className="ec-text-price" style={{ fontSize: '13px', fontWeight: 600 }}>-¥{discount}</span>
            <ChevronRight size={16} color="#ccc" />
          </div>
        </div>
        <div className="ec-divider" style={{ height: '1px', margin: '0' }} />
        <div className="ec-flex ec-flex-between" style={{ padding: '8px 0', alignItems: 'center' }}>
          <div className="ec-flex ec-flex-center ec-gap-sm">
            <Edit3 size={18} color="#999" />
            <span style={{ fontSize: '14px', color: '#333' }}>订单备注</span>
          </div>
          <div className="ec-flex ec-flex-center ec-gap-xs">
            <span style={{ fontSize: '13px', color: '#999' }}>选填</span>
            <ChevronRight size={16} color="#ccc" />
          </div>
        </div>
      </div>

      {/* 金额明细 */}
      <div className="ec-checkout-summary" data-annotation-id="checkout-summary">
        <div className="ec-checkout-row">
          <span>商品金额</span>
          <span>¥{productTotal.toFixed(0)}</span>
        </div>
        <div className="ec-checkout-row">
          <span>运费</span>
          <span>¥{shippingFee}</span>
        </div>
        <div className="ec-checkout-row">
          <span>优惠</span>
          <span className="ec-text-price">-¥{discount}</span>
        </div>
        <div className="ec-checkout-row ec-checkout-row-total">
          <span>实付款</span>
          <span className="ec-price" style={{ fontSize: '20px', fontWeight: 700 }}>
            <span style={{ fontSize: '14px' }}>¥</span>{finalPrice.toFixed(0)}
          </span>
        </div>
      </div>

      {/* 底部固定栏 */}
      <div className="ec-checkout-bar">
        <div style={{ fontSize: '14px' }}>
          实付款: <span className="ec-price" style={{ fontSize: '20px', fontWeight: 700 }}><span style={{ fontSize: '13px' }}>¥</span>{finalPrice.toFixed(0)}</span>
        </div>
        <button
          className="ec-btn ec-btn--primary ec-btn--lg"
          style={{ fontWeight: 600, padding: '10px 32px' }}
          onClick={() => navigate('orders')}
        >
          提交订单
        </button>
      </div>
    </div>
  );
};

export default Checkout;
