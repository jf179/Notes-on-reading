// elem代表需要绑定事件的元素，type事件类型，selector表示实际需要点击触发事件的元素,callBk即要执行的回调函数
function bindEvent(elem, type, selector, callBk) {
    if (callBk == null) {
        selector = null;
        callBk = selector;
    }
    // 开始绑定事件侦听
    elem.addEventListener(type, (event) => {
        const target = event.target;
        // 如果有传入selector就是绑定事件代理
        if (selector) {
            // matches过滤元素条件 执行回调函数
            if (target.matches(selector)) {
                callBk.call(target, event);
            }
        } else {
            callBk.call(target, event);
        }
    })
}

// 使用示例 获取元素 -> 绑定事件
const list = document.getElementById('ulList');
const li = document.getElementById('li1');

bindEvent(ulList, 'click', 'li', function (e) {
    console.log(this.innerHTML);
})