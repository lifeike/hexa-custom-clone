export const normalizeProduct = (product, styleId) => {

  const jacket = {
    ...product.cp_style,
    features: {},
    operations: {},
    operationAffected: [],
  };

  product.cp_style.cp_style_item.forEach(feature => {
    jacket.features[feature.item_no] = feature;
    jacket.features[feature.item_no]['options'] = [];

    feature.cp_style_item_option.forEach(option => {
      jacket.features[feature.item_no]['options'].push(option);
    });

    // Remove unnormalized data.
    delete jacket.features[feature.item_no].cp_style_item_option;
  });

  product.cp_style_item_compatible.forEach(operation => {
    // Operations come back for all styles.
    if (operation.style_no === product.cp_style.style_no) {
      jacket.operations[operation.item_base] = operation;
      // // Do operations both ways.
      // jacket.operations[operation.item_effect] = {
      //   ...operation,
      //   ...{
      //     item_base: operation.item_effect,
      //     item_effect: operation.item_base,
      //   },
      // };
      jacket.operationAffected.push(operation.item_effect);
    }
  });

  // Remove unnormalized data.
  delete jacket.cp_style_item;

  return jacket;
};
