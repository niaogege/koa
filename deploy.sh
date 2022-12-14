#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# # 生成静态文件
# npm run build

# # 进入生成的文件夹
# cd dist
# pm2 start ./index.js -i max

if [ -z "$GITHUB_TOKEN" ]; then
  msg='cpp1 from github actions auto deploy commit'
  githubUrl=git@github.com:niaogege/koa.git
else
  msg='cpp2 from github actions auto deploy commit'
  githubUrl=https://niaogege:${GITHUB_TOKEN}@github.com/niaogege/koa.git
  git config --global user.name "niaogege"
  git config --global user.email "291003932@qq.com"
fi
git add -A
# git remote remove origin
# git remote add origin ${githubUrl}
git commit -m "${msg}" --allow-empty
git show-ref
# git push -u ${githubUrl} main:gh-pages
# git push origin <本地分支名>:<远程分支名>
# git push -f ${githubUrl} main:gh-pages # 推送到github gh-pages分支
git push -f ${githubUrl} HEAD:gh-pages 
