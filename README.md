## Test Koa

主要是测试通过 action 进行部署 nodejs 侧项目

5th deploy
git push -u

### 问题：

error: src refspec main does not match any
error: failed to push some refs to

Solution A - if you want to name the branch master

Run git push -u origin master instead of git push -u origin main

Or Solution B - if you want to name the branch main

Run git checkout -B main before git push -u origin main
