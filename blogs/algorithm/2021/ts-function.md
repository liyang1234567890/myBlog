---
title: ts-函数、接口、字面量类型
date: 2021-04-30 22:01:18
tags:
 - typescript
categories:
 -  typescript
sidebar: auto
publish: true
---

## typescript分享

#### 一、接口

> 我自己的理解，接口就是描述对象的形状

```tsx
function test(obj: { label: string }) {
    console.log(obj.label);
}
let myObj = {
    size: 10,
    label: "这是一句话"
};
test(myObj);
```

传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。

---

#### 1.1.一个例子

```tsx
// 使用接口来描述：必须包含一个label属性且类型为string
interface objType {
    label: string;
}

function test(obj: objType) {
    console.log(obj.label);
}

let myObj = {
    size: 10,
    label: "这是一句话"
};
test(myObj);
```

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210908153757829.png" alt="image-20210908153757829"  />

类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

##### 1.2.可选属性

> 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 

###### 1.2.1.好处之一

是可以对可能存在的属性进行预定义

```tsx
interface Person {
    id: number,
    name: string,
    sex: string
}

let person: Person = { id: 1, name: "haha", sex: "male"};
```

interface一旦确定了，类型和数量都不能再改变了，对象中加一个或者去掉一个属性都不行

如果少写一个属性会报错

![image-20210908173639517](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908173639517.png)

所以可以使用可选属性 ？

![image-20210908173726244](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908173726244.png)

---

###### 1.2.2.好处之二

是可以捕获引用了不存在的属性时的错误，比如，我们故意将`createSquare`里的`color`属性名拼错，就会得到一个错误提示：

```tsx
interface SquareConfig {
    color?: string;
    width?: number;
}

function Square(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = Square({ color: "black" });
```

![image-20210908154740029](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908154740029.png)

---

如果手欠多加了一个属性会怎么样？

```tsx
interface Person {
    id: number,
    name: string,
    sex: string
}

let person: Person = {
    id: 1,
    name: "haha",
    sex: "male",
    address: "beijing"
};
```

![image-20210908174007530](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908174007530.png)

那应该怎么做？

```tsx
interface Person {
    id: number,
    name: string,
    sex: string,
    [propName: string]: any
}

let person: Person = {
    id: 1,
    name: "haha",
    sex: "male",
    address: "beijing"
};
```

---

##### 1.3.只读属性

> 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用`readonly`来指定只读属性:

```tsx
interface Person {
    readonly id: number,
    name: string,
    sex?: string
}

let person: Person = { id: 1, name: "haha"};
person.id = 2;
```

id前面加了readonly之后，id的值就不可以改变了

![image-20210908172519556](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908172519556.png)

---

##### 1.4.`readonly` vs `const`

> 最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用`const`，若做为属性则使用`readonly`。

---

##### 1.5.函数类型

接口也可以描述函数类型。

<a href="https://www.w3school.com.cn/js/jsref_search.asp">search用法</a>

```tsx
interface SearchFunc {
  	// 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
mySearch('beijing', 'i');

// 2
```

参数名可以不一致

---

1.6.可索引的类型

```tsx
interface StringArray {    [index: number]: string;}let myArray: StringArray;myArray = ["Bob", "Fred"];let myStr: string = myArray[0];
```

---

##### 1.7.继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```tsx
interface Shape {    color: string;}interface Square extends Shape {    sideLength: number;}let square:Square = {};let square = <Square>{};square.color = "blue";square.sideLength = 10;
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```tsx
interface Shape {    color: string;}interface PenStroke {    penWidth: number;}interface Square extends Shape, PenStroke {    sideLength: number;}// let square:Square = {};let square = <Square>{};square.color = "blue";square.sideLength = 10;square.penWidth = 5.0;
```

---

混合类型、接口继承类。。。

---

#### 二、函数

##### 2.1.函数声明的注解方式：

```tsx
function test(a, b) {	return a + b;}
```

```tsx
function test(a: number, b: number):number {	return a + b;}
```

##### 2.2.函数表达式的注解方式：

```tsx
let test = function(a, b) {	return a + b;}
```

为函数指定类型

```tsx
let test = function(a: number, b: number): number {	return a + b;}
```

函数的完整类型

```tsx
let test: (a: number, b: number) => number = function (a: number, b: number) {	return a + b;}
```

看起来很麻烦，通常会写成

```tsx
let test: (a: number, b: number) => number = function (a, b) {	return a + b;}
```

因为在你写返回值的时候，ts会根据`return a + b`自动推断出函数的返回值类型为number，这个叫做**类型推断**。

鼠标放在function上面会看到函数的返回值默认就是number

![image-20210909145406484](/Users/liyang105/Library/Application Support/typora-user-images/image-20210909145406484.png)

---

##### 2.3.注意：

![image-20210908192947119](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908192947119.png)

---

注解函数书表达式时，返回值类型处的箭头是es6箭头函数中的箭头吗？

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210908193242931.png" alt="image-20210908193242931" style="zoom:50%;" />

不是

---

##### 2.4.可选参数和默认参数

```tsx
function buildName(firstName: string, lastName: string){    return firstName + " " + lastName;}let result1 = buildName("Bob");                  // error, too few parameterslet result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameterslet result3 = buildName("Bob", "Adams");         // ah, just right
```

js里每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 

ts里我们可以在参数名旁使用`?`实现可选参数的功能。 比如，我们想让last name是可选的：

```tsx
function buildName(firstName: string, lastName?: string){    if (lastName)        return firstName + " " + lastName;    else        return firstName;}let result1 = buildName("Bob");  // works correctly nowlet result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameterslet result3 = buildName("Bob", "Adams");  // ah, just right
```

可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

![image-20210908201445283](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908201445283.png)

---

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined`时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为`"Smith"`。

```tsx
function buildName(firstName: string, lastName = "Smith") {    return firstName + " " + lastName;}let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameterslet result4 = buildName("Bob", "Adams");         // ah, just right
```

![image-20210908204831699](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908204831699.png)

可以看到，给lastName设置默认值默认她就是可选的变量了。

---

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入`undefined`值来获得默认值。 例如，我们重写最后一个例子，让`firstName`是带默认值的参数：

![image-20210908210616669](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908210616669.png)

result1为什么报错？

---

##### 2.5.剩余参数

 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 `arguments`来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：

```tsx
function buildName(firstName: string, ...restOfName: string[]) {  return firstName + " " + restOfName.join(" ");}let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");// arguments {'0': 'Joseph', '1': 'Samuel', '2': 'Lucas', '3': 'MacKinzie'}// restOfName ["Samuel",  "Lucas",  "MacKinzie"]
```

函数的arguments是一个类数组，是一个有length属性的对象

![image-20210906222924361](/Users/liyang105/Library/Application Support/typora-user-images/image-20210906222924361.png)

IArguments是一个interface

![image-20210906223643337](/Users/liyang105/Library/Application Support/typora-user-images/image-20210906223643337.png)

这样也可以

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210906223841506.png" alt="image-20210906223841506"  />

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```tsx
function buildName(firstName: string, ...restOfName: string[]) {  return firstName + " " + restOfName.join(" ");}let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

---

##### 2.6.this

```tsx
let deck = {    suits: ["hearts", "spades", "clubs", "diamonds"],    cards: Array(52),    createCardPicker: function() {        return function() {            let pickedCard = Math.floor(Math.random() * 52);            let pickedSuit = Math.floor(pickedCard / 13);            return {suit: this.suits[pickedSuit], card: pickedCard % 13};        }    }}let cardPicker = deck.createCardPicker();let pickedCard = cardPicker();alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

`createCardPicker`返回的函数里的`this`被设置成了`window`而不是`deck`对象。

使用箭头函数即可

```tsx
let deck = {    suits: ["hearts", "spades", "clubs", "diamonds"],    cards: Array(52),    createCardPicker: function() {        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here        return () => {            let pickedCard = Math.floor(Math.random() * 52);            let pickedSuit = Math.floor(pickedCard / 13);            return {suit: this.suits[pickedSuit], card: pickedCard % 13};        }    }}let cardPicker = deck.createCardPicker();let pickedCard = cardPicker();alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

---

`this`参数在回调函数里

```tsx
interface UIElement{    addClickListener(onclick: (this:void, e:Event) => void);}
```

```tsx
class Handler {    info: string;    onClickBad(this: Handler, e: Event) {        // oops, used this here. using this callback would crash at runtime        // can't use this here because it's of type void!        this.info = e.message;    }}let h = new Handler();uiElement.addClickListener(h.onClickBad); // error!
```

上面的接口中 `this:void` 表明 `onclick` 函数应该是一个不需要 `this` 对象的函数。如果 `onclick` 指向的是一个成员函数而且函数需要使用 `this` 对象，那么则 `onclick` 需要通过箭头函数来实现。示例如下：

```tsx
class Handler{   info:string;   onClickGood = (e:Event) => { this.info = e.message }}let h = new Handler();uiElement.addClickListener(h.onClickGood);
```

---

2.7.重载

函数重载是指同一个函数名可以对应着多个函数的实现。例如：用add2( )求2个数的和，用add3()求三个数的和，没有必要写两个函数。我们只要写一个函数就可以了。

使用的地方：前提是函数功能相同。
（1）当两个函数功能相同的时候(比如是实现两个数相加)，而参数类型不同可以用函数重载(使用一个函数)。
（2）当两个函数功能相同的时候，而参数的个数不同就可以考虑使用函数重载(使用一个函数)。

![image-20210908233817261](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908233817261.png)



![image-20210908233903004](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908233903004.png)

**在调用这个函数的时候接了传参相关的校验检查**

---

#### 三、字面量类型

> 目前 TypeScript 中有三种可用的字面量类型集合，分别是：字符串、数字和布尔值。通过使用字面量类型，你可以规定一个字符串、数字或布尔值必须含有的确定值。

##### 3.1. 字符串

使用一个字符串字面量作为一个类型：

```tsx
//创建了一个被称为 foo 变量，它仅接收一个字面量值为 Hello 的变量：//let foo: string;let foo: 'Hello';foo = 'bar';
```

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210908144448486.png" alt="image-20210908144448486"  />

---

这个功能本身并不是很实用，但是可以在一个联合类型中组合创建一个强大的（实用的）抽象，我们可以获取一种字符串并使其有类似枚举（enum）的行为。

```tsx
type CardinalDirection = 'North' | 'East' | 'South' | 'West';function move(distance: number, direction: CardinalDirection) {  // ...}move(1, 'North'); // okmove(1, 'Nurth'); // Error
```



![image-20210908144655324](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908144655324.png)

---

##### 3.2.数字

```tsx
type OneToFive = 1 | 2 | 3 | 4 | 5;
```

![image-20210908145511844](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908145511844.png)

---

##### 3.3.布尔值

```ts
type Bools = true | false;
```

![image-20210908145603669](/Users/liyang105/Library/Application Support/typora-user-images/image-20210908145603669.png)

---

#### 四、推荐文档

<a href="https://jkchao.github.io/typescript-book-chinese/typings/literals.html#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E9%87%8F">推荐文档</a>

<a href="https://www.tslang.cn/docs/handbook/interfaces.html">官方文档</a>

