import request from '@/utils/request';

const API = {
  pagingMyShoppingCart: `/api-mini/my/shop-cart/_paging`,
  addMyShoppingCart: `/api-mini/my/shop-cart`,
  updateMyShoppingCart: `/api-mini/my/shop-cart`,
  deleteMyShoppingCart: `/api-mini/my/shop-cart`,
};

export default {

  pagingMyShoppingCart(payload = {}) {
    return request(API.pagingMyShoppingCart, {
      method: 'POST',
      body: {...payload,},
    });
  },
  addMyShoppingCart(payload = {}) {
    return request(API.addMyShoppingCart, {
      method: 'POST',
      body: {...payload,},
    });
  },
  updateMyShoppingCart(payload = {}) {
    return request(API.updateMyShoppingCart, {
      method: 'PUT',
      body: {...payload,},
    });
  },
  deleteMyShoppingCart({...payload}) {
    return request(API.deleteMyShoppingCart, {
      method: 'DELETE',
      body: {...payload,},
    });
  },

};