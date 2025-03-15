import { addAliases } from "module-alias";

addAliases({
  "@root": __dirname,
  "@interfaces": __dirname + "/interface",
  "@config": __dirname + "/config",
  "@middlewares": __dirname + "/middlewares",
});
import Koa from "koa";
import config from "@config/index";
import render from "koa-swig";
import serve from "koa-static";
import co from "co";
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import ErrorHandler from "@middlewares/ErrorHandler";
import { configure, getLogger } from "log4js";
//koa中没有实现的路由重定向到index.html
import historyApiFallback from "koa2-connect-history-api-fallback";

//日志系统
configure({
  appenders: {
    cheese: {
      type: "file",
      filename:
        process.env.NODE_ENV === "development"
          ? `${__dirname}/logs/demo.log`
          : "/tmp/yd.log",
    },
  },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

const { port, viewDir, memoryFlag, staticDir } = config; // 静态资源文件、配置项
const app = new Koa(); // 创建koa实例
const logger = getLogger("cheese"); // 日志实例
const fileExt = process.env.NODE_ENV === "development" ? ".ts" : ".js";

// 实现 IndexController.ts 中的 ctx.render 方法，由控制器触发渲染，将服务层提供的数据传入模板
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <"memory" | false>memoryFlag, // 线上环境使用内存缓存，开发环境不使用
    ext: "html", // 模板文件后缀
    writeBody: false,
  })
);
app.use(serve(staticDir)); // 静态资源文件

//创建IOC容器
const container = createContainer();
//所有可被注入的服务，都在container中，被路由控制器通过依赖注入使用
container.loadModules([`${__dirname}/services/*${fileExt}`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container)); // 每次请求 都会从容器中获取注入的服务

ErrorHandler.error(app, logger); // 错误处理 必须放在路由前面

// 路由重定向到index.html
app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));

// 加载路由 所有路由生效，必须放在最后，否则前面的中间件会被覆盖，导致失效，路由不生效，404，500等错误
app.use(loadControllers(`${__dirname}/routers/*${fileExt}`));

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`服务启动成功，监听端口${port}`);
  });
} else {
  // Add this else block
  console.log(
    `服务启动成功，环境变量: ${
      process.env.NODE_ENV ||
      "undefined， please add NODE_ENV=development or NODE_ENV=production"
    }`
  );
}

export default app;
