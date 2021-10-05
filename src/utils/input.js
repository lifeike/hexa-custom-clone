import { INPUTS } from '@/utils/constants/constants';
import {
  handleInputChange,
  handleInputBlur,
} from '@/utils/form';

export default function createInitialInputState($this, options = {}) {
  const defaultInitialInputState = {
    'type': INPUTS.TEXT,
    'value': '',
    'touched': false,
    'blurred': false,
    'valid': false,
    'placeholder': '',
    'error': '',
    'validationRules': {},
    'onChange': (e) => handleInputChange(e, $this),
    'onBlur': (e) => handleInputBlur(e, $this),
  };

  return Object.assign({}, defaultInitialInputState, options);
}
