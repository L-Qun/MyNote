# redux

英文文档: https://redux.js.org/

中文文档: http://www.redux.org.cn/

Github: https://github.com/reactjs/redux

### 1、介绍

redux是一个专门用于做状态管理的JS库(不是react插件库)，可以用在react, angular, vue等项目中, 但基本与react配合使用， 作用：集中式管理react应用中多个组件共享的状态。

当某个组件的状态，需要让其他组件可以随时拿到（共享）或者一个组件需要改变另一个组件的状态（通信）时适用redux。

![image-20211205110356142](C:\Users\86155\AppData\Roaming\Typora\typora-user-images\image-20211205110356142.png)

### 2、核心概念

- action

  包含两个属性

  - type：标识属性, 值为字符串, 唯一, 必要属性
  - data：数据属性, 值类型任意, 可选属性

  ```
  { type: 'ADD_STUDENT',data:{name:'tom',age:18} }
  ```

- reducer

  用于初始化状态，加工状态。加工时根据旧的action和state产生新的state纯函数。

- store

  将state、action、reducer联系在一起的对象。

  ```
  1)import {createStore} from 'redux'
  2)import reducer from './reducers'
  3)const store = createStore(reducer)
  ```

  功能

  ```
  1)getState(): 得到state
  2)dispatch(action): 分发action, 触发reducer调用, 产生新的state
  3)subscribe(listener): 注册监听, 当产生了新的state时, 自动调用
  ```

  