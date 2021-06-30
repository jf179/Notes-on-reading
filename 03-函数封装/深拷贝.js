// var obj2 = JSON.parse(JSON.stringify(obj1))
// 这种方式简单但是有缺点 不会拷贝函数和未定义数值 

   // 解决办法如下
        const obj1 = {
            a: 1,
            b: ['e', 'b', 'c'],
            c: [{ h: 20 }, { f: 19 }, ['word', { g: 99 }]],
            say: function () {
                console.log('hello');
            }
        };

        // 深拷贝函数 接收一个函数/对象作为参数
        function deepClone(obj) {
            // 判断该参数不是对象或为空 就不做处理直接返回
            if (typeof obj !== 'object' || obj == null) {
                return obj
            }
            // 定义一个变量 并判断参数类型，由实参的数据类型决定它的类型为数组还是对象
            let result
            if (obj instanceof Array) {
                result = []
            } else {
                result = {}
            }
            // 遍历该数组/对象
            for (let key in obj) {
                // 判断遍历后的值是否为该对象/数组本身包含的值
                if (obj.hasOwnProperty(key)) {
                    // 如果是就递归自身将其依次拷贝给变量
                    result[key] = deepClone(obj[key])
                }
            }
            // 返回变量(结果)
            return result
        }
        let sum = deepClone(obj1);

        // 总结 深拷贝的意义在于重新开辟了一块堆空间而不是引用原始数据， 拷贝后的数据进行的修改不再会影响到原本数据


