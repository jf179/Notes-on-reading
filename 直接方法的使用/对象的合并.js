const target = { a: 1, b: 2 };
const source = { c: 4, d: 5 };

// Object.assign(合并到的对象,被恨得对象1，被合并的对象2)
const returnedTarget = Object.assign(target, source);
console.log(returnedTarget);
// 缺点：如果对象中有相同的键名 后面的会覆盖前面 且只能拷贝可枚举的属性 解决办法如下
// 第一个参数可以使用空对象

var obj1 = { name: '张三' };
var obj2 = { age: 18 };
for (var key in obj2) {
    if (obj2.hasOwnProperty(key) === true) { // 确保不是 obj2 的原型属性
        obj1[key] = obj2[key];
    }
}
console.log(obj1);