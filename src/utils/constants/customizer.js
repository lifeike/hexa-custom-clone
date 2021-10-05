/*
This file is for customizations that change from jacket to jacket do to photography requirements.
*/

// styles for jacket, stuffed_jacket, vest.
export const imageNameToStyleOption = {
  'body_color': 'I009',
  'hood_collar_color': 'I004',
  'left_sleeve_color': 'I006',
  'right_sleeve_color': 'I007',
  'main_zipper_color': 'I016',
  'pocket_zipper_color': 'I017',
  'shoulder_color': 'I008',
  'side_panel_color': 'I010',
  'inside_liner_color': 'I011',
  'lining_color': 'I011',
  'labels': '',
};

export const styleClassifications = {
  'features': {
    'I002': 'Down Type',
    'I003': 'Hood',
    'I005': 'Chest Pocket',
  },
  'colors': {
    'I009': 'Body',
    'I008': 'Shoulders',
    'I004': 'Hood',
    'I007': 'Right Sleeve',
    'I006': 'Left Sleeve',
    'I010': 'Side Panels',
    'I011': 'Liner',
    'C001': 'Hood',
    'C007': 'Chest',
    'C009': 'Upper Body',
    'C011': 'Lower Body',
    'C017': 'Back',
    'C013': 'Upper Sleeve',
    'C014': 'Lower Sleeve',
  },
  'personalization': {
    'L001': 'Chest Logo',
    'L010': 'Inner Logo',
    'L011': 'Back Logo',
    'L012': 'Lower Back Logo',
    'L007': 'Left Sleeve Logo',
  },
  'zippers': {
    'I016': 'Center Zipper',
    'I017': 'Pocket Zippers',
    'C018': 'Main Zipper',
    'C020': 'Chest Pocket Zipper(s)',
    'C022': 'Lower Pocket Zippers',
  },
};

export const colorConfiguration = {
  '17': {
    name: 'Midnight Black',
    visible: true,
    buttonColor: '2E2E2E',
    imageColor: '19191a',
  },
  '42': {
    name: 'Dark Grey',
    visible: true,
    buttonColor: '5C5D5B',
    imageColor: '5C5D5B',
  },
  '8': {
    name: 'Asphalt Gray',
    visible: true,
    buttonColor: '484B4C',
    imageColor: '383b3c',
  },
  '41': {
    name: 'River Rock',
    visible: false,
    buttonColor: 'BBBBBB',
    imageColor: '827E7C',
  },
  '6': {
    name: 'Willow Gray',
    visible: true,
    buttonColor: 'AEAFA4',
    imageColor: 'AEAFA4',
  },
  '1': {
    name: 'Birch White',
    visible: true,
    buttonColor: 'E4E0D6',
    imageColor: 'ccc1a5',
  },
  '13': {
    name: 'Dahlia Red',
    visible: true,
    buttonColor: '903840',
    imageColor: '6c1b1e',
  },
  '9': {
    name: 'Chinese Red',
    visible: true,
    buttonColor: 'CE3239',
    imageColor: 'b01008',
  },
  '18': {
    name: 'Flamingo Pink',
    visible: true,
    buttonColor: 'FD8B91',
    imageColor: 'ff6b6b',
  },
  '10': {
    name: 'Dynamite Orange',
    visible: true,
    buttonColor: 'E8462C',
    imageColor: 'df2f00',
  },
  '2': {
    name: 'Russet Orange',
    visible: true,
    buttonColor: 'D2722F',
    imageColor: 'b94a00',
  },
  '11': {
    name: 'Saffron Yellow',
    visible: true,
    buttonColor: 'FAA147',
    imageColor: 'f89225',
  },
  '33': {
    name: 'Aurora Yellow',
    visible: true,
    buttonColor: 'EBDC4B',
    imageColor: 'dec703',
  },
  '39': {
    name: 'Evergreen',
    visible: false,
    buttonColor: '0B7755',
    imageColor: '11574A',
  },
  '4': {
    name: 'Pear Green',
    visible: true,
    buttonColor: 'BDB859',
    imageColor: '9f9828',
  },
  '34': {
    name: 'Kale Green',
    visible: true,
    buttonColor: '779250',
    imageColor: '556f29',
  },
  '14': {
    name: 'Kombu Green',
    visible: true,
    buttonColor: '495437',
    imageColor: '2c3719',
  },
  '12': {
    name: 'Jolly Green',
    visible: true,
    buttonColor: '2FA562',
    imageColor: '0c7a35',
  },
  '3': {
    name: 'Pool Green',
    visible: true,
    buttonColor: '33CCAE',
    imageColor: '1cb992',
  },
  '5': {
    name: 'Diva Blue',
    visible: true,
    buttonColor: '1FA1C5',
    imageColor: '0077ae',
  },
  '31': {
    name: 'Caneel Blue',
    visible: true,
    buttonColor: '1BC0C9',
    imageColor: '0eb3c2',
  },
  '35': {
    name: 'Shaded Spruce',
    visible: true,
    buttonColor: '42736D',
    imageColor: '1c4a44',
  },
  '7': {
    name: 'Estate Blue',
    visible: true,
    buttonColor: '3D5772',
    imageColor: '233b58',
  },
  '40': {
    name: 'Royal Blue',
    visible: false,
    buttonColor: '3659AE',
    imageColor: '3D428B',
  },
  '16': {
    name: 'Imperial Purple',
    visible: true,
    buttonColor: '82498F',
    imageColor: '652e74',
  },
  '15': {
    name: 'Starfish Purple',
    visible: true,
    buttonColor: '8E466A',
    imageColor: '692548',
  },
  '32': {
    name: 'Royal Lilac',
    visible: true,
    buttonColor: 'A672A8',
    imageColor: '7f4c85',
  },
  //new props
};

const angleToLogoMap = {
  1: ['L001'],
  2: ['L007'],
  3: ['L011'],
  5: ['L001'],
  6: ['L001'],
  7: ['L007'],
  8: ['L010'],
  9: ['L011'],
};

export const baseConfiguration = {
  angleName: 'jacket',
  hoodFeatureId: 'I003',
  pocketFeatureId: 'I005',
  anglesShowingPocket: ['1','2','5','6','7'],
  pocketTranslationsByAngle: {},
  supportsHood: true,
  pocketTranslations: {},
  imageNameToStyleOption,
  colorConfiguration,
  angleToLogoMap,
  additionalOperations: {},
  additionalOperationsAffected: [],
  styleClassifications,
};

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
