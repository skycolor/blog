---
title: IntersectionObserver API
date: 2020-6-4
tags: 
  - js
author: hf
location: WuHan  
---
> 在论坛上，看到一个做懒加载很方便的api IntersectionObserver，记录下

官方介绍如下  
IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。  
当一个IntersectionObserver对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦IntersectionObserver被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。  

**说白了就是用来监听某元素是否在页面的可视范围内**

### 1、api简要说明
它是一个订阅和观察模式
```
let io = new IntersectionObserver(callback, option)
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();
```
而在callback中，参数entries为一个数组，callback会在被观察者出现在页面时，以及消失在页面上时触发，entries中的IntersectionObserverEntry对象包含下面这些属性
+ time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
+ target：被观察的目标元素，是一个 DOM 节点对象
+ rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
+ boundingClientRect：目标元素的矩形区域的信息
+ intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
+ intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0  
而option里面可以配置一些参数，个人认为最重要的就是配置目标元素所在容器，毕竟不是滚动时不一样是在body内滚动
```
let opts = { 
  root: document.querySelector('.container') 
};

let observer = new IntersectionObserver(
  callback,
  opts
);
```

### 2、使用该api很简单的实现图片懒加载
```
const imgs = [...document.getElementsByTagName('img')];
// 当监听的元素进入可视范围内的会触发回调
if(IntersectionObserver) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            let lazyImage = entry.target;
            // 相交率，默认是相对于浏览器视窗
            if(entry.intersectionRatio > 0) {
              lazyImage.src = lazyImage.getAttribute('data-src');
              // 当前图片加载完之后需要去掉监听
                lazyImageObserver.unobserve(lazyImage);
            }

        })
    })
    for(let i = 0; i < imgs.length; i++) {
      lazyImageObserver.observe(imgs[i]);
    }
}
```

### 最后
通过类似的方法，也可以完成骨架屏的滚动加载~需要注意的是，该方法是一个弱线程方法，只有在浏览器空闲的时候才会触发异步监听