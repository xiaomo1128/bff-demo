const path = require("path");
const glob = require("glob");
// const TerserPlugin = require('terser-webpack-plugin');
const layerDependencies = [
  "awilix",
  "awilix-koa",
  "koa",
  "koa-router",
  "koa-static",
  "koa-swig",
  "koa2-connect-history-api-fallback",
  "lodash",
  "log4js",
  "module-alias",
  "serverless-http",
];

// Find all TypeScript files in the specified directories
const getEntries = () => {
  const entries = {
    lambda: "./lambda.ts", // Keep the original lambda entry
    app: "./app.ts",
  };

  // Add entries for all TypeScript files in these directories
  const directories = [
    "config",
    "interfaces",
    "middlewares",
    "routers",
    "services",
  ];

  directories.forEach((dir) => {
    const files = glob.sync(`./${dir}/**/*.ts`);
    files.forEach((file) => {
      // Use path without extension as the entry name
      const entryName = file.replace(/^\.\//, "").replace(/\.ts$/, "");
      entries[entryName] = "./" + file;
    });
  });

  return entries;
};

module.exports = {
  entry: getEntries(),
  target: "node",
  mode: "production",
  externals: [
    ({ request }, callback) => {
      if (layerDependencies.includes(request)) {
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
        test: /\.tsx?$/,
        exclude: [
          /node_modules/,
          /\.spec\.ts$/,
          /\.e2e-spec\.ts$/,
          path.resolve(__dirname, "test"),
          path.resolve(__dirname, "src/**/*.spec.ts"),
        ],
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@config": path.resolve(__dirname, "config/"),
      "@interfaces": path.resolve(__dirname, "interfaces/"),
      "@middlewares": path.resolve(__dirname, "middlewares/"),
      "@routers": path.resolve(__dirname, "routers/"),
      "@services": path.resolve(__dirname, "services/"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    // filename: (pathData) => {
    //   // 入口文件固定命名
    //   return pathData.chunk.name === 'lambda' ? 'lambda.js' : '[name].js';
    // },
    // chunkFilename: "[name].[contenthash].js",
    clean: true,
    libraryTarget: "commonjs2",
    // 添加严格模式声明
    strictModuleExceptionHandling: true,
  },
  optimization: {
    minimize: false,
    runtimeChunk: false,
    splitChunks: false,
    // {
    //   chunks: "all",
    //   minSize: 0,
    //   cacheGroups: {
    //     default: false,
    //     vendors: false,
    //     sources: {
    //       test: /\.ts$/,
    //       name(module) {
    //         if (module.resource.endsWith("lambda.ts")) {
    //           return false;
    //         }
    //         const srcPath = path.relative(
    //           path.join(__dirname, "src"),
    //           module.resource
    //         );
    //         return srcPath.replace(/\.ts$/, ""); // 只替换 .ts 后缀为空
    //       },
    //       chunks: "all",
    //       enforce: true,
    //       priority: 10,
    //     },
    //   },
    // },
  },
  stats: {
    errorDetails: true,
    chunks: true,
    modules: true,
  },
  devtool: "source-map",
};
