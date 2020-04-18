---
title: git的一些常用命令
date: 2020-4-18
tags: 
  - git
author: hf
location: WuHan  
---
> 记录一些在命令行中使用的git命令

#### 1、放弃本地修改
在开发工作中，经常要回滚本地的修改，此时分三种情况
+ 本地修改未提交到暂存区，即未执行git add操作
```
git checkout --fileName
git checkout .
```
+ 本地修改已提交到暂存区，但是还未提交，即未执行git commit操作
```
git reset HEAD filepathname 
git reset HEAD .
```
+ 已经执行了提交，版本回退
```
git reset --hard HEAD^
git reset --hard  commitid  
```
`(PS：1、HEAD表示当前版本， HEAD^表示上个版本， HEAD^^表示上上个版本；2、commitid通过git log获取，直接使用版本号的前几个字符串即可。(git log --pretty=oneline 一行显示)；3、要重返未来，用git reflog查看命令历史，以便确定要回到未来的版本)`