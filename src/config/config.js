const configs = {
  develop: {
    endpoints: {
      account: 'https://stagegroupapi.atauro72.com/userService/user/',
      styles: 'https://stagegroupapi.atauro72.com/modelService/',
      group: 'https://stagegroupapi.atauro72.com/groupService/groups/',
      auth: 'https://stageauth.atauro72.com/auth/oauth/',
      logo: 'https://stagefile.atauro72.com',
      payment: 'https://stagegroupapi.atauro72.com/paymentCheck/',
    },
    debug: true,
  },
  // staging: {
  //   endpoints: {
  //     account: 'https://stagegroupapi.atauro72.com/userService/user/',
  //     styles: 'https://stagegroupapi.atauro72.com/modelService/',
  //     group: 'https://stagegroupapi.atauro72.com/groupService/groups/',
  //     auth: 'https://stageauth.atauro72.com/auth/oauth/',
  //     logo: 'https://stagefile.atauro72.com',
  //     payment: 'https://stagegroupapi.atauro72.com/paymentCheck/',
  //   },
  //   debug: true,
  // },
  // production: {
  //   endpoints: {
  //     account: 'https://groupapi.atauro72.com/userService/user/',
  //     styles: 'https://groupapi.atauro72.com/modelService/',
  //     group: 'https://groupapi.atauro72.com/groupService/groups/',
  //     auth: 'https://auth.atauro72.com/auth/oauth/',
  //     logo: 'https://file.atauro72.com',
  //     payment: 'https://groupapi.atauro72.com/paymentCheck/',
  //   },
  //   debug: false,
  // },
};

const getConfig = () => {
  // if (configs[process.env.REACT_APP_CONFIG]) {
  //   return configs[process.env.REACT_APP_CONFIG];
  // }

  return configs['develop'];
};

export const config = getConfig();
