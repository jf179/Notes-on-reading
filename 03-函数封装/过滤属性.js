// 非封装  只是方法使用😁
// 按照指定条件过滤元素
filter((item) => {
    if (item > 4) {
        return true;
    }
    return false;
});

// 按照指定条件获取需要书写 过滤必须要属性
const arr1 = [
    { name: '许嵩', type: '一线' },
    { name: '周杰伦', type: '过气' },
    { name: '邓紫棋', type: '一线' },
];
// 筛选出一线歌手
const arr2 = arr1.filter((item) => item.type == '一线'); 