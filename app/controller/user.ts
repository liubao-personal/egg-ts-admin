import BaseController from './base';

export default class UserController extends BaseController {
  public async login() {

  }

  public async save() {
    const { ctx, service } = this;
    const { helper } = ctx;
    const body = ctx.request.body;
    if (!body._id) {
      const saveRule = {
        name: { type: 'string' },
        mobile: { type: 'string' },
        password: { type: 'string' },
      };
      // 校验参数
      ctx.validate(saveRule);
    }
    // 调用 Service 进行业务处理
    if (body.password) {
      body.password = helper.encryptPwd(body.password);
    }
    const result = await service.user.save(body);
    // 设置响应内容和响应状态码
    this.success({ code: 200, data: result });

  }
}
