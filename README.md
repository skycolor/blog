### 使用vuepress搭建个人博客网站，[访问路径：https://skycolor.github.io/blog/dist/](https://skycolor.github.io/blog/dist/)
---
#### 1、环境
必须要全局安装vuepress组件
```
# 安装，官方建议使用yarn，因为npm容易出现依赖包冲突
yarn global add vuepress # 或者：npm install -g vuepress
# 启动
yarn run dev
# 打包
yarn run build
```


#### 2、配置
- 在config.js中配置base为/blog/dist/，配置dest为docs/dist
- 在gitpage的setting中，配置master branch /docs folder


