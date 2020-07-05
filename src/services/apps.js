import request from '@/utils/request';

const API = {
  login: `/api/account/authenticate`,
};

export default {

  login(payload = {}) {
    return request(API.login, {
      method: 'POST',
      body: {
        ...payload,
      },
    });
  }

};