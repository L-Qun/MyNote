# jsx

#### 1、简介

```js
const element = <h1>Hello, world!</h1>;
```

JSX是一个 JavaScript 的语法扩展，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。

#### 2、在jsx中嵌入表达式

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

可以在括号内放入JavaScript表达式，例如，`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

#### 3、JSX 特定属性 

你可以通过使用引号，来将属性值指定为字符串字面量：

```js
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```js
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

#### 4、其他

- 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
- 应用样式内名用className.
- 内联样式，要用style={{key:value}}的形式来写。
- 只有一个根标签。
- 假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签。
- 标签首字母
  - 小写字母：则转化为html标签同名元素，若html无该标签对应同名元素则报错。
  - 大写字母：若大写字母开头，react就去渲染对应的组件，若没有对应的组件定义，则报错。