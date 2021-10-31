---
title: react hook-usememo&usecallback
date: 2021-07-20 03:19:09
tags:
 - react hook
categories:
 -  react hook
sidebar: auto
publish: true
---

# UseMemo和useCallback

他俩说的是一回事儿，性能优化的时候传入一个特定的值不会重复计算

 <img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629065543800.png" alt="image-20210629065543800" style="zoom: 67%;" />

刷新时有短暂卡顿过程，会报错栈溢出

![image-20210629065709104](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629065709104.png)

点击add一次render()就执行一次，打印出1一次，说明每次点击都执行一次render()

![image-20210629070335639](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629070335639.png)

父组件传属性count

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629070716947.png" alt="image-20210629070716947" style="zoom:67%;" />

子组件也显示count

![image-20210629070841016](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629070841016.png)

---



不希望子组件渲染方法

* 类组件：PureComponent

![image-20210629071124851](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629071124851.png)

父组件中<Foo count={1} />，传入的属性不变，子组件（类组件）用PureComponent，render不会执行，不会打印

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629071313995.png" alt="image-20210629071313995" style="zoom:67%;" />

* 函数组件：使用memo

	父组件<Foo count={1} />传入的属性不变，子组件（函数组件）memo()把子组件包起来，render不会执行，不会打印

	<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629071626516.png" alt="image-20210629071626516" style="zoom:67%;" />

memo()是函数组件优化的方式，父组件传的属性不变，子组件就不再重新执行

---

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629072852804.png" alt="image-20210629072852804" style="zoom:67%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629072251611.png" alt="image-20210629072251611" style="zoom:67%;" />

每次点击add，传递render()是方法，是对象，会变化，每次都会打印Foo render、打印1

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629074011769.png" alt="image-20210629074011769" style="zoom:50%;" />



每次重新执行，render()重新执行，每次的引用不同，每次执行都是新的，**想让render()每次执行的时候指向同一引用**，使用useCallback()把父组件要传递的render()方法包起来

render()还会每次都执行，要加第二个参数

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629074142966.png" alt="image-20210629074142966" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629072444735.png" alt="image-20210629072444735" style="zoom:67%;" />



第二个参数表示依赖，xxx变化时render()才重新执行，[]和[range]都子组件都没有渲染，没有打印

[]表示render()永远都不会重新渲染，render()永远指向同一个函数

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629072852804.png" alt="image-20210629072852804" style="zoom:67%;" />



<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629073033038.png" alt="image-20210629073033038" style="zoom:67%;" />

useCallback()固定一个函数，useMemo()固定一个值



父组件<Foo render={render} /> render不是方法，是一个模板，一个具体的值，点击add之后不会渲染render，不会打印Foo render、1

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629074546108.png" alt="image-20210629074546108" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629075614625.png" alt="image-20210629075614625" style="zoom:50%;" />

首次渲染时，useMemo()里面包的函数会执行，返回list交给render，父组件<Foo render={render} /> render不是方法，是一个模板，一个具体的值

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629075231538.png" alt="image-20210629075231538" style="zoom:67%;" />

这个值没有变化，子组件里面不会重新执行

![image-20210629075411031](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629075411031.png)



useMemo()里的依赖项加上[range]

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629074546108.png" alt="image-20210629074546108" style="zoom:50%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629080046471.png" alt="image-20210629080046471" style="zoom:67%;" />

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629080000721.png" alt="image-20210629080000721" style="zoom:67%;" />

---

使用callback()

render是方法

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210629080515240.png" alt="image-20210629080515240" style="zoom: 67%;" />

![image-20210629080432646](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629080432646.png)

![image-20210629080403572](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629080403572.png)

---

memo是子组件是函数组件，父擦混地的属性变化才重新执行子组件时使用

useMemo是固定值用的，不想让子组件重新渲染

* 函数组件：父组件中传递的方法外面用useMemo()包起来，传属性是传值
* 类组件：传一个固定的值

useCallback

* 函数组件：useCallback包在要传递方法外面，固定这个函数，传属性是函数

* 类组件：实例，箭头函数绑定



useMemo、useCallback是性能优化的手段，不想让子组件重新执行时使用

和useEffect()是2个维度的东西

![image-20210629081622391](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629081622391.png)

![image-20210629081653423](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629081653423.png)

useMemo()只负责渲染



![image-20210629081808830](/Users/liyang105/Library/Application Support/typora-user-images/image-20210629081808830.png)