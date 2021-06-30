function flattenl1(arr) {
    // 声明一个空数组 用于存放降维后的数组元素
    let result = [];
    // 遍历数组
    arr.forEach(item => {
        // 判断
        if (Array.isArray(item)) {
            // 如果是一个数组赋值完毕后，再递归调用自身遍历二维数组进行赋值
            result = result.concat(flattenl1(item))
        } else {
            result = result.concat(item)
        }
    })
    return result
}

// 使用
// flattenl1(arr)