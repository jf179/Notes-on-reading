function debounce(callback, time) {
    // 定时器变量
    let timeId = null;
    // 返回一个函数
    return function (e) {
        // 判断
        if (timeId !== null) {
            // 清空定时器
            clearTimeout(timeId);
        }
        // 启动定时器
        timeId = setTimeout(() => {
            // 执行回调函数
            callback.call(this,e);
            // 重置定时器变量
            timeId = null;
        }, time)
    }
}
// 防抖间隔时间由外部的回调函数使用时定义，外部使用debounce 必须利用函数传参