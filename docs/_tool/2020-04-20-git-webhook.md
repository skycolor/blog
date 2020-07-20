---
title: 利用git Webhook完成文档站点自动化搭建
date: 2020-4-20
tags: 
  - git
author: hf
location: WuHan  
---
>在git的项目配置中，有个Integrations的选项，可以配置一个接口URL，作为钩子来监听项目的push、commit、merge等操作

作为文档监听的功能，本质是文档维护人员修改了md文件，然后提交到git，服务端的接口监听到这次push，拿到了修改的分支以及文件，以便进行接下来的操作

此时服务端需要2个接口
+ 一个用来响应 Gitlab 的 Webhook
+ 另一个是用来进行文档站点的更新

以egg为例
``` js
import { Application } from "egg";
export default (app: Application): void => {
  const { controller, router } = app;
  // gitlab webhook
  router.post("/api/hook", controller.document.hook);
  router.get("/api/batchUpdate", controller.document.batchUpdate);
}
```
然后在/api/hook接口中，可以进行下面的操作
``` js
const { commits, ref }: { commits: any[]; ref: string } = pushEvent;
// 过滤非master分支的push
if (!isMaster(ref)) {
  return false;
}
// 修改(新增)文档列表
const updateList: string[] = [];
// 删除文档列表
const removeList: string[] = [];
commits.forEach((item: Commits) => {
  const { added, modified, removed } = item;
  updateList.push(...added, ...modified);
  removeList.push(...removed);
});
// 过滤重复文件
const uniqueUpdateList: string[] = [...new Set(updateList)];
const uniqueRemoveList: string[] = [...new Set(removeList)];
```
如果是非master分支，不管~若是master分支，拿到修改的文件，剩下的就是将md文件生成html了，如果采用模板渲染的方式还可以通过git的openapi拿到最新的文件内容，使用服务端html模板工具进行独立渲染

但是如果想省事，可以使用vuepress工具~在监听到master上有md文件更新，则直接打包以及部署！相当于/api/hook接口中监听到需要更新文档，直接调用/api/batchUpdate，在/api/batchUpdate接口中调用vuepress官方建议的脚本，直接部署站点`（PS：缺点是每次更新所有文件，当文件多时会比较慢）`
```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```