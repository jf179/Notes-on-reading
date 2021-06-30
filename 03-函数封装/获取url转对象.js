// 获取url参数 转对象
function getQueryString() {
    const result = {};
    const querystring = window.location.search;
    // 利用正则检测参数 / 正则根据需要修改
    const reg = /[?&][^?&]+=[^?&]+/g;
    // 用match匹配结果赋值给变量数组found
    const found = querystring.match(reg);
    // 判断
    if (found) {
        found.forEach(item => {
            // substring方法参数1表示要提取的字符串的位置从1开始,
            let temp = item.substring(1).split('=');
            let key = temp[0];
            let value = temp[1];
            //将获取转换处理后的参数给对象result
            resul[key] = value;
        })
    }
    return result
}

// vue中使用示例
// 导入函数方法
// mounted() {
//     const result = getQueryString();
//     // 使用对象：
//     console.log('result', result.name, result.age);
// }