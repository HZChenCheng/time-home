import React, { createContext, useContext, useState, useCallback } from 'react';

// ===== Types =====
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  sales: number;
  emoji: string;
  bgGradient: string;
  shop: string;
  tags: string[];
  category: string;
  description?: string;
  specs?: { name: string; values: string[] }[];
}

export interface CartItem {
  productId: string;
  qty: number;
  spec: string;
  selected: boolean;
}

export interface Order {
  id: string;
  status: 'pending-pay' | 'pending-ship' | 'pending-receive' | 'completed' | 'after-sale';
  statusText: string;
  products: { productId: string; title: string; emoji: string; bgGradient: string; spec: string; price: number; qty: number }[];
  total: number;
  shop: string;
  createTime: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: { id: string; name: string; icon: string }[];
}

export interface Coupon {
  id: string;
  amount: number;
  condition: string;
  name: string;
  desc: string;
  expire: string;
  status: 'available' | 'used' | 'expired';
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  detail: string;
  tag: string;
  isDefault: boolean;
}

// ===== Mock Data =====
const gradients = [
  'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  'linear-gradient(135deg, #6C5CE7 0%, #A36BD8 100%)',
  'linear-gradient(135deg, #00B894 0%, #00CDCD 100%)',
  'linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)',
  'linear-gradient(135deg, #74B9FF 0%, #0984E3 100%)',
  'linear-gradient(135deg, #FD79A8 0%, #E84393 100%)',
  'linear-gradient(135deg, #FAB1A0 0%, #E17055 100%)',
  'linear-gradient(135deg, #55EFC4 0%, #00B894 100%)',
  'linear-gradient(135deg, #DFE6E9 0%, #B2BEC3 100%)',
  'linear-gradient(135deg, #A29BFE 0%, #6C5CE7 100%)',
];

export const products: Product[] = [
  { id: 'p1', title: '华为 Mate 60 Pro 旗舰智能手机 12GB+512GB 雅丹黑', price: 6999, originalPrice: 7999, sales: 52341, emoji: '📱', bgGradient: gradients[0], shop: '华为官方旗舰店', tags: ['包邮', '正品保障'], category: 'phone' },
  { id: 'p2', title: 'Apple iPhone 15 Pro Max 256GB 原色钛金属', price: 9999, originalPrice: 10999, sales: 128934, emoji: '📱', bgGradient: gradients[4], shop: 'Apple Store', tags: ['分期免息', '7天无理由'], category: 'phone' },
  { id: 'p3', title: '小米14 Ultra 徕卡光学 全焦段四摄 16GB+512GB', price: 6499, originalPrice: 6999, sales: 34211, emoji: '📱', bgGradient: gradients[5], shop: '小米官方旗舰店', tags: ['包邮', '分期免息'], category: 'phone' },
  { id: 'p4', title: 'Nike Air Force 1 经典低帮板鞋 白色 男女同款', price: 799, originalPrice: 999, sales: 89234, emoji: '👟', bgGradient: gradients[2], shop: 'Nike官方旗舰店', tags: ['正品保障', '7天无理由'], category: 'shoes' },
  { id: 'p5', title: 'Adidas Samba OG 复古德训鞋 经典三叶草板鞋', price: 599, originalPrice: 799, sales: 45623, emoji: '👟', bgGradient: gradients[3], shop: 'adidas官方旗舰店', tags: ['包邮', '正品保障'], category: 'shoes' },
  { id: 'p6', title: '优衣库 男装 柔软针织衫 圆领长袖毛衣 多色可选', price: 149, originalPrice: 199, sales: 67890, emoji: '👕', bgGradient: gradients[8], shop: '优衣库官方旗舰店', tags: ['包邮'], category: 'clothing' },
  { id: 'p7', title: '兰蔻小黑瓶 肌底液 100ml 精华液 修护肌肤', price: 1580, originalPrice: 1880, sales: 23456, emoji: '💄', bgGradient: gradients[5], shop: '兰蔻官方旗舰店', tags: ['正品保障', '赠品'], category: 'beauty' },
  { id: 'p8', title: 'SK-II 神仙水 精华露 230ml 提亮肤色 紧致肌肤', price: 1690, originalPrice: 1990, sales: 18923, emoji: '💄', bgGradient: gradients[0], shop: 'SK-II官方旗舰店', tags: ['正品保障', '分期免息'], category: 'beauty' },
  { id: 'p9', title: '戴森 Dyson V12 Detect Slim 轻量无线吸尘器', price: 3990, originalPrice: 4690, sales: 12345, emoji: '🏠', bgGradient: gradients[9], shop: '戴森官方旗舰店', tags: ['包邮', '分期免息', '正品保障'], category: 'home' },
  { id: 'p10', title: '美的电饭煲 4L大容量 智能预约 多功能煮饭锅', price: 299, originalPrice: 399, sales: 56789, emoji: '🏠', bgGradient: gradients[3], shop: '美的官方旗舰店', tags: ['包邮'], category: 'home' },
  { id: 'p11', title: '罗技 G502 Hero 游戏鼠标 RGB机械电竞鼠标', price: 299, originalPrice: 399, sales: 78901, emoji: '💻', bgGradient: gradients[1], shop: '罗技官方旗舰店', tags: ['包邮', '正品保障'], category: 'digital' },
  { id: 'p12', title: 'Anker 安克 65W 氮化镓充电器 三口快充套装', price: 199, originalPrice: 259, sales: 34567, emoji: '💻', bgGradient: gradients[4], shop: 'Anker官方旗舰店', tags: ['包邮', '正品保障'], category: 'digital' },
  { id: 'p13', title: '三只松鼠 每日坚果 混合干果零食 750g大礼包', price: 89, originalPrice: 128, sales: 123456, emoji: '零食', bgGradient: gradients[3], shop: '三只松鼠官方旗舰店', tags: ['包邮', '满减'], category: 'food' },
  { id: 'p14', title: '百草味 肉脯零食大礼包 猪肉脯休闲食品', price: 69, originalPrice: 99, sales: 98765, emoji: '零食', bgGradient: gradients[6], shop: '百草味官方旗舰店', tags: ['包邮'], category: 'food' },
  { id: 'p15', title: '飞利浦电动牙刷 声波震动 充电式成人牙刷 HX6730', price: 399, originalPrice: 599, sales: 45678, emoji: '🪥', bgGradient: gradients[2], shop: '飞利浦官方旗舰店', tags: ['包邮', '正品保障'], category: 'home' },
  { id: 'p16', title: '小米手环8 运动健康监测 血氧心率 睡眠追踪', price: 249, originalPrice: 299, sales: 67890, emoji: '⌚', bgGradient: gradients[7], shop: '小米官方旗舰店', tags: ['包邮', '正品保障'], category: 'digital' },
  { id: 'p17', title: '富士拍立得 mini12 即影即有相机 粉色套装', price: 599, originalPrice: 699, sales: 23456, emoji: '📷', bgGradient: gradients[5], shop: '富士官方旗舰店', tags: ['包邮', '赠品'], category: 'digital' },
  { id: 'p18', title: '星巴克 焦糖玛奇朵 咖啡胶囊 10颗装 兼容 Nespresso', price: 89, originalPrice: 120, sales: 34567, emoji: '☕', bgGradient: gradients[3], shop: '星巴克官方旗舰店', tags: ['包邮'], category: 'food' },
  { id: 'p19', title: '乐高 街景系列 21333 梵高星空 文创积木', price: 1299, originalPrice: 1599, sales: 8923, emoji: '🧩', bgGradient: gradients[9], shop: '乐高官方旗舰店', tags: ['包邮', '正品保障'], category: 'toy' },
  { id: 'p20', title: '南极人 纯棉短袖T恤 男士夏季打底衫 5件装', price: 99, originalPrice: 199, sales: 156789, emoji: '👕', bgGradient: gradients[8], shop: '南极人官方旗舰店', tags: ['包邮', '超值'], category: 'clothing' },
];

export const categories: Category[] = [
  {
    id: 'phone', name: '手机数码', icon: '📱',
    subCategories: [
      { id: 'phone-1', name: '智能手机', icon: '📱' },
      { id: 'phone-2', name: '平板电脑', icon: '📲' },
      { id: 'phone-3', name: '电脑笔记本', icon: '💻' },
      { id: 'phone-4', name: '智能穿戴', icon: '⌚' },
      { id: 'phone-5', name: '摄影摄像', icon: '📷' },
      { id: 'phone-6', name: '数码配件', icon: '🔌' },
    ],
  },
  {
    id: 'clothing', name: '服饰穿搭', icon: '👕',
    subCategories: [
      { id: 'c-1', name: '男装', icon: '👔' },
      { id: 'c-2', name: '女装', icon: '👗' },
      { id: 'c-3', name: '内衣', icon: '🩲' },
      { id: 'c-4', name: '运动服', icon: '🏃' },
      { id: 'c-5', name: '童装', icon: '👶' },
      { id: 'c-6', name: '配饰', icon: '🎩' },
    ],
  },
  {
    id: 'shoes', name: '鞋靴箱包', icon: '👟',
    subCategories: [
      { id: 's-1', name: '运动鞋', icon: '👟' },
      { id: 's-2', name: '皮鞋', icon: '👞' },
      { id: 's-3', name: '靴子', icon: '🥾' },
      { id: 's-4', name: '拖鞋', icon: '🩴' },
      { id: 's-5', name: '箱包', icon: '👜' },
      { id: 's-6', name: '钱包', icon: '👛' },
    ],
  },
  {
    id: 'beauty', name: '美妆护肤', icon: '💄',
    subCategories: [
      { id: 'b-1', name: '面部护肤', icon: '🧴' },
      { id: 'b-2', name: '彩妆', icon: '💄' },
      { id: 'b-3', name: '香水', icon: '🌸' },
      { id: 'b-4', name: '身体护理', icon: '🧼' },
      { id: 'b-5', name: '美甲', icon: '💅' },
      { id: 'b-6', name: '美容仪', icon: '✨' },
    ],
  },
  {
    id: 'food', name: '食品生鲜', icon: '零食',
    subCategories: [
      { id: 'f-1', name: '零食', icon: '🍪' },
      { id: 'f-2', name: '饮料', icon: '🥤' },
      { id: 'f-3', name: '水果', icon: '🍎' },
      { id: 'f-4', name: '海鲜', icon: '🦐' },
      { id: 'f-5', name: '茶叶', icon: '🍵' },
      { id: 'f-6', name: '咖啡', icon: '☕' },
    ],
  },
  {
    id: 'home', name: '家居百货', icon: '🏠',
    subCategories: [
      { id: 'h-1', name: '家电', icon: '📺' },
      { id: 'h-2', name: '厨具', icon: '🍳' },
      { id: 'h-3', name: '清洁', icon: '🧹' },
      { id: 'h-4', name: '家具', icon: '🛋️' },
      { id: 'h-5', name: '灯具', icon: '💡' },
      { id: 'h-6', name: '收纳', icon: '📦' },
    ],
  },
  {
    id: 'digital', name: '电脑办公', icon: '💻',
    subCategories: [
      { id: 'd-1', name: '笔记本', icon: '💻' },
      { id: 'd-2', name: '键鼠', icon: '⌨️' },
      { id: 'd-3', name: '显示器', icon: '🖥️' },
      { id: 'd-4', name: '打印机', icon: '🖨️' },
      { id: 'd-5', name: '存储设备', icon: '💾' },
      { id: 'd-6', name: '网络设备', icon: '📡' },
    ],
  },
  {
    id: 'toy', name: '母婴玩具', icon: '🧸',
    subCategories: [
      { id: 't-1', name: '玩具', icon: '🧸' },
      { id: 't-2', name: '积木', icon: '🧩' },
      { id: 't-3', name: '模型', icon: '🤖' },
      { id: 't-4', name: '婴儿用品', icon: '🍼' },
      { id: 't-5', name: '童车', icon: '🛺' },
      { id: 't-6', name: '学习用品', icon: '📚' },
    ],
  },
];

export const orders: Order[] = [
  {
    id: 'o1', status: 'pending-pay', statusText: '待付款',
    products: [
      { productId: 'p1', title: '华为 Mate 60 Pro 旗舰智能手机 12GB+512GB 雅丹黑', emoji: '📱', bgGradient: gradients[0], spec: '雅丹黑 12G+512G', price: 6999, qty: 1 },
    ],
    total: 6999, shop: '华为官方旗舰店', createTime: '2026-08-10 14:30',
  },
  {
    id: 'o2', status: 'pending-ship', statusText: '待发货',
    products: [
      { productId: 'p4', title: 'Nike Air Force 1 经典低帮板鞋 白色 男女同款', emoji: '👟', bgGradient: gradients[2], spec: '白色 42码', price: 799, qty: 1 },
      { productId: 'p6', title: '优衣库 男装 柔软针织衫 圆领长袖毛衣', emoji: '👕', bgGradient: gradients[8], spec: '深灰色 L', price: 149, qty: 2 },
    ],
    total: 1097, shop: 'Nike×优衣库组合店', createTime: '2026-08-08 10:15',
  },
  {
    id: 'o3', status: 'pending-receive', statusText: '待收货',
    products: [
      { productId: 'p9', title: '戴森 Dyson V12 Detect Slim 轻量无线吸尘器', emoji: '🏠', bgGradient: gradients[9], spec: 'V12 标准版', price: 3990, qty: 1 },
    ],
    total: 3990, shop: '戴森官方旗舰店', createTime: '2026-08-05 16:42',
  },
  {
    id: 'o4', status: 'completed', statusText: '已完成',
    products: [
      { productId: 'p13', title: '三只松鼠 每日坚果 混合干果零食 750g大礼包', emoji: '零食', bgGradient: gradients[3], spec: '750g 混合装', price: 89, qty: 2 },
      { productId: 'p18', title: '星巴克 焦糖玛奇朵 咖啡胶囊 10颗装', emoji: '☕', bgGradient: gradients[3], spec: '焦糖玛奇朵 10颗', price: 89, qty: 1 },
    ],
    total: 267, shop: '食品组合店', createTime: '2026-07-28 09:20',
  },
  {
    id: 'o5', status: 'completed', statusText: '已完成',
    products: [
      { productId: 'p7', title: '兰蔻小黑瓶 肌底液 100ml 精华液', emoji: '💄', bgGradient: gradients[5], spec: '100ml 正装', price: 1580, qty: 1 },
    ],
    total: 1580, shop: '兰蔻官方旗舰店', createTime: '2026-07-15 11:30',
  },
  {
    id: 'o6', status: 'pending-receive', statusText: '待收货',
    products: [
      { productId: 'p11', title: '罗技 G502 Hero 游戏鼠标 RGB机械电竞鼠标', emoji: '💻', bgGradient: gradients[1], spec: 'G502 黑色', price: 299, qty: 1 },
      { productId: 'p12', title: 'Anker 安克 65W 氮化镓充电器 三口快充套装', emoji: '💻', bgGradient: gradients[4], spec: '65W 套装', price: 199, qty: 1 },
    ],
    total: 498, shop: '数码配件专营店', createTime: '2026-08-06 13:45',
  },
];

export const coupons: Coupon[] = [
  { id: 'c1', amount: 50, condition: '满300可用', name: '品类专享券', desc: '仅限手机数码品类使用', expire: '2026-08-31', status: 'available' },
  { id: 'c2', amount: 20, condition: '满100可用', name: '新人专享券', desc: '全品类可用', expire: '2026-08-20', status: 'available' },
  { id: 'c3', amount: 100, condition: '满1000可用', name: '大额满减券', desc: '仅限家电家居品类', expire: '2026-09-15', status: 'available' },
  { id: 'c4', amount: 15, condition: '满50可用', name: '食品生鲜券', desc: '仅限食品生鲜品类', expire: '2026-08-12', status: 'available' },
  { id: 'c5', amount: 30, condition: '满200可用', name: '美妆护肤券', desc: '仅限美妆护肤品类', expire: '2026-07-30', status: 'expired' },
  { id: 'c6', amount: 10, condition: '无门槛', name: '签到奖励券', desc: '全品类可用', expire: '2026-07-25', status: 'used' },
];

export const addresses: Address[] = [
  { id: 'a1', name: '张小明', phone: '138****8888', detail: '广东省深圳市南山区科技园路1号 腾讯大厦 28楼', tag: '公司', isDefault: true },
  { id: 'a2', name: '张小明', phone: '138****8888', detail: '广东省深圳市福田区福华路 88号 深业上城 5栋 1203室', tag: '家', isDefault: false },
];

export const hotSearchWords = [
  '华为Mate60', 'iPhone15', '秋季新款', '空气炸锅', '防晒霜',
  '运动鞋', '蓝牙耳机', '积木', '咖啡胶囊', '保温杯',
];

export const searchHistory = ['手机壳', '运动鞋', '零食大礼包', '面膜'];

// ===== Context =====
interface AppContextValue {
  navigate: (page: string) => void;
  currentPage: string;
  cart: CartItem[];
  addToCart: (productId: string, spec?: string, qty?: number) => void;
  removeFromCart: (productId: string, spec: string) => void;
  updateCartQty: (productId: string, spec: string, qty: number) => void;
  toggleCartSelect: (productId: string, spec: string) => void;
  toggleSelectAll: (selected: boolean) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ navigate: (page: string) => void; currentPage: string; children: React.ReactNode }> = ({ navigate, currentPage, children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    { productId: 'p2', qty: 1, spec: '原色钛金属 256G', selected: true },
    { productId: 'p10', qty: 2, spec: '4L 白色', selected: true },
    { productId: 'p13', qty: 1, spec: '750g 混合装', selected: false },
  ]);
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p5', 'p17']);

  const addToCart = useCallback((productId: string, spec = '默认', qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId && item.spec === spec);
      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.spec === spec
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { productId, spec, qty, selected: true }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, spec: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.spec === spec)));
  }, []);

  const updateCartQty = useCallback((productId: string, spec: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => !(item.productId === productId && item.spec === spec)));
      return;
    }
    setCart(prev => prev.map(item =>
      item.productId === productId && item.spec === spec
        ? { ...item, qty }
        : item
    ));
  }, []);

  const toggleCartSelect = useCallback((productId: string, spec: string) => {
    setCart(prev => prev.map(item =>
      item.productId === productId && item.spec === spec
        ? { ...item, selected: !item.selected }
        : item
    ));
  }, []);

  const toggleSelectAll = useCallback((selected: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected })));
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const getProduct = useCallback((id: string) => products.find(p => p.id === id), []);

  return (
    <AppContext.Provider value={{
      navigate, currentPage, cart, addToCart, removeFromCart, updateCartQty,
      toggleCartSelect, toggleSelectAll, favorites, toggleFavorite, getProduct,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ===== Cross-page state (module-level for prototype simplicity) =====
let _selectedProductId = 'p1';
let _selectedOrderId = 'o1';
let _searchKeyword = '';
let _selectedCategory = 'phone';

export function setSelectedProduct(id: string) { _selectedProductId = id; }
export function getSelectedProduct() { return _selectedProductId; }
export function setSelectedOrder(id: string) { _selectedOrderId = id; }
export function getSelectedOrder() { return _selectedOrderId; }
export function setSearchKeyword(kw: string) { _searchKeyword = kw; }
export function getSearchKeyword() { return _searchKeyword; }
export function setSelectedCategory(cat: string) { _selectedCategory = cat; }
export function getSelectedCategory() { return _selectedCategory; }

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
