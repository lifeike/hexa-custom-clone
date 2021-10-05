import moment from 'moment';
import { STATUS_ENUMS, ROLES } from '@/utils/constants/constants';

export const rhythm = multiplier => {
  return `${multiplier * 8/10}rem`;
};

/**
* Finds the value of a query string parameter (if it exists).
*
* @param {String} field - The key to find a value for.
* @return {(String|null)} That key's value if it exists. Otherwise null.
*/
export const getUrlParam = field => {
  const href = window.location.href;
  const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
  const string = reg.exec(href);

  return string ? string[1] : null;
};

export const formatDate = date => {
  return moment(date).local().format('MMMM DD, YYYY');
};

export const getAdjustedVh = (vh, reductionInRem = 0) => {

  const reductionInPx = reductionInRem * 10;

  return (window.innerHeight / 100) * vh - reductionInPx;
};

export const fromNow = (date) => {
  const fromNow = moment(date).local().format('ll');

  return fromNow;
};

export function getOrderStatusColor(orderStatus) {
  switch (orderStatus) {
  case STATUS_ENUMS.SHIPPED:
    return 'color_green_0';
  case STATUS_ENUMS.UNPAID:
    return 'color_yellow_3';
  case STATUS_ENUMS.PAID:
    return 'color_purple';
  case STATUS_ENUMS.APPROVED:
    return 'color_blue_0';
  case STATUS_ENUMS.REJECTED:
    return 'color_red_error';
  case STATUS_ENUMS.COMPLETE:
    return 'color_grey_5';
  default:
    return 'color_grey_5';
  }
}

export function isSuperAdmin(user) {
  return user && user.roles && user.roles.includes(ROLES.SUPER_ADMIN);
}

/**
 * Returns the original string or a formatted currency.
 * @param {string|number} value
 */
export function formatCurrency(value) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);

  return isNaN(formatted) ? value : formatted;
}

function isNaN(value) {
  return value === '$NaN' || value === 'NaN';
}

export function getCreditCardType(val) {
  switch (val.charAt(0)) {
  case '3':
    return 'American Express';
  case '4':
    return 'Visa';
  case '5':
    return 'Mastercard';
  case '6':
    return 'Discover';
  default:
    return undefined;
  }
}

export const arrayToSentence = (a) => [a.slice(0, -1).join(', '), a.pop()].filter(w => w !== '').join(' and ');

/**
 * Determines whether element can scroll
 * @param {Node} el - DOM Element
 */
export const isScrollable = el => {
  return el && el.scrollHeight > el.clientHeight;
};

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;

    return obj;
  }, {});

export const encodeFilename = filename => {
  return filename.replace(/ /g, '___');
};

export const decodeFilename = filename => {
  return filename.replace(/___/g, ' ');
};

export const delay = async (t) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export const isInViewport = (element) => {
  var bounding = element.getBoundingClientRect();

  return bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

export const timer = name => {
  var start = new Date();

  return {
    stop: function() {
      var end  = new Date();
      var time = end.getTime() - start.getTime();

      // eslint-disable-next-line no-console
      console.log('Timer:', name, 'finished in', time, 'ms');
    },
  };
};

export const capitalize = str => str.charAt(0).toLocaleUpperCase() + str.slice(1);

export const formatStyleName = style => capitalize(style.trim().toLowerCase().replace(/\s+/g, ''));
