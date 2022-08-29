import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import dotenv from 'dotenv'; // 引入环境变量

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

  // add your special config in here
  const bizConfig = {
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
