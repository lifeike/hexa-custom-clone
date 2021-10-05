import {baseConfiguration, styleClassifications} from '@/utils/constants/customizer';
import { colorConfiguration } from '../customizer';

const windbreakerColors = {
  ...colorConfiguration,
  '43': {
    name: 'Magenta',
    visible: true,
    buttonColor: 'D0417E',
    imageColor: 'D0417E',
  },
  '6': {
    name: 'Willow Gray',
    visible: true,
    buttonColor: 'B7B6A1',
    imageColor: '919174',
  },
};

const windbreakerStyleClassifications = {
  ...styleClassifications,
  features: {
    I002: 'Down Type',
    I003: 'Hood',
    I005: 'Chest Pocket',
    I030: 'Pocket Flap',
  },
  colors: {
    C001: 'Hood Color',
    C002: 'Top Sleeve Color',
    C003: 'Bottom Sleeve Color',
    C004: 'Main Body Front Top Color Left',
    C005: 'Main Body Front Top Color Right',
    C006: 'Main Body Front Bottom Color Left',
    C007: 'Main Body Front Bottom Color Right',
    C008: 'Main Body Back Top Color',
    C009: 'Main Body Back Bottom Color',
    C010: 'Pocket Zipper Color',
    C011: 'Main Zipper Color',
    C020: 'Pocket Flap Color',
  },
  zippers: {
    I016: 'Center Zipper',
    I017: 'Pocket Zippers',
    C018: 'Main Zipper',
    C020: 'Pocket Flap Color',
    C022: 'Lower Pocket Zippers',
  },
  'personalization': {
    L001: 'Chest Logo',
    L010: 'Inner Logo',
    L011: 'Back Logo',
    L012: 'Back of Right Shoulder Logo',
    L013: 'Mid Back Logo',
    L007: 'Left Sleeve Logo',
  },
};

const angleToLogoMap = {
  1: ['L001'],
  2: ['L007'],
  3: ['L012', 'L013'],
  5: ['L001'],
  6: ['L001'],
  7: ['L007'],
  8: ['L012', 'L013'],
};


export const STY802 = {
  ...baseConfiguration,
  angleToLogoMap,
  styleClassifications: windbreakerStyleClassifications,
  colorConfiguration: windbreakerColors,
  imageNameToStyleOption: {
    hood_collar_color: 'C001',
    upper_sleeve_color: 'C002',
    lower_sleeve_color: 'C003',
    left_upper_chest_color: 'C004',
    right_upper_chest_color: 'C005',
    left_lower_body_color: 'C006',
    right_lower_body_color: 'C007',
    upper_back_color: 'C008',
    lower_back_color: 'C009',
    chest_zipper_color: 'C010',
    main_zipper_color: 'C011',
    hands_pocket_color: 'C020',
  },
  name: 'windbreaker',
  angleName: 'windbreaker',
};