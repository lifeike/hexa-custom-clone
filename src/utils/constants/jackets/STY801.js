export const colorConfiguration = {
  '17': {
    name: 'Midnight Black', //checked
    visible: true,
    buttonColor: '444444',
    imageColor: '444444',
  },
  '42': {
    name: 'Dark Grey',
    visible: true,
    buttonColor: '5C5D5B',
    imageColor: '5C5D5B',
  },
  '41': {
    name: 'River Rock', //checked
    visible: true,
    buttonColor: 'BBBBBB',
    imageColor: '9c9999',
  },
  '1': {
    name: 'Birch White', //checked
    visible: true,
    buttonColor: 'E9E6DC',
    imageColor: 'e2ded0',
  },
  '9': {
    name: 'Chinese Red', //checked
    visible: true,
    buttonColor: 'EA1B1B',
    imageColor: 'c82a2a',
  },
  '18': {
    name: 'Pink', //checked
    visible: true,
    buttonColor: 'F57E8E',
    imageColor: 'f595a1',
  },
  '10': {
    name: 'Dynamite Orange', //checked
    visible: true,
    buttonColor: 'EA693D',
    imageColor: 'e35923',
  },
  '11': {
    name: 'Saffron Yellow', //checked
    visible: true,
    buttonColor: 'FFBA39',
    imageColor: 'f9a62f',
  },
  '33': {
    name: 'Aurora Yellow', //checked
    visible: true,
    buttonColor: 'FFF05D',
    imageColor: 'f0e635',
  },
  '39': {
    name: 'Evergreen', //checked
    visible: true,
    buttonColor: '0B7755',
    imageColor: '0a6f4f',
  },
  '34': {
    name: 'Kale Green', //checked
    visible: true,
    buttonColor: '5A7247',
    imageColor: '69804d',
  },
  '14': {
    name: 'Kombu Green', //checked
    visible: true,
    buttonColor: '3A4032',
    imageColor: '303a24',
  },
  '12': {
    name: 'Jolly Green', //checked
    visible: true,
    buttonColor: '1D9B50',
    imageColor: '219E56',
  },
  '3': {
    name: 'Pool Green', //checked
    visible: true,
    buttonColor: '1EAC9E',
    imageColor: '0fd0b6',
  },
  '5': {
    name: 'Diva Blue', //checked
    visible: true,
    buttonColor: '2AA6E4',
    imageColor: '0097c4',
  },
  '31': {
    name: 'Caneel Blue', //checked
    visible: true,
    buttonColor: '13A0B5',
    imageColor: '04b6bf',
  },
  '35': {
    name: 'Deep Lake', //checked
    visible: true,
    buttonColor: '06585E',
    imageColor: '06666d',
  },
  '7': {
    name: 'Estate Blue', //checked
    visible: true,
    buttonColor: '243757',
    imageColor: '243757',
  },
  '40': {
    name: 'Royal Blue', //checked
    visible: false,
    buttonColor: '3659AE',
    imageColor: '33468a',
  },
  '15': {
    name: 'Starfish Purple',
    visible: true,
    buttonColor: '682D5C',
    imageColor: '63385a',
  },
  '6': {
    name: 'Willow Gray',
    visible: true,
    buttonColor: 'B7B6A1',
    imageColor: '919174',
  },
  '16': {
    name: 'Potent Purple',
    visible: true,
    buttonColor: '462639',
    imageColor: '462639',
  },
  '13': {
    name: 'Red Ochre',
    visible: true,
    buttonColor: '8F413D',
    imageColor: '8F413D',
  },
  '2': {
    name: 'Autumn Yellow',
    visible: true,
    buttonColor: 'F48850',
    imageColor: 'F48850',
  },
  '4': {
    name: 'Primrose Yellow',
    visible: true,
    buttonColor: 'F3CF55',
    imageColor: 'F3CF55',
  },
};

export const STY801 = {
  angleName: 'rain_jacket',
  hoodFeatureId: 'F002',
  pocketFeatureId: 'F003',
  anglesShowingPocket: ['1','2','9','3','4','10'],
  pocketTranslationsByAngle: {
    '3': {
      'leftpocket': 'pocket',
      'rightpocket': 'nopocket',
      'bothpockets': 'pocket',
    },
    '4': {
      'leftpocket': 'nopocket',
      'rightpocket': 'pocket',
      'bothpockets': 'pocket',
    },
    '10': {
      'leftpocket': 'pocket',
      'rightpocket': 'nopocket',
      'bothpockets': 'pocket',
    },
  },
  supportsHood: false,
  pocketTranslations: {
    'nochestpocket': 'nopocket',
    'leftchestpocket': 'leftpocket',
    'rightchestpocket': 'rightpocket',
    'left&rightchestpocket': 'bothpockets',
  },
  imageNameToStyleOption: {
    'labels': '',
    'hood_color': 'C001',
    'body_color': 'C009',
    'chest_color': 'C007',
    'bottom_color': 'C011',
    'chest_zipper_color': 'C020',
    'collar_zipper_color': 'C019',
    'main_zipper_color': 'C018',
    'pocket_zipper_color': 'C022',
    'sleeve_bottom_color': 'C014',
    'sleeve_top_color': 'C013',
    'back_color': 'C017',
  },
  colorConfiguration,
  angleToLogoMap: {
    1: ['L001'],
    2: ['L001'],
    3: ['L007'],
    5: ['L012', 'L009'],
    6: ['L009','L012'],
    7: ['L010'],
    8: ['L009'],
    9: ['L001'],
    10: ['L007'],
    11: ['L012'],
  },
  additionalOperations: {
    'C001': [{
      item_effect: 'C019', //Hood color left
      operation: '3',
    }],
  },
  additionalOperationsAffected: ['C019'],
  styleClassifications: {
    'features': {
      'F002': 'Hood Shape',
      'F003': 'Chest Pocket(s)',
    },
    'colors': {
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
      'L007': 'Left Sleeve Logo',
      'L009': 'Right Shoulder Logo',
      'L012': 'Lower Back Logo',
    },
    'zippers': {
      'C018': 'Main Zipper',
      'C020': 'Chest Pocket Zipper(s)',
      'C022': 'Lower Pocket Zippers',
    },
  },
};
