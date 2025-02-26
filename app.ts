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

//日志系统
configure({
  appenders: {
    cheese: { type: "file", filename: `${__dirname}/logs/demo.log` },
  },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

const { port, viewDir, memoryFlag, staticDir } = config; // 静态资源文件、配置项
const app = new Koa(); // 创建koa实例
const logger = getLogger("cheese"); // 日志实例

// 实现 IndexController.ts 中的 ctx.render 方法
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
//所有可被注入的服务，都在container中
container.loadModules([__dirname + "/services/*.ts"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container)); // 每次请求 都会从容器中获取注入的服务

ErrorHandler.error(app, logger); // 错误处理 必须放在路由前面

app.use(loadControllers(__dirname + "/routers/*.ts")); // 加载路由 所有路由生效
