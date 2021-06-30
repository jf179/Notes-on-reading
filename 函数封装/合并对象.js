function mergeObject(...objs) {
    // 声明一个空对象
    const result = {};
    // 遍历所有的参数对象
    objs.forEach(obj => {
        // 获取当前对象的所有属性,并继续遍历一次
        Object.keys(obj).forEach(key => {
            // 检测resulty 中是否存在 key 属性
            if (result.hasOwnProperty(key)) {
                result[key] = [].concat(result[key], obj[key]);
            } else {
                // 如果没有就直接写入
                result[key] = obj[key]
            }
        })
    })
    return result
}

// 使用 对象作为函数参数
// mergeObject(对象,源对象1) 源对象会被合并至对象，原对象可以是多个