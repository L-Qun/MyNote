# 路由

### 1、路由原理

通过history模式或者hash模式更改路径，但是不发生页面的跳转（不会向后端发送请求），react router监听路径的变化，进而把对应的组件渲染到页面上。

**hash**

URL的hash也就是锚点(#), 本质上是改变window.location的href属性； 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新；hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径。

**history**

history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面： 

- replaceState：替换原来的路径；
- pushState：使用新的路径； 
- popState：路径的回退； 
- go：向前或向后改变路径； 
- forward：向前改变路径； 
- back：向后改变路径；

### 2、react-router-dom

#### 2.1、路由跳转

```jsx
<Link to="/home">Home</Link>
```

#### 2.2、路由组件

**定义**

```jsx
<Route path="/home" component={Home}/>
```

**向路由组件传递参数**

- params参数

  路由链接（携带参数）：<Link to="/demo/test/tom/18"\>详情</Link\>

  注册路由（声明接收）：<Route path="/demo/test/:name/:age" component={Test}/ \>

  接收参数：this.props.match.params

- search参数

  路由链接（携带参数）：<Link to="/demo/test?name=tom&age=18"\>详情</Link\>

  注册路由（无需声明）：<Route path="/demo/test" component={Test}/ \>

  接收参数：this.props.location.search

  注：获取到search是urlencoded编码字符串，需要借助querystring解析

- state参数

  路由链接（携带参数）：<Link to={{path:'/demo/test', state:{name:'tom',age:18}}}>详情</Link \>

  注册路由（无需声明，正常注册即可）：<Route path="/demo/test" component={Test}/ \>

  接收参数：this.props.location.state

**接收到的props**

history:

- go:f go(n)

- goBack:f goBack()

- goForward:f goForward()

- push:f push(path, state)

- replace: f replace(path, state)

location:

- pathname:"/about"

- search: ""

- state:undefined

match:

- params: {}

- path: "/about"

- url:"/about"

**标签**

- Link
- Route
- BrowserRouter
- HashRouter
- Switch
- Redirect

**withRouter**

withRouter函数可以加工一般组件，让一般组件具有路由组件所具有的api，withRouter返回新的组件

```
import {withRouter} from 'react-router-dom'
export default withRouter(Header)
```

