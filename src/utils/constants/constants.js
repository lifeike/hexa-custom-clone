export const ROUTES = {
  'HOME': '/',
  'LOGIN': '/login',
  'ORDERS': '/orders',
  'ORDER': '/order',
  'EDIT': '/order/:groupId/edit',
  'NEW_ORDER': '/orders/new',
  'RESET_PASSWORD': '/account/reset-password',
};

export const INPUTS = {
  'TEXT': 'text',
  'PASSWORD': 'password',
  'EMAIL': 'email',
  'NUMBER': 'number',
};

export const SOCIAL_MEDIA = {
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER',
  INSTAGRAM: 'INSTAGRAM',
};

export const SOCIAL_MEDIA_LINKS = {
  [SOCIAL_MEDIA.FACEBOOK]: 'https://www.facebook.com/hexacustom',
  [SOCIAL_MEDIA.TWITTER]: 'https://twitter.com/HexaCustom',
  [SOCIAL_MEDIA.INSTAGRAM]: 'https://www.instagram.com/hexacustom/',
};

export const ALL_INPUTS = [
  INPUTS.TEXT,
  INPUTS.PASSWORD,
  INPUTS.EMAIL,
  INPUTS.NUMBER,
];

// 14 chars to account for special characters and spaces in the masking.
export const EMAIL_INPUT_LENGTH = 14;

export const LINKS = {
  FIT_GUIDE: 'https://hexacustom.com/fit-guides',
  TERMS_AND_CONDITIONS: 'https://hexacustom.com/privacy',
};

export const NAV_SIZES = {
  'HEADER': {
    'SM': 4.7,
    'MD': 9,
  },
  'FOOTER': {
    'SM': 9.3,
    'MD': 12.5,
  },
};

export const STATUS_LITERALS = {
  '000': 'UNPAID', //unpaid
  '100': 'PENDING APPROVAL', //paid
  '200': 'IN-PRODUCTION', // approved
  '201': 'REJECTED', // rejected
  '600': 'SHIPPED', // shipped
  '900': 'COMPLETE', // complete
};

export const STATUS_ENUMS = {
  'UNPAID': '000',
  'PAID': '100',
  'APPROVED': '200',
  'REJECTED': '201',
  'SHIPPED': '600',
  'COMPLETE': '900',
};

export const GENDER = {
  'MAN': 'Man',
  'WOMAN': 'Women',
};

export const SIZE = {
  'XXS': 'XXS',
  'XS': 'XS',
  'SMALL': 'Small',
  'MEDIUM': 'Medium',
  'LARGE': 'Large',
  'XL': 'XL',
  'XXL': 'XXL',
};

export const FIT = {
  'SLIM': 'Slim',
  'REGULAR': 'Regular',
  'FULL': 'Full',
};

export const SLEEVE_LENGTH = {
  'SHORT': 'Short (-1")',
  'REGULAR': 'Regular',
  'LONG': 'Long (+1")',
};

export const ERRORS = {
  SESSION_TIMEOUT: 'Your session has expired please log back in.',
  LOGIN_ERROR: 'You have entered an invalid username or password.',
  GENERAL_ERROR: 'An error occured, and we were unable to complete your request. Please try again.',
  CANVAS_ERROR: 'Error generating product images, please try again or contact Hexa Customer Support.',
};

export const ROLES = {
  SUPER_ADMIN: 'superAdmin',
  USER: 'user',
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const CHECKOUT_ERRORS = {
  INVENTORY: 'INVENTORY',
  PAYMENT: 'PAYMENT',
  SHIPPING: 'SHIPPING',
  CONVERTCART: 'CONVERTCART',
};

export const FILE_ERRORS = {
  READ: 'Unable to read file.',
  TYPE: 'Unsupported file type.',
  WRITE: 'We were unable to upload your artwork. Please try again.',
};
