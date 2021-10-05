function constants(namespace, constants) {

  return Object.freeze(
    constants.reduce((obj, constant) => {
      return {
        ...obj,
        [constant]: `${namespace}/${constant}`,
      };
    }, {})
  );
}

const baseActions = [
  'LOADING',
  'SUCCESS',
  'ERROR',
];

export const Account = constants('account', [
  'LOGIN_CHANGE',
  'LOGIN_LOADING',
  'LOGIN_ERROR',
  'SESSION_TIMEOUT',
  'AUTH_LOADING',
  'AUTH_COMPLETE',
]);

export const Products = constants('products', [
  'CHANGE_PRODUCTS',
]);

export const ResetPassword = constants('resetPassword', [
  'SEND_RESET_PASSWORD',
  'SEND_RESET_PASSWORD_LOADING',
  'SEND_RESET_PASSWORD_RESET',
  'SEND_RESET_PASSWORD_SUCCESS',
  'RESET_PASSWORD_SUCCESS',
]);

export const Errors = constants('errors', [
  'GENERAL_ERROR',
  'RESET_ERROR',
]);

export const Loading = constants('gloabalLoading', [
  'LOADING',
]);

export const Checkout = constants('checkout', [
  'ADD_SHIPPING_INFO',
  'ADD_PAYMENT_INFO',
  'CLEAR',
  'REMOVE_PAYMENT',
  ...baseActions,
]);

export const Invoice = constants('invoice', [
  'UPDATE_INVOICE_INFO',
]);

export const AccountError = constants('accountError', [
  'TOGGLE_SHOW_ACCOUNTERROR',
]);

export const Styles = constants('styles', baseActions);
export const StyleMaster = constants('masterStyles', baseActions);
export const Colors = constants('colors', baseActions);
export const LogoOptions = constants('styles/logos', baseActions);
export const CreateOrder = constants('group/order/create', [...baseActions, ['RESET_NEW_ORDER']]);
export const FetchOrders = constants('group/orders/read', baseActions);
export const FetchOrder = constants('group/order/read', baseActions);
export const DeleteOrder = constants('group/order/delete', baseActions);
export const FetchLogos = constants('logos/read', baseActions);
export const CreateLogo = constants('logos/create', baseActions);
export const DeleteLogo = constants('logos/delete', baseActions);
export const Token = constants('token', baseActions);
export const Payment = constants('payment', baseActions);
export const DupeDesign = constants('dupeDesign',
  [...baseActions, 'SET_DUPE', 'RESET_DUPE']
);
