import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // use 自定义校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // use jwt token
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

};

export default plugin;
