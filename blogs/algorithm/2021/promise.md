
---
title: Promise
date: 2021-10-21 04:33:11
tags:
 - Promise
categories:
 - es6
sidebar: auto
publish: true
---
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fefffef1b0045889fc501761cae2dfe~tplv-k3u1fbpfcp-watermark.image)

开淦!
___
Promise不会？？看这里！！！史上最通俗易懂的Promise！！！
            <!----></h1> <!----> <!----> <div data-v-13bb1455="" class="article-content" itemprop="articleBody"><div class="markdown-body html"><style>.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:30px;margin-bottom:5px}.markdown-body h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:15px}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}.markdown-body .contains-task-list{padding-left:0}.markdown-body .task-list-item{list-style:none}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}</style><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/18/16371e0fdfacbbcc~tplv-t2oaga2asx-watermark.awebp" loading="lazy" class="medium-zoom-image"><br></p><h2 data-id="heading-0">一、什么是Promise？我们用Promise来解决什么问题？</h2><div><div><blockquote><div>Promise 是异步编程的一种解决方案：
从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。
promise有三种状态：<b>pending(等待态)，fulfiled(成功态)，rejected(失败态)</b>；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。</div></blockquote><p>我相信大家经常写这样的代码：</p><p></p><p></p><p></p><pre><code lang="bash" class="copyable">// 当参数a大于10且参数fn2是一个方法时 执行fn2
<span>function</span> fn1(a, fn2) {
    <span>if</span> (a &gt; 10 &amp;&amp; typeof fn2 == <span>'function'</span>) {
        fn2()
    }
}
fn1(11, <span><span>function</span></span>() {
    console.log(<span>'this is a callback'</span>)
})<span class="copy-code-btn">复制代码</span></code></pre><p></p></div>一般来说我们会碰到的回调嵌套都不会很多，一般就一到两级，但是某些情况下，回调嵌套很多时，代码就会非常繁琐，会给我们的编程带来很多的麻烦，这种情况俗称——回调地狱。<br></div><p>这时候我们的promise就应运而生、粉墨登场了</p><p>promise是用来解决两个问题的：</p><ul><li><div><div>回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象</div></div></li><li><div>promise可以支持多个并发的请求，获取并发请求中的数据</div></li><li><div>这个promise可以解决异步的问题，本身不能说promise是异步的<br></div></li></ul><p><br></p><h2 data-id="heading-1">二、es6 promise用法大全</h2><p>Promise是一个构造函数，自己身上有all、reject、resolve这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法。</p><p>那就new一个</p><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>let</span> p = new Promise((resolve, reject) =&gt; {
    //做一些异步操作
    <span>set</span>Timeout(() =&gt; {
        console.log(<span>'执行完成'</span>);
        resolve(<span>'我是成功！！'</span>);
    }, 2000);
});<span class="copy-code-btn">复制代码</span></code></pre><p></p><div>Promise的构造函数接收一个参数：函数，并且这个函数需要传入两个参数：</div><ul><li>resolve ：异步操作执行成功后的回调函数<br></li><li>reject：异步操作执行失败后的回调函数</li></ul><h3 data-id="heading-2">then 链式操作的用法&nbsp;&nbsp;</h3><div>所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的：</div><p></p><p></p><p></p><pre><code lang="bash" class="copyable">p.then((data) =&gt; {
    console.log(data);
})
.then((data) =&gt; {
    console.log(data);
})
.then((data) =&gt; {
    console.log(data);
});<span class="copy-code-btn">复制代码</span></code></pre><p></p><p><br></p><h3 data-id="heading-3">reject的用法 :</h3><p>把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。看下面的代码。</p><pre><code lang="bash" class="copyable">    <span>let</span> p = new Promise((resolve, reject) =&gt; {
        //做一些异步操作
      <span>set</span>Timeout(<span><span>function</span></span>(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            <span>if</span>(num&lt;=5){
                resolve(num);
            }
            <span>else</span>{
                reject(<span>'数字太大了'</span>);
            }
      }, 2000);
    });
    p.then((data) =&gt; {
            console.log(<span>'resolved'</span>,data);
        },(err) =&gt; {
            console.log(<span>'rejected'</span>,err);
        }
    ); 
<span class="copy-code-btn">复制代码</span></code></pre><div>then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果：<br></div><div><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16377e1df3ec16ee~tplv-t2oaga2asx-watermark.awebp" loading="lazy" class="medium-zoom-image">或者<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16377e4fd8619228~tplv-t2oaga2asx-watermark.awebp" loading="lazy" class="medium-zoom-image"></div><h3 data-id="heading-4">catch的用法</h3><div>我们知道Promise对象除了then方法，还有一个catch方法，它是做什么用的呢？其实它和then的第二个参数一样，用来指定reject的回调。用法是这样：</div><p></p><p></p><p></p><pre><code lang="bash" class="copyable">p.then((data) =&gt; {
    console.log(<span>'resolved'</span>,data);
}).catch((err) =&gt; {
    console.log(<span>'rejected'</span>,err);
});<span class="copy-code-btn">复制代码</span></code></pre><p></p><p>效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码：<br></p><p></p><p></p><p></p><pre><code lang="bash" class="copyable">p.then((data) =&gt; {
    console.log(<span>'resolved'</span>,data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) =&gt; {
    console.log(<span>'rejected'</span>,err);
});<span class="copy-code-btn">复制代码</span></code></pre><p></p><div>在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果：</div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/1637880bdb32bee3~tplv-t2oaga2asx-watermark.awebp" loading="lazy" class="medium-zoom-image"><br></p><div> </div><div>也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能</div><h3 data-id="heading-5">all的用法：谁跑的慢，以谁为准执行回调。all接收一个数组参数，里面的值最终都算返回Promise对象</h3><div>Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。看下面的例子：</div><div><pre><code lang="bash" class="copyable"><span>let</span> Promise1 = new Promise(<span>function</span>(resolve, reject){})
<span>let</span> Promise2 = new Promise(<span>function</span>(resolve, reject){})
<span>let</span> Promise3 = new Promise(<span>function</span>(resolve, reject){})

<span>let</span> p = Promise.all([Promise1, Promise2, Promise3])

p.then(<span><span>funciton</span></span>(){
  // 三个都成功则成功  
}, <span><span>function</span></span>(){
  // 只要有失败，则失败 
})
<span class="copy-code-btn">复制代码</span></code></pre></div><div> </div><p>有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据，是不是很酷？<i>有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。</i></p><h3 data-id="heading-6">race的用法：谁跑的快，以谁为准执行回调</h3><div> </div><div>race的使用场景：比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作，代码如下：<br></div><div><pre><code lang="bash" class="copyable"> //请求某个图片资源
    <span>function</span> <span><span>requestImg</span></span>(){
        var p = new Promise((resolve, reject) =&gt; {
            var img = new Image();
            img.onload = <span><span>function</span></span>(){
                resolve(img);
            }
            img.src = <span>'图片的路径'</span>;
        });
        <span>return</span> p;
    }
    //延时函数，用于给请求计时
    <span>function</span> <span><span>timeout</span></span>(){
        var p = new Promise((resolve, reject) =&gt; {
            <span>set</span>Timeout(() =&gt; {
                reject(<span>'图片请求超时'</span>);
            }, 5000);
        });
        <span>return</span> p;
    }
    Promise.race([requestImg(), timeout()]).then((data) =&gt;{
        console.log(data);
    }).catch((err) =&gt; {
        console.log(err);
    });
<span class="copy-code-btn">复制代码</span></code></pre></div><div>requestImg函数会异步请求一张图片，我把地址写为"图片的路径"，所以肯定是无法成功请求到的。timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息。运行结果如下：<br></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16376a95ffa3b13c~tplv-t2oaga2asx-watermark.awebp" loading="lazy" class="medium-zoom-image"><br></p><p>好了，我相信大家对用法已经懂了，那么我们来手写一款自己的promise吧</p><h2 data-id="heading-7">三、根据promiseA+实现一个自己的promise</h2><div><div><h2 data-id="heading-8"></h2><h3 data-id="heading-9"></h3><h3 data-id="heading-10">步骤一：实现成功和失败的回调方法</h3>
<p>要实现上面代码中的功能，也是promise最基本的功能。首先，需要创建一个构造函数promise，创建一个promisel类，在使用的时候传入了一个执行器executor，executor会传入两个参数：成功(resolve)和失败(reject)。之前说过，只要成功，就不会失败，只要失败就不会成功。所以，默认状态下，在调用成功时，就返回成功态，调用失败时，返回失败态。代码如下：</p><p></p><p></p><p></p><pre><code lang="bash" class="copyable">class Promise {
    constructor (executor){
        //默认状态是等待状态
        this.status = <span>'panding'</span>;
        this.value = undefined;
        this.reason = undefined;
        //存放成功的回调
        this.onResolvedCallbacks = [];
        //存放失败的回调
        this.onRejectedCallbacks = [];
        <span>let</span> resolve = (data) =&gt; {//this指的是实例
            <span>if</span>(this.status === <span>'pending'</span>){
                this.value = data;
                this.status = <span>"resolved"</span>;
                this.onResolvedCallbacks.forEach(fn =&gt; fn());
            }
 
        }
        <span>let</span> reject = (reason) =&gt; {
            <span>if</span>(this.status === <span>'pending'</span>){
                this.reason = reason;
                this.status = <span>'rejected'</span>;
                this.onRejectedCallbacks.forEach(fn =&gt; fn());
            }
        }
        try{//执行时可能会发生异常
            executor(resolve,reject);
        }catch (e){
            reject(e);//promise失败了
        }
       
    }<span class="copy-code-btn">复制代码</span></code></pre><p></p></div><blockquote>promise A+规范规定，在有异常错误时，则执行失败函数。</blockquote><p></p><p></p><p></p><pre><code lang="bash" class="copyable">constructor (executor){
    ......      try{
        executor(resolve,reject);
      }catch(e){
        reject(e);
      }
  }
<span class="copy-code-btn">复制代码</span></code></pre><p></p><h3 data-id="heading-11">步骤二：then方法链式调用
</h3><p>then方法是promise的最基本的方法，返回的是两个回调，一个成功的回调，一个失败的回调，实现过程如下：<br></p><p></p><p></p><p></p><pre><code lang="bash" class="copyable">    <span>then</span>(onFulFilled, onRejected) {
    <span>if</span> (this.status === <span>'resolved'</span>) { //成功状态的回调
      onFulFilled(this.value);
    }
    <span>if</span> (this.status === <span>'rejected'</span>) {//失败状态的回调
      onRejected(this.reason);
    }
  }<span class="copy-code-btn">复制代码</span></code></pre><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>let</span> p = new Promise(<span><span>function</span></span>(){
    resolve(<span>'我是成功'</span>);
})
p.then((data) =&gt; {console.log(data);},(err) =&gt; {});
p.then((data) =&gt; {console.log(data);},(err) =&gt; {});
p.then((data) =&gt; {console.log(data);},(err) =&gt; {});
<span class="copy-code-btn">复制代码</span></code></pre><p></p><p>返回的结果是：<br></p><p></p><p></p><p></p><pre><code lang="bash" class="copyable">我是成功
我是成功
我是成功
<span class="copy-code-btn">复制代码</span></code></pre><p></p><div><div>为了实现这样的效果，则上一次的代码将要重新写过，我们可以把每次调用resolve的结果存入一个数组中，每次调用reject的结果存入一个数组。这就是<b>为何会在上面定义两个数组,且分别在resolve()和reject()遍历两个数组的原因</b>。因此，在调用resolve()或者reject()之前，我们在pending状态时，会把多次then中的结果存入数组中，则上面的代码会改变为：</div></div><p></p><p></p><p></p><pre><code lang="bash" class="copyable">  <span>then</span>(onFulFilled, onRejected) {
    <span>if</span> (this.status === <span>'resolved'</span>) {
      onFulFilled(this.value);
    }
    <span>if</span> (this.status === <span>'rejected'</span>) {
      onRejected(this.reason);
    }
    // 当前既没有完成 也没有失败
    <span>if</span> (this.status === <span>'pending'</span>) {
      // 存放成功的回调
      this.onResolvedCallbacks.push(() =&gt; {
        onFulFilled(this.value);
      });
      // 存放失败的回调
      this.onRejectedCallbacks.push(() =&gt; {
        onRejected(this.reason);
      });
    }
  }<span class="copy-code-btn">复制代码</span></code></pre><p></p><blockquote>Promise A+规范中规定then方法可以链式调用</blockquote><p>在promise中，要实现链式调用返回的结果是返回一个新的promise，第一次then中返回的结果，无论是成功或失败，都将返回到下一次then中的成功态中，但在第一次then中如果抛出异常错误，则将返回到下一次then中的失败态中<br></p><p><b>链式调用成功时</b></p><p></p><div><div>链式调用成功会返回值，有多种情况，根据举的例子，大致列出可能会发生的结果。因此将链式调用返回的值单独写一个方法。方法中传入四个参数，分别是p2,x,resolve,reject,p2指的是上一次返回的promise，x表示运行promise返回的结果，resolve和reject是p2的方法。则代码写为：</div><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>function</span> resolvePromise(p2,x,resolve,reject){
    ....
}
<span class="copy-code-btn">复制代码</span></code></pre><p></p></div><ul><li>返回结果不能是自己<br></li></ul><p></p><p></p><p></p><pre><code lang="bash" class="copyable">var p = new Promise((resovle,reject) =&gt; {
    <span>return</span> p;     //返回的结果不能是自己，
})
<span class="copy-code-btn">复制代码</span></code></pre><p></p><p>当返回结果是自己时，永远也不会成功或失败，因此当返回自己时，应抛出一个错误<br></p><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>function</span> resolvePromise(p2,x,resolve,reject){
    <span>if</span>(px===x){
        <span>return</span> reject(new TypeError(<span>'自己引用自己了'</span>));
    }
    ....
}
<span class="copy-code-btn">复制代码</span></code></pre><p></p><ul><li>返回结果可能是promise</li></ul><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>function</span> resolvePromise(promise2,x,resolve,reject){
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    <span>if</span>(promise2 === x){//不能自己等待自己完成
        <span>return</span> reject(new TypeError(<span>'循环引用'</span>));
    };
    // x是除了null以外的对象或者函数
    <span>if</span>(x !=null &amp;&amp; (typeof x === <span>'object'</span> || typeof x === <span>'function'</span>)){
        <span>let</span> called;//防止成功后调用失败
        try{//防止取<span>then</span>是出现异常  object.defineProperty
            <span>let</span> <span>then</span> = x.then;//取x的<span>then</span>方法 {<span>then</span>:{}}
            <span>if</span>(typeof <span>then</span> === <span>'function'</span>){//如果<span>then</span>是函数就认为他是promise
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x,y =&gt; {//如果Y是promise就继续递归promise
                    <span>if</span>(called) <span>return</span>;
                    called = <span>true</span>;
                    resolvePromise(promise2,y,resolve,reject)
                },r =&gt; { //只要失败了就失败了
                    <span>if</span>(called) <span>return</span>;
                    called = <span>true</span>;
                    reject(r);  
                });
            }<span>else</span>{//<span>then</span>是一个普通对象，就直接成功即可
                resolve(x);
            }
        }catch (e){
            <span>if</span>(called) <span>return</span>;
            called = <span>true</span>;
            reject(e)
        }
    }<span>else</span>{//x = 123 x就是一个普通值 作为下个<span>then</span>成功的参数
        resolve(x)
    }

}<span class="copy-code-btn">复制代码</span></code></pre><p></p><ul><li>返回结果可能为一个普通值，则直接&nbsp; &nbsp;resolve(x);</li></ul><ul><li>Promise一次只能调用成功或者失败</li></ul><p>也就是当调用成功就不能再调用失败了，如果两个都调用的时候，哪个先调用就执行哪一个。代码部分还是上面那部分<br></p><p>个人认为，这个地方比较绕，需要慢慢的一步一步的理清楚。<br></p><div><div><p>根据promise A+规范原理，promise在自己的框架中，封装了一系列的内置的方法。</p>
<ul>
<li>捕获错误的方法 <b>catch()</b></li>
<li>解析全部方法 <b>all()</b></li>
<li>竞赛 <b>race()</b></li>
<li>生成一个成功的promise&nbsp;&nbsp;<b>resolve()</b></li>
<li>生成一个失败的promise&nbsp;&nbsp;<b>reject()</b></li></ul></div></div><p>最后给大家附上全部源码，供大家仔细品读。</p><p></p></div><p></p><p></p><p></p><pre><code lang="bash" class="copyable"><span>function</span> resolvePromise(promise2,x,resolve,reject){
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    <span>if</span>(promise2 === x){//不能自己等待自己完成
        <span>return</span> reject(new TypeError(<span>'循环引用'</span>));
    };
    // x是除了null以外的对象或者函数
    <span>if</span>(x !=null &amp;&amp; (typeof x === <span>'object'</span> || typeof x === <span>'function'</span>)){
        <span>let</span> called;//防止成功后调用失败
        try{//防止取<span>then</span>是出现异常  object.defineProperty
            <span>let</span> <span>then</span> = x.then;//取x的<span>then</span>方法 {<span>then</span>:{}}
            <span>if</span>(typeof <span>then</span> === <span>'function'</span>){//如果<span>then</span>是函数就认为他是promise
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x,y =&gt; {//如果Y是promise就继续递归promise
                    <span>if</span>(called) <span>return</span>;
                    called = <span>true</span>;
                    resolvePromise(promise2,y,resolve,reject)
                },r =&gt; { //只要失败了就失败了
                    <span>if</span>(called) <span>return</span>;
                    called = <span>true</span>;
                    reject(r);  
                });
            }<span>else</span>{//<span>then</span>是一个普通对象，就直接成功即可
                resolve(x);
            }
        }catch (e){
            <span>if</span>(called) <span>return</span>;
            called = <span>true</span>;
            reject(e)
        }
    }<span>else</span>{//x = 123 x就是一个普通值 作为下个<span>then</span>成功的参数
        resolve(x)
    }

}

class Promise {
    constructor (executor){
        //默认状态是等待状态
        this.status = <span>'panding'</span>;
        this.value = undefined;
        this.reason = undefined;
        //存放成功的回调
        this.onResolvedCallbacks = [];
        //存放失败的回调
        this.onRejectedCallbacks = [];
        <span>let</span> resolve = (data) =&gt; {//this指的是实例
            <span>if</span>(this.status === <span>'pending'</span>){
                this.value = data;
                this.status = <span>"resolved"</span>;
                this.onResolvedCallbacks.forEach(fn =&gt; fn());
            }
 
        }
        <span>let</span> reject = (reason) =&gt; {
            <span>if</span>(this.status === <span>'pending'</span>){
                this.reason = reason;
                this.status = <span>'rejected'</span>;
                this.onRejectedCallbacks.forEach(fn =&gt; fn());
            }
        }
        try{//执行时可能会发生异常
            executor(resolve,reject);
        }catch (e){
            reject(e);//promise失败了
        }
       
    }
    <span>then</span>(onFuiFilled,onRejected){ 
        //防止值得穿透 
        onFuiFilled = typeof onFuiFilled === <span>'function'</span> ? onFuiFilled : y =&gt; y;
        onRejected = typeof onRejected === <span>'function'</span> ? onRejected :err =&gt; {throw err;}        
        <span>let</span> promise2;//作为下一次<span>then</span>方法的promise
       <span>if</span>(this.status === <span>'resolved'</span>){
           promise2 = new Promise((resolve,reject) =&gt; {
               <span>set</span>Timeout(() =&gt; {
                  try{
                        //成功的逻辑 失败的逻辑
                        <span>let</span> x = onFuiFilled(this.value);
                        //看x是不是promise 如果是promise取他的结果 作为promise2成功的的结果
                        //如果返回一个普通值，作为promise2成功的结果
                        //resolvePromise可以解析x和promise2之间的关系
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2,x,resolve,reject)
                  }catch(e){
                        reject(e);
                  } 
               },0)
           }); 
       } 
       <span>if</span>(this.status === <span>'rejected'</span>){
            promise2 = new Promise((resolve,reject) =&gt; {
                <span>set</span>Timeout(() =&gt; {
                    try{
                        <span>let</span> x = onRejected(this.reason);
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                },0)

            });
       }
       //当前既没有完成也没有失败
       <span>if</span>(this.status === <span>'pending'</span>){
           promise2 = new Promise((resolve,reject) =&gt; {
               //把成功的函数一个个存放到成功回调函数数组中
                this.onResolvedCallbacks.push( () =&gt;{
                    <span>set</span>Timeout(() =&gt; {
                        try{
                            <span>let</span> x = onFuiFilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                });
                //把失败的函数一个个存放到失败回调函数数组中
                this.onRejectedCallbacks.push( ()=&gt;{
                    <span>set</span>Timeout(() =&gt; {
                        try{
                            <span>let</span> x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                })
           })
       }
       <span>return</span> promise2;//调用<span>then</span>后返回一个新的promise
    }
    catch (onRejected) {
        // catch 方法就是<span>then</span>方法没有成功的简写
        <span>return</span> this.then(null, onRejected);
    }
}
Promise.all = <span>function</span> (promises) {
    //promises是一个promise的数组
    <span>return</span> new Promise(<span>function</span> (resolve, reject) {
        <span>let</span> arr = []; //arr是最终返回值的结果
        <span>let</span> i = 0; // 表示成功了多少次
        <span>function</span> processData(index, data) {
            arr[index] = data;
            <span>if</span> (++i === promises.length) {
                resolve(arr);
            }
        }
        <span>for</span> (<span>let</span> i = 0; i &lt; promises.length; i++) {
            promises[i].then(<span>function</span> (data) {
                processData(i, data)
            }, reject)
        }
    })
}
// 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
Promise.race = <span>function</span> (promises) {
    <span>return</span> new Promise((resolve, reject) =&gt; {
        <span>for</span> (var i = 0; i &lt; promises.length; i++) {
            promises[i].then(resolve,reject)
        }
    })
}
// 生成一个成功的promise
Promise.resolve = <span>function</span>(value){
    <span>return</span> new Promise((resolve,reject) =&gt; resolve(value);
}
// 生成一个失败的promise
Promise.reject = <span>function</span>(reason){
    <span>return</span> new Promise((resolve,reject) =&gt; reject(reason));
}
Promise.defer = Promise.deferred = <span><span>function</span></span> () {
    <span>let</span> dfd = {};
    dfd.promise = new Promise( (resolve, reject) =&gt;  {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    <span>return</span> dfd
}
module.exports = Promise;
<span class="copy-code-btn">复制代码</span></code></pre><p></p><p>关于这篇promise A+规范的总结，肯定会存在很多不足的地方，欢迎各位提出宝贵的意见或建议，也希望能帮助到你从中获得一些知识！</p><p><br></p></div></div></article>
