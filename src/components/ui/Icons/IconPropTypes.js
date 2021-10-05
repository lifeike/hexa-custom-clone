import PropTypes from 'prop-types';
import { SOCIAL_MEDIA } from '@/utils/constants/constants';

const IconPropTypes = {
  size: PropTypes.number.isRequired,
  desktopSize: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  name: PropTypes.oneOf([
    'close',
    'showPassword',
    'hidePassword',
    'chevron',
    'edit',
    'exclamation',
    'editDesign',
    'kebab',
    'question',
    'circleCheck',
    'circleCheckLogo',
    'account',
    'lowInventory',
    SOCIAL_MEDIA.TWITTER,
    SOCIAL_MEDIA.FACEBOOK,
    SOCIAL_MEDIA.INSTAGRAM,
    'fileUpload',
    'trash',
    'fabricOutOfInventory',
    'plus',
    'accountError',
  ]).isRequired,
};

export default IconPropTypes;
