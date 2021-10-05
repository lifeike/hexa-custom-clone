export const setTokenInformation = data => {
  const {data: {access_token, refresh_token, expires_in}} = data;

  const tokenExpiration = new Date();

  tokenExpiration.setSeconds(tokenExpiration.getSeconds() + expires_in);

  const token = {
    token: access_token,
    refreshToken: refresh_token,
    timestamp: new Date(),
    expiration: tokenExpiration,
  };

  localStorage.setItem('token', JSON.stringify(token));

  return token;
};

export const getTokenInformation = () => {
  const tokenString = localStorage.getItem('token');

  let token;

  if (tokenString) {
    token = JSON.parse(tokenString);

    if (new Date(token.expiration) < new Date()) {
      return null;
    }
  }

  return token.token;
  //  return {
  //   token:'aGlnaHJvY2s6VGlhbnNoaUAxOA=='
  //  }
};
