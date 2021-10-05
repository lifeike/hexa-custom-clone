import { STY901 } from '@/utils/constants/jackets/STY901';
import { STY902 } from '@/utils/constants/jackets/STY902';
import { STY903 } from '@/utils/constants/jackets/STY903';
import { STY801 } from '@/utils/constants/jackets/STY801';
import { STY802 } from './jackets/STY802';
import {STY701} from "./jackets/STY701";
import { STY702 } from './jackets/STY702';

export const GetString = (lookup, object) => {
  if (lookup in object) {
    return object[lookup];
  }

  return lookup;
};

export const oldStyles = ['STY001', 'STY002', 'STY003', 'STY004', 'STY005', 'STY006', 'STY007', 'STY008', 'STY009', 'STY601', 'STY602', 'STY603', 'STY604'];

export const SizeTranslations = {
  '2X-Small': 'XXS',
  'X-Small': 'XS',
  'X-Large': 'XL',
  '2X-Large': '2XL',
  '3X-Large': '3XL',
  '4X-Large': '4XL',
  '5X-Large': '5XL',
  '5XL-Large': '5XL',
  'Sleeve Length -1"': 'Short (-1”)',
  'Regular Sleeve Length': 'Regular',
  "-1'' Sleeve Length": 'Short (-1”)',
  "+1'' Sleeve Length": 'Long (+1”)',
  'Sleeve Length  +1"': 'Long (+1”)',
  'Regular Fit': 'Regular',
  'Slim Fit': 'Slim',
  'Full Fit': 'Full',
};

export const OptionTranslations = {
  'Duck Down-700 fill power': 'Duck Down',
  'Goose Down-800 fill power': 'Goose Down',
  'no image': 'No Logo',
};

export const ReviewOptionTranslations = {
  ...OptionTranslations,
  'Pocket': 'Add Pocket',
  'Hood': 'Add Hood',
  'no image': 'No Logo',
  ' ': 'Add Logo',
  '': 'Add Logo',
};

export const ProductOrder = [
  'STY801', // rain jacket
  'STY802', // windbreaker
  'STY702', // synth vest
  'STY701', // synthetic jacket
  'STY902', // down vest
  'STY901', // down jacket
  'STY903', // puffy down jacket
];

// These are short term fixes for unavailable data points.
export const ProductDescriptions = {
  STY901: {
    header: 'Experience Ultimate Warmth and Versatility',
    details: ['Lightweight', 'Highly Compressible', 'Perfect for cool-weather adventures']
  },
  STY902: {
    header: 'Lightweight and Perfect for Almost Anything',
    details: ['Super Compressible', 'Windproof and Warm', 'Highly Versatile for All-Day Comfort'],
  },
  STY903: {
    header: 'High-Loft for Reliable Warmth',
    details: ['Cozy, Lightweight Comfort', 'Highly Compressible', 'Your Go-To Winter Companion'],
  },
  STY801: {
    header: 'Waterproof-Breathable Comfort & Performance',
    details: ['Premium Construction You Can Feel', '2.5L, 2-Way Stretch Fabric For All-Day Comfort', 'Lightweight and Packable'],
  },
  STY701: {
    header: 'Lightweight and Warm for Everyday Performance',
    details: ['Windproof, and Water-Resistant', 'Highly Compressible', 'Choose Standard or Recycled Polyester Insulation'],
  },
  STY702: {
    header: 'Lightweight and Compressible for On-the-Go Convenience',
    details: ['Windproof, and Water-Resistant', 'Highly Compressible with Integrated Stuff Sack', 'Choose Standard or Recycled Polyester Insulation'],
  },
  STY802: {
    header: 'Lightweight, Windproof and Water-Resistant',
    details: [
      'DWR-coated 100% Nylon for All-day Comfort',
      'Compactable for Grab-n-Go Convenience',
      'Premium Quality Materials and Construction',
    ],
  },
};

//These translate the configurable option  namespace
export const StyleNames = {
  'I002': 'Down Type',
  'I003': 'Hood/Collar',
  'I005': 'Chest Pocket',
  'I009': 'Body Color', // Main Body Bottom Color
  'I008': 'Shoulder Color', // Main Body Top Color
  'I004': 'Hood/Collar Color',
  'I007': 'Right Sleeve Color',
  'I006': 'Left Sleeve Color',
  'I010': 'Side Panel Color',
  // 'I025': 'Side Panel Color',
  'I016': 'Main Zipper Color',
  'I017': 'Pocket Zipper Color',
  'I011': 'Liner Color',
  'F002': 'Hood Shape',
  'F003': 'Chest Pocket(s)',
  'C001': 'Hood Color',
  'C007': 'Chest Color',
  'C009': 'Body Color',
  'C011': 'Lower Body Color',
  'C017': 'Back Color',
  'C013': 'Upper Sleeve Color',
  'C014': 'Lower Sleeve Color',
  'C018': 'Main Zipper Color',
  'C020': 'Chest Pocket Zipper Color',
  'C022': 'Lower Pocket Zipper Color',
  'L001': 'Logo: Left Chest',
  'L010': 'Logo: Inside',
  'L007': 'Logo: Left Sleeve',
  'L009': 'Logo: Right Shoulder',
  'L011': 'Logo: Back',
  'L012': 'Logo: Lower Back',
  'L006': 'Logo: Hood',
};

export const windbreakerStyleNames = {
  I003: 'Hood/Collar',
  I005: 'Chest Pocket',
  I030: 'Pocket Flaps',
  C004: 'Front Top Left Color',
  C005: 'Front Top Right Color',
  C006: 'Front Bottom Left Color',
  C007: 'Front Bottom Right Color',
  C008: 'Back Top Color',
  C009: 'Back Bottom Color',
  C001: 'Hood/Collar Color',
  C002: 'Upper Sleeve Color',
  C003: 'Lower Sleeve Color',
  C011: 'Main Zipper Color',
  C010: 'Pocket Zipper Color',
  C020: 'Flap Color',
  L001: 'Logo: Left Chest',
  L007: 'Logo: Left Sleeve',
  L012: 'Logo: Back of Right Shoulder',
  L013: 'Logo: Mid Back',
};

// I012 - Shape is a sizing option
// I013 - Left Sleeve Length is a size
// I014 - Right Sleeve Length is a size
// I015 - Jacket Size is a size

// Going to keep this separate to make updates in code easier.
export const VisibleColorOrder = [
  '17',
  '42',
  '8',
  '41',
  '6',
  '1',
  '13',
  '9',
  '18',
  '10',
  '2',
  '11',
  '33',
  '39',
  '4',
  '34',
  '14',
  '12',
  '3',
  '5',
  '31',
  '35',
  '7',
  '40',
  '16',
  '15',
  '32',
];

// COLORS NOT IN USE
// Coconut
// Milk	F0EDE5
// Ginger Root	BFA58A
// Antartica	C6C5C6
// Orchid Hush	CEC3D2
// Blue Glow	B2D4DD
// Poseidon	123955
// Scarab	23312D
// Jet Black	2D2C2F
// Pickled Beet	4D233D
// Ember Glow	EA6759
// Caberet	CB3373
// Blue Atoll	00B1D2
// Mettalic Navy	EDDD59
// Metallic Silver	5A7247
// Camouflage	00585E

// I012 - Shape is a sizing option
// I013 - Left Sleeve Length is a size
// I014 - Right Sleeve Length is a size
// I015 - Jacket Size is a size
// G001 - Gender for gender nuetral jackets

export const sizeOptions = {
  'gender': 'G001',
  'sleeve': 'I013',
  'size': 'I015',
  'fit': 'I012',
};

export const featureToAngleMapping = {
  default: {
    'I007': 0,
    'I006': 0,
    'I011': 4,
    'I016': 0,
    'I017': 0,
    'L001': 5,
    'L010': 7,
    'L007': 6,
    'L011': 8,
  },
  vest: {
    'I007': 0,
    'I006': 0,
    'I011': 2,
    'I016': 0,
    'I017': 0,
    'L001': 3,
    'L010': 4,
    'L011': 5,
    'L012': 5,
  },
  rain_jacket: {
    'F002': 0,
    'F003': 0,
    'C001': 0,
    'C007': 0,
    'C009': 0,
    'C011': 0,
    'C013': 0,
    'C014': 0,
    'C017': 4,
    'C018': 0,
    'C020': 0,
    'C022': 0,
    'L001': 8,
    'L010': 6,
    'L007': 9,
    'L009': 7,
    'L012': 10,
  },
  windbreaker: {
    I003: 0, //'Hood/Collar',
    I005: 0, //'Chest Pocket',
    I030: 0, //'Pocket Flaps',
    C004: 0, //'Front Top Left Color',
    C005: 0, //'Front Top Right Color',
    C006: 0, //'Front Bottom Left Color',
    C007: 0, //'Front Bottom Right Color',
    C008: 2, //'Back Top Color',
    C009: 2, //'Back Bottom Color',
    C001: 0, //'Hood/Collar Color',
    C002: 0, //'Upper Sleeve Color',
    C003: 0, //'Lower Sleeve Color',
    C011: 0, //'Main Zipper Color',
    C010: 0, //'Pocket Zipper Color',
    C020: 0, //'Pocket/Flap Color',
    L001: 0, //'Logo: Left Chest',
    L007: 1, //'Logo: Left Sleeve',
    L012: 2, //'Logo: Left Shoulder',
    L013: 2, //'Logo: Mid Back',
  },
};

export const customizerConfiguration = {
  'STY901': STY901,
  'STY902': STY902,
  'STY903': STY903,
  'STY801': STY801,
  'STY802': STY802, //windbreaker
  'STY701': STY701, //synthetic jacket
  'STY702': STY702, //synthetic Vest
};

export const storeByEmailOverrides = {
  'todd@mondorobot.com': 'STR998',
};

export const anglesRequiringLogo = '';
