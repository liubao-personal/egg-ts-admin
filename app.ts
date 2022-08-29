import path from 'path';

export default class AppBootHook {
  private app: any;
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 加载所有的校验规则
    const directory = path.join(this.app.config.baseDir, 'app/validate');
    this.app.loader.loadToApp(directory, 'validate');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
    // 应用已经启动完毕
  }

  async serverDidReady() {
    // 此时可以从 app.server 拿到 server 的实例
  }

}
