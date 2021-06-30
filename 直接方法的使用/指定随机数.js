        //随机选取10-100之间的10个数字，存入一个数字组，并排序
        var arr = [];
        Math.random() //1到100之间的随机数包含10和100并循环追加到数组
        for (var a = 1; a <= 10; a++) {  // 91 + 10 =101向下取整
            arr.push(Math.floor(Math.random() * 91 + 10));
        }
        // 利用sort(函数作为参数)方法排序
        function fn1(value1, value2) {
            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0
            }
        }
        let sum = arr.sort(fn1);