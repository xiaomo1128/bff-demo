import { Logger } from "log4js";
import Koa from "koa";
import { Context } from "@interfaces/IKoa";

class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (error) {
        logger.error('catch error->',error);
        ctx.body = "500请求，服务器内部错误";
      }
    });

    // 404 处理器 只有api有用
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) return;

      ctx.body =
        '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }
}

export default ErrorHandler;
