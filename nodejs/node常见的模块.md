# 常见api

## 一、node简介

发展史：

- 微软通过IE击败了Netscape后一统桌面，结果几年时间，浏览器毫无进步。
- Mozilla借助已壮烈牺牲的Netscape遗产在2002年推出了Firefox浏览器。
- Apple于2003年在开源的KHTML浏览器的基础上推出了WebKit内核的Safari浏览器，不过仅限于Mac平台。
- Google基于WebKit内核推出了Chrome浏览器，自己开发了一个高性能JavaScript引擎，名字叫V8，以BSD许可证开源。
- Ryan Dahl想用高级语言写web服务，因为JavaScript是单线程执行，根本不能进行同步IO操作，所以，JavaScript的这一“缺陷”导致了它只能使用异步IO。在2009年，Ryan正式推出了基于JavaScript语言和V8引擎的开源Web服务器项目，命名为Node.js。

## 二、npm

npm是Node.js的包管理工具，为了方便我们下载使用别人的代码，同时可以把所有包依赖一起下载下来。把自己开发的模块打包后放到npm官网上，如果要使用，直接通过npm安装就可以直接用，不用管代码存在哪，应该从哪下载。

## 三、CommonJS规范

1. 为什么要使用模块

   - 因为计算机如果在一个文件写入很多代码，那么就很难维护和阅读，如果把不同功能代码放入不同文件里，那么每个文件包含的代码相对较少。在Node环境中，一个.js文件就称之为一个模块（module）。

   - 最大的好处是大大提高了代码的可维护性。其次，编写代码不必从零开始。当一个模块编写完毕，就可以被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括Node内置的模块和来自第三方的模块。使用模块还可以避免函数名和变量名冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突。

2. 使用

   - 创建：

     ```
     var s = 'Hello';
     
     function greet(name) {
         console.log(s + ', ' + name + '!');
     }
     
     module.exports = greet;
     ```

   - 引入

     ```
     var greet = require('./hello'); // 不要忘了写相对目录!
     
     var greet = require('hello');
     ```

3. 引用规则

   ```js
   require('./find.js');
   ```

   require方法根据模块路径查找模块，如果是完整路径，直接引入模块

   ```js
   require('./find');
   ```

   - 如果省略后缀，先找同名js文件，再找同名文件夹

   - 如果找到同名文件夹，找文件夹中的index.js

   - 如果文件夹中没有index.js 就会去当前文件夹中package.json中查找main选项的入口文件是哪个执行这个文件
   - 如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

   ```js
   require('find');
   ```

   - 如果省略后缀和路径，Node会把它当做一个系统模块
   - 先去node_modules文件夹中 首先看是否有该名字的js文件
   - 再看是否有该名字的文件夹，如果有看里面是否有index.js
   - 如果没有查看该文件夹中 package.json文件中的main选项指定的文件，如果还没有报错

4. 模块原理

   - 模块的隔离—闭包

     ```js
     (function () {
         // 读取的hello.js代码:
         var s = 'Hello';
         var name = 'world';
     
         console.log(s + ' ' + name + '!');
         // hello.js代码结束
     })();
     ```

   - module.exports实现

     ```js
     // 准备module对象:
     var module = {
         id: 'hello',
         exports: {}
     };
     var load = function (module) {
         // 读取的hello.js代码:
         function greet(name) {
             console.log('Hello, ' + name + '!');
         }
         
         module.exports = greet;
         // hello.js代码结束
         return module.exports;
     };
     var exported = load(module);
     // 保存module:
     save(module, exported);
     ```

   通过把参数module传递给load()函数，hello.js就顺利地把一个变量传递给了Node执行环境，Node会把module变量保存到某个地方。

   由于Node保存了所有导入的module，当我们用require()获取module时，Node找到对应的module，把这个module的exports变量返回，这样，另一个模块就顺利拿到了模块的输出：

5. module.exports VS exports

   module.exports 

   ```js
   function hello() {
       console.log('Hello, world!');
   }
   
   function greet(name) {
       console.log('Hello, ' + name + '!');
   }
   
   module.exports = {
       hello: hello,
       greet: greet
   };
   ```

   exports

   ```js
   function hello() {
       console.log('Hello, world!');
   }
   
   function greet(name) {
       console.log('Hello, ' + name + '!');
   }
   
   function hello() {
       console.log('Hello, world!');
   }
   
   exports.hello = hello;
   exports.greet = greet;
   ```

## 四、起步

1. node_modules文件夹

> 文件夹以及文件过多过碎，当我们将项目整体拷贝给别人的时候，传输速度会很慢
>
> 复杂的模块以来关系需要被记录，确保模块版本和当前版本保持一致，否则会导致当前项目运行报错

2. package.json

> 项目描述文件，记录当前项目信息，例如项目名称，版本，作者，项目依赖于哪些第三方模块等；
>
> 使用 `npm init -y` 生成

3. package-lock.json

> 锁定包的版本，确保再次下载时不会因为包版本不同而产生问题
>
> 加快下载速度，因为该文件已经记录了项目所依赖的第三方包的树状结构和包的下载地址，重新安装只需下载即可，不需要做额外的工作

## 五、核心模块

global

模块底层代码用C/C++在Node.js运行环境中实现的，nodejs的全局对象叫global。

- process是nodejs提供的对象，代表nodejs的进程

  JavaScript程序是由事件驱动执行的单线程模型，Node.js也不例外。Node.js不断执行响应事件的JavaScript函数，直到没有任何响应事件的函数可以执行时，Node.js就退出了。如果我们想要在下一次事件响应中执行代码，可以调用`process.nextTick()`：

  ```js
  // process.nextTick()将在下一轮事件循环中调用:
  process.nextTick(function () {
      console.log('nextTick callback!');
  });
  console.log('nextTick was set!');
  
  // nextTick was set!
  // nextTick callback!
  ```

Node.js进程本身的事件就由`process`对象来处理。如果我们响应`exit`事件，就可以在程序即将退出时执行某个回调函数：

```js
// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
```

### 1.fs

Node.js内置的`fs`模块就是文件系统模块，负责读写文件。`fs`模块同时提供了异步和同步的方法。

- 异步读取

```js
var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```

请注意，`sample.txt`文件必须在当前目录下，且文件编码为`utf-8`。正常读取：err为null，data为string，错误读取：err为错误对象，data为undefined。因此可以通过err是否为null来判断是否正常读取：

```js
if (err) {
    // 出错了
} else {
    // 正常
}
```

如果我们要读取的文件不是文本文件，而是二进制文件:

```js
var fs = require('fs');

fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
```

当读取二进制文件时，不传入文件编码时，回调函数的`data`参数将返回一个`Buffer`对象。在Node.js中，`Buffer`对象就是一个包含零个或任意个字节的数组（注意和Array不同）。

`Buffer`对象可以和String作转换，例如，把一个`Buffer`对象转换成String：

```js
// Buffer -> String
var text = data.toString('utf-8');
console.log(text);
```

或者把一个String转换成`Buffer`：

```js
// String -> Buffer
var buf = Buffer.from(text, 'utf-8');
console.log(buf);
```

- 同步读取

```js
var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
```

- 写文件

将数据写入文件是通过`fs.writeFile()`实现的：

```js
var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
```

`writeFile()`的参数依次为文件名、数据和回调函数。如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是`Buffer`，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个`err`参数。和`readFile()`类似，`writeFile()`也有一个同步方法，叫`writeFileSync()`：

```js
var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```

- stat

如果我们要获取文件大小，创建时间等信息，可以使用`fs.stat()`，它返回一个`Stat`对象，能告诉我们文件或目录的详细信息：

```js
var fs = require('fs');

fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
```

运行结果如下：

```js
isFile: true
isDirectory: false
size: 181
birth time: Fri Dec 11 2015 09:43:41 GMT+0800 (CST)
modified time: Fri Dec 11 2015 12:09:00 GMT+0800 (CST)
```

`stat()`也有一个对应的同步函数`statSync()`，请试着改写上述异步代码为同步代码。

### 2.http

- http模块

  http模块提供了`request`和`response`对象，`request`对象封装了HTTP请求，调用`request`对象的属性和方法就可以拿到所有HTTP请求的信息；`response`对象封装了HTTP响应，我们操作`response`对象的方法，就可以把HTTP响应返回给浏览器。

  ```js
  // 导入http模块:
  var http = require('http');
  
  // 创建http server，并传入回调函数:
  var server = http.createServer(function (request, response) {
      // 回调函数接收request和response对象,
      // 获得HTTP请求的method和url:
      console.log(request.method + ': ' + request.url);
      // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
      response.writeHead(200, {'Content-Type': 'text/html'});
      // 将HTTP响应的HTML内容写入response:
      response.end('<h1>Hello world!</h1>');
  });
  
  // 让服务器监听8080端口:
  server.listen(8080);
  
  console.log('Server is running at http://127.0.0.1:8080/');
  ```

- url模块

  解析URL需要用到Node.js提供的`url`模块，它使用起来非常简单，通过`parse()`将一个字符串解析为一个`Url`对象：

  ```js
  'use strict';
  
  var url = require('url');
  
  console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
  ```

  结果如下：

  ```js
  Url {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/path/to/file',
    path: '/path/to/file?query=string',
    href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' }
  ```
  
- path模块
  处理本地文件目录需要使用Node.js提供的`path`模块，它可以方便地构造目录：

  ```js
  var path = require('path');
  
  // 解析当前目录:
  var workDir = path.resolve('.'); // '/Users/michael'
  
  // 组合完整的文件路径:当前目录+'pub'+'index.html':
  var filePath = path.join(workDir, 'pub', 'index.html');
  // '/Users/michael/pub/index.html'
  ```
  
  实现服务器：
  
  ```js
  var
      fs = require('fs'),
      url = require('url'),
      path = require('path'),
      http = require('http');
  
  // 从命令行参数获取root目录，默认是当前目录:
  var root = path.resolve(process.argv[2] || '.');
  
  console.log('Static root dir: ' + root);
  
  // 创建服务器:
  var server = http.createServer(function (request, response) {
      // 获得URL的path，类似 '/css/bootstrap.css':
      var pathname = url.parse(request.url).pathname;
      // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
      var filepath = path.join(root, pathname);
      // 获取文件状态:
      fs.stat(filepath, function (err, stats) {
          if (!err && stats.isFile()) {
              // 没有出错并且文件存在:
              console.log('200 ' + request.url);
              // 发送200响应:
              response.writeHead(200);
              // 将文件流导向response:
              fs.createReadStream(filepath).pipe(response);
          } else {
              // 出错了或者文件不存在:
              console.log('404 ' + request.url);
              // 发送404响应:
              response.writeHead(404);
              response.end('404 Not Found');
          }
      });
  });
  
  server.listen(8080);
  
  console.log('Server is running at http://127.0.0.1:8080/');
  ```

### 3. stream

`stream`是Node.js提供的仅在服务区端可用的模块，目的是支持“流”这种数据结构。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，把数据不断地往文件流中写进去。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

```js
var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
```

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```js
var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
```

所有可以读取数据的流都继承自`stream.Readable`，所有可以写入的流都继承自`stream.Writable`。

- pipe

就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```js
var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
```

默认情况下，当`Readable`流的数据读取完毕，`end`事件触发后，将自动关闭`Writable`流。如果我们不希望自动关闭`Writable`流，需要传入参数：

```js
readable.pipe(writable, { end: false });
```

### 4. crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

常见的有：MD5、SHA1、Hmac、AEs、Diffie-Hellman、RSA。
