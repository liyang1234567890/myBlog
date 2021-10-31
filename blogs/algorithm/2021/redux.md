
---
title: 看不见摸得到的东西
date: 2021-05-04 06:10:01
tags:
 - react Redux
categories:
 - react Redux
sidebar: auto
publish: true
---

# react Redux

## ![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190226%2Fbc4b0eb3657f402ca512d40b4d61acb2.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631719701&t=f018d8a5633dbbbba2b11a9c43f90732)

## 一、redux项目搭建



基本依赖：

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701171706800.png" alt="image-20210701171706800" style="zoom:50%;" />

redux

React-redux：处理显示组件和容器组件的连接

Redux-thunk：处理异步中间件

---

#### 使用cra创建项目

```javascript
npm install cra -g
cra 0701redux
```

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701172508871.png" alt="image-20210701172508871" style="zoom:50%;" />



只留下这两个文件

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701172740454.png" alt="image-20210701172740454" style="zoom:50%;" />

```javascript
yarn start
```

初始结构：

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701173727119.png" alt="image-20210701173727119" style="zoom:50%;" />

![image-20210701173755979](/Users/liyang105/Library/Application Support/typora-user-images/image-20210701173755979.png)

安装依赖

```javascript
npm i redux -D
```

引入redux，因为想要使用redux中的createStore创建store

```javascript
import {createStore} from 'redux';
```

---

## 二、redux基本操作

#### 基本概念

store是存数据的地方，用法固定，参数是reducer也是固定的

```javascript
const store = createStore(reducer);
```

* store是存放数据仓库

* state是数据仓库中的数据

	​	取法固定

	```javascript
	store.getState();
	```

* action是一个对象，描述当前执行的动作

	```javascript
	const action = {
	  	type: 'ADD_ONE',
	  	num: 1
	}
	```

* dispatch是唯一能更改state的方法

	用法固定

	```javascript
	store.dispatch(action);
	```

* reducer是一个函数，更新state，返回新的state

	用法固定，参数固定：state和action

	```javascript
	const reducer = (state = 10, action) => {  	switch(action.type) {      case 'ADD_ONE':        	return state + action.num      ...    }}
	```

---

#### 具体用法

1. 创建action

```javascript
const addOne = {    type: 'ADD',    num: 1}const addTwo = {    type: 'ADD',    num: 2}const Square = {    type: 'SQUARE',}
```



2. 创建reducer更改state

```javascript
const reducer = (state = 10, action) => {		switch(action.type) {        case 'ADD':            return state + action.num        case 'Square':        		return state * state      	default:        		return state    }}
```



3. 创建store

```javascript
const store = createStore(reducer);
```

---

打印一下

```javascript
console.log(store.getState());
```

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701180804381.png" alt="image-20210701180804381" style="zoom:50%;" />

打印出来的就是初始值10，dispatch是更改state的唯一操作，目前还没有用到dispatch

还没有action，走的是default，返回默认值10

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701214029746.png" alt="image-20210701214029746" style="zoom:50%;" />

 若没有default，打印出来的是undefined  <img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701214337288.png" alt="image-20210701214337288" style="zoom:50%;" />

经过dispatch(state)后state会进入reducer改变state的值+1，再次打印后是11

![image-20210701214656850](/Users/liyang105/Library/Application Support/typora-user-images/image-20210701214656850.png)

Action dispatch store reducer

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701215132834.png" alt="image-20210701215132834" style="zoom:50%;" />

---

## 三、提取action&提取reducer

1. src文件夹下新建constans/ActionTypes.js放所有的action常量

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701220057921.png" alt="image-20210701220057921" style="zoom:50%;" />



2. src文件夹下新建actions/actions.js放所有的action

```javascript
import {ADD, SQUARE} from '../constans/ActionTypes';const addOne = {    type: ADD,    num: 1}  const addTwo = {    type: ADD,    num: 2}const Square = {    type: SQUARE,}export {    addOne,    addTwo,    Square}
```



3. Src/index.js中引入actions/actions.js

```javascript
import { addOne, addTwo, Square} from './actions/actions';
```



4. Actions/actions.js里面的三个action抽成一个创建action的方法

```javascript
import {ADD, SQUARE} from '../constans/ActionTypes';const addAction = (num) => {    return {        type: ADD,        num    }}const squareAction = () => {    return {        type: SQUARE    }}export {    addAction,    squareAction}
```

引入时对应文件

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210706012642859.png" alt="image-20210706012642859" style="zoom:50%;" />



src/index.js里面dispatch()的写法就要改变了

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701221708520.png" alt="image-20210701221708520" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210701221724114.png" alt="image-20210701221724114" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210706012819390.png" alt="image-20210706012819390" style="zoom:50%;" />

5. reducer提出去

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210706013349158.png" alt="image-20210706013349158" style="zoom: 33%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210706013438358.png" alt="image-20210706013438358" style="zoom: 33%;" />

---

##  四、UI层提取&数据响应

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708000744849.png" alt="image-20210708000744849" style="zoom:50%;" />

点击后不好使

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708000800152.png" alt="image-20210708000800152" style="zoom:50%;" />



其实值变化了，但是没显示出来

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708001008134.png" alt="image-20210708001008134" style="zoom:50%;" />



需要用store.subscribe()监听渲染的方法，实时拿到最新状态

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708001144023.png" alt="image-20210708001144023" style="zoom:50%;" />

初始render一次，刷新之后监听变化，有变化了，监听里的render()执行一遍

---

## 五、react redux&connect

但是上面那样写不够优雅，使用react redux还会更好。

```javascript
npm i react-redux -D
```



React redux将组件分为容器组件和展示组件

展示组件：负责展示，所有数据由props提供

容器组件：负责包裹， 管理数据和业务逻辑



1. index.js中导入

```javascript
import {Provider} from 'react-redux';
```

2. 把渲染内容抽成Container组件，放在src/components里面，入口index.js里面使用<Provider /><img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708105805857.png" alt="image-20210708105805857" style="zoom:50%;" />



store时候父组件中定义的，子组件中使用，需要再父组件中将Container用Provider包裹起来，store传递下去

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708110641772.png" alt="image-20210708110641772" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210708110859311.png" alt="image-20210708110859311" style="zoom:50%;" />

子组件里面接收props，但是<Container />并没有传下传递内容，这里需要使用 react redux提供的connect方法

在子组件中引入connect

```javascript
import {connect} from 'react-redux';connect(mapStateToProps, mapDispatchToProps)(containerName)
```

 mapStateToProps方法把父组件在<Provider />里面的store转成state，可以直接使用

 mapStateTpProps方法要返回一个对象

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709112958309.png" alt="image-20210709112958309" style="zoom: 67%;" />

Connect 导出

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709113752036.png" alt="image-20210709113752036" style="zoom:67%;" />



总结：

1.父组件引入Provider，传store，把子组件包裹起来

2.子组件中用connect()把父子组件联系起来，2个map方法把父传递下来的props、dispatch转成state

​	分别对应store里面的state，store里面操作state的方法

​	2个方法都返回对象，子组件中数组结构出来直接用

父组件

```javascript
import React from 'react';import ReactDOM from 'react-dom';import {createStore} from 'redux';import math from './reducer/math';import {Provider} from 'react-redux';import Container from './components/Container';const store = createStore(math);function App() {    return (        <Provider store={store}>            <Container />        </Provider>    )}function render() {    ReactDOM.render(        <App />,      document.getElementById('root')    );}render();store.subscribe(render);
```

子组件

```javascript
import React from 'react'import {connect} from 'react-redux';import {addAction, squareAction}from '../actions/actions';function Container (props) {    const {num, add, square} = props;    return (        <div>            <div>{num}</div>            <button onClick={()=>{add(1)}}>加1</button>            <button onClick={()=>{add(2)}}>加2</button>            <button onClick={()=>{square()}}>乘方</button>        </div>    )}const mapStateTpProps = (state) => {    return {        num: state    }}const mapDispatchToProps = (dispatch) => {    return {        add: (value) => dispatch(addAction(value)),        square: ()=> dispatch(squareAction())    }}export default connect(mapStateTpProps, mapDispatchToProps)(Container);
```

Actions.js

```javascript
const addAction = (num) => {    return {        type: ADD,        num    }}const squareAction = () => {    return {        type: SQUARE    }}export {    addAction,    squareAction}
```

Math.js

```javascript
const math = (state = 10, action) => {    switch(action.type) {        case 'ADD':            return state + action.num        case 'SQUARE':            return state * state        default:            return state    }} export default math; 
```

actionType.js

```javascript
 const ADD = 'ADD'; const SQUARE = 'SQUARE'; export {     ADD,     SQUARE }
```



---

## 六、thunk异步处理

1.安装redux-thunk

```javascript
npm i redux-thunk -D
```

thunk以中间件的方式，需要多创建store/store.js



Index,js

![image-20210709133546532](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709133546532.png)

Store.js

![image-20210709133609750](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709133609750.png)



异步处理需要用到thunk

想在Container.js子组件里面新增一个按钮，点击后把state状态改成0，0 是异步请求得到返回的

container.js

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709134550137.png" alt="image-20210709134550137" style="zoom:50%;" />



ActionType.js

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709134620306.png" alt="image-20210709134620306" style="zoom:67%;" />



Actions.js

```javascript
import {ADD, SQUARE, GET} from '../constans/ActionTypes';const addAction = (num) => {    return {        type: ADD,        num    }}const squareAction = () => {    return {        type: SQUARE    }}// action要返回一个对象，但是这里需要返回一个异步请求的方法// 想在dispatch之前拿到最新数据const getAction = () => {    return (dispatch, getState) => {        fetch('./data.json')      	 // 返回的res是一个流对象，fetch提供一种json转义的方式，res.json()会看到是一个Promise对象      	.then(res => console.log(res.json()));    }}export {    addAction,    squareAction,    getAction}
```



为什么这样好使？

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709135758299.png" alt="image-20210709135758299" style="zoom:50%;" />



res

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709135923134.png" alt="image-20210709135923134" style="zoom:50%;" />

Res.json()

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709140201242.png" alt="image-20210709140201242" style="zoom:67" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709140148091.png" alt="image-20210709140148091" style="zoom:50%;" />

then链式调用得到返回数据

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709140451162.png" alt="image-20210709140451162" style="zoom:67%;" />



![image-20210709140420451](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709140420451.png)

把返回的字符串转成数字

![image-20210709141032861](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709141032861.png)

dispatch里面的内容需要再单独处理在reducer里面

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210709141516970.png" alt="image-20210709141516970" style="zoom:67%;" />

点击之后变成0

![image-20210709141542544](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709141542544.png)



再整理一下

![image-20210709141938649](/Users/liyang105/Library/Application Support/typora-user-images/image-20210709141938649.png)

---

