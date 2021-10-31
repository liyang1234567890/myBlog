---
title: react hook-context hook
date: 2021-05-07 02:33:31
tags:
 - react hook
categories:
 -  react hook
sidebar: auto
publish: true
---

# React hook-Context hook

![image-20210628205338099](/Users/liyang105/Library/Application Support/typora-user-images/image-20210628205338099.png)

自上而下跨层级传递数据 

```javascript
import React, {createContext} from 'react';

const AppContext = createContext();

// 类 孙
class Foo extends Component {
  	render() {
      	return (
        		<div>foo</div>
        )
    }
}

// 类 孙
class Bar extends Component {
  	render() {
      	return (
        		<div>bar</div>
        )
    }
}

// 函数 孙
const Baz = (props) => {
  	return (
    		<div>baz</div>
    )
}

// 父
const Middle = (props) => {
  	return (
    		<div>
      			<Foo />
      			<Bar />
      			<Baz />
      	</div>
    )
}

// 爷
const App = (params) => {
		return (
    		<Middle />
    )
}

ReactDom.render(
		<App />,
  	document.getElementByUd('root')
)
```

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210628211518233.png" alt="image-20210628211518233" style="zoom:50%;" />

```javascript
import React, {createContext，  } from 'react';

const AppContext = createContext();

// 类 孙
class Foo extends Component {
  	render() {
      	return (
          	//  比较老的方式，用函数的参数value接受外层传来的值
          	<AppContext.Consumer>
          			{
                  	value => <div>foo-{value}</div>
                }
          	</AppContext.Consumer>
        )
    }
}

// 类 孙
class Bar extends Component {
  	// 类组件的另一种方法
  	static contextType = AppContext;
  	render() {
      	const value = this.value;
      	return (
        		<div>bar-{value}</div>
        )
    }
}

// 函数 孙
const Baz = (props) => {
  	const value = useContext(AppContext);
  	return (
    		<div>baz-{value}</div>
    )
}

// 父
const Middle = (props) => {
  	return (
    		<div>
      			<Foo />
      			<Bar />
      			<Baz />
      	</div>
    )
}

// 爷
const App = (params) => {
		return (
      	<AppContent.Provider value="liyang">
      			<Middle />
      	</AppContent.Provider>
    )
}

ReactDom.render(
		<App />,
  	document.getElementByUd('root')
)
```

