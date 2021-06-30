// toLocaleString()方法将数字转为字符串，也就是可以将new.Date()的时间数字转为可阅读格式/加en等字母就是分割形式
function format2(number) {
    return number.toLocaleString('en')
}

// new Date()
// console.log(format2(2323035400));