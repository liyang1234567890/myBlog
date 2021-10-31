---
title: webpack入门
date: 2021-08-08 01:00:09
tags:
 - webpack
categories:
 -  webpack
sidebar: auto
publish: true
---

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51ecfefca5ad4a18becca6cd3d7d2f36~tplv-k3u1fbpfcp-watermark.image)

开淦!
___
> [webpack官网](https://www.webpackjs.com/) 
# 一、webpack
### 1.1  webpack的作用
官网中给了解释：
* 打包所有的样式
* 打包所有的资源
* 打包所有的脚本
* 打包所有的图片
* 打包所有的样式表

浏览器能解析的是js、css、和一些静态资源，但是平时开发中我们经常会用到less、sass、hbs（模板引擎）,浏览器是不能直接取识别这些东西的，就需要一个工具将他们转换成浏览器能识别的样子，现在多数人使用的工具就是-webpack。 
___

### 1.2 webpack的本质
webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

---

### 1.3 市面上常用的打包工具：
* webpack
* rollup：更常用于打包js
* parcel
* fis（百度）

---

### 1.4 四个概念
* 入口(entry)：要打包的原文件，单页应用一般是一个入口，多页应用一般是一个页面对应一个入口
* 输出(output)：要打包去的位置。
* loader：用于处理某种特定文件格式的东西，比如css-loader、babel-loader。
* 插件(plugins)：loader被用于转换某些类型的模块，plugins的执行范围更广，会作用于整个webpack打包的过程。
* 模式：通过选择 **development** 或 **production** 之中的一个，来设置 mode 参数。 
---

# 二、创建项目

### 2.1 安装依赖
**新建项目的项目名称不能叫webpack，会报错我遇到过=_=**

1. 为了可以使用npm安装东西，首先npm init，然后一路回车(npm init -y就不用一直回车了 此处@〇〇)
项目中出现了package.json文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95e689b053ed497090c5e83344f24326~tplv-k3u1fbpfcp-watermark.image)


2. npm i webpack webpack-cli -D
webpack4.0之后要单独安装webpack-cli
项目中多了2个文件

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0324dd84ba94425ba88c19ff3ebbe6dd~tplv-k3u1fbpfcp-watermark.image)


Q1：现在可以在控制台中直接使用指令webpack xxx了吗？

A1：不可以，想在控制台中直接使用指令需要是全局安装webpack，但刚才输入的是-D，不是-g，若想可以直接使用webpack指令，可以在package.json中scripts中做如下配置操作，就会自动到你局部安装的包node_modules中去找你想要的东西。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50af80179d104ed99886f1e37eb9647e~tplv-k3u1fbpfcp-watermark.image)


3. npm run build 发现warning和报错

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c579ee227684eeb85572556f217eda3~tplv-k3u1fbpfcp-watermark.image)

warning提示我还没有设置mode，webpack会默认使用'production'的方式来编译代码。
> 'production'理解为线上模式，会压缩代码；  </br>                                    'development'理解为开发模式，不会压缩成看着恶心的代码，方便程序员能看懂调试用)

解决：在build中配置模式

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa9d0bfc8fe44f568f3492d3013f3a99~tplv-k3u1fbpfcp-watermark.image)



报错是提示我在我的项目中没有/src目录，项目需要一个入口的地方。

解决：项目下新建一个src/index.js文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f0ee0c7c22b4488a3c6a9190093815f~tplv-k3u1fbpfcp-watermark.image)


### 2.2 entry相关
我在入口文件src/index.js中写一句话**console.log('123');** 然后npm run build

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/470a28a4cce4437c98148263de60efd8~tplv-k3u1fbpfcp-watermark.image)

此时控制台中没有之前的warning和error了
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4ab952992ae48bca4619d3935fa23f9~tplv-k3u1fbpfcp-watermark.image)
并且项目中多了dist/main.js文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea7f0fecca3b48e2b5c4f53da943b37b~tplv-k3u1fbpfcp-watermark.image)

此时形成了闭环（有互联网内味儿了~），npm run build打包时会自动去入口src/index.js中找内容，将打包后的内容放在出口dist/main.js中。

以上是webpack最基本的操作，但是在开发当中不会全使用默认配置，会在此基础上使用一些稍微洋气点的操作。

---
### 2.3 配置文件

新建一个webpack.config.js，其实这是一个node的脚本文件，用于向外暴露node的配置，webpack会读取这个文件，对文件打包。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26dbaaadf13343e9938825730ba20779~tplv-k3u1fbpfcp-watermark.image)

目前这个文件还不能使用export default，因为目前的webpack.config.js还没有经过babel转换，使用module.exports={}


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/402bc9619eed4d27aaba1af893743579~tplv-k3u1fbpfcp-watermark.image)

---
1. 引入入口文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63587bdf244e440eaefc1498735f7f3f~tplv-k3u1fbpfcp-watermark.image)


Q2：入口文件只能叫src/index.js吗？</br>
A2：不</br>
入口文件名字也任意改，只要能和entry中的路径能对应上就可以。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2aff9d861014cad9b4912217ba708ec~tplv-k3u1fbpfcp-watermark.image)



Q3：入口文件只能有一个吗？</br>
A3：不</br>
以下两种写法是一个意思，作用一样
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0946d228e3d6424591388c080e44db6e~tplv-k3u1fbpfcp-watermark.image)

既然entry可以配置成对象，说明entry是可以有多个的。</br>
配置了2个入口文件home.js和about.js，npm run build
发现出口文件的文件名默认就是入口文件的对应名字了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e84d1932ea042e39bbb4febfc646d1d~tplv-k3u1fbpfcp-watermark.image)


### 2.4 output相关

**output要配置成一个对象** <br/>

上文提到webpack.config.js是node的配置，所以就可以使用node相关的模块，这里使用了node中的路径解析模块path。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51c1955efad24609a178427edad1f38d~tplv-k3u1fbpfcp-watermark.image)


Q4：我的出口文件不想叫main.js要怎么办？</br>
A4：更改output{}中的配置</br>
以下配置表示在当前目录下dist文件夹中的output.js是出口文件

**如果不配置filename默认的出口文件叫做main.js**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eba67e40950141f681d1d1c12750c3da~tplv-k3u1fbpfcp-watermark.image)
 
npm run build后发现dist下确实多了一个output.js

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60755859fab74916abd90bc5abe829fe~tplv-k3u1fbpfcp-watermark.image)


会报错的情况

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c780cee4345943a38509ea5e128f4e2b~tplv-k3u1fbpfcp-watermark.image)


可以用[ ]填写webpack定义好的引用

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5a6177bf2cb4deda052bd957b7ca6fe~tplv-k3u1fbpfcp-watermark.image)
这样打包后的结果和不配置output{}时的结果是一样的。



Q5：项目中的出口文件上通常带有一串hash值（main.xxxxxxxxxxxx.js）是怎么做到的？
A5：配置[name].[hash].js

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57235cfec9f44095a83b75d920c478f9~tplv-k3u1fbpfcp-watermark.image)


Q6：hash值太长看着不舒服<br/>
A6：配置[name].[hash:6].js，会截取前6位hash值。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/166b0b9427eb492da25fd80742abc901~tplv-k3u1fbpfcp-watermark.image)


Q7：突然发现两个入口文件生成的hash值是一样的怎么办？<br/>

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40567ceef2274d2f81107f86985c888c~tplv-k3u1fbpfcp-watermark.image)

并且我若更改src/home.js下的内容，重新执行一次

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b5851cdd0644cfaa64eac0bf38238f~tplv-k3u1fbpfcp-watermark.image)

发现没有更改过的about.js的hash值也跟着变化了

A7：以上的hash配置方式作用于整个webpack打包过程，使用chunkhash可以根据不同模块生成不同的hash值。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57fed2c76bbc45f2841be09acf7e9646~tplv-k3u1fbpfcp-watermark.image)

并且此时只更改home.js件，打包后只会home.js的hash值发生变化。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4660a86dd1b8458ca339dba3da6efbce~tplv-k3u1fbpfcp-watermark.image)

> webpack中有三种hash <br/>第一种是作用于整个打包过程的hash<br/>第二种是chunkhash，可以根据不同模块生成对应的hash，使用较多<br/>第三种是contenthash，使用略少，根据内容计算hash

---

### 2.5 更改配置文件位置
webpack.config.js默认是放在根目录下的，开发中通常要放在scripts或者buuild文件夹下，此时还需要在package.json中做配置，否在去默认的根目录下找找不到会报错。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49e9df5893a44e509201102ace3c66cf~tplv-k3u1fbpfcp-watermark.image)


打包后的文件会自动放在scripts/dist下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a54afd1eda124e51b7b5f29efc7cc52d~tplv-k3u1fbpfcp-watermark.image)

因为配置文件中之前写了打包文件的出口文件夹和配置文件在同一级

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13d4cabb93e43789369494c408c1484~tplv-k3u1fbpfcp-watermark.image)


配置文件webpack.config.js也是可以更改名字的，只要在package.json中配置的配置文件能对应上即可

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77671630255140c1b18c741dde10e2d9~tplv-k3u1fbpfcp-watermark.image)

---
我是洋洋李，一个前端搬砖小弟

一万年太久，只争朝夕，下次见