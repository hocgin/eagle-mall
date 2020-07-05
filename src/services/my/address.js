import request from '@/utils/request';

const API = {
  addMyAddress: `/api-mini/my/address`,
  updateMyAddress: (id) => `/api-mini/my/address/${id}`,
  deleteMyAddress: `/api-mini/my/address`,
  pagingMyAddress: `/api-mini/my/address/_paging`,
};

export default {

  addMyAddress(payload = {}) {
    return request(API.addMyAddress, {
      method: 'POST',
      body: {...payload,},
    });
  },
  updateMyAddress({id, ...payload}) {
    return request(API.updateMyAddress(id), {
      method: 'PUT',
      body: {...payload,},
    });
  },
  deleteMyAddress({...payload}) {
    return request(API.updateMyAddress, {
      method: 'DELETE',
      body: {...payload,},
    });
  },
  pagingMyAddress(payload = {}) {
    return request(API.pagingMyAddress, {
      method: 'POST',
      body: {...payload,},
    });
  },

};