import { baseConfiguration } from '@/utils/constants/customizer';
import { styleClassifications as baseStyleClassifications } from '../customizer';

const styleClassifications = {
  ...baseStyleClassifications,
  personalization: {
    'L001': 'Chest Logo',
    'L010': 'Inner Logo',
    'L011': 'Back Logo',
    'L012': 'Upper Back Logo',
  },
};

export const STY702 = {
  ...baseConfiguration,
  styleClassifications,
  name: 'synthetic_vest',
  angleName: 'synthetic_vest',
  angleToLogoMap: {
    1: ['L001'],
    2: ['L007'],
    3: ['L011', 'L012'],
    5: ['L001'],
    6: ['L001'],
    7: ['L007'],
    8: ['L010'],
    9: ['L011', 'L012'],
  },
};
