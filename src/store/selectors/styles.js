import { createSelector } from 'reselect';

export const productsSelector = state => state.styles.jackets;

export const productSelectedOptionSelector = (products, styleId, featureId, optionId) => {
  if (products && Object.keys(products).length > 0 && featureId && optionId) {
    return products[styleId].features[featureId].options.find(option => option.option_no === optionId || option.optionNo === optionId);
  }

  return {};
};

export const featuresByStyleId = id => {
  return createSelector(
    [productsSelector],
    (products) => {
      return products[id];
    }
  );
};
