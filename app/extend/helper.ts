import moment from 'moment';

/**
 * 格式化时间
 */
export const now = function() {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
};

export default {
  /**
   * 获取当前时间
   */
  getDate() {
    return now();
  },

};
