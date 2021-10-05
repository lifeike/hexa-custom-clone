import { getClient } from '@/services/ApiService/apiManager';
import { ROLES } from '@/utils/constants/constants';
import { config } from '@/config/config';
let alltoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token"))['token']:''
const AccountClient = getClient({
  baseURL: config.endpoints.account,
  // headers:{
  //    contentType: "application/json;charset=utf-8",
  //    Authorization: "bearer "+ alltoken
  // }
});

// Need a new client without generating error messages.
const resetPasswordClient = getClient({
  baseURL: config.endpoints.account,
}, {
  useAuthHeaders: false,
  checkForDataErrors: false,
});

class AccountService {

  login(credentials) {
    return AccountClient.post('sessions', {
      email: credentials.email,
      password: credentials.password,
    })
      .then(payload => {
        //Do parsing or normalization here.
        payload.data.result.user.token = payload.data.result.token;
        payload.data.result.user.roles = this.getUserRoles(payload.data.result.user);

        return Promise.resolve(payload.data.result.user);
      });
  }

  getUserRoles(user) {
    const roles = [ ROLES.USER ];

    if (user.id === 125) {
      roles.push(ROLES.SUPER_ADMIN);
    }

    return roles;
  }

  sendPassWordResetEmail(email) {
    resetPasswordClient.post('password', {
      "email": email,
    });

    // We don't care about success or failure, always show success.
    return Promise.resolve();
  }

  resetPassword(password, token) {
    return resetPasswordClient.put('password/reset', {
      password: password,
      token: token,
    });
  }
}

export default AccountService;
