import React, { useState } from 'react';
import { Minus } from 'lucide-react';
import { useProtoDevState } from '@axhub/annotation';
import { useApp } from '../data';

const Cart: React.FC = () => {
  const { navigate, cart, getProduct, updateCartQty, toggleCartSelect, toggleSelectAll } = useApp();
  const [isManage, setIsManage] = useState(false);
  const protoState = useProtoDevState<{ cart_state?: string }>();
  const forceEmpty = protoState.cart_state === 'empty';

  const allSelected = cart.length > 0 && cart.every(item => item.selected);

  const selectedItems = cart.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const handleSelectAll = () => {
    toggleSelectAll(!allSelected);
  };

  if (cart.length === 0 || forceEmpty) {
    return (
      <div>
        <div className="ec-header">
          <div className="ec-header-back" style={{ visibility: 'hidden' }} />
          <div className="ec-header-title">购物车</div>
          <div className="ec-header-back" style={{ visibility: 'hidden' }} />
        </div>
        <div className="ec-empty">
          <div className="ec-empty-icon">🛒</div>
          <div className="ec-empty-text">购物车空空如也</div>
          <button className="ec-btn ec-btn--primary ec-btn--sm ec-mt-sm" onClick={() => navigate('home')}>
            去逛逛
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '56px' }}>
      {/* 顶部导航栏 */}
      <div className="ec-header">
        <div className="ec-header-back" style={{ visibility: 'hidden' }} />
        <div className="ec-header-title">购物车</div>
        <div
          className="ec-header-back"
          style={{ width: 'auto', fontSize: '14px', color: 'var(--ec-primary)', fontWeight: 500 }}
          onClick={() => setIsManage(!isManage)}
        >
          {isManage ? '完成' : '管理'}
        </div>
      </div>

      {/* 购物车商品列表 */}
      <div data-annotation-id="cart-item-list">
        {cart.map(item => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <div key={`${item.productId}-${item.spec}`} className="ec-cart-item">
              {/* 选中框 */}
              <div
                className={`ec-cart-checkbox ${item.selected ? 'ec-cart-checkbox--checked' : ''}`}
                onClick={() => toggleCartSelect(item.productId, item.spec)}
              >
                {item.selected && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>✓</span>}
              </div>
              {/* 商品图 */}
              <div className="ec-cart-item-img" style={{ background: product.bgGradient }}>
                {product.emoji}
              </div>
              {/* 商品信息 */}
              <div className="ec-cart-item-info">
                <div className="ec-cart-item-title">{product.title}</div>
                <div className="ec-cart-item-spec">{item.spec}</div>
                <div className="ec-cart-item-bottom">
                  <span className="ec-price" style={{ fontSize: '16px', fontWeight: 700 }}>
                    <span style={{ fontSize: '12px' }}>¥</span>{product.price}
                  </span>
                  {/* 数量加减器 */}
                  <div className="ec-cart-qty">
                    <div
                      className="ec-cart-qty-btn"
                      onClick={() => updateCartQty(item.productId, item.spec, item.qty - 1)}
                    >
                      <Minus size={12} color="#666" />
                    </div>
                    <div className="ec-cart-qty-val">{item.qty}</div>
                    <div
                      className="ec-cart-qty-btn"
                      onClick={() => updateCartQty(item.productId, item.spec, item.qty + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部固定结算栏 */}
      <div className="ec-checkout-bar" data-annotation-id="cart-checkout-bar">
        <div className="ec-flex ec-flex-center ec-gap-xs" onClick={handleSelectAll}>
          <div className={`ec-cart-checkbox ${allSelected ? 'ec-cart-checkbox--checked' : ''}`}>
            {allSelected && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: '14px' }}>全选</span>
        </div>
        <div className="ec-flex ec-flex-center ec-gap-md">
          <div style={{ fontSize: '14px' }}>
            合计: <span className="ec-price" style={{ fontSize: '18px', fontWeight: 700 }}><span style={{ fontSize: '12px' }}>¥</span>{totalPrice.toFixed(0)}</span>
          </div>
          <button
            className="ec-btn ec-btn--primary"
            style={{ padding: '10px 24px', fontWeight: 600, opacity: selectedItems.length === 0 ? 0.5 : 1 }}
            disabled={selectedItems.length === 0}
            onClick={() => navigate('checkout')}
          >
            {isManage ? '删除' : `结算(${selectedItems.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
