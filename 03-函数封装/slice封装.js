// 三个参数分别代表 数组 开始位置 结束位置
function slicei(arr, begin, end) {
    // 声明一个数组
    const result = [];
    // 遍历对象 并判断起始和结束 
    for (let i = 0; i < arr.length; i++) {
        // 包含起始 不包含结束位置的元素，可以更改比较关系去包含结束位置元素
        if (i >= begin && i < end) {
            // 将对应下标的元素压入数组
            result.push(arr[i])
        }
    }
    return result;
}