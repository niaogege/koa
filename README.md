## Test Koa

主要是测试通过 action 进行部署 nodejs 侧项目

5th deploy
git push -u

## 配置 deploy 脚本遇到的问题：

error: src refspec main does not match any
error: failed to push some refs to

Solution A - if you want to name the branch master

Run git push -u origin master instead of git push -u origin main

Or Solution B - if you want to name the branch main

Run git checkout -B main before git push -u origin main

How to Resolve it?

```bash
// Before fault
git push -f ${githubUrl} main:gh-pages

// After ok
git push -f ${githubUrl} HEAD:gh-pages
```

## Github Action 自动化部署到私服

结果：
[test 接口](http://111.230.199.157/api/koa/data)
[页面测试](http://111.230.199.157/api/koa/test)

大体步骤：
代码上传到 github -> github Action 检测到 main 分支 push 动作(都是在脚本里定义的)，则去执行 **/.github/workflows/ci.yml** 脚本，脚本里会去拉当前分支的代码，然后拷贝到指定服务器，然后服务器再去执行自定义的脚本

这里推荐一个很好的 Action，[cross-the-world/ssh-scp-ssh-pipelines@latest](https://github.com/marketplace/actions/ssh-scp-ssh-pipelines)

主要是将当前目录文件传输到指定服务器的制定目录，还能执行后续的自定义 shell，一级棒

> 在 Actions 使用那里，还能看到我使用了他的 Action，这个不错，信息双方[Dependency graph](https://github.com/cross-the-world/ssh-scp-ssh-pipelines/network/dependents)

```yml
name: CI
# 在main分支发生push事件/pull_request时触发。
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
env:
  # 设置环境变量
  TARGET_DIR: /www/web/koa

jobs:
  # 打包构建
  depoly:
    runs-on: ubuntu-latest # 运行在虚拟机环境ubuntu-latest
    steps:
      - name: Checkout # 步骤1
        uses: actions/checkout@v1 # 使用的动作。格式：userName/repoName。作用：检出仓库，获取源码。 官方actions库：https://github.com/actions
      - name: Deploy Server
        uses: cross-the-world/ssh-scp-ssh-pipelines@latest
        env:
          WELCOME: "ssh scp ssh pipelines CPP server"
          LASTSSH: "after copying Successful"
        with:
          host: "111.230.199.157"
          user: "root"
          pass: ${{ secrets.FTP_PASSWORD }}
          connect_timeout: 20s
          first_ssh: |-
            rm -rf $TARGET_DIR
            echo $WELCOME
            mkdir -p $TARGET_DIR
          scp: |-
            './*' => $TARGET_DIR/
          last_ssh: |-
            cd $TARGET_DIR
            node -v
            npm i
            pm2 -v
            pm2 start ./index.js -i max
            echo $LASTSSH
```
