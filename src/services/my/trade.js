import request from '@/utils/request';
import {stringify} from 'qs';

const API = {
  getWaitPaymentOrder: (queryString) => `/api/payment/trade?${queryString}`,
  payTrade: `/api/payment/pay`,
};

export default {

  getWaitPaymentOrder(payload = {}) {
    return request(API.getWaitPaymentOrder(stringify(payload)), {
      method: 'GET',
    });
  },

  payTrade(payload = {}) {
    return request(API.payTrade, {
      method: 'POST',
      body: {
        ...payload
      }
    });
  },

};