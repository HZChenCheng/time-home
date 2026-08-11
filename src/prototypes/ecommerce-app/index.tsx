/**
 * @name 电商 APP
 */

import React, { useMemo } from 'react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import {
  AnnotationViewer,
  setProtoDevState,
} from '@axhub/annotation';
import type {
  AnnotationDirectoryRouteNode,
  AnnotationSourceDocument,
  AnnotationViewerOptions,
} from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import './style.css';
import { TabBar } from './components/TabBar';
import { AppProvider } from './data';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderList from './pages/OrderList';
import OrderDetail from './pages/OrderDetail';
import Logistics from './pages/Logistics';
import AfterSale from './pages/AfterSale';
import Coupons from './pages/Coupons';
import Checkin from './pages/Checkin';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';

const route = defineHashPageRoute(
  [
    { id: 'home', title: '首页', group: '主导航' },
    { id: 'category', title: '分类', group: '主导航' },
    { id: 'cart', title: '购物车', group: '主导航' },
    { id: 'orders', title: '订单', group: '主导航' },
    { id: 'profile', title: '我的', group: '主导航' },
    { id: 'search', title: '搜索', group: '功能页' },
    { id: 'search-results', title: '搜索结果', group: '功能页' },
    { id: 'product-detail', title: '商品详情', group: '功能页' },
    { id: 'checkout', title: '结算', group: '功能页' },
    { id: 'order-detail', title: '订单详情', group: '功能页' },
    { id: 'logistics', title: '物流跟踪', group: '功能页' },
    { id: 'after-sale', title: '售后申请', group: '功能页' },
    { id: 'coupons', title: '优惠券', group: '营销' },
    { id: 'checkin', title: '签到积分', group: '营销' },
    { id: 'favorites', title: '收藏夹', group: '营销' },
  ],
  { defaultPageId: 'home' },
);

const tabPages = ['home', 'category', 'cart', 'orders', 'profile'];

const pageMap: Record<string, React.FC> = {
  home: Home,
  category: Category,
  cart: Cart,
  orders: OrderList,
  profile: Profile,
  search: Search,
  'search-results': SearchResults,
  'product-detail': ProductDetail,
  checkout: Checkout,
  'order-detail': OrderDetail,
  logistics: Logistics,
  'after-sale': AfterSale,
  coupons: Coupons,
  checkin: Checkin,
  favorites: Favorites,
};

const App: React.FC = () => {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageMap[page] || Home;
  const showTabBar = tabPages.includes(page);

  const annotationOptions = useMemo<AnnotationViewerOptions>(() => ({
    showToolbar: true,
    showThemeToggle: true,
    showColorFilter: true,
    emptyWhenNoData: false,
    toolbarEdge: 'right',
    currentPageId: page,
    onDirectoryRoute: (node: AnnotationDirectoryRouteNode) => {
      if (typeof node.route === 'string') {
        setPage(node.route);
      }
      const payload = node.payload as { state?: string; value?: string } | undefined;
      if (payload?.value) {
        setProtoDevState({ [payload.state as string]: payload.value });
      }
    },
  }), [page, setPage]);

  return (
    <AppProvider navigate={setPage} currentPage={page}>
      <div className="ec-app">
        <div className={showTabBar ? 'ec-page-container' : 'ec-page-container ec-page-container--no-tab'}>
          <PageComponent />
        </div>
        {showTabBar && <TabBar current={page} onNavigate={setPage} />}
      </div>
      <AnnotationViewer
        source={annotationSourceDocument as AnnotationSourceDocument}
        options={annotationOptions}
      />
    </AppProvider>
  );
};

export default App;
