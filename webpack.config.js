const path = require("path");                               // 导入路径处理模块，用于处理文件路径
const glob = require("glob");                               // 导入glob模块，用于按照匹配模式查找文件
const CopyWebpackPlugin = require("copy-webpack-plugin");   // 导入复制文件插件，用于将静态资源复制到输出目录
// const TerserPlugin = require('terser-webpack-plugin');   // 压缩JS代码的插件（当前已注释）

// 定义共享层（Lambda Layer）所需依赖，这些依赖不会被打包到最终文件中
const layerDependencies = [
  "awilix",                           // 依赖注入容器
  "awilix-koa",                       // Awilix与Koa框架集成
  "koa",                              // Node.js的Web框架
  "koa-router",                       // Koa的路由中间件
  "koa-static",                       // Koa的静态文件服务中间件
  "koa-swig",                         // Koa的模板引擎
  "koa2-connect-history-api-fallback", // 处理前端路由的中间件
  "lodash",                           // 实用工具库
  "log4js",                           // 日志工具
  "module-alias",                     // 模块别名工具
  "serverless-http",                  // 将Node.js应用包装成无服务器函数
];

// 查找指定目录中的所有TypeScript文件，用于生成入口文件配置
const getEntries = () => {
  const entries = {
    lambda: "./lambda.ts",            // 保留原始lambda入口文件
  };

  // 将以下目录中的所有TypeScript文件添加为入口文件
  const directories = [
    "interfaces",                     // 接口定义目录
    "routers",                        // 路由目录
    "services",                       // 服务目录
  ];

  directories.forEach((dir) => {
    const files = glob.sync(`./${dir}/**/*.ts`);  // 查找指定目录中所有.ts文件
    files.forEach((file) => {
      // 使用不含扩展名的路径作为入口名称
      const entryName = file.replace(/^\.\//, "").replace(/\.ts$/, "");
      entries[entryName] = "./" + file;
    });
  });

  return entries;
};

module.exports = {
  entry: getEntries(),                // 设置入口文件，调用上面的函数获取
  target: "node",                     // 指定构建目标为Node.js环境
  mode: "production",                 // 构建模式为生产环境
  externals: [
    // 外部依赖配置，不将指定依赖打包到输出文件中
    ({ request }, callback) => {
      if (layerDependencies.includes(request)) {
        // 将layerDependencies数组中的依赖设置为外部依赖
        return callback(null, `commonjs ${request}`);
      }
      // if (request === 'express') {
      //   return callback(null, `commonjs ${request}`);
      // }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,              // 处理.ts和.tsx文件
        exclude: [                    // 排除以下文件和目录
          /node_modules/,             // 排除node_modules目录
          /\.spec\.ts$/,              // 排除测试文件
          /\.e2e-spec\.ts$/,          // 排除端到端测试文件
          path.resolve(__dirname, "test"), // 排除test目录
          path.resolve(__dirname, "src/**/*.spec.ts"), // 排除src下的测试文件
        ],
        use: {
          loader: "ts-loader",        // 使用ts-loader处理TypeScript文件
          options: {
            transpileOnly: true,      // 只转译，不做类型检查，加快构建速度
            experimentalWatchApi: true, // 启用实验性的文件监视API
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"], // 自动解析的扩展名
    alias: {                          // 路径别名配置，方便导入模块
      "@config": path.resolve(__dirname, "config/"),
      "@interfaces": path.resolve(__dirname, "interfaces/"),
      "@middlewares": path.resolve(__dirname, "middlewares/"),
      "@routers": path.resolve(__dirname, "routers/"),
      "@services": path.resolve(__dirname, "services/"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: (pathData) => {
      // 入口文件固定命名，lambda.ts编译后固定为lambda.js，其他按原路径命名
      return pathData.chunk.name === 'lambda' ? 'lambda.js' : '[name].js';
    },
    chunkFilename: "[name].[contenthash].js", // 非入口chunk的命名方式
    clean: true,                     // 构建前清理输出目录
    libraryTarget: "commonjs2",      // 输出格式为commonjs2
    // 添加严格模式异常处理
    strictModuleExceptionHandling: true,
  },
  optimization: {
    minimize: false,                 // 不压缩输出文件
    runtimeChunk: false,             // 不将运行时代码拆分为单独的chunk
    splitChunks: {                   // 代码分割配置
      chunks: "all",                 // 对所有chunk进行分割
      minSize: 0,                    // 生成chunk的最小大小（字节）
      cacheGroups: {                 // 缓存组配置
        default: false,              // 禁用默认缓存组
        vendors: false,              // 禁用vendors缓存组
        sources: {                   // 自定义sources缓存组
          test: /\.ts$/,             // 只处理TypeScript文件
          name(module) {
            if (module.resource.endsWith("lambda.ts")) {
              return false;          // lambda.ts不参与分割
            }
            // 根据文件在项目中的相对路径命名分割后的文件
            const srcPath = path.relative(
              path.join(__dirname),
              module.resource
            );
            return srcPath.replace(/\.ts$/, ""); // 只替换.ts后缀为空
          },
          chunks: "all",             // 对所有chunk应用此规则
          enforce: true,             // 强制创建这个缓存组的chunk
          priority: 10,              // 优先级设为10
        },
      },
    },
  },
  stats: {                          // 统计信息配置
    errorDetails: true,             // 显示错误详情
    chunks: true,                   // 显示chunk信息
    modules: true,                  // 显示模块信息
  },
  devtool: "source-map",            // 生成source map，便于调试
  plugins: [
    new CopyWebpackPlugin({         // 复制插件配置
      patterns: [
        {
          from: "views/**/*.html",  // 复制views目录下的所有HTML文件
          to: "[path][name][ext]",  // 保持原路径结构
          noErrorOnMissing: true,   // 如果文件不存在，不报错
        },
      ],
    }),
  ],
};