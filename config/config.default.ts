import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import dotenv from 'dotenv'; // 引入环境变量
import path from 'path';

dotenv.config();

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661739866199_9241';

  // csrf 安全配置
  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: [ '*' ], // 安全白名单，例如'.domain.com'
    },
  };

  // add your egg config in here
  config.middleware = [
    'req',
  ];

  // 静态资源配置
  config.static = {
    prefix: '/public/',
    dir: [ path.join(appInfo.baseDir, 'public') ], // 多静态文件入口
    maxAge: 31536000,
  };


  // 参数校验
  config.validate = {
    convert: true, // 将原始参数转换为特定类型，默认为false
    validateRoot: false, // 是否验证传入的值必须是一个对象，默认为false
  };

  // add your special config in here
  const bizConfig = {
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    mongoose: {
      client: {
        url: process.env.MONGODBURL,
        options: { useUnifiedTopology: true },
      },
    },
    redis: {
      clients: {
        app: {
          port: process.env.REDISPORT,
          host: process.env.REDISHOST,
          password: process.env.REDISPASSWORD,
          db: process.env.REDISDB,
        },
      },
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
