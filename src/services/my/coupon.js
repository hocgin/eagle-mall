import request from '@/utils/request';

const API = {
  pagingMyCoupon: `/api-mini/my/coupon/_paging`,
};

export default {

  pagingMyCoupon(payload = {}) {
    return request(API.pagingMyCoupon, {
      method: 'POST',
      body: {...payload,},
    });
  },

};