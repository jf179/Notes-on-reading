function throttle(callback, wait) {
    // 定义一个开始时间
    let start = 0;
    // 返回结果是一个函数
    return function (e) {
        // 获取当前时间
        let now = Date.now();
        if (now - start >= wait) {
            // 若满足条件就执行回调函数
            callback.call(this, e);
            //  修改开始时间
            start = now;
        }
    }
}
// 节流间隔时间由外部的回调函数使用时定义，外部使用throttle 必须利用函数传参