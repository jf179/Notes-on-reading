// 接收函数作为参数 依次递减相加，返回计算后的值
array.reduce((item, inter) => {
    return item + inter
})


// 方法二  通过循环追加
function add(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}