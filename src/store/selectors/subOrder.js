import createCachedSelector from 're-reselect';

import { productSelectedOptionSelector, productsSelector } from '@/store/selectors/styles';
import { sizeOptions } from '@/utils/constants/lookups';
import { customizerConfig } from '@/config/customizerConfig';
import { anglesRequiringLogo } from '@/utils/constants/lookups';
import { logoPlacementConfig } from '@/config/logoPlacementConfig';
import {getWindbreakerFiles, hasFlap} from './module';

export const getOrderSubs = (order, isOrder) => isOrder ? order.orderSubs : order.cartSubs;
export const getSubId = (sub, isOrder) => isOrder ? sub.order_sub_no : sub.cartSubNo;
export const getSubQuantity = (sub, isOrder) => isOrder ? sub.num : sub.quantity;
export const getStyle = (sub, isOrder) => isOrder ? sub.style_no: sub.styleNo;
export const getId = (order, isOrder) => isOrder ? order.order_no : order.cartNo;
export const getOptionId = (option, isOrder) => isOrder ? option.option_no : option.optionNo;
export const getInputContent = (option, isOrder) => isOrder ? option.input_content : option.inputContent;

export const getSelectedOptionObject = (sub, isOrder, optionType) => {
  if (!optionType) return '';

  if (isOrder) {
    return sub.orderDetails.find(detail => detail.item_no === optionType);
  }

  return sub.cartSubDetail.find(detail => detail.itemNo === optionType);
};

export const getSelectedOption = (sub, isOrder, optionType) => {
  const option = getSelectedOptionObject(sub, isOrder, optionType);

  return option ? getOptionId(option, isOrder) : null;
};

/**
 * Returns an object representing the order details line item
 */
export const getSubOrder = (jackets, subOrder, isOrder) => {
  if (!subOrder || Object.keys(jackets).length <= 0) return null;

  const styleId = getStyle(subOrder, isOrder);

  const sub = {
    id: getSubId(subOrder, isOrder),
    quantity: getSubQuantity(subOrder, isOrder),
    gender: productSelectedOptionSelector(jackets, styleId, sizeOptions.gender, getSelectedOption(subOrder, isOrder, sizeOptions.gender)),
    size: productSelectedOptionSelector(jackets, styleId, sizeOptions.size, getSelectedOption(subOrder, isOrder, sizeOptions.size)),
    fit: productSelectedOptionSelector(jackets, styleId, sizeOptions.fit, getSelectedOption(subOrder, isOrder, sizeOptions.fit)),
    sleeve: productSelectedOptionSelector(jackets, styleId, sizeOptions.sleeve, getSelectedOption(subOrder, isOrder, sizeOptions.sleeve)),
  };

  return sub;
};

/**
 * Calculates summary items, could be an order or a cart. Cart and order shape differ.
 */
export const getSubOrders = createCachedSelector(
  [state => state.selectedOrder.order, productsSelector],
  (order, jackets) => {
    if (!order || Object.keys(jackets).length <= 0 ) return null;

    //loop over the sub orders and build order details viewm model.
    return getOrderSubs(order.order, order.isOrder).map(cartSub => {
      return {
        id: getId(order.order, order.isOrder),
        cartSub: cartSub,
        viewData: getSubOrder(jackets, cartSub, order.isOrder),
      };
    });
  }
)(
  // Cachekey
  (order) => `${order.groupId}_subOrders`
);

/**
 * Get's the selected logo for a feature
 */
export const getSelectedLogoUrl = (order, featureId) => {
  const isOrder = order.isOrder;

  const subs = getOrderSubs(order.order, isOrder);

  if (Object.keys(subs).length <= 0 || !featureId) return null;

  const subOrder = subs[0];
  const selectedOption = getSelectedOptionObject(subOrder, isOrder, featureId);
  const url = getInputContent(selectedOption, isOrder);

  return url;
};

/**
 * Get's the style of the product from sub order.
 */
export const getProductStyle = createCachedSelector(
  [state => state.selectedOrder.order, productsSelector],
  (order, jackets) => {
    const isOrder = order.isOrder;
    const subs = getOrderSubs(order.order, isOrder);

    if (Object.keys(subs).length <= 0 || Object.keys(jackets).length <= 0) return null;

    const subOrder = subs[0];

    return jackets[getStyle(subOrder, isOrder)];
  }
)(
  // Cachekey
  (order) => `${order.groupId || ''}_productStyle`
);

export const getColorsOutOfInventory = createCachedSelector(
  [state => state.selectedOrder.order, state => state.styles.jackets, state => state.colors.colors],
  (order, jackets, colors) => {
    const outOfInventoryItems = [];

    if (!order) return [];

    const isOrder = order.isOrder;

    const subs = getOrderSubs(order.order, isOrder);

    if (Object.keys(subs).length <= 0) {
      return null;
    }

    const subOrder = subs[0];
    const jacketStyleId = getStyle(subOrder, isOrder);
    const jacketStyle = jackets[jacketStyleId];

    if (!jacketStyle) return null;

    //Skip the rest if there are no inventory issues.
    if (!jacketStyle.hasInventoryProblems) {
      return outOfInventoryItems;
    }

    const styleClassifications = order.config.styleClassifications;

    const colorFeatures = Object.keys({ ...styleClassifications.colors, ...styleClassifications.zippers });

    colorFeatures.forEach(feature => {
      const option = productSelectedOptionSelector(jackets, jacketStyleId, feature, getSelectedOption(subOrder, isOrder, feature));

      if (option.outOfInventory) {
        const colorName = `${styleClassifications.zippers[feature] ? 'Zipper' : 'Fabric'}: ${colors[option.color_id].name.trim()}`;

        if (!outOfInventoryItems.includes(colorName)) {
          outOfInventoryItems.push(colorName);
        }
      }
    });

    return outOfInventoryItems;
  }
)(
  // Cachekey
  (order) => `${order.groupId || ''}_getOutOfInventoryItems`
);

/**
 * Get's the angles to show in customizer based on jacket gender and selected options.
 */
export const getCustomizerAngles = createCachedSelector(
  [state => state.selectedOrder.order, state => state.styles.jackets, state => state.colors.colors, (state, props) => props.gender],
  (order, jackets, colors, gender) => {
    const isOrder = order.isOrder;
    const subs = getOrderSubs(order.order, isOrder);

    if (Object.keys(subs).length <= 0 || Object.keys(jackets).length <= 0) return 0;
    const subOrder = subs[0];
    const jacketStyle = getStyle(subOrder, isOrder);
    const productConfiguration = order.config;

    const jacketIdentifier = productConfiguration.angleName;

    const hoodFeatureId = productConfiguration.hoodFeatureId;
    const pocketFeatureId = productConfiguration.pocketFeatureId;

    let pocketIdentifier = productSelectedOptionSelector(jackets, jacketStyle, pocketFeatureId, getSelectedOption(subOrder, isOrder, pocketFeatureId)).name.replace(/ /g,'').toLowerCase();

    pocketIdentifier = productConfiguration.pocketTranslations[pocketIdentifier] || pocketIdentifier;
    const hoodIdentifier = productSelectedOptionSelector(jackets, jacketStyle, hoodFeatureId, getSelectedOption(subOrder, isOrder, hoodFeatureId)).name.replace(/ /g,'').toLowerCase();

    const jacketType = `${gender.toLowerCase()}_${jacketIdentifier}_${hoodIdentifier}`;

    const angles = customizerConfig[jacketIdentifier][jacketType];
    const normalizedAngles = {};

    Object.keys(angles).forEach((angle, idx) => {
      let files = [];
      const angleIdx = angle.substr(0,2).match(/\d+/)[0];

      let pocketFolder = pocketIdentifier;

      const isWindbreaker = angle.toLowerCase().includes('windbreaker') || angle.toLowerCase().includes('wind breaker');

      // Adjust file path for angles having imagery for a single pocket.
      const angleSpecificTranslation = productConfiguration.pocketTranslationsByAngle[angleIdx];

      if (angleSpecificTranslation) {
        pocketFolder = angleSpecificTranslation[pocketFolder] || pocketFolder;
      }

      // if (productConfiguration.anglesShowingSinglePocket.includes(angleIdx)) {
      //   if (pocketFolder !== 'nopocket') {
      //     pocketFolder = 'pocket';
      //   }
      // }

      try {
        if(isWindbreaker) {
          files = getWindbreakerFiles(angles[angle], subOrder);
        }
        else if (productConfiguration.anglesShowingPocket.includes(angleIdx)) {
          // look for pocket no-pocket.
          files = angles[angle][pocketFolder].files;
        }
        else {
          files = angles[angle].files;
        }
      }
      catch(e) {
        // eslint-disable-next-line no-console
        console.log(`Error loading ${angle}.${pocketFolder || ''}`);
        console.log(e);
      }

      // get selected color options for each file.
      normalizedAngles[idx] = {
        angleIndex: angleIdx,
        files: files.map(file => {
          const image_name = file.split('\\').pop().split('/').pop().split('.').shift();
          const styleId = productConfiguration.imageNameToStyleOption[image_name];

          const config = {
            imageSrc: `${process.env.PUBLIC_URL}/${file}`,
          };

          if (styleId) {
            try {
              //if were dealing with a windbreaker, the hands_pocket color is determined by flap_pocket option.
              //  if flaps are present, hands_pocket color is based on 'C020', but if flaps are not present,
              //  hands_pocket color is based on 'C010'. We should have separate images for this but we don't. :shrug:

              const overrideStyle = isWindbreaker && styleId === 'C020' && !hasFlap(subOrder) ? 'C010' : styleId;
              const selected = getSelectedOption(subOrder, isOrder, overrideStyle);
              const opt = productSelectedOptionSelector(jackets, jacketStyle, overrideStyle, selected);

              config.color = colors[opt.color_id];
            }
            // eslint-disable-next-line no-empty
            catch(e) {
            }
          }

          return config;
        }),
      };

      const angleLogoFeatures = productConfiguration.angleToLogoMap[angleIdx];

      if (angleLogoFeatures) {
        let foundLogo = false;

        normalizedAngles[idx].logoConfig = [];
        angleLogoFeatures.forEach(angleLogoFeature => {
          let logo = null;
          const selected = getSelectedOptionObject(subOrder, isOrder, angleLogoFeature);

          if (selected) {
            logo = getInputContent(selected, isOrder);
          }

          if (logo) {
            foundLogo = true;
            let logoConfigKey = angle;

            if ( productConfiguration.anglesShowingPocket.includes(angleIdx) ) {
              logoConfigKey += `_${pocketFolder}`;
            }

            const logoConfig = logoPlacementConfig[`${angleLogoFeature}_${logoConfigKey}`];

            if (logoConfig) {
              normalizedAngles[idx].logoConfig.push({
                ...logoConfig,
                url: logo,
              });
            }
          }
        });

        if (anglesRequiringLogo.includes(angle.substr(0,1)) && !foundLogo) {
          delete normalizedAngles[idx];
        }
      }
    });

    return normalizedAngles;
  }
)(
  // Cachekey
  (order) => order ? `${order.groupId || ''}_angles`: 'blank_angles'
);

/**
 * Selector to provide the selected feature data.
 */
export const getFeatureInfoList = createCachedSelector(
  // inputSelectors
  [state => state.selectedOrder.order, state => state.styles.jackets, state => state.colors.colors],
  (order, jackets, colors) => {
    const isOrder = order.isOrder;
    const subs = getOrderSubs(order.order, isOrder);

    if (Object.keys(subs).length <= 0 || Object.keys(jackets).length <= 0) return 0;

    const subOrder = subs[0];
    const jacketStyle = getStyle(subOrder, isOrder);

    const featureList = {};
    const styleClassifications = order.config.styleClassifications;

    Object.keys(styleClassifications).forEach(classification => {
      Object.keys(styleClassifications[classification]).forEach(option => {
        let selectedOption = productSelectedOptionSelector(jackets, jacketStyle, option, getSelectedOption(subOrder, isOrder, option));

        if (!selectedOption) {
          selectedOption = getSelectedOption(subOrder, isOrder, option);
        }

        const colorId = selectedOption['color_id'];

        let colorHexCode = null;

        let content = null;

        if (colorId) {
          colorHexCode = colors[colorId].no;
        }

        // If it is a logo, we have to look at the input_content
        if (styleClassifications.personalization[option]) {
          const feature = getSelectedOptionObject(subOrder, isOrder, option);

          if (feature) {
            content = feature.inputContent || feature.input_content;
          }
        }

        featureList[option] = {
          ...selectedOption,
          color: colorHexCode,
          content: content,
        };
      });
    });

    return featureList;
  }
)(
  // Cachekey
  (order) => `${order.groupId || ''}_featureInfoList`
);
