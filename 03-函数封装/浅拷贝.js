// -----------浅拷贝
// const obj2 = {
//     a: 3,
//     b: ['e', 'b', 'c'],
//     c: [{ h: 20 }, { f: 19 }, ['word', { g: 99 }]],
//     say: function () {
//         console.log('hello');
//     }
// };

function clone1(target) {
    if (typeof target === 'object' && target !== null) {
        if (Array.isArray(target)) {
            return [...target]
        } else {
            return { ...target }
        }
    }
    else {
        return target;
    }
}
let arr = clone1(obj2);


//-方法二  利用截取方法浅拷贝
let array = [{a:1},{b:2}]
let array1 = array.slice(0);

//- 方法三  利用拓展运算
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}


// 方法四
function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== "object") return;
  
    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};
  
    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObject[key] = object[key]; // 不使用递归
      }
    }
  
    return newObject;
  }
