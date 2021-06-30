 function fn1(value1, value2) {
     if (value1 < value2) {
         return -1;
     } else if (value1 > value2) {
         return 1;
     } else {
         return 0
     }
 }
 let arr = [10, 1, 20, 5, 05, 3]
 arr.sort(fn1)
 //  更改操作符 可以改变排序顺序
 // sort()排序方法 默认按照字符编码排序大写优先，接收一个函数作为参数进行指定比较

 // 方法二
 arr.sort(function (a, b) {
     //  更改操作符 可以改变排序顺序
     return a + b;
 })