import { getClient } from '@/services/ApiService/apiManager';
import { config } from '@/config/config';
let alltoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token"))['token']:''
const baseConfig = {
  baseURL: config.endpoints.logo,
//   headers:{
//     contentType: "application/json;charset=utf-8",
//     Authorization: "bearer "+ alltoken
//  }
};

const LogoClient = getClient(baseConfig);

const LogoClient_noInterceptors = getClient(baseConfig, {
  useAuthHeaders: true,
  checkForDataErrors: false,
});

export default class LogoService {
  /**
   * Gets the logos associated with this user/
   * @param {userId} userId
   */
  getLogosForUser(userId) {
    return LogoClient.get(`image/user/${userId}/`);
  }

  getLogos(userId, storeId, groupId) {
    return LogoClient.get(`image/store/${storeId}/group/${groupId}/user/${userId}`);
  }

  /**
   * Deletes a logo for a user
   * @param {userId} userId
   * @param {logoId} logoId
   */
  deleteLogoForUser(userId, logoId) {
    if (!userId || !logoId) return;

    return LogoClient.delete(`upload/${logoId}?userId=${userId}`);
  }

  async createLogo(userId, labNo, name, labType, file) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('params', JSON.stringify({
      'imgName': name,
      'labNo': labNo,
      'labType': labType,
      'userId': userId,
    }));

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return await LogoClient_noInterceptors.post(`uploadAILogo`, formData, config);
  }
}
