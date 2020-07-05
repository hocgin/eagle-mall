import request from '@/utils/request';

const API = {
  paging: `/api-mini/product/_paging`,
  getById: id => `/api-mini/product/${id}`,
};

export default {

  paging(payload = {}) {
    return request(API.paging, {
      method: 'POST',
      body: {
        ...payload,
      },
    });
  },

  getById({id}) {
    return request(API.getById(id), {
      method: 'GET',
    });
  }

};