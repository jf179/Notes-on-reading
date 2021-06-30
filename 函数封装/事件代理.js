function addEventListener(el, type, fn, selector) {
    // 判断el的类型
    if (typeof el === 'string') {
        el = document.querySelector(el);
    }
    // 事件绑定
    // 若没有传递子元素的选择器，则给el 元素绑定事件
    if (!selector) {
        el.addEventListener(type, fn)
    } else {
        el.addEventListener(type, function (e) {
            // 获取点击的目标事件源
            const target = e.target;
            // console.log(target);
            // 判断选择器与目标元素是否匹配
            if (target.matches(selector)) {
                // 如果匹配 则执行回调函数
                fn.call(target, e)
            }
        })
    }
}

// 使用方式
{/* <ul id="items">
<li>这是第1条li</li>
<li>这是第2条li</li>
<li>这是第3条li</li>
<li>这是第4条li</li>
<li>这是第5条li</li>
</ul> */}

// addEventListener('#items','click', function(e){
//    alert(this.innerHTML)
// }, 'li')
