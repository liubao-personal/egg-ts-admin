import { Service } from 'egg';

export default class UserService extends Service {
  // 新增or更新数据
  async save(params) {
    const User = this.ctx.state.user || {};
    params.updateBy = User.name || '管理员';
    if (params._id) {
      return this.ctx.model.User.findOneAndUpdate({ _id: params._id }, params, { upsert: true, new: true }); // new 返回更新后的数据
    }
    params.createBy = User.name || '管理员';
    const saveDate = new this.ctx.model.User(params);
    return saveDate.save();

  }

  // 查询所有数据
  async find(params = {}, page = 1, limit = 10) {
    return this.ctx.model.User.find(params, { password: 0 })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async login(params) {
    const mobile = params.mobile;
    const userModel = this.ctx.model.User;
    const SearchWith = new userModel({ mobile });
    SearchWith.encryptFieldsSync();
    return userModel.findOne({
      $or: [{ mobile: SearchWith.mobile, password: params.password }, {
        email: params.email,
        password: params.password,
      }],
    }, { password: 0, roleIdList: 0 });
  }
}
