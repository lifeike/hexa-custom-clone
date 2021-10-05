import { ROUTES } from '@/utils/constants/constants';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Orders from '@/pages/Orders/Orders';
import OrderDetail from '@/pages/OrderDetail/OrderDetail';
import ProductDesign from '@/pages/ProductDesign/ProductDesign';
import NewOrder from '@/pages/NewOrder/NewOrder';
import ResetPassword from '@/pages/Account/ResetPassword';
import Checkout from '@/pages/Checkout/Checkout';
import PageNotFound from '@/pages/Errors/404';

export const routes = [
  {
    path: ROUTES.LOGIN,
    component: Login,
    exact: true,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: ResetPassword,
    exact: true,
  },
  {
    component: PageNotFound,
  },
];

export const authenticatedRoutes = [
  {
    path: ROUTES.HOME,
    component: Home,
    exact: true,
  },
  {
    path: ROUTES.ORDERS,
    component: Orders,
    exact: true,
  },
  {
    path: ROUTES.NEW_ORDER,
    component: NewOrder,
    exact: true,
  },
  {
    path: `${ROUTES.ORDER}/:groupId`,
    component: OrderDetail,
    exact: true,
  },
  {
    path: ROUTES.EDIT,
    component: ProductDesign,
    exact: true,
  },
  {
    path: `${ROUTES.ORDER}/:groupId/checkout`,
    component: Checkout,
    exact: true,
  },
];
