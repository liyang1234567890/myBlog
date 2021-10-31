
一看就懂的var、let、const三者区别
======================

### var 变量提升机制

我们在全局作用域中或还是在局部作用域中，使用`var`关键字声明的变量，都会被提升到该作用域的最顶部，这就是我们常说的变量提升。

    function person(status) {
        if (status) {
            var value = "蛙人" 
        } else {
            console.log(value) // undefined
        }
        console.log(value) // undefined
    }
    person(false)
    复制代码

上面example中，`if`代码块中的var声明的变量就被提升到了函数的顶端，有的小伙伴就会疑惑了，`if`代码块里的都没执行，怎么会提升到顶端了呢？，这是因为javaScript引擎，在代码预编译时，javaScript引擎会自动将所有代码里面的`var`关键字声明的语句都会提升到当前作用域的顶端, 因此上面的代码就会被解析为下面。

    function person(status) {
        var value;
        if (status) {
            value = "蛙人" 
        } else {
            console.log(value) // undefined
        }
        console.log(value) // undefined
    }
    person(false)
    
    复制代码

由于javaScript存在变量提升，这让很多开发者初学起来这门语言，还得花不少时间研究变量提升，也有时在工作中因为一个变量提升导致出bug。因此Escript6中为我们带了`块级声明`，那么什么是块级声明呢？

*   只在当前函数下声明的变量有效
*   在代码块和{ }括号之内有效

* * *

### let声明

`let`声明和var声明用法是一样，都是定义变量，使用let声明的变量没有var那样的变量提升，let声明的变量只在当前作用域中有效。我们来把上面的example重写一下。

    function person(status) {
        if (status) {
            let value = "蛙人" 
        } else {
            console.log(value) // 报错
        }
        console.log(value) // 报错
    }
    person(false)
    复制代码

let是块级作用域，所有外面的语句块访问不到，let是没有变量提升的，下面我们来演示一下。

    console.log(value) // 报错
    let value = "蛙人"
    复制代码

#### 禁止重复声明

如果在同一个作用域中某个变量已经存在，再次使用let关键字声明的话会报错。

    var value = "蛙人"
    let value = "蛙人" // 报错
    
    // 再来看一下不同作用域的情况
    
    var value = "蛙人" // 全局作用域
    if(true) {
    	let value = "蛙人" // 代码块中声明，毫无影响
    }
    复制代码

上面example中，可以完全看到，只有在相同作用域中重复声明变量才会报错。

* * *

### const声明

ECMAscript6中还提供了const关键字声明，const声明指的是常量，常量就是一旦定义完就不能修改的值。还有一点需要注意的是，常量定义必须初始化值，如果不初始化值就会报错。

    const value = "蛙人"
    const age; // 报错 常量未初始化
    复制代码

### const 与 let

const与let也没什么大不同，都是块级作用域，const常量也只会在当前代码块内有效，也不能在当前作用域中重复定义相同的变量，也不存在变量提升。

    if (true) {
        const name = "蛙人"
    }
    console.log(name) // 报错 访问不到内部变量
    复制代码

    console.log(value) // 报错 const声明的变量也不存在变量提升
    const value = "蛙人"
    复制代码

    let value = "蛙人"
    const value = "蛙人" // 报错 重复声明
    复制代码

#### const声明对象

虽然const变量不能修改指针，但是可以修改值，比如我们定义一个对象，我们就可以修改对象里的属性值，但是不可以重写整个对象。

    const person = {
        name: "蛙人",
        age: 23
    }
    person.age = 18 // 没问题
    person = {} // 报错 不能修改对象指针
    复制代码

### 暂时死区

跟var相比，let和const定义变量不会被提升到作用域顶端，即便是用相对安全的typeof也会出现错误。

    console.log(typeof value)
    let value = "蛙人"
    复制代码

上面example中，`console.log(typeof value)`会抛出错误是因为用let定义并初始化变量语句是不会执行的。此时的value还是处于在JavaScript所谓的`暂时死区（temporal dead zone）`简称为TDZ 中，虽然JavaScript没有明确标准TDZ，但是人们常用它描述let和const定义的变量不会提升。  

我们来说一下TDZ工作原理，JavaScript引擎在扫描代码时发现变量声明时，如果遇到`var`就会将它们提升到当前作用域的顶端，如果遇到`let或const`就会将声明放到TDZ中，如果访问TDZ中的变量就会抛出错误，只有执行完TDZ中的变量才会将它移出，然后就可以正常方法。这机制只会在当前作用域生效。我们来看下不同作用域案例

    console.log(typeof value)  // "undefined"
    if (true) {
        let value = "蛙人"
    }
    复制代码

上面说的如果变量是let和const声明的就会被放到TDZ中，前提是只会针对当前作用域内有效。所以上面代码中`console.log(typeof value)`不会抛出错误，let声明只会在当前的语句中有效。

### var let const 最大的区别

var在全局作用域声明的变量有一种行为会挂载在window对象上，它会创建一个新的全局变量作为全局对象的属性，这种行为说不定会覆盖到window对象上的某个属性，而`let const`声明的变量则不会有这一行为。来看下面例子。

    var value1 = "张三"
    let value2 = "李四"
    const value3 = "王五"
    console.log(window.value1) // 张三
    console.log(window.value2) // undefined
    console.log(window.value3) // undefined
    复制代码

--------------