import request from '@/utils/request';

const API = {
  pagingMyOrder: `/api-mini/my/order/_paging`,
};

export default {

  pagingMyOrder(payload = {}) {
    return request(API.pagingMyOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },

};