import request from '@/utils/request';

const API = {
  pagingMyOrder: `/api-mini/my/order/_paging`,
  createMyOrder: `/api-mini/my/order/create`,
};

export default {

  pagingMyOrder(payload = {}) {
    return request(API.pagingMyOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },

  createMyOrder(payload = {}) {
    return request(API.createMyOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },

};