import PropTypes from 'prop-types';
import { ALL_INPUTS } from '@/utils/constants/constants';

 let abc = {
  'label': PropTypes.string.isRequired,
  'error': PropTypes.string.isRequired,
  'name': PropTypes.string.isRequired,
  'placeholder': PropTypes.string,
  'onChange': PropTypes.func.isRequired,
  'onBlur': PropTypes.func.isRequired,
  'emptyOption': PropTypes.string,
  'valid': PropTypes.bool,
  'touched': PropTypes.bool,
  'blurred': PropTypes.bool,
  'optional': PropTypes.bool,
  'options': PropTypes.array,
  'value': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'type': PropTypes.oneOf(ALL_INPUTS),
};
export default abc
