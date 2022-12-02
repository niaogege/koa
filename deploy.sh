#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# # 生成静态文件
# npm run build

# # 进入生成的文件夹
# cd dist


if [ -z "$GITHUB_TOKEN" ]; then
  githubUrl=git@github.com:niaogege/koa.git
else
  githubUrl=https://niaogege:${GITHUB_TOKEN}@github.com/niaogege/koa.git
  git config --global user.name "niaogege"
  git config --global user.email "291003932@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:cpp-gh-pages # 推送到github gh-pages分支
