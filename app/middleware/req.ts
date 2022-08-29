import { Context } from 'egg';

/**
 * 统一异常处理
 */
export default function Exception(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
      if (ctx.app.config.env !== 'local') {
        ctx.logger.info(Object.keys(ctx.request.body).length ? `\n请求体为:${JSON.stringify(ctx.request.body)}` : '', `\n响应体为:${JSON.stringify(ctx.response.body)}\n`);
      }
    } catch (err: any) {
      if (err.code && err.code === 'invalid_param') return ctx.failure(err.code, err.errors);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      // 500 异常信息
      const error = status === 500 ? (err.message ? err.message : '服务器异常') : err.message;
      ctx.body = JSON.stringify({
        errorCode: err.errorCode || 500,
        error,
      });
    }
  };
}
