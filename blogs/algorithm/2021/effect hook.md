---
title: react hook-effect hook
date: 2021-05-22 03:17:01
tags:
 - react hook
categories:
 -  react hook
sidebar: auto
publish: true
---

# REACT HOOK-EFFECT HOOK

副作用

纯函数：不喝外部交互，相同的输入=》相同的输出

  1.引用外部变量 2.调用外部函数

函数内想用到本文件相关的变量之外的变量，从别的文件得到的变量，window.a，document.b，发送ajax请求，都叫副作用



副作用：和外部变量的交互 

1. 修改dom
2. 修改全局变量
3. ajax
4. 计时器：依赖window.setTimeout
5. 存储相关：依赖api，变量



使用useEffect()就是在做副作用操作

![image-20210626175238975](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626175238975.png)

useEffect()相当于吧didMount()和didUpdate()合并了

![image-20210626175525516](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626175525516.png)

首次加载

点击按钮触发重新加载更新都打印出来了 render、effect

![image-20210626175742938](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626175742938.png)

render的时候，构建的是react虚拟dom树，didUpdate里面才是构建好真实的dom

useEffect()会在didUpdate（真实dom创建好）之后执行，它里面的钩子是异步的

 ![image-20210626180435844](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626180435844.png)

首次加载打印0，点击按钮后重新渲染，打印1

![image-20210626180733744](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626180733744.png)

![image-20210626181028277](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626181028277.png)

![image-20210626181509843](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626181509843.png)

useEffect()里面多加return ，首次加载打印出render useEffect

点击触发更新之后打印出render、clear、useEffect

存在清理函数时，更新时先执行清理函数，就是类组件中willunMount()里面要执行的东西

![image-20210626181736377](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626181736377.png)

![image-20210626182426632](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626182426632.png)

每一次运行的副作用函数都是一个新的不同的函数

清除函数清除的是effect，清除的ttimer就是外部的定时器，典型的闭包

首次执行时肯定要先执行一次定时器，点击更新后清除上一次的定时器，再得到一个新的定时器

更新执行的useEffect()和首次的useEffect()没有关系

---

想要销毁子组件App（只有子组件能销毁掉？？？）

```javascript
// 子组件
const Foo = () => {
  	const [count, setCount] = useState(0);
  	console.log("render");
  
  	// 异步的
  	useEffect(() => {
      	//let timer = setInterval(() => {
        //  	setCount(count + 1);
        //}, 1000);
      	
				console.log("useEffect");
      	return () => {
						console.log("clear effect");
          	// clearInterval(timer);
        }
    });
  
  	return (
      	<div>
      			 	<div>{count}</div>
      				<button onClick={() => setCount(count + 1)}>click</button>
      	</div>
    )
}

// 父组件
function App = () => {
  	const [visible, setVisible] = useState(true);
  
		return (
    		<div>
      			{visible && <Foo />}
      			<button onClick={()=> setVisible(!visible)}>显示/隐藏</button>
      	</div>
    )
}

// 刷新后 首次加载  打印出render useEffect
// 点击父组件中按钮后打印出clear effect
// 组件销毁（visible: false）的时候也会执行清理函数
```

![image-20210626192258065](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626192258065.png)

State变化触发页面更新，每次都会先清理上次的计时器，再重新新建一个计时器，希望只在首次渲染时（didMount）执行，不想在didUpdate执行

![image-20210626193642889](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626193642889.png) 

useEffect()加上第二个参数，空数组，render、开启计时器，每隔一秒打印一次“进入计时器”，点击“隐藏”后，打印 “清除计时器”

useEffect里面可以拿到外部的count，典型闭包

页面中显示的count一直是1，为什么？

![image-20210627001002992](/Users/liyang105/Library/Application Support/typora-user-images/image-20210627001002992.png)

首次渲染count初始值0，点击之后state+1，定时器里面得到的count是闭包取到的state count，一直是0，count+1一直是1，页面会一直显示1

解决1：setCount使用箭头函数的方式setCount(count => count + 1);

这里的count是从参数得到的，不是从state得到的

但是此时控制台中会有一个warning，缺少依赖



![image-20210627002225958](/Users/liyang105/Library/Application Support/typora-user-images/image-20210627002225958.png)

解决2：数组中加上依赖[count]

但此时又出现一个问题，有回到了开始的问题，count变化，useEffect重新执行，又会重新开启计时器

最佳解决方案是1

![image-20210627002844618](/Users/liyang105/Library/Application Support/typora-user-images/image-20210627002844618.png)

类组件中，多个副作用要在didMount里面，现在可以分开写在useEffect()里面，效果是一样的，并且先定义的useEffect()就先执行

![image-20210627003055752](/Users/liyang105/Library/Application Support/typora-user-images/image-20210627003055752.png)

关注点分离 自定义hook

![image-20210627003603343](/Users/liyang105/Library/Application Support/typora-user-images/image-20210627003603343.png)

useCount()专门用来处理标题的

---

useEffect规则

- 在每次render之后执行
- 接收第二个参数来控制跳过执行，下次render后如果指定的值没有变化就不会执行
- useEffect时在render之后浏览器已经渲染结束才执行

useEffect()的第2个参数

- 它是可选的
- 类型是一个数组

不同值的参数

* 没有第二个参数时,组件的初始话和更新都会执行

* 空数组时，初始化调用一次之后不再执行，相当于componentDidMount
* 有一个值的数组时，该值有变化就执行
* 有多个值的数组时，只要有一个值有变化就执行

