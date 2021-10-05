import { combineReducers } from 'redux';
import account from '@/store/reducers/account';
import orders from '@/store/reducers/orders';
import resetPassword from '@/store/reducers/resetPassword';
import errors from '@/store/reducers/errors';
import styles from '@/store/reducers/styles';
import colors from '@/store/reducers/colors';
import loading from '@/store/reducers/loading';
import checkout from '@/store/reducers/checkout';
import selectedOrder from '@/store/reducers/selectedOrder';
import newOrder from '@/store/reducers/newOrder';
import invoice from '@/store/reducers/invoice';
import logo from '@/store/reducers/logo';
import token from '@/store/reducers/token';
import styleMaster from '@/store/reducers/styleMaster';
import accountError from '@/store/reducers/accountError';
import dupeDesign from './dupeDesign';

export default combineReducers({
  account,
  orders,
  resetPassword,
  errors,
  styles,
  colors,
  loading,
  checkout,
  selectedOrder,
  newOrder,
  invoice,
  logo,
  token,
  styleMaster,
  accountError,
  dupeDesign,
});
