import request from '@/utils/request';

const API = {
  getUserInfo: `/api/account`,
};

export default {

  getUserInfo() {
    return request(API.getUserInfo, {
      method: 'GET',
    });
  },

};