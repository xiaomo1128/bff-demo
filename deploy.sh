#!/bin/bash
set -e  # 任何命令失败时停止脚本

echo "========== 开始构建和部署过程 =========="

# 1. 清理旧文件
echo "清理旧文件..."
rm -rf dist
rm -rf layer

# 部署前添加type:module
node -e "const pkg=require('./package.json'); pkg.type='module'; fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))"

# 2. 构建应用
echo "构建应用..."
yarn build

# 如果构建失败，使用 type:module 重试
if [ $? -ne 0 ]; then
  echo "构建失败，恢复原来配置..."
  node -e "const pkg=require('./package.json'); delete pkg.type; fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))"
fi

# 3. 准备Lambda层 - 注意这里改为template.yaml中指定的layer/路径
echo "准备Lambda层..."
mkdir -p layer/nodejs/node_modules
cp package.json layer/nodejs/

echo "安装生产依赖..."
cd layer/nodejs
yarn --production --no-lockfile || yarn --omit=dev --no-package-lock
# 删除不必要的文件以减小大小
rm -rf node_modules/.bin
rm -rf node_modules/*/test
rm -rf node_modules/*/docs
cd ../..

# 4. 检查层目录结构
echo "检查Lambda层目录结构..."
find layer -type d | sort
echo "node_modules 目录大小:"
du -sh layer/nodejs/node_modules

# 5. 尝试删除现有堆栈(如果存在)
echo "尝试删除现有堆栈(如果存在)..."
aws cloudformation delete-stack --stack-name bff-demo || true
echo "等待堆栈删除(可能需要几分钟)..."
aws cloudformation wait stack-delete-complete --stack-name bff-demo || true

# 6. 部署新堆栈
echo "部署新堆栈..."
sam deploy -g

echo "========== 构建和部署过程完成 =========="
node -e "const pkg=require('./package.json'); delete pkg.type; fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))"