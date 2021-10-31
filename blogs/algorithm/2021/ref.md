---
title: react hook-ref
date: 2021-07-07 06:20:00
tags:
 - react hook
categories:
 -  react hook
sidebar: auto
publish: true
---

# 类组件的ref

旧用法

```javascript
class Foo extends React.Component {
  	handleInput = (input) => {
      	this.input = input;
    }
  
    handleClick = () => {
      	this.input.focus();
    }

  	render() {
				return (
        		<div>
          			// 回调   					 ref={ref => {this.MsgHeader = ref;}}
          			<input type="text" ref={this.handleInput} />
          			<button onCLick={this.handleClick}>聚焦</button>
          	</div>
        )
    }
}

const App = (params) => {
  	render() {
      	return (
        		<div>
          			<Foo />
          	</div>
        )
    }
  
}
```

 <img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210628223357281.png" alt="image-20210628223357281" style="zoom:50%;" />

点击按钮让input聚焦

---

新用法

```javascript
import {createRef} from 'react';

class Foo extends React.Component {
		inputRef = createRef();

    handleClick = () => {
      	// this.input.focus();
     	 	this.inputRef.current.focus();
    }
   
  	render() {
				return (
        		<div>
          			// 回调   				  ref={ref => {this.inputRef = ref;}}
          			<input type="text" ref={this.inputRef} />
          			<button onCLick={this.handleClick}>聚焦</button>
          	</div>
        )
    }
}

const App = (params) => {
  	render() {
      	return (
        		<div>
          			<Foo />
          	</div>
        )
    }
  
}
```

---

想要在父组件中，（新加一个）点击按钮，子组件的input聚焦

![image-20210628232533658](/Users/liyang105/Library/Application Support/typora-user-images/image-20210628232533658.png)

---



# 函数组件的ref

```javascript
import {useRef} from 'react';

const Foo = (params) => {
		const inputRef = useRef();//用createRef()也行
  
    handleClick = () => {
      	inputRef.current.focus();
    }

  	render() {
				return (
        		<div>
          			// 回调 
          			<input type="text" ref={inputRef} />
          			<button onCLick={handleClick}>聚焦</button>
          	</div>
        )
    }
}

const App = (params) => {
  	render() {
      	return (
        		<div>
          			<Foo />
          	</div>
        )
    }
  
}
```



想要在父组件中，（新加一个）点击按钮，子组件的input聚焦

```javascript
import {useRef} from 'react';

const Foo = (params) => {
		const inputRef = useRef();//用createRef()也行
  
    handleClick = () => {
      	inputRef.current.focus();
    }

  	render() {
				return (
        		<div>
          			<input type="text" ref={inputRef} />
          			<button onCLick={handleClick}>聚焦</button>
          	</div>
        )
    }
}

const App = (params) => {
  	const inputRef = createRef();
  
  	const handleClick = () => {
      	console.log(inputRef.current);
    }
 
  	render() {
      	return (
        		<div>
          			<Foo ref={inputRef} />
  							<button onClick={handleClick}>父组件button</button>
          	</div>
        )
    }
}
```

父组件打印console.log(inputRef.current);会报错

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210628234759142.png" alt="image-20210628234759142" style="zoom:50%;" />

原因：子组件是函数式组件，在父组件使用子组件的时候不能传属性ref

解决：使用hooks中的forwardRef钩子

* forwardRef()把子组件<Foo />包起来

* 子组件（函数组件）接受参数（父组件传的属性ref）,不再使用useRef()
* 父组件使用createRef()

```javascript
import {useRef} from 'react';

const Foo = forwardRef((params, inputRef) => {
		// const inputRef = useRef();
  
    handleClick = () => {
      	inputRef.current.focus();
    }

  	render() {
				return (
        		<div>
          			<input type="text" ref={inputRef} />
          			<button onCLick={handleClick}>聚焦</button>
          	</div>
        )
    }
});

const App = (params) => {
  	const inputRef = createRef();
  
  	const handleClick = () => {
      	console.log(inputRef.current);
      	inputRef.current.focus();
    }
 
  	render() {
      	return (
        		<div>
          			<Foo ref={inputRef} />
  							<button onClick={handleClick}>父组件button</button>
          	</div>
        )
    }
}
```

父组件打印console.log(inputRef.current);  是input标签

![image-20210628235709124](/Users/liyang105/Library/Application Support/typora-user-images/image-20210628235709124.png)

inputRef.current.focus();