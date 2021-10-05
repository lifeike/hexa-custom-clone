import { getClient } from '@/services/ApiService/apiManager';
import { config } from '@/config/config';
import { arrayToObject } from '@/utils/helpers';
let alltoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token"))['token']:''
const StyleClient = getClient({
  baseURL: config.endpoints.styles,
//   headers:{
//     contentType: "application/json;charset=utf-8",
//     Authorization: "bearer "+ alltoken
//  }
});

class StyleService {

  /**
   * Returns an all of the colors for looking up hex values by name or id.
   * The slash at the end is important. ***
   */
  getColors() {
    return StyleClient.get('api/colors/');
  }

  /**
   * Returns all colors for a given style.
   */
  getColorsByStyle(style) {
    return StyleClient.get(`api/colors/${style}`, {'style_no': style});
  }

  /**
   * Returns all of the Styles and Recommendations for a styles.
   */
  async getAllStyles(storeId) {
    return await StyleClient.get(`api/styles/${storeId}`);
  }

  /**
   * Returns styles for a given store and style.
   */
  async getStylesByStoreStyle(store, style) {
    return  await StyleClient.get(`api/styles/${store}/${style}`);
  }

  /** Return Recommendation by Id. */
  getRecommendationsById(id) {
    return StyleClient.get(`api/recommendations/${id}`);
  }

  /** Return Recommendation by style. */
  getRecommendationsByStyle(style) {
    return StyleClient.get(`api/recommendations/${style}`);
  }

  async getLogoOptionsByStyle(styleId, storeId) {
    const options = await StyleClient.get(`api/styles/logo/${storeId}/${styleId}`);

    if(!options.data.data) {
      return {};
    }

    const {data: {data: { logo_item: logoOptions }}} = options;

    return arrayToObject(logoOptions, 'item_no');
  }

  async getStyleMasterData(styleId) {
    const data =  await StyleClient.get(`styles/${styleId}`);

    const { data: { cp_style_item_option: options, cp_style_item: features } } = data;

    const normalized = {};

    normalized[styleId] = {
      options: options,
      features: features,
    };

    return normalized;
  }
}

export default StyleService;
