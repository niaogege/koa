#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# # 生成静态文件
# npm run build

# # 进入生成的文件夹
# cd dist
pm2 start ./index.js

if [ -z "$GITHUB_TOKEN" ]; then
  msg='cpp1 from github actions auto deploy commit'
  githubUrl=git@github.com:niaogege/koa.git
else
  msg='cpp2 from github actions auto deploy commit'
  githubUrl=https://niaogege:${GITHUB_TOKEN}@github.com/niaogege/koa.git
  git config --local user.name "niaogege"
  git config --local user.email "291003932@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git checkout -B gh-pages
git push -f origin gh-pages # 推送到github gh-pages分支
