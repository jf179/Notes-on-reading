// 判断一个对象是否为空
function checkNullObj(obj) {
    return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}

// 封装一个函数 判断一个js的数据类型
function getType(value) {
    // 判断数据是 null 的情况
    if (value === null) {
        return value + "";
    }

    // 判断数据是引用类型的情况
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value),
            type = valueClass.split(" ")[1].split("");

        type.pop();

        return type.join("").toLowerCase();
    } else {
        // 判断数据是基本数据类型的情况和函数的情况
        return typeof value;
    }
}
// let sum = [{
//     a: 1
// }]

