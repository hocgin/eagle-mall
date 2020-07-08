import request from '@/utils/request';

const API = {
  login: `/api/account/authenticate`,
  calcOrder: `/api-mini/order/calc`,
  getUserInfo: `/api-mini/order/calc`,
  getProvince: `/api/district/province`,
  getCity: `/api/district/city`,
  getCounty: `/api/district/county`,
};

export default {

  login(payload = {}) {
    return request(API.login, {
      method: 'POST',
      body: {...payload,},
    });
  },

  calcOrder(payload = {}) {
    return request(API.calcOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },

  getProvince() {
    return request(API.getProvince, {
      method: 'GET',
    });
  },

  getCity() {
    return request(API.getCity, {
      method: 'GET',
    });
  },

  getCounty() {
    return request(API.getCounty, {
      method: 'GET',
    });
  },


};