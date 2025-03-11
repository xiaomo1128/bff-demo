import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import typescript from '@rollup/plugin-typescript';

// 在 ES Module 中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRootDir = path.resolve(__dirname);

// 检查是否跳过类型检查
const skipTypes = process.env.NODE_ENV === 'production';
console.log(`TypeScript类型检查: ${skipTypes ? '已禁用' : '已启用'}`);

export default [
  // 主应用入口
  {
    input: 'app.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: false,
    },
    external: [
      'koa',
      'koa-router',
      'koa-static',
      'koa-swig',
      'awilix',
      'awilix-koa',
      'log4js',
      'lodash',
      'serverless-http',
      'module-alias',
      'koa2-connect-history-api-fallback'
    ],
    plugins: [
      alias({
        entries: [
          { find: '@interfaces', replacement: path.resolve(projectRootDir, 'interface') },
          { find: '@config', replacement: path.resolve(projectRootDir, 'config') },
          { find: '@middlewares', replacement: path.resolve(projectRootDir, 'middlewares') }
        ]
      }),
      nodeResolve({
        extensions: ['.js', '.ts', '.mjs']
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        noEmitOnError: false,
        noCheck: skipTypes,  // 根据环境变量决定是否跳过类型检查
      }),
      terser()
    ]
  },
  // Lambda 处理函数入口
  {
    input: 'lambda.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: false
    },
    external: [
      'serverless-http',
      './app.js'
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        noEmitOnError: false,
        noCheck: skipTypes,  // 根据环境变量决定是否跳过类型检查
      }),
      terser()
    ]
  }
];