import { getClient } from '@/services/ApiService/apiManager';
import { config } from '@/config/config';
import qs from 'Qs'
const AuthClient = getClient({
  baseURL: config.endpoints.auth,
  headers:{
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Authorization': "Basic aGlnaHJvY2s6VGlhbnNoaUAxOA=="
  }
}, {
  useAuthHeaders: false,
  checkForDataErrors: false,
});

class AuthService {

  async getToken(user, password) {
    // const formData = new FormData();

    // formData.append('grant_type', 'password');
    // formData.append('scope', 'webclient');
    // formData.append('username', user);
    // formData.append('password', password);
    let data = {"grant_type":"password","scope":"webclient",'username':user,'password':password};

    return await AuthClient.post('token', qs.stringify(data), {
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      'Authorization': "Basic aGlnaHJvY2s6VGlhbnNoaUAxOA=="
    });
  }

  async refreshToken(refreshToken) {
    const formData = new FormData();

    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);

    return await AuthClient.post('token', formData, {
      auth: {
        username: process.env.REACT_APP_API_USER,
        password: process.env.REACT_APP_API_PASS,
      },
    });
  }
}

export default AuthService;
