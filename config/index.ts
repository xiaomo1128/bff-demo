import { extend } from "lodash";
import { join } from "path";

// 配置项
let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"), //静态资源
  port: 7878,
  memoryFlag: false,
};
// 开发环境
if (process.env.NODE_ENV === "development") {
  let localConfig = {
    port: 7878,
  };
  config = extend(config, localConfig);
}
// 生产环境
if (process.env.NODE_ENV === "production") {
  let prodConfig = {
    port: 7979,
    memoryFlag: "memory",
  };
  config = extend(config, prodConfig);
}

export default config;
