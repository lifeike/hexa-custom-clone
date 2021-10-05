import {
  Styles,
  LogoOptions,
  StyleMaster,
} from '@/store/types/actions';
import { storeByEmailOverrides, oldStyles, customizerConfiguration } from '@/utils/constants/lookups';
import { loading } from '@/store/actions/loading';
import { normalizeProduct } from '@/store/normalizers/styles';
import { Store } from '@/store/store';

export const stylesLoading = () => ({
  type: Styles.LOADING,
});

export const stylesSuccess = data => ({
  type: Styles.SUCCESS,
  data: data,
});

export const stylesError = () => ({
  type: Styles.ERROR,
});

/**
 * A function used to preload all the static data for the app.
 */
export const loadBaseStyles = () => async (dispatch, getState, { StyleService }) => {
  let {
    account: {
      user: {
        storeNo: store,
        email,
      },
    },
  } = getState();

  if (!store) {
    store = storeByEmailOverrides[email] || '';
  }
  dispatch(loading('BaseStyles', true));
  dispatch(stylesLoading());

  try {
    const { data: { data: {styles} }} = await StyleService.getAllStyles(store);

    const normalized = {};
    // get the options by store and style

    const validStyles =  Object.values(styles).filter(value => !oldStyles.includes(value.style_no));

    await Promise.all(validStyles.map(async product => {
      const  {data: { data: style } } = await StyleService.getStylesByStoreStyle(store, product.style_no);

      const normalizedStyle = normalizeProduct(style);

      await restoreMissingColors(normalizedStyle);

      normalized[product.style_no] = normalizedStyle;
      //If any colors are missing we need to restore.
    }));

    dispatch(stylesSuccess(normalized));
  }
  catch(e) {
    dispatch(stylesError());
  }
  finally {
    dispatch(loading('BaseStyles', false));
  }
};

const restoreMissingColors = async style => {

  const styleClassifications = customizerConfiguration[style.style_no].styleClassifications;
  const additionalLayers = customizerConfiguration[style.style_no].additionalOperationsAffected;

  const colorFeatures = Object.keys({ ...styleClassifications.colors, ...styleClassifications.zippers }).concat(additionalLayers);

  const colorConfiguration = customizerConfiguration[style.style_no.toUpperCase()].colorConfiguration;
  const visibleColors = Object.keys(colorConfiguration).filter(color => colorConfiguration[color].visible);

  // loop over every feature that is color based.
  for (let i=0; i < colorFeatures.length; i++) {
    const feature = colorFeatures[i];
    // For every color check to make sure it is an option

    for (let j=0; j < visibleColors.length; j++) {
      try {
        const color = visibleColors[j];

        // If style is missing a feature such as when a vest has no sleeves, then move on.
        if (!style.features[feature]) continue;

        const found = style.features[feature].options.find(option => option.color_id === Number(color));

        // If the style doesn't contain the color, then it is out of inventory.
        // Find the color information on master color list for display purpose.
        // Show as out of inventory
        if (!found) {
          await Store.dispatch(getStyleMasterData(style.style_no));
          const master = Store.getState().styleMaster[style.style_no];

          const option = master.options.find(option => {
            return option.item_no === feature && option.color_id === Number(color);
          });

          if (!option) {
            continue;
          }

          style.hasInventoryProblems = true;
          option.outOfInventory = true;
          option.visible = true;

          style.features[feature].options.push(option);

          //Check to see if there is an affected feature that also needs to be updated such as left and right side panels.
          const affected = style.operations[feature];

          if (affected) {
            style.features[affected.item_effect].options.push(option);
          }
        }
      }
      // eslint-disable-next-line no-empty
      catch(e) {
      }
    }
  }
};

export const getLogoOptions = () => async (dispatch, getState, { StyleService }) => {
  dispatch(loading('getLogoOptions', true));

  try {
    let {
      account: {
        user: {
          storeNo: store,
        },
      },
      selectedOrder: {
        order,
      },
    } = getState();

    const style = order.order.cartSubs[0].styleNo;

    const logos = await StyleService.getLogoOptionsByStyle(style, store);

    dispatch({
      'type': LogoOptions.SUCCESS,
      'data': {...logos},
    });
  }
  finally {
    dispatch(loading('getLogoOptions', false));
  }
};

export const getStyleMasterData = styleId => async (dispatch, getState, { StyleService }) => {
  if (getState().styleMaster[styleId]) return;
  dispatch(loading('getStyleMasterData', true));

  try {
    const masterStyles = await StyleService.getStyleMasterData(styleId);

    dispatch({
      type: StyleMaster.SUCCESS,
      data: masterStyles,
    });
  }
  finally {
    dispatch(loading('getStyleMasterData', false));
  }
};
