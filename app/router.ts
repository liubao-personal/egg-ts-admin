import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/save', controller.user.save);
};
