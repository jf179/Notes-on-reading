// 即判断一个数组中的元素，在另外一个数组是否也存在。存在就不出现
function differenceL(arr1, arr2) {
    const result = arr1.filter(item => !arr2.includes(item))
    return result;
}