---
title: 前端路由
categories: js基础
date: 2020-8-7
tags: 
  - js
author: hf
location: WuHan  
---
### 前端路由实现的几种方式
路由是根据不同的 url 地址展示不同的内容或页面

早期的路由都是后端直接根据 url 来 reload 页面实现的，即后端控制路由。

后来页面越来越复杂，服务器压力越来越大，随着 ajax（异步刷新技术） 的出现，页面实现非 reload 就能刷新数据，让前端也可以控制 url 自行管理，前端路由由此而生。

单页面应用的实现，就是因为前端路由。

#### 1、Pjax（PushState + Ajax）
---
原理：利用ajax请求替代了a标签的默认跳转，然后利用html5中的API修改了url。

API： history.pushState 和 history.replaceState 

两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。（Ajax可以实现页面的无刷新操作，于是，返回的时候，通过URL或其他传参，我们就可以还原到Ajax之前的模样）

浏览器的前进与后退，会触发window.onpopstate事件，通过绑定popstate事件，就可以根据当前URL地址中的查询内容让对应的菜单执行Ajax载入，实现Ajax的前进与后退效果。（**PS：通过a标签，以及点击事件调用pushState方法，是无法触发onpopstate事件事件的，只有浏览器的前进后退才会触发该事件**）

页面首次载入的时候，如果没有查询地址、或查询地址不匹配，则使用第一个菜单的Ajax地址的查询内容，并使用history.replaceState更改当前的浏览器历史，然后触发Ajax操作。

```
window.history.pushState(null, null, "name/blue");
//url: https://www.baidu.com/name/blue

window.history.pushState(null, null, "/name/orange");
//url: https://www.baidu.com/name/orange
```
**既然pushState和replaceState方法无法触发事件，可以通过自定义事件的形式监听**
```
//创建全局事件
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
       var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
//重写方法
history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');
//实现监听
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});
```

#### 2.Hjax（Hash + Ajax）
---
原理：url 中常会出现#，一可以表示锚点（如回到顶部按钮的原理），二是路由里的锚点（hash）。Web 服务并不会解析 hash，也就是说 # 后的内容 Web 服务都会自动忽略，但是 JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。

hashchange 事件(监听 hash 变化触发的事件)，当用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。