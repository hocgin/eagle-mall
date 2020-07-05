import request from '@/utils/request';

const API = {
  login: `/api/account/authenticate`,
  calcOrder: `/api-mini/order/calc`,
};

export default {

  login(payload = {}) {
    return request(API.login, {
      method: 'POST',
      body: { ...payload, },
    });
  },

  calcOrder(payload = {}) {
    return request(API.calcOrder, {
      method: 'POST',
      body: { ...payload, },
    });
  }

};