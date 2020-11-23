---
title: css实现swiper效果的属性
categories: css
date: 2020-11-18
tags: 
  - css
author: hf
location: WuHan
---
一种使用css完成近似swiper的效果，实现思路如下
+ scroll-snap-type：网页容器滚动停止的时候，自动平滑定位到指定元素的指定位置，有点像当子元素滚动到某一个点的时候会被父元素吸附过去，它的目的是让你的页面滚动停留在你希望用户关注的重点区域，利用这个css属性，就可以自动判断用户是要滚到哪
+ scroll-snap-align：发生滚动的时候，在一屏内对齐方式，scroll-snap-type 会根据 scroll-snap-align的设置的临界点进行滚动,如果不设置它没有任何效果
+ scroll-behavior：它的目的是滚动的时候自带动效一点都不生硬，作为用户的我体验极好  
---
具体代码如下，该代码scroll-snap-type为x mandatory，scroll-snap-align为center表示在x轴方向滚动，子元素的对齐方式为居中，同时在过度时会平滑过渡，因为有scroll-behavior为smooth
::: demo
```html
<template>
  <div class="container">
    <div v-for="item in [1,2,3,4,5,6,7,8]" ></div>
  </div>
</template>
<style>
.container{
  width: 640px;
  height: 100px;
  margin: 0 auto;
  flex-wrap: nowrap;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  font-size: 0;
  scroll-snap-type:x mandatory;
  scroll-behavior: smooth;
  border: solid 1px #a3a3a3;
  border-radius: 8px; 
}
.container div{
  display: inline-block;
  width: 196px;
  height: 100px;
  margin: 0 24px;
  scroll-snap-align:center;
}
.container div:nth-child(1){
  background: red;
}
.container div:nth-child(2){
  background: greenyellow;
}
.container div:nth-child(3){
  background: palevioletred;
}
.container div:nth-child(4){
  background: bisque;
}
.container div:nth-child(5){
  background: sandybrown;
}
.container div:nth-child(6){
  background: green;
}
.container div:nth-child(7){
  background: thistle;
}
.container div:nth-child(8){
  background: wheat;
}
</style>
```
:::
对比scroll-snap-align为start和end的区别


### start的效果
 
::: demo
```html
<template>
  <div class="container">
    <div v-for="item in [1,2,3,4,5,6,7,8]" ></div>
  </div>
</template>
<style>
.container{
  width: 640px;
  height: 100px;
  margin: 0 auto;
  flex-wrap: nowrap;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  font-size: 0;
  scroll-snap-type:x mandatory;
  scroll-behavior: smooth;
  border: solid 1px #a3a3a3;
  border-radius: 8px; 
}
.container div{
  display: inline-block;
  width: 196px;
  height: 100px;
  margin: 0 24px;
  scroll-snap-align:start;
}
.container div:nth-child(1){
  background: red;
}
.container div:nth-child(2){
  background: greenyellow;
}
.container div:nth-child(3){
  background: palevioletred;
}
.container div:nth-child(4){
  background: bisque;
}
.container div:nth-child(5){
  background: sandybrown;
}
.container div:nth-child(6){
  background: green;
}
.container div:nth-child(7){
  background: thistle;
}
.container div:nth-child(8){
  background: wheat;
}
</style>
```
:::

### end的效果
   
::: demo
```html
<template>
  <div class="container">
    <div v-for="item in [1,2,3,4,5,6,7,8]" ></div>
  </div>
</template>
<style>
.container{
  width: 640px;
  height: 100px;
  margin: 0 auto;
  flex-wrap: nowrap;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  font-size: 0;
  scroll-snap-type:x mandatory;
  scroll-behavior: smooth;
  border: solid 1px #a3a3a3;
  border-radius: 8px; 
}
.container div{
  display: inline-block;
  width: 196px;
  height: 100px;
  margin: 0 24px;
  scroll-snap-align:end;
}
.container div:nth-child(1){
  background: red;
}
.container div:nth-child(2){
  background: greenyellow;
}
.container div:nth-child(3){
  background: palevioletred;
}
.container div:nth-child(4){
  background: bisque;
}
.container div:nth-child(5){
  background: sandybrown;
}
.container div:nth-child(6){
  background: green;
}
.container div:nth-child(7){
  background: thistle;
}
.container div:nth-child(8){
  background: wheat;
}
</style>
```
:::