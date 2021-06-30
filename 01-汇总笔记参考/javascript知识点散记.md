# javascript 散修 😂😁

## 基础属性

- prompt('');  提示输入框(函数): 用于保存用户输入的内容

- 标识符    ： 就是变量、函数、属性或函数参数的名称,可以有下划线美元符号$,首字母不能是数字                                 且区分大小写，关键字不能作为变量名

- 同一作用域下不能声明相同的变量名，

- 模板字符串：  ``两个斜点号内部可以使用文字和变量进行拼接 如: ${变量}

  ```javascript
  let name = 'jack';
  let age = 18;
  let msg =` 大家好，我叫${name},今年${age}岁了`;
  ```

  


## 变量、作用域、与内存

### 原始值与引用值

1. primitive value 原始值有： Undefined 、 Null 、 Boolean 、 Number 、 String 和 Symbol 
   1. 保存原始值的变量是按值访问的。操作的就是存储在变量中的实际值(栈)
   2. 将一个原始值复制给另一个变量时。两个变量的修改互不影响,即==原始值不可变==
2. reference value 引用值有：arry object function date RegExp
   1. 引用对象是保存在内存中的对象(堆)，js不允许直接访问内存位置去直接操作对象，即实际操作的是对象的引用(编码寻址)，而非实际对象本身
   2. 引用值可以随时添加修改和删除属性及方法，
   3. 两个变量同时引用同一对象时 其中一个进行了修改会影响另外一个
   4. 引用类型的比较是==引用地址==的比较,而不是值的比较

### 数据转换

1. parseInt(变量名) 转换为数值Number型并取整去单位,使用type检测数据类型则无效
2. parseFloat( 变量名 )  转换为数值型 保留小数位。自动去掉单位
3. Number( 变量名或者直接值 ) 将字符串类型转换为数值型(前提需要是数值类型的字符串)
   1. 有-号的或者有些场景下系统会自动进行隐式转换
4. Boolean(变量名)； 可将其他类型转换为布尔类型，代表空的、否定的值会被转换成false,其余都会被转换成true
5. 新变量名=原变量名.toString();额外声明一个变量来实现原变量名的类型转换成字符串型，另外一个方法是使用 + 号进行拼接 属于隐式转换
6. array.join(可以写符号) ：方法用于把数组中的所有元素转换一个字符串。默认以逗号符号分割
7. isNaN:用于判断一个字符串是否由纯数值组成 是就返回true 否则false

### 运算符的优先级

- 小括号() > 一元运算(++ --!)  > 算数运算符(*/% + -) >  比较运算 (> >== < <=)  >  相等运算符(== ! = )  > 逻辑运算符(先&& 后 || )  >  赋值运算符(let = 18;)  > 逗号

- 小技巧:  ==一个数 % 2 等于0 即偶数 ! = 0即奇数==

- ==for 循环的操作条件如 < 3 表示不包括3.索引从0开始 即 0 1 2 条件结束==

- instanceof：用来判断某个构造函数的 prototype 属性所指向的对象是否存在于另外一个要检测对象的原型链上,即 判断一个引用类型的变量具体是不是某种类型的对象

- ```javascript
  ({}) instanceof Object              // true
  ([]) instanceof Array               // true
  (/aa/g) instanceof RegExp           // true
  (function(){}) instanceof Function  // true
  ```

- typeof() :用来检测一个变量是不是基本的数据类型 如 string Number

### 文档语句

- innerText ：用于获取或设置指定元素标签内的文本值
- innerHTML ：用于获取指定元素内的html内容(包括标签会一起解析)
- document.write() ：向文档写入 HTML 表达式 或 JavaScript 代码



### 控制语句/循环

- 循环结束的两种方式：1 条件不再满足  2 使用关键字 break  中断并退出当前循环,会执行后面的内容

- 利用break 的穿透性 即特意在某个条件内省略break 让它 穿透到下一个相同结果的执行条件

- 关键字： continue 中断(跳出)本次循环 并继续下一次循环 直至条件不再满足

  ------

  

- switch 语句  (类似二叉树查找) : 一般搭配 for循环使用 / 只能做等值判断

```js
let name = 20;
switch(参数变量/表达式){ 
    case name > 12: // 可以是表达式或者 固定值，
        msg = '你还小';
        break;    // 如果条件匹配成功执行完毕此句 就中断退出 break也可以用在循环体内
    case name > 30:
        msg = '你是个大人啦';
        break;
    default:  // 关键字 以上都不成立就输出这句
        msg= '输入错误'
}
```

- if  else 多分支语句  (线性查找)  / 范围区间判断时使用

**循环**：

- while  循环    while循环也可以搭配 for循环

  ```js
  let i = 0; // 计数器初始值设置为 0
  while(i < 5){  // 条件表达式
      console.log('小于5'); //执行代码
      i++ // 操作式
  }
  
  let goTp = '';
  while(goTp != '123456'){  // 条件表达式 只有密码等于123456时大括号内部代码才不会一直循环
      goTp = prompt('输入密码'); // 如果密码匹配不成立就一直循环输入提示框
      if(goTp != '123456'){
          alert('验证码错误继续输入'); // 并提示输入错误
      }
  }
  alert('密码成功')
  ```

- for  循环 :一般搭配 if else语句使用

  ```js
  for(let i = 0; i < 5; i++){ // for循环将 初始值 条件表达式 操作式 封装在了一起
      console.log('总共输出5句')
  }
  ```

------



## 字符串对象

简介：字符串就是伪数组,单纯的字符串有数组的长度和下标但是没有数组的方法, 但是放在数组内的字符串就是数组的成员，也就有了数组的方法，因为数组和对象可以包含任意类型的数据

- ==字符串的内容是不可变的(无法修改),如果对字符串的值进行修改实际是重新创建并赋值==
- 有个match匹配方法有时间研究😂

### 方法集合

- ```js
  charAt() // 方法可返回指定位置的字符。
  let str = "HELLO WORLD";
  let n = str.charAt(2) // 返回索引2的字符串 L
  ----------------
  includes() 方法用于判断字符串是否包含指定的子字符串。找到返回true否则false
  语法：let n = str.includes("world",可选位置);// 需要查找的元素及从哪里开始查
  ----------------
  indexOf(要检索的元素,检索开始的index); // 与数组的使用方法相同 找到指定字符串首次出现的位置 没找到返回 -1
  ------------ indexOf与includes区别
  var ary = [1];
  if (ary.indexOf(1) !== -1) {
      console.log("数组存在1")
  }
  if (ary.includes(1)) {
      console.log("数组存在1")
  }
  两者功能差不多,如果只是想检查是否包含某个元素 首选includes, 想知道检索元素的位置用indexOf
  另外indexOf不能判断数组中有无NaN，includes则可以
  ------------------lastIndexOf // 注意I和O大写
  let str = sum.lastInendexOf('L'); //查找指定字符串最后一次出现的位置并返回(索引号)
  ```

- ```js
  trim() // 方法用于删除字符串的头尾空白符，返回新的字符串 不改变原字符串,
  
  toString() //方法返回一个表示 String 对象的值。即转换成字符串类型
  concat() // 方法用于连接两个或多个字符串
  ```

### 字符串分割/查找

```js
split(','); // 用于把一个字符串分割成字符串数组 以新数组形式返回结果，不改变原始数组
let names = 'Bilbo, Gandalf, Nazgul';
let arr = names.split(', ');
document.write(arr)  // Bilbo,Gandalf Nazgul
--------------------------
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2); // 还可以进行长度限制
alert(arr); // Bilbo, Gandalf
------------- 分割字符串
let str = "test";
alert( str.split('') ); // t,e,s,t 空参数不带符号即是拆分字符
```

```js
join() // 方法用于把数组中的所有元素转换成字符串。返回的是伪数组形式的字符串，如果是有一对引号('')则是直接是将字符串无缝链接
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
let str = arr.join(';'); // 使用分号();将数组粘合成字符串Bilbo;Gandalf;Nazgul，()空的就默认是逗号
```

### 字符串的截取

```js
slice(start, end) //方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。 允许负数
//选的开始位置和结束位置 进行截取 ，负数代表从尾部开始截取 0代表全部截取
let sum = str="Hello world!";
let n=str.slice(1,5);// 得到 ello 不指定截取数就是从索引开始的全部字符
----------------------------
let str = "stringify"; // 从右边的第四个位置开始，在右边的第一个位置结束
alert( str.slice(-4, -1) ); // 'gif'
-------------------- 加强版
substr(); // 在字符串中抽取从下标开始到指定数目的字符，返回新的字符串，不改变原字符串
let sum = ['hello word'];
let si = sum.subster(2,3)// 从索引2开始包括2 截取三个字符即llo 只有一个参数即从2开始截取到最后
可以代替slice()和 substring()
实际应用中常用slice较多 灵活些 允许负数
```

### 字符串的替换

```js
replace(); // 替换字符串，或替换一个与正则表达式匹配的子串,返回新值，不会改变原字符串
let sum = '我爱天庭的仙丹';
let neg = sum.replace('天庭','老君');// 天庭替换成老君  缺点：字符串出现多个天庭只能替换第一个
---解决办法----加个循环
while(1){ // 1代表条件为true 就一直执行循环查找 天庭
    sum = sum.replace('天庭','老君'); // 没找到一次就进行替换
    if(sum.indexOf('天庭') == -1){ // 如果没有找到 即：已循环查找完毕
     break;   // 就退出结束循环
    }
}  
console.log(sum)
```





## 数组对象

简介：数组拥有的属性 

- length 长度。    prototype  原型。   constructor 构造函数 
- 数组可以存储任何类型的数据，  let sum = [];  空数组(数组容器)

### 数组的创建

1. let sum = new Array(5,'hello'); // 利用new 关键字 构造函数， 传入2个值 创建了包含2个值的数组，如果传入的是单个Number数值则会创建数值对应长度length的数组 值为空empty,
2. let sum = [5,'hello']; // 利用字面量创建数组
3. const a = Array.from(); ES6 新增的数组创建方法
4. 数组循环遍历时 如果使用了 <=.length -1;则需要在后面加上 -1，原因在于长度比索引多一位

### 数组的迭代器

- keys() 语法：   let sum = Array.from(数组名.keys()); // 返回数组索引
- values()语法：  let sum = Array.from(数组名.values()); // 返货数组每项元素值
- entries()语法： let sum = Array.from(数组名.entries()); // 以键值对的形式返回 索引，元素值对
- ES6数组解构：利用for循环进行键值对的拆分

```js
const a = ["foo", "bar", "baz", "qux"];
  for (const [idx, element] of a.entries()) {
     console.log(idx);
     console.log(element);
   } // 0:foo 1:bar 2:baz 3:qux
```





### 数组对象的方法

- ```javascript
  concat()；// 连接两个或多个数组并返回新的数组,新数组添加的是数组中的元素 而不是数组
  语法:  sum.concat(arr,str) // sum arr str都是数组名 sum在前 arr atr在后
  ------------简洁版
  const cars = ["hello", "word"];
  const trucks = ["你看", "🚛"];
  const combined1 = [].concat(cars, trucks);
  console.log(combined1);
  ```

- ```js
  splice();  // 删除/插入数组元素 返回值：一个包含删除元素的新数组 未删除元素则返回空数组
  let sum = [12,5,6,98,9,5,'hello'] // 此方法会改变原始数组的长度
  语法: array.splice(2,1,'bbc'); // 从索引2开始删除1个元素，并添加一个元素'bbc'
  原数组等于 [12,'bbc',98,9,5];  函数本身返回的新数组为被删除的元素即 [6]
  返回的数组根据需要用变量进行接收 let sub =[6]
  配合indexOf() 可以删除指定多个元素
  ```

- ```js
  push(); // 想数组末尾添加一个或多个元素 并返回新的长度
  let sum = [10,'hello'];
  语法: sum.push('word','home') // sum = [10,'hello','word','home']
  ```

  ```js
  unshift() //可向数组的开头添加一个或更多元素，并返回新的长度。注意：该方法将改变原数组的数目
  array.unshift('hello');
  ```

- ```js
  arry.pop(); // 删除数组最后一个元素，并返回被删除的数组，会改变原数组长度
  array.shift(); // 删除数组第一个元素，并返回第一个元素的值，会改变原数组长度
  ```

- ```js
  array.isArray(对象名) // 方法用于判断一个对象是否为数组。
  array.keys() // 方法用于从数组创建一个包含数组键的可迭代对象,如果对象是数组返回 true，否则返回 false。
  ```

- ```js
  array.forEach() // 方法用于调用数组的每个元素，并将元素传递给回调函数。
  语法：array.forEach(function(currentValue, index, arr), thisValue);
  includes() //方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
  语法: array.includes(指定的元素值)
  ```

- ```js
  filter() //方法创建一个新的数组，新数组中的元素是通过过滤检查指定数组中符合条件的所有元素。
  语法:array.filter(function(currentValue,index,arr), => item > 2) //选出大于2的元素
  let sum = [10,25,2,3,58,56];
  let arr = sum.filter((item.index.array)=>item > 2);
  -----------------------------
  reverse() // 用于颠倒数组中元素的顺序
  语法：array.reverse()
  ```

- ```js
  shift(); // 删除数组第一个元素并返回第一个元素值(即被删除的那个元素值)
  语法：array.shift() //配合push可以吧数组当队列使用,即一边删一边追加
  pop(); // 删除数组最后一个元素 并返回被删除的元素值
  语法： array.pop()
  ```

- ```js
  迭代器
  forEach()// 加强版的for循环   没有返回值
  let sum = [1,2,5,4,5,5]
  sum.forEach((item,index. array)=>{
      // 操作体
  })
  --------------------
  map();//方法返回一个数组 这个数组是与原始数组同样位置的元素运行函数后的结果
  // 有返回值   return什么就根据条件返回什么
  let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  let mapResult = numbers.map((item, index, array) => item * 2);
  alert(mapResult); // 2,4,6,8,10,8,6,4,2
  ```

### 归并方法

```js
reduce(); // 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值
let sub = [1, 2, 3, 4, 5];
let sum = sub.reduce(function (a, b) { // 参数名是可以更改的
     return a + b;
  })//返回值15
console.log(sum);
---------------
reduceRight(); // 与reduce()一样 区别只是从右往左递减
--------判断一个字符出现的次数
let str = "ababadectwestsfdadsfb"
let sum = str.split('');
let arr = sum.reduce(function (result, item) { // result作为初始值/计算结束后的返回值，item为数组的每一项元素
if (result[item] === undefined) {//如果初始值里面还没有当前元素项 那么返回1(记数1次)
   result[item] = 1;
   } else {
       result[item]++ //否则初始值累加器里面就是有当前元素项，那么就每次自增1
   }
   return result //将结果返回给函数
}, {})
console.log(JSON.stringify(arr));//将js转换为JSON对象，注：JSON转js对象是JSON.parse()
```

### 求数组最大值

```js
let sum = [1, 2, 3, 65, 421, 53, 212, 86, 88, 1, 6, 5, 11, 33]
sum.sort(function(a, b) {
  return b - a // 代表从后往前排序/比较，并给出最大值,a-b则相反
 })
console.log(sum[0]) //不加[0]就是排序，加了就是返回数组中的最大值
---------------------------------
let initArr1 = [1, 2, 3, 65, 421, 53, 212, 896, 88, 1, 6, 5, 11, 33]
let maxDefault = initArr1[0] // 假设第一个为最大值 往后比较
for (let i = 1; i < initArr1.length; i++){
  let item = initArr1[i]
  item>maxDefault?maxDefault=item:null // 利用三元表达式判断赋值
}
console.log(maxDefault)
```





### 数组排序与去重

内置的数组排序方法有两种

```js
1：sort() // 方法用于对数组的元素进行排序 可选:规定排序顺序。必须是函数 
let sum = [33, 35, 53, 33, 33, 3, 3, 0, 5, 36, 35, 16];
    sum.sort(); // 按照第一位顺序从小到大排序 缺点 带1的10以上数字会排在10以下数字的前面，需要手      动用函数调位  如下：
-------- 函数实现
function compare(a, b) {
  if (a > b) return 1; // 如果第一个值比第二个值大--往后排
  if (a == b) return 0; // 如果两个值相等 -- 保持不动
  if (a < b) return -1; // 如果第一个值比第二个值小--往前排
}
let arr = [ 1, 2, 15 ];
arr.sort(compar); // 提供函数给sort作为参数
-------------------------------分割线
2：array.reverse(); // 颠倒数组顺序(相反顺序)
--------------------------------------------------
原始排序(倒序)
 let sum = [10, 20, 30, 50, 4, 5, 6, 1];
     let arr = [];
     for (let i = sum.length -1; i >= 0; i--) {
        arr.push(sum[i])
 }
----------------------------------  
交换排序(倒序)
let sum = [10, 20, 30, 50, 4, 5, 6, 1];
for(let i = 0; i < sum.length / 2; i++){ // 交换排序只需要 前一半对换后一半所以长度是 / 2;
    let temp = sum[i]; // 交换两个变量的值
    sum[i] = sum[sum.length - 1 -i]; //
    sum[sum.length - 1 -i] = temp;
}
------------------------------------------------------
冒泡排序(大小排序)
let sum = [10, 20, 30, 40, 50, 60,];
for (let i = 0; i < sum.length - 1; i++) { // 外层循环一次里层全部
   for (let j = i + 1; j < sum.length; j++) {// i+1 即每次从i元素值的位置往后推一位进行比较
     if (sum[i] < sum[j]) { // 如果外层的i索引号上的元素值小于后面每次比较的值
       let temp = sum[i];  // 就把其给临时变量
         sum[i] = sum[j]; // 其再等于比较后复合条件的值(即比它大的)
           sum[j] = temp; // 后面的值再等于临时变量里面的小值 依次类推
            }
        }
    }
```

```js
//外层循环i循环一次内部循环全部 即数组的每一项(外层循环控制) 去比对后面的每一项(内存循环控制)
let sum = [33, 35, 53, 33, 33, 3, 3, 0, 5, 36, 35, 16];
     for (let i = 0; i < sum.length; i++) {
         for (let j = 0; j < sum.length; j++) {
              if (j == i) {  
                 continue;
              }
            if (sum[i] == sum[j]) {
                  console.log(sum[i] + '和下标为' + j + '的元素重复')
              }
          }
      } // 找出重复位置的办法
---------------------------------------------------------------------------------
   // 数组去重
    let sum = [33, 35, 53, 33, 33, 3, 3, 0, 5, 36, 35, 16];
    let arr = []; // 创建新数组 存放去重后的元素值
    for (let i = 0; i < sum.length; i++) {
        // 给arr新数组一个方法 循环去检索sum的每一项
           let index = arr.indexOf(sum[i])
            if(index == -1){ // indexOf方法如果未找到与arr新数组里面相同的值就会返回-1
                arr.push(sum[i]) // 那么就将其追加到arr数组里面去
            }
        }
 // 也可以用indexOF 指定元素值 从数组中去掉某个重复值
```



## 数值判断

- ```js
  if(!Number(num)&&Number(num)!=0){ // 判断是否为数字
  	alert("不是数字");  };
  if(parseInt(num)==parseFloat(num)){ // 判断是否正数
  	alert("是整数");};
  if(Number(num)>0){   // 判断是否正数
  	alert("正数");}；
  ```

### 随机数

```js
Math.random(); 无参数 返回一个0-1之间的随机数包括0不包括1, 取值范围可设置
语法：Math.floor/ceil(Math.random()*10)；// 在0-10之内产生随机整数
let names = ['hello','worder','川普','史泰龙']; 
    for(let i = 0;i < 1;i++) {
                   // 此处数组长度就是随机值的指定范围
       let index = Math.floor(Math.random() * (arr.length));
       console.log(names[index]);
  }
```

### 旗帜flags的运用

```js
let sum = ['川普','炎龙无双','史泰龙];
flags = false; // 当内部的flags 变为true时 flags的条件值就发生了改变 
for(let i = 0; i < sum.length; i++){
    if(sum[i] == '史泰龙'){
      console.log('报告，有史泰龙这个人');
      flags = true; // 在语句或函数背部取其反或正 能进行判断运用
        break;
  }
    if(flags == false){
        console.log('报告，没有史泰龙这个人')
    }
```

- indexOf() 比flags更好用

```js
indexOf();  // 搜索数组中的指定元素，并返回它第一次出现的位置(索引号) 未找到则返回 -1
语法:  array.indexOf(被检索的元素名/数组对象,index/值)  // index 即开始搜索的位置(索引号)或者某个值
let sum = ['川普','炎龙无双','史泰龙];
let index = sum.indexOf('史泰龙');
if(index != -1){ // 未找到就返回 -1，取反就是有找到 并返回位置索引号 2
    console.log('报告,有史泰龙这个人')
}else{console.log('报告,没有史泰龙这个人')}
indexOf 也可以利用函数参数进行操作
```

### 菲波拉契数

```js
let sum = [1,1]; // 第30位是多少
for(let i = 2; i < 30; i++){
    sum[i] = sum[i - 1] + sum[i - 2];
} // 待研究
```

### 判断一个字符出现的次数

```js
原始操作 // 字符串是一个伪数组 单纯的字符串只有数组的长度和下标没有数组的属性和方法
let str = ['deddkjgkeeekje'];
let sum = 0; // 定义一个变量用作计数器 //5
for(let i = 0; i < str.length; i++){
    if(str[i] == 'e'){
        sum++; // e每出现一次 计数器就累加一次
    }
}
-------------------方法
```





## 函数

简介：定义一次，可多处复用，如果定义在对象内部就是该对象的方法及this的值

- 函数的声明创建的两种方式： 1 字面量   2 new Array() 

- 3：函数表达式(即在函数头部声明变量接收赋值,此时函数就不需要字面量函数名)

- 函数定义后需要调用才会执行,(自执行函数除外)

- ==函数就是用来封装一段代码的==

  ```js
  字面量:function声明函数 myBody 即函数名 小括号内可以是多个标识符组成的列表 成为参数
  function myBofy(参数){
      函数体 ， 一旦调用函数就会执行
  }
  myBody(); // 调用函数执行 (调用函数也可以用一个变量来接收)
  ------------------- 函数表达式
  let myb = function(){ //将匿名函数赋值给 变量 调用函数就是 myb();
      console.log('heelo word')
  } // 区别：函数表达式不能在函数声明之前调用(指书写顺序)
  ```

- 函数的参数：调用函数时可以为其传入参数 可以是简单数据或复杂数据类型,函数内部修改形参会影响外部的实参，

- arguments:构造函数，可以在函数内部读取所有传递的参数，==(与数组的访问方式相同)==

  - 解决的问题：解决了同名参数的问题(如果有同名参数 取最后出现的那个值)
  - 用作判断函数调用时带有几个参数 内部arguments.length;外部:函数名.length;
  - arguments.callee属性：可以调用函数自身

- ```js
  function fn3(suu) { // arguments只能在函数内部使用 实际就是一个伪数组用来存储的
    console.log(arguments[1]);  // 可以通过arguments以下标的方式访问形参
      //当实参位数大于形参时可以通过arguments访问
    console.log(suu);   
       }
  fn3(18,20);// 相当于如果有2个以上参数形参只有一个或者形参没有的时候arguments也能拿到实参
  1：引用传递的参数是引用对象的地址 修改会影响引用参数
  2：值传递  函数内部修改不影响外部传递参数的变量值
  ```

### 匿名函数

简介：**定义函数时，不指定函数名的函数**叫匿名函数

- 作用：节约内存；避免产生全局变量，造成全局污染

  ```js
  1： (function(){要执行的任务})(); // 自调用匿名函数:
  2： let sum = function(){} // 匿名函数
  ```

  



### return关键字

- return：用来结束整个函数，并返回值(结果)交给到该调用方法的语句处，且只能在函数体内使用，箭头函数或者没有花括号时 return被系统隐式的调用了

- 如果函数里面没有使用return返回值 外部使用变量是接收不到的,值为undefubed，它只会执行内部的函数体，而外部是接收不到它的结果的。

- 区别：break 结束当前循环  continue 结束本次循环   return 结束循环/函数方法，并返回到主函数处(即调用函数/变量接收),

  

## 对象

简介：对象就是键值对(包括变量)的容器和方法的集合，可以存储任意类型的数据

### 对象的创建方法：

1. 字面量: let myBoy = {name:'刘德华',age:18,score:100,ffa:function(){}};
2. 关键字：new object()

### 对象属性成员的访问

简介：对象的键值即：属性、值。和方法统称为对象的成员

- 点语法访问：object.属性名/方法名
- object.['属性名/方法名'];必须引号以字符串形式访问,如果是方法名[]括号外面必须加()号调用
- ==如果一个对象的属性名是存储在一个变量里面，那么就必须使用[]号来进行访问==

### 对象的遍历

```js
for in // 循环遍历对象      // key名字可以自定义修改XXX也行
for(let key in object); {// key 代表对象中每一项属性 object 代表要遍历的对象名
 console.log(object[key]); // 这样才能取到每一项属性值,直接key只能拿到属性名   
}   
```

### 工厂方法创建函数对象

- 将对象封装成一个函数对象,便可以根据需要批量生产对象

```js
function makeStudy(xiaoMing,name,age){ // 形参
    let sum = {
        xiaoming:xiaoming, //可以使用this.
        name:name,
        age:age
    }
    return sum; // 将结果返回给调用者
}
 let xiaozhang = makeStudy('小明','小明子',18) // 实参
 let xiaotian = makeStudy('小田','小田子',19)
 结果返回后用变量进行接收处理
```

### 构造函数创建对象

- 通过new关键字创建对象实例化，==相当于工厂方法的加强版==

```js
function makeStudy(xiaoMing,name,age){ // 形参
        this.xiaoMing = xiaoMing;
        this.name = name; // this 引用形参 指向其实例化对象 new makeStudy()
        this.age = 18
}
let xiaoming = new makeStudy('小明','小明子',18); // 构造函数的实例化
let xoaozhang = new makeStudy('小张','小张子',27); // 构造函数的实例化
构造函数时new会自动创建空对象 函数结束返回结果给实例化对象(调用者),用变量进行接收处理 因此不需要return
```

### 构造函数的return

- 构造函数内部使用return 返回数据 如果是基本类型数据 无效，如果是引用类型数据就会影响new实例化的数据，==即：使用new关键字构造函数创建的对象内部不能使用return，==只能在普通函数/工厂模式内使用

### 对象属性/方法的判断技巧

- VcCode 编辑器里面有提示  ==蓝色图标即属性 紫色图标即方法==

  

## Date对象

简介：内置日期对象  使用方法如下

创建日期对象

- let now = new Date(); 不带参数 创建一个表示当前日期和时间的 `Date` 对象

### 日期的访问

```js
let now = new Date();
let year = now.getFullYear();// 获取到年
let month = now.getMonth() + 1; // 月从0-11 加1 即补位
let day = now.getDate(); // 获取当月第X天
let hour = now.getHours(); // 获取小时
let min = now.getMinutes(); // 获取分钟
let sec = min < 10 ? '0' + min:min;//为min补0(指小于10就补0)
let miao = now.getSeconds();
console.log(`${year}-${month}-${day} ${hour}:${sec} ${miao}`);//2021-6-5 23:29
now.getTime();//返回时间戳 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数
now.getDay(); // 返回一周中的第X天 0-6 
----------------创建指定日期的对象
let time = new Date('2021-06-05 17:17');
```

### 日期的创建

```js
setFullYear(year, [month], [date]) // set设置 get获取
```

### 时间戳

```js
let sum = Date.now();// 创建时间戳 指:计算机元年1970-01-01 08:00:00 +0800 至今的毫秒数
console.log(sum);
------------时间戳转换为当前时间
let timel = new Date(1622907350998);//转换为当前系统时间
后端设置的时间一般是时间戳 前端拿到数据需要转换成当前时间
```











