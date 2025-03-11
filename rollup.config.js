const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const path = require("path");
const typescript = require("@rollup/plugin-typescript");
const glob = require("glob");

const projectRootDir = path.resolve(__dirname);

// 检查是否跳过类型检查
const skipTypes = process.env.NODE_ENV === "production";
console.log(`TypeScript类型检查: ${skipTypes ? "已禁用" : "已启用"}`);

// 获取所有需要构建的 TypeScript 文件入口
const getAllTsFiles = () => {
  // 只获取项目源码文件，严格排除 node_modules
  const tsFiles = glob.sync("**/*.ts", {
    ignore: [
      "**/node_modules/**",  // 确保排除所有 node_modules 目录
      "dist/**",
      "**/*.d.ts",
      "**/*.spec.ts",
      "**/*.test.ts",
      "**/*.test-d.ts",
    ],
  });
  
  console.log("将要编译的文件:", tsFiles);
  
  // 创建一个对象，每个文件作为一个入口点
  const entries = {};
  tsFiles.forEach(file => {
    // 移除 .ts 扩展名作为入口名
    const entryName = file.replace(/\.ts$/, '');
    entries[entryName] = file;
  });
  
  return entries;
};

const pluginsConfig = [
  alias({
    entries: [
      {
        find: "@config",
        replacement: path.resolve(projectRootDir, "config"),
      },
      {
        find: "@interfaces",
        replacement: path.resolve(projectRootDir, "interfaces"),
      },
      {
        find: "@middlewares",
        replacement: path.resolve(projectRootDir, "middlewares"),
      },
      {
        find: "@routers",
        replacement: path.resolve(projectRootDir, "routers"),
      },
      {
        find: "@services",
        replacement: path.resolve(projectRootDir, "services"),
      },
    ],
  }),
  nodeResolve({
    extensions: [".js", ".ts"],
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    noEmitOnError: false,
    noCheck: skipTypes, // 根据环境变量决定是否跳过类型检查
    compilerOptions: {
      declaration: false, // 禁止生成.d.ts文件
    }
  }),
  terser(),
];

const outputConfig = {
  dir: "dist",
  format: "cjs",
  sourcemap: true,
  preserveModules: true, // 保持模块结构
  preserveModulesRoot: ".",
};

const externalDependencies = [
  "koa",
  "koa-router",
  "koa-static",
  "koa-swig",
  "awilix",
  "awilix-koa",
  "log4js",
  "lodash",
  "serverless-http",
  "module-alias",
  "koa2-connect-history-api-fallback",
  /node_modules/ // 排除所有 node_modules 中的模块
];

// 构建配置
module.exports = {
  input: getAllTsFiles(),
  output: outputConfig,
  external: externalDependencies,
  plugins: pluginsConfig
};
