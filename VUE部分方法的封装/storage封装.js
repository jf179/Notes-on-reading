// 声明命名空间
const namespace = 'mall';

// 存
export function saveItem(key, value) {
    let storage = window.localStorage.getItem(namespace);
    // 如果为空就直接返回
    if (!storage) {
        storage = {};
    } else {
        // 读取转换
        storage = JSON.parse(storage);
    }
    storage[key] = value;
    window.localStorage.setItem(namespace, JSON.stringify(storage))
}

// 取
export function loadItem(key, def) {
    let storage = window.localStorage.getItem(namespace);
    if (!storage) {
        return def;
    }
    storage = JSON.parse(storage);
    let result = storage[key];
    return result || def;
}