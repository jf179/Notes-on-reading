// 利用set方法去重
function unique(arr) {
    return Array.from(new Set(arr))
}
// 方法二
function suniApy(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
    
}


// 方法三
function suniApy2(arr) {
    return [...new Set(arr)]
}