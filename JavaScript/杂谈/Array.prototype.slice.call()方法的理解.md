# Array.prototype.slice.call()方法的理解

如果让你手写一个slice方法，怎么写？

```js
Array.prototype.mySlice = function(start, end) {
    const arr = [];
    const length = this.length;
    for (let i = start; i < end; i++) {
    	arr.push(this[i]);
    }
};

const arr = [1, 2, 3];
console.log(arr.slice(0, 2)); // [1,2]
```

如果你直接对一个数组使用slice？

```
const a = [1, 2, 3];
console.log(a.slice());
console.log(a.slice() === a); // false
```

a.slice()返回了a的完整的浅拷贝

前面在函数柯里化中使用了如下代码：

```js
function add() {
    // 定义一个数组专门用来存储所有参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
    _args.push(...arguments);
    	return _adder;
    };

    // 利用toString隐式转换特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function() {
        return _args.reduce(function(a,b) {
        	return a + b;
        });
    };
    return _adder;
}
```

因为arguments是一个类数组的结构，上面有length属性，但是没有slice方法，如果我们直接调用Array.prototype.slice.call(arguments)相当于把this指向了arguments对象，那这样的话就实现了虽然arguments没有slice方法，但是也能够实现对arguments的拷贝，返回数组。