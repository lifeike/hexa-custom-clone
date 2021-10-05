import {StyleNames, windbreakerStyleNames} from '../../utils/constants/lookups';

const isDownOption = id => StyleNames[id] === 'Down Type';
const isLowerBackLogo = id => StyleNames[id] === 'Logo: Lower Back';

const isSyntheticJacket = styleNo => styleNo === 'STY701';
const isSyntheticVest = styleNo => styleNo === 'STY702';
const isSynthetic = styleNo => isSyntheticJacket(styleNo) || isSyntheticVest(styleNo);

//'Down Type' should be referred to as 'Insulation Type' for synthetic jacket. Ideally this is handled at API level....
export const toFeatureTitle = (id, styleNo) => {

  if( isDownOption(id) && isSynthetic(styleNo) ) {
    return 'Insulation Type';
  }

  if( isLowerBackLogo(id) && isSyntheticVest(styleNo) ) {
    return 'Logo: Upper Back';
  }

  const styleNames = styleNo === 'STY802' ? windbreakerStyleNames : StyleNames;

  return styleNames[id];
};