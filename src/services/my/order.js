import request from '@/utils/request';

const API = {
  pagingMyOrder: `/api-mini/my/order/_paging`,
  createMyOrder: `/api-mini/my/order/create`,
  createRefundApply: `/api-mini/my/order/refund`,
  cancelMyOrder: `/api-mini/my/order/cancel`,
  confirmMyOrder: `/api-mini/my/order/confirm`,
  getAvailableCoupons: `/api-mini/my/order/coupon`,
  getMyOrder: (id) => `/api-mini/my/order/${id}`,
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

  createRefundApply(payload = {}) {
    return request(API.createRefundApply, {
      method: 'POST',
      body: {...payload,},
    });
  },

  getMyOrder({id}) {
    return request(API.getMyOrder(id), {
      method: 'GET',
    });
  },

  cancelMyOrder(payload = {}) {
    return request(API.cancelMyOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },


  confirmMyOrder(payload = {}) {
    return request(API.confirmMyOrder, {
      method: 'POST',
      body: {...payload,},
    });
  },

  getAvailableCoupons(payload = {}) {
    return request(API.getAvailableCoupons, {
      method: 'POST',
      body: {...payload,},
    });
  },

};
