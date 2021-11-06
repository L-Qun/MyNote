# HTTP协议

HTTP协议是一种超文本传输协议（Hypertext Transfer Protocol），HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

### 1.套接字

传输层连接套接字，通过套接字将数据发送给特定的进程。

### 2. HTTP请求响应过程

比如在浏览器中输入URL：http://www.someSchool.edu/someDepartment/home.index，浏览器内部进行如下操作：

- DNS服务器会首先进行域名的映射，找到访问`www.someSchool.edu`所在的地址
- HTTP 客户端进程在 80 端口发起一个到服务器 `www.someSchool.edu` 的 TCP 连接（80 端口是 HTTP 的默认端口）。在客户和服务器进程中都会有一个`套接字`与其相连。
- HTTP 客户端通过它的套接字向服务器发送一个 HTTP 请求报文。
- HTTP 服务器通过它的套接字接受该报文，进行请求的解析工作，并从其存储器(RAM 或磁盘)中检索出对象 www.someSchool.edu/someDepartment/home.index，然后把检索出来的对象进行封装，封装到 HTTP 响应报文中，并通过套接字向客户进行发送。
- HTTP 服务器随即通知 TCP 断开 TCP 连接，实际上是需要等到客户接受完响应报文后才会断开 TCP 连接。

### 3. HTTP报文结构

HTTP协议由三大部分组成：

- 起始行（start line）：描述请求或响应的基本信息。
- 头部字段（header）：使用key-value形式更详细的说明报文。
- 消息正文（entity）：实际传输的数据，可以是图片、视频等二进制数据。

其中起始行和头部字段并成为 请求头 或者 响应头，统称为 Header；消息正文也叫做实体，称为 body。HTTP 协议规定每次发送的报文必须要有 Header，但是可以没有 body，也就是说头信息是必须的，实体信息可以没有。而且在 header 和 body 之间必须要有一个空行（CRLF）。

### 4.HTTP请求方法

- GET：GET 方法用来请求访问已被 URI 识别的资源，指定的资源经服务器端解析后返回响应内容。
- POST：虽然 GET 方法也可以传输主体信息，但是便于区分，我们一般不用 GET 传输实体信息，反而使用 POST 传输实体信息

- PUT：PUT 方法用来传输文件。就像 FTP 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。

  但是，鉴于 HTTP 的 PUT 方法自身不带验证机制，任何人都可以上传文件 , 存在安全性问题，因此一般的 Web 网站不使用该方法。若配合 Web 应用程序的验证机制，或架构设计采用REST（REpresentational State Transfer，表征状态转移）标准的同类 Web 网站，就可能会开放使用 PUT 方法。

- HEAD：获得响应首部，HEAD 方法和 GET 方法一样，只是不返回报文主体部分。用于确认 URI 的有效性及资源更新的日期时间等。
- DELETE：删除文件，DELETE 方法用来删除文件，是与 PUT 相反的方法。DELETE 方法按请求 URI 删除指定的资源。
- OPTIONS：询问支持的方法，OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。

- TRACE：追踪路径，TRACE方法是让Web服务器端将之前的请求通信环回给客户端的方法。

- CONNECT：要求用隧道协议连接代理，CONNECT 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行 TCP 通信。主要使用 SSL（Secure Sockets Layer，安全套接层）和 TLS（Transport Layer Security，传输层安全）协议把通信内容加 密后经网络隧道传输。

### 5. 头部字段

HTTP 的请求标头分为四种： `通用标头`、`请求标头`、`响应标头` 和 `实体标头`，依次来进行详解。

- **通用标头**

  通用标头主要有三个，分别是 `Date`、`Cache-Control` 和 `Connection`

  - **Date**

  Date 是一个通用标头，它可以出现在请求标头和响应标头中，它的基本表示如下

  ```
  Date: Wed, 21 Oct 2015 07:28:00 GMT 
  ```

  表示的是格林威治标准时间，这个时间要比北京时间慢八个小时。

  - **Cache-Control**

  Cache-Control 是一个通用标头，他可以出现在请求标头和响应标头中，Cache-Control 的种类比较多，虽然说这是一个通用标头，但是又一些特性是请求标头具有的，有一些是响应标头才有的。主要大类有可缓存性、阈值性、重新验证并重新加载和其他特性。

      max-age: 资源被认为仍然有效的最长时间，与 Expires 不同，这个请求是相对于 request标头的时间，而 Expires 是相对于响应标头。（请求标头）
      s-maxage: 重写了 max-age 和 Expires 请求头，仅仅适用于共享缓存，被私有缓存所忽略（这块不理解，看完响应头的 Cache-Control 再进行理解）（请求标头）
      max-stale：表示客户端将接受的最大响应时间，以秒为单位。（响应标头）
      min-fresh: 表示客户端希望响应在指定的最小时间内有效。（响应标头）
  - **Connection**

  Connection 决定当前事务（一次三次握手和四次挥手）完成后，是否会关闭网络连接。Connection 有两种，一种是`持久性连接`，即一次事务完成后不关闭网络连接。

  ```http
  Connection: keep-alive
  ```

  另一种是`非持久性连接`，即一次事务完成后关闭网络连接

  ```http
  Connection: close
  ```

- **实体标头**

实体标头是描述消息正文内容的 HTTP 标头。实体标头用于 HTTP 请求和响应中。头部Content-Length、 Content-Language、 Content-Encoding 是实体头。

Content-Length 实体报头指示实体主体的大小，以字节为单位，发送到接收方。
Content-Language 实体报头描述了客户端或者服务端能够接受的语言，例如

    Content-Language: de-DE
    Content-Language: en-US
    Content-Language: de-DE, en-CA

Content-Encoding 这又是一个比较麻烦的属性，这个实体报头用来压缩媒体类型。Content-Encoding 指示对实体应用了何种编码。常见的内容编码有这几种： gzip、compress、deflate、identity ，这个属性可以应用在请求报文和响应报文中

    Accept-Encoding: gzip, deflate //请求头
    Content-Encoding: gzip  //响应头

- **请求标头**

  ```
  GET /home.html HTTP/1.1
  Host: developer.mozilla.org
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
  Accept-Language: en-US,en;q=0.5
  Accept-Encoding: gzip, deflate, br
  Referer: https://developer.mozilla.org/testpage.html
  Connection: keep-alive
  Upgrade-Insecure-Requests: 1
  If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
  If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
  Cache-Control: max-age=0 
  ```

  - **Host**

  Host 请求头指明了服务器的域名（对于虚拟主机来说），以及（可选的）服务器监听的TCP端口号。如果没有给定端口号，会自动使用被请求服务的默认端口（比如请求一个 HTTP 的 URL 会自动使用80作为端口）。

  - **Referer**

  HTTP Referer 属性是请求标头的一部分，当浏览器向 web 服务器发送请求的时候，一般会带上 Referer，告诉服务器该网页是从哪个页面链接过来的，服务器因此可以获得一些信息用于处理。

  - **Upgrade-Insecure-Requests**

  Upgrade-Insecure-Requests 是一个请求标头，用来向服务器端发送信号，表示客户端优先选择加密及带有身份验证的响应。

  - **If-Modified-Since**

  HTTP 的 If-Modified-Since 使其成为条件请求：

      返回200，只有在给定日期的最后一次修改资源后，服务器才会以200状态发送回请求的资源。
      如果请求从开始以来没有被修改过，响应会返回304并且没有任何响应体

  If-Modified-Since 通常会与 If-None-Match 搭配使用，If-Modified-Since 用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定。

  - **If-None-Match**

  If-None-Match HTTP请求标头使请求成为条件请求。 对于 GET 和 HEAD 方法，仅当服务器没有与给定资源匹配的 `ETag` 时，服务器才会以200状态发送回请求的资源。 对于其他方法，仅当最终现有资源的`ETag`与列出的任何值都不匹配时，才会处理请求。

- 响应标头

  ```
  200 OK
  Access-Control-Allow-Origin: *
  Connection: Keep-Alive
  Content-Encoding: gzip
  Content-Type: text/html; charset=utf-8
  Date: Mon, 18 Jul 2016 16:06:00 GMT
  Etag: "c561c68d0ba92bbeb8b0f612a9199f722e3a621a"
  Keep-Alive: timeout=5, max=997
  Last-Modified: Mon, 18 Jul 2016 02:36:04 GMT
  Server: Apache
  Set-Cookie: mykey=myvalue; expires=Mon, 17-Jul-2017 16:06:00 GMT; Max-Age=31449600; Path=/; secure
  Transfer-Encoding: chunked
  Vary: Cookie, Accept-Encoding
  x-frame-options: DENY
  ```

  - **响应状态码**

  - **Access-Control-Allow-Origin**

  一个返回的 HTTP 标头可能会具有 Access-Control-Allow-Origin ，Access-Control-Allow-Origin 指定一个来源，它告诉浏览器允许该来源进行资源访问。 否则-对于没有凭据的请求 *通配符，告诉浏览器允许任何源访问资源。例如，要允许源 https://mozilla.org 的代码访问资源，可以指定：

  ```
  Access-Control-Allow-Origin: https://mozilla.org
  Vary: Origin
  ```

  如果服务器指定单个来源而不是 `*`通配符的话 ，则服务器还应在 Vary 响应标头中包含 `Origin` ，以向客户端指示 服务器响应将根据原始请求标头的值而有所不同。

  - **Keep-Alive**

  Keep-Alive 表示的是 Connection 非持续连接的存活时间。

  ```
  Connection: Keep-Alive
  Keep-Alive: timeout=5, max=997
  ```

  Keep-Alive 有两个参数，它们是以逗号分隔的参数列表，每个参数由一个标识符和一个由等号 = 分隔的值组成。

  `timeout`：指示空闲连接必须保持打开状态的最短时间（以秒为单位）。

  `max`：指示在关闭连接之前可以在此连接上发送的最大请求数。

  - **Server**

  服务器标头包含有关原始服务器用来处理请求的软件的信息。应该避免使用过于冗长和详细的 Server 值，因为它们可能会泄露内部实施细节，这可能会使攻击者容易地发现并利用已知的安全漏洞。例如下面这种写法：

  ```
  Server: Apache/2.4.1 (Unix)
  ```

  - **Set-Cookie**

  - **Transfer-Encoding**

  首部字段 `X-Frame-Options` 属于 HTTP 响应首部，用于控制网站内容在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。

## 6. 状态码

以1xx为开头代表信息提示

- 100：继续。客户端应继续其请求
- 101：切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议。

以 `2xx` 为开头的都表示请求成功响应。

- 200：成功响应。
- 204：处理请求成功，但没有资源可以返回。
- 206：对资源某一部分进行响应，由Content-Range 指定范围的实体内容。

以 `3xx` 为开头的都表示需要进行附加操作以完成请求

- 301：永久性重定向，该状态码表示请求的资源已经重新分配 URI，以后应该使用资源现有的 URI。
- 302：临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问。
- 303：该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
- 304：
- 307：临时重定向。该状态码与 302 Found 有着相同的含义。

以 `4xx` 的响应结果表明客户端是发生错误的原因所在。

- 400：该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
- 401：该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息。
- 403：该状态码表明对请求资源的访问被服务器拒绝了。
- 404：该状态码表明服务器上无法找到请求的资源。

以 `5xx` 为开头的响应标头都表示服务器本身发生错误

- 500：该状态码表明服务器端在执行请求时发生了错误。
- 503：该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

### 7. 内容协商

##### （1）概念

内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的标准。

内容协商主要有以下3种类型：

- 服务器驱动协商（Server-driven Negotiation）

服务器检查客户端的请求首部集并决定提供哪个版本的页面。
优点：比客户端驱动的协商要快。HTTP提供了q机制，允许服务器近似匹配，还提供了vary首部供服务器告知下游的设备（如代理服务器）如何对请求估值；
缺点：首部集不匹配，服务器要做猜测；

- 客户端驱动协商（Agent-driven Negotiation）

客户端发起请求，服务器发送可选项列表，客户端作出选择后在发送第二次请求。
优点：比较容易实现；
缺点：增加了时延，至少要发送两次请求，第一次请求获取资源列表，第二次获取选择的副本；

- 透明协商（Transparent Negotiation）

 某个中间设备（通常是缓存代理）代表客户端进行协商。
 优点：免除了web服务器的协商开销，比客户端驱动的协商要快；
 缺点：HTTP并没有提供相应的规范；

##### （2）MIME

MIME: MIME (Multipurpose Internet Mail Extensions) 是描述消息内容类型的因特网标准。MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。

也就是说，MIME 类型其实就是一系列消息内容类型的集合。那么 MIME 类型都有哪些呢？

- 文本文件： text/html、text/plain、text/css、application/xhtml+xml、application/xml

- 图片文件： image/jpeg、image/gif、image/png

- 视频文件： video/mpeg、video/quicktime

- 应用程序二进制文件： application/octet-stream、application/zip

##### （3）内容

内容协商的分类有很多种，主要的几种类型是 Accept、Accept-Charset、Accept-Encoding、Accept-Language、Content-Language。

- **Accept（Content-Type）**

接受请求 HTTP 标头会通告客户端其能够理解的 MIME 类型。

```http
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

一般 MIME 类型会和 `q` 这个属性一起使用，若想要给显示的**媒体类型增加优先级**，则使用 q= 来额外表示权重值，没有显示权重的时候默认值是1.0：

![image-20211106130913965](C:\Users\86155\AppData\Roaming\Typora\typora-user-images\image-20211106130913965.png)

也就是说，这是一个放置顺序，权重高的在前，低的在后，`application/xml;q=0.9` 是不可分割的整体。

- **Accept-Charset（Content-Type）**

accept-charset 属性规定服务器处理表单数据所接受的字符集。accept-charset 属性允许您指定一系列字符集，服务器必须支持这些字符集，从而得以正确解释表单中的数据。该属性的值是用引号包含字符集名称列表。如果可接受字符集与用户所使用的字符即不相匹配的话，浏览器可以选择忽略表单或是将该表单区别对待。此属性的默认值是 unknown，表示表单的字符集与包含表单的文档的字符集相同。

常用的字符集有： UTF-8 - Unicode 字符编码 ； ISO-8859-1 - 拉丁字母表的字符编码

- **Accept-Language（Content-Language）**

首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。
和 Accept 首部字段一样，按权重值 `q`来表示相对优先级。

- **Accept-Encoding（Content-Encoding）**

Accept-Encoding首部明确说明了可以接受的内容编码形式（所支持的压缩算法）。该首部的值是一个Q因子清单（例如： br，gzip；q=0.8）,用来提示不同编码类型值的优先级顺序。
将HTTP消息进行压缩是一种最重要的提升Web站点性能的方法，该方法会减少所要传输的数据量的大小，节省可用带宽。浏览器总是会发送该首部，服务器则应该配置为接受它，并采用一定的压缩方案。

