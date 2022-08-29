/**
 * @param app 全局自定义校验规则
 */
export default app => {
  const { validator } = app;

  // 自定义参数校验规则
  validator.addRule('mobile', (rule, value) => {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
      return `${ rule.type }:请输入正确的手机号`;
    }
  });

  validator.addRule('email', (rule, value) => {
    if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
      return `${ rule.type }:请输入正确的邮箱地址`;
    }
  });
};
