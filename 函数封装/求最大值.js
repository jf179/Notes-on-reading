function isMax(attr) {
    var b = 0
    for (var i = 1; i < aa.length; i++) {
        if (aa[i] > b) {
            b = aa[i]
        }
    }
    return b
}
// 使用
// Max(数组参数);


// 方法二 Array 表示要传入的对象数组
// Math.max.apply(Math, array)

// 求最小值
// Math.min.apply(Math, array)

