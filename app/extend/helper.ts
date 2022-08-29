import moment from 'moment';
import crypto from 'crypto';
import qs from 'querystring';

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
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  /**
   * @param {string} password password string
   */
  encryptPwd(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password)
      .digest('hex');
  },

  stringify(obj) {
    return qs.stringify(obj);
  },

  /**
   * 处理业务code码对应的业务信息
   * @param code 业务code码
   */
  getErrorMessageByCode(code: number) {
    switch (code) {
      case 401:
        return '未授权';
      case 403:
        return '禁止访问';
      default:
        return;
    }
  },

};
