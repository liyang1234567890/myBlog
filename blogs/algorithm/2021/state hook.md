---
title: react hook-state hook
date: 2021-06-13 00:09:11
tags:
 - react hook
categories:
 -  react hook
sidebar: auto
publish: true
---

## react hooks-state hook

```javascript
import React, {setState} from 'react';
import ReactDom from 'react-dom';

const App = () => {
  const [count , setCount] = useState(0);
  
  // 点击后count会+1
  const handleClick = () => {
    	setCount(count + 1)
	}

  return (
      <div>
					<div>{count}</div>
    			<button onClick={() => handleClick()}>click</button>
      </div>
  )
}

ReactDom.render(
  	<App />,
  	document.getElementById('root');
)

/* 
函数式组件中使用hook非常方便
count是一个变量 可以任意更改变量的值，只需要setCount()时把变量想变成什么样传进去
*/

// 类组件中的this.setState()是异步的，hook中setCount()也是异步的，有没有同步的写法呢

const handleClick = () => {
    setCount(count + 1)；
    console.log('count', count); // 0 
  // console.log是同步的，setCount()是异步的，点击后执行到console的时候setCount还没执行过完
  
  // 同步的方法类似于类组件中的setState()回调函数的写法
  setCount((count) => count + 1);
  // 回调中的count是通过参数count决定的
  
  // 此时打印出count
  setCount((count) => {
     count++;
     console.log('count', count); // 1 用回调得到的是同步的结果
     return count;
  });
  // {return XXX} 和 XXX是一样的
  
}
/*
	若在点击时间外部直接setCount(count++)是不可以的
  它相当于setCount(count = coun t+ 1)
  count是state，这相当于在操作更改state是不行的
  
  而在点击事件里 setCount()里面 更改的count取的是参数count，参数是state count的引用，是可以改变的
  setCount((count) => {
     count++;
     console.log('count', count); // 1 
     return count;
  });
*/
```

![image-20210623173239239](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623173239239.png)

在点击事件外部console.log(count);可以得到最新的count

每次点击，setCount()更新count，会触发App组件重新render渲染一次，会打印出最新的count

---

![image-20210623173616086](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623173616086.png)

setCount()的count没变化，不会触犯App重新渲染，console.log()打印不出值

![image-20210623173740850](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623173740850.png)

换成回调的写法，值没有变化，也是外部打印不出值    **原始值对比的是原始值**

![image-20210623174352588](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623174352588.png)

**引用值对比的是引用** 两个相同的对象是不相等的，值变化了，会重新渲染，会打印出值

![image-20210623174700634](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623174700634.png)

 

![image-20210623190532047](/Users/liyang105/Library/Application Support/typora-user-images/image-20210623190532047.png)

dom中渲染的变量不能是一个对象，setCount()里面的东西就是count，开始count是0，点击后count是{value: 1}，值发生了变化，App重新渲染，console打印出{}



![image-20210625113554542](/Users/liyang105/Library/Application Support/typora-user-images/image-20210625113554542.png) 

初始显示0，点击后显示1，打印出{}



![image-20210625113846712](/Users/liyang105/Library/Application Support/typora-user-images/image-20210625113846712.png)

想实现加计数器，类组件会自动合并  对象，函数组件不会，要return一个构造的对象

![image-20210625114355521](/Users/liyang105/Library/Application Support/typora-user-images/image-20210625114355521.png)

三目写法，if的写法更好读，看起来像redux

```javascript
import React from 'react';

const App = () => {
		const [count, countDispatch] = useState({type: 'add', value: 0});
  
  	const onClick = () => {
      	countDispatch((prevState)) => {
						if (prevState.type === 'add') {
              	return {
                  	...prevState,
                 	 	value: prevState.value + 1
                }
            }
          return prevState;
        }
		}
}

```

当想传递的state是一个对象的时候，应该考虑的不是使用useState，应该是useReducer 

```javascript
import React, {useReducer} from 'react';

const App = () => {
  	// 等价于之前的if写法 参数state就是count
    // 项目中通常countReducer是别的文件引入进来的
  	const countReducer = (state, action) => {
				switch(action.type) {
          case 'add': 
            	return state + 1;
          case 'minus': 
              return state - 1;
          default: 
            	return state;
        }
    }
 
    // count的初始值是0 起名是有讲究的 配套的
    // 数组里面对应就是上面countReducer的参数state、action
    // useReducer类似于createStore 更新数据的方式用dispatch
		const [count, countDispatch] = useReducer(countReducer, 0);
  
  	const onClick = () => {
      	// 这是一个action
      	countDispatch({type: 'add'})；
		}
}
```



hook使用规则

1.在函数式组件的最顶层使用hook

```javascript
import React, {useReducer} from 'react';

const App = () => {
  	// 放在最开始  
  	const [count, countDispatch] = useReducer(countReducer, 0);
 
  	// 等价于之前的if写法 参数state就是count
  	const countReducer = (state, action) => {
				switch(action.type) {
          case 'add': 
            	return state + 1;
          case 'minus': 
              return state - 1;
          default: 
            	return state;
        }
    }
  
  	const onClick = () => {
      	// 这是一个action
      	countDispatch({type: 'add'})；
		}
}
```

2.hook方法只能在函数式组件和自定义hook中使用

3.不能再if/switch/for中调用hook，因为会改变调用顺序

之前版本要安装一个eslint插件，现在自动帮安装好了

![image-20210626173105095](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626173105095.png)

hook放在if(false)中也会报错，for、while中都会强制报错 

4.不能在方法里面使用hook

![image-20210626173334781](/Users/liyang105/Library/Application Support/typora-user-images/image-20210626173334781.png)