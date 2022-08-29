import BaseController from './base';

export default class UserController extends BaseController {
  public async login() {
    const { app, ctx, config, service } = this;
    const loginRule = {
      mobile: { type: 'mobile', required: false },
      email: { type: 'email', required: false },
      password: { type: 'string' },
    };
    // 校验参数
    ctx.validate(loginRule);
    const jwtConfig = config.jwt;
    const { helper } = ctx;
    const body = ctx.request.body;
    body.password = helper.encryptPwd(body.password);

    const result = await service.user.login(body);
    if (!result) return ctx.failure('账号或密码错误');
    const token = app.jwt.sign(result._doc, jwtConfig.secret, { expiresIn: '1d' }); // 生成token,有效期1天
    const { avatar, name, mobile, userId } = result
    this.success({ data: { avatar, name, mobile, userId, token } });
  }

  public async save() {
    const { ctx, service } = this;
    const { helper } = ctx;
    const body = ctx.request.body;
    if (!body._id) {
      const saveRule = {
        name: { type: 'string', required: true },
        password: { type: 'string', required: true },
        mobile: { type: 'mobile', required: false },
        email: { type: 'email', required: false },
      };
      // 校验参数
      ctx.validate(saveRule);
    }
    // 调用 Service 进行业务处理
    if (body.password) {
      body.password = helper.encryptPwd(body.password);
    }
    const { avatar, name, userId } = await service.user.save(body);
    // 设置响应内容和响应状态码
    this.success({ code: 200, data: { avatar, name, userId } });

  }
}
