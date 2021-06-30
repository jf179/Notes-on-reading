function changeFirstLetter() {
    //转换为字符串数组
    var array = str.toLowerCase().split(" ")
    for (var i = 0; i < array.length; i++) {
        //给数组的每一个元素重新赋值,将首字母变为大写
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length)
    }
    var string = array.join(" ")
    return string
}

