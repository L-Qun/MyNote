# interface和type的区别

## 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

```javascript
interface LabelledValue {
    label: string
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

// 这样传可以多个属性
let myObj = {size: 10, label: "size 10 Object"};
printLabel(myObj);

// 这样不行
printLabel({size: 10, label: "size 10 Object"});
```

接口特性：

- 可选属性

  ```javascript
  interface SquareConfig {
  	color?: string;
  }
  ```

- 只读属性

  ```
  interface Point {
  	readonly x: number;
  }
  ```

- 多余属性检查，防止使用不属于接口的属性

  ```
  interface Person {
  	name: string
  	age?: number;
  }
  
  let p1: Person = {name:'小明'} // 正确
  let p2: Person = {name: '小明', age: 18, sex: '男'} // 报错
  
  // 绕过：多余属性不报错
  let p = {name: '小明', age: 18, sex: '男'};
  let p3: Person = p;
  
  // or
  interface Person {
  	name: string
  	age?: number
  	[propName: string]: any
  }
  let p4 = {name: '小明', age: 18, sex: '男'};
  ```

- 函数类型

  ```
  interface SearchFunc {
  	(source: string, subString: string): boolean;
  }
  ```

- 数组

  ```
  interface StringArray {
  	[index: number]: string;
  }
  
  let myArray: StringArray;
  myArray = ["Bob", "Fred"];
  ```

- 类类型

  - 类实现接口

    ```
    interface ClockInterface {
    	currentTime: Date;
    	setTime(d: Date);
    }
    
    class Clock implements ClockInterface {
    	currentTime: Date;
    	setTime(d: Date) {
    		this.currentTime = d;
    	}
    	constructor(h: number, m: number) {}
    }
    ```

  - 接口继承接口

    ```
    interface Shape {
    	color: string;
    }
    
    interface PenStroke {
    	penWidth: number;
    }
    
    interface Square extends Shape, PenStroke {
    	sideLength: number;
    }
    
    let square: Square = {
        sideLength: 1,
        color: 'red',
        penWidth: 11
    }
    ```

    

## type: 类型别名

type 会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。

```
type Name = string; // 基本类型
type NameResolver = () => string; // 函数
type NameOrResolver = Name | NameResolver; // 联合类型
type NameObj = {
	name: string
	age: number
}
function getName(n: NameOrResolver): Name {
	if (typeof n === 'string') {
		return n;
	} else {
		return n();
	}
}
```

起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：

```
type Container<T> = {value: T};
```

也可以使用类型别名来在属性里引用自己：

```
type Tree<T> = {
	value: T;
	left: Tree<T>;
	right: Tree<T>;
}
```



## 区别

1、 interface可以定义多次，并将被视为单个接口

```
interface Point {x: number};
interface Point {y: number};

const point: Point = {x: 1, y: 2};
```

2、 extends方式不同

两者都可以扩展，但是语法又有所不同。此外，请注意接口和类型别名不是互斥的。接口可以扩展类型别名，反之亦然。

```
interface PartialPointX {x: number}
interface Point extends PartialPointX {y:number}
```

Type alias extends type alias

```
type PartialPointX = {x:number};
type Point = PartialPointX & {y:number}
```

Interface extends type alias

```
type PartialPointX = {x:number}
interface Point extends PartialPointX {y:number}
```

Type alias extends interface

```
interface PartialPointX {x:number}
type Point = PartialPointX & {y: number}
```

3、 Type可以用于更多类型

与接口不同，类型别名可以用于其他类型，如基本类型（原始值）、联合类型、元组

```
type Name = string;
type PartialPointX = {x:number};
type PartialPointY = {y:number};
type PartialPoint = PartialPointX | PartialPointY;
type Data = [number, string];
```

