# CDN

CDN的全称是Content Delivery Network，即内容分发网络。CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。

分布在各个地方的各个数据中心的节点称为边缘节点。边缘节点数目多，但是规模小，不可能缓存所有东西，因而可能无法命中，这样在边缘节点之上就有了区域节点，中心节点。规模越大，缓存的数据越多。如果还不命中，就只好回源网站访问了。

![image-20211206224821263](C:\Users\86155\AppData\Roaming\Typora\typora-user-images\image-20211206224821263.png)

在用户向服务器发起请求时：

- 通过DNS（域名解析系统）来将域名解析为ip地址。
- 本地DNS系统会将域名的解析权交给CDN专用DNS服务器。
- CDN专用DNS服务器，将CDN的全局负载均衡设备IP地址返回用户。
- 用户向CDN的负载均衡设备发起内容URL访问请求。
- CDN负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的缓存服务器。
- 负载均衡设备告诉用户这台缓存服务器的IP地址，让用户向所选择的缓存服务器发起请求。
- 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。
- 如果这台缓存服务器上并没有用户想要的内容，那么这台缓存服务器就要网站的源服务器请求内容。
- 源服务器返回内容给缓存服务器，缓存服务器发给用户，并根据用户自定义的缓存策略，判断要不要把内容缓存到缓存服务器上。

好处：

采用CDN技术，最大的好处，就是加速了网站的访问——用户与内容之间的物理距离缩短，用户的等待时间也得以缩短。而且，分发至不同线路的缓存服务器，也让跨运营商之间的访问得以加速。此外，CDN还有安全方面的好处。内容进行分发后，源服务器的IP被隐藏，受到攻击的概率会大幅下降。而且，当某个服务器故障时，系统会调用临近的健康服务器，进行服务，避免对用户造成影响。

