---
title: 看不见摸得到的东西
date: 2021-04-04 04:11:58
tags:
 - 零宽字符
categories:
 -  零宽字符
sidebar: auto
publish: true
---

# 看不见摸得到的东西

##### Q: CMS内发文页打开控制台可以看到这样的内容，&zwj、&ZeroWidthSpace是什么意思？

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210622093431031.png" alt="image-20210622093431031" style="zoom:50%;" />

 

A: &zwj是零宽连字，全称是Zero Width Joiner，简称“ZWJ”，是一个不打印字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。零宽连字符的Unicode码位是U+200D (HTML: &#8205; &zwj;）。

<img src="/Users/liyang105/Library/Application Support/typora-user-images/image-20210622094404955.png" alt="image-20210622094404955" style="zoom:50%;" />



&ZeroWidthSpace叫零宽空格，它的Unicode编码为U+FEFF，是一种不可打印的[Unicode](https://zh.wikipedia.org/wiki/Unicode)字符，二进制编码为“\xE2\x80\x8E”，出现的场景可能有：

 * 后台处理字符边界而又无需可见空格的情况。

 * 可能需要换行的地方。

	 

![image-20210622101446896](/Users/liyang105/Library/Application Support/typora-user-images/image-20210622101446896.png)

* 一般封装的请求器报出类似于因为地址解析错误不能执行请求的错误，而打印出来的请求地址肉眼看来是正确的。这时候就应该考虑是不是出现了零宽空格这种情况了。
* 一般是从其他地方复制过来的一段文字(如Word、MarkDown、Excel)，粘贴上之后就可能会有多一个ZERO-WIDTH SPACE的情况，它肉眼看不见。

简言之：&ZeroWidthSpace具有空格的功能，但宽度为零。

我遇到的奇妙问题

[“&nbsp; &ensp; &emsp;  &thinsp;   &zwnj;     &zwj; ”6种空白空格的区别](https://www.cnblogs.com/He-tao-yuan/p/10050181.html)

---

### 一、零宽字符

零宽字符是一种在浏览器中不打印的字符，大致相当于 display: none，在许多文本应用中也不显示，比如邮箱、QQ、微信、文本编辑器等；

##### 	1.1 常见的零宽字符

​		1）零宽连字：zero-width joiner，ZWJ，是一个控制字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。    Unicode: U+200D  HTML: &#8205;

​		2）零宽不连字：zero-width non-joiner，ZWNJ，放在电子文本的两个字符之间，抑制本来会发生的连字，而是以这两个字符原本的字形来绘制。Unicode: U+200C  HTML: &#8204;

​        3）零宽空格：zero-width space, ZWSP，用于可能需要换行处，Unicode: U+200B  HTML: &#8203;



##### 	1.2 所有零宽字符

零宽空格（zero-width space, ZWSP）用于可能需要换行处。    Unicode: U+200B  HTML: &#8203; 

零宽不连字 (zero-width non-joiner，ZWNJ)放在电子文本的两个字符之间，抑制本来会发生的连字，而是以这两个字符原本的字形来绘制。    Unicode: U+200C  HTML: &#8204; 

零宽连字（zero-width joiner，ZWJ）是一个控制字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。    Unicode: U+200D  HTML: &#8205; 

左至右符号（Left-to-right mark，LRM）是一种控制字符，用于计算机的双向文稿排版中。    Unicode: U+200E  HTML: &lrm; &#x200E; &#8206; 

右至左符号（Right-to-left mark，RLM）是一种控制字符，用于计算机的双向文稿排版中。    Unicode: U+200F  HTML: &rlm; &#x200F; &#8207; 

字节顺序标记（byte-order mark，BOM）常被用来当做标示文件是以UTF-8、UTF-16或UTF-32编码的标记。    Unicode: U+FEFF

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126200150294.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2NDg1OTM0,size_16,color_FFFFFF,t_70#pic_center)

##### 	

##### 	1.3 去除零宽字符的方法：字符串replace()、正则匹配、手动删掉

```javascript
str.replace(/\u200d|\ufeff|\u200B/g, '');
str.replace(/[\u200b-\u200f\uFEFF\u202a-\u202e]/g, "");

//对 url 进行 encodeURI(url) 编码，如果能够找到 %E2%80%8E 这段编码，就说明 url 是含有 ZERO-WIDTH SPACE 的。所以只要删除它就可以解决问题。
```

问题很好解决，但是不好发现

---

### 二、零宽字符的应用

(结合特点 插入信息 加密解密)

1. 数据防爬：将零宽度字符插入文本中，干扰关键字匹配。爬虫得到的带有零宽度字符的数据会影响他们的分析，但不会影响用户的阅读数据。

2. 传达秘密消息：零宽字符在大部分应用都支持，pc版QQ会显示零宽字符，但移动端不显示； 可以将密文加密到普通文本中，然后邮件发送，表面上看起来是普通文本，只有对方复制明文进行解密后才能看出隐藏信息。

3. 存储隐藏信息：隐藏加密存储比特币钱包，或者在你的代码里埋下一个彩蛋。

4. 为文章添加隐藏水印：一些论坛和小说网站会在帖子或小说内容嵌入隐形水印。

	隐形水印**主要原理**就是将用户信息比如用户名，通过一定算法转成零宽字符，这样普通用户浏览时完全看不到这个水印。如果内容被复制到其他网站，隐形水印也被复制，只要找到这个水印，将这些零宽字符反转成用户名即可。

	[ 转换方法Github ](https://github.com/umpox/zero-width-detection)

	

	**隐形水印生成方法**

	第一步：我们需要将明文字符串每个字符都转成二进制串

	```javascript
	// 每个字符转为二进制,用空格分隔
	const textToBinary = username => (
	  	username.split('')
	  	// charCodeAt 将字符转成相应的 Unicode 码值
	  	.map(char => char.charCodeAt(0).toString(2))
	  	.join(' ')
	);
	```

	![img](https://img2020.cnblogs.com/other/1419561/202007/1419561-20200727082911176-137654640.jpg)

	第二步：将二进制串转为零宽字符串，转换规则如下：

	- 1 转换为 **\u200b 零宽度字符（zero-width space）**
	- 0 转换为 **\u200c 零宽度断字符（zero-width non-joiner）**
	- 其他（剩余就是空格） 转换为 **\u200d 零宽度连字符 (zero-width joiner)**
	- 最后使用 **\ufeff 零宽度非断空格符 (zero width no-break space)** 作为分隔符

	```javascript
	const binaryToZeroWidth = binary => (
	    binary.split('').map((binaryNum) => {
	        const num = parseInt(binaryNum, 10);
	        if (num === 1) {
	        	  return '\u200b'; // \u200b 零宽度字符（zero-width space）
	        } else if(num === 0) {
	          	return '\u200c'; // \u200c 零宽度断字符（zero-width non-joiner）
	        }
	        return '\u200d'; // \u200d 零宽度连字符 (zero-width joiner)
	
	    }).join('\ufeff') // \ufeff 零宽度非断空格符 (zero width no-break space)
	);
	```

	最终加密方法如下:

	```javascript
	const encode = username => {
	  const binaryUsername = textToBinary(username);
	  const zeroWidthUsername = binaryToZeroWidth(binaryUsername);
	  return zeroWidthUsername;
	};
	```

	使用加密方法将明文字符串加密之后，加密字符串肉眼是看不到了，但是实际还是存在的。

	![img](https://img2020.cnblogs.com/other/1419561/202007/1419561-20200727082911376-1131971161.jpg)

	**解密隐形水印**：加密的反向操作

	第一步，将隐形水印按照以下规则转换为二进制串。转换规则如下：

	- 使用 **\ufeff** 分隔字符串

	- **\u200b** 转为 1

	- **\u200c** 转为 0

	- 其他字符使用空格

		```javascript
		const zeroWidthToBinary = string => (
		    string.split('\ufeff').map((char) => { // \ufeff 零宽度非断空格符 (zero width no-j space)
		      if (char === '\u200b') { // \u200b 零宽度字符（zero-width space）
		        	return '1';
		      } else if(char === '\u200c') { // \u200c 零宽度断字符（zero-width non-joiner）
		        	return '0';
		      }
		      return ' ';
		    }).join('')
		);
		```

		调用该方法，隐形水印转成二进制串。

		![img](https://img2020.cnblogs.com/other/1419561/202007/1419561-20200727082911974-1510751504.jpg)

		第二步，将二进制再转为相应的字符。

		```javascript
		const binaryToText = string => (
		    // fromCharCode 二进制转化
		    string.split(' ').map(num => String.fromCharCode(parseInt(num, 2))).join('')
		);
		```

		最终解密方法如下：

		```javascript
		const decode = zeroWidthUsername => {
		    const binaryUsername = zeroWidthToBinary(zeroWidthUsername);
		    const textUsername = binaryToText(binaryUsername);
		    return textUsername;
		};
		```

		![img](https://img2020.cnblogs.com/other/1419561/202007/1419561-20200727082912194-1772545035.jpg)

5. 短链

	我们常用的短网址，域名后面会跟上一串随机串，从而实现短网址到长网址的映射。比如以下网址：

	https://sourl.cn/iLyn9S

	然而我们可以利用零宽字符也可以实现短网址的效果，短网址后面看不到任何字符，实际上短网址后面跟着一串零宽字符。当浏览器访问该短网址时，后端程序只要解密的后面零宽字符，拿到相应的网址，然后在做跳转就可以到指定的网站。

	解密的原理可以参考上面隐形水印的代码

---

### 三、危险危险危险危险危险

1. 有人发了一个text文档，里面只有两个字母，但是接收时却卡死了电脑
2. 微信好友发来了两个字，手机却重启了
3. 数据库查询的时候，字段、sql看起来都对，但是却查不出想要的结果
4. url写的没问题，但是总是404





```javascript
'let\ufeffa=2'
console.log(leta)
console.log(a)
```

https://qcon.infoq.cn/2021/beijing/schedule

