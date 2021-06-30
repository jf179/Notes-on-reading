# JS高级进阶😁

注释：面向对象的特性：封装性 继承性 多态性

## class创建对象(重点)

- 通过class创建类，类名还是首字母大写，类里面的 constructor 构造函数，可以接收传递的参数，同时返回给实例对象，注意：==构造函数不需要加function==
- constructor函数 只要new 生成实例时，就会自动调用这个函数，如果省略不写 类会自动生成这个函数

```js
class Prosy { //class 类创建对象
    constructor(uname,age){ // constructor 构造函数接收参数
        this.uname = uname;
        this.age = age;
        //此处还可以调用自身方法进行事件注册和逻辑函数，记得使用this
    }
    say(song){ //类添加方法 加入形参
        console.log(this.uname + ':' +song);
    }
}
let ldh = new Prosy('刘德华',18); // new生成实例化对象
let zxy = new Prosy('张学友',17);
ldh.say('冰雨'); //   调用方法 输出： 刘德华:冰雨
zxy.say('李香兰'); // 调用方法 输出： 学友:李香兰
```

### 类的继承and扩展

注释：继承的特性-实例化子类输出一个方法/函数，1-先看子类(即自身)-2-自身没有再往上找父类

```js
class Prosy { //创建类
    constructor(x,y){ // 构造函数
        this.x = x;
        this.y = y;
    }
    money(){ // 添加方法
        console.log(this.x + this.y);
    }
}
class Son extends Prosy{ // 创建子类 并继承父类的属性方法
    constructor(x,y){ //son的实例化传入参数-形参接收后再传给super-super再传给父类
        super(x,y); //使用super就能继承父类的计算方法 此处不能用this因为作用域不同
    }
}
let son = new Son(1,2); // 实例化子类
son.money();// 3 四类的super传递给父类计算方法后子类son进行调用方法即可实现继承计算方法
```

```js
子类扩展// 即子类拥有自己的方法且又能继承父类的方法
class Prosy { //创建类
    constructor(x,y){ // 构造函数
        this.x = x;
        this.y = y;
    }
    money(){ // 添加方法
        console.log(this.x + this.y);
    }
}
class Son extends Prosy{ // 创建子类 并继承父类的属性方法
    constructor(x,y){ //son的实例化传入参数-形参接收后再传给super-super再传给父类
      super(x,y) // super关键字调用父类方法继承必须在子类方法之前 否则无效
      this.x = x; // 此处使用this就是指向自身与super(x,y)共用了参数但是计算方法是各自区分的
      this.y = y;
    }
    subty(){
        console.log(this.x - this.y)
    }
}
let son = new Son(5,2); // 实例化子类
son.money();// 7 四类的super传递给父类计算方法后子类son进行调用方法即可实现继承计算方法
son.subty(); //3
```





### super关键字

注释：super用于访问和调用对象父类上的函数。可以调用父类的构造函数，也可以调用父类的普通函数，

```js
class Father {
    say(){
        return '我是你大爷呢';
    }
}
class Son extends Father{
    say(){
        // console.log('我不是大爷)； 如果没有使用下面的超类 实例化调用的就是子类本身
        super.say(); //使用super超类继承父类的普通函数
    }
}
```



## 构造函数和原型

### 构造函数

注释：ES6之前是通过构造函数和原型来实现calss类的,构造函数中可以添加一些成员

- 静态成员：在构造函数本身添加的成员称为静态成员 ==只能由构造函数本身来访问==

- 实例成员：在构造函数内部创建的对象称为实例成员,==只能由实例化对象来访问==

  ```js
  function Star(uname,age){
      this.uname = uname; //uname 和 age 就是实例成员,
      this.age = age;
      this.say = function(){
          console.log('唱歌');
      }
  }
  let sum = new Star('刘德华',18) //只有通过实例化对象sum才能访问实例化成员unamehe age
  Star.sex = '男'; // 通过构造函数创建的成员就只能由构造函数Star来访问
  ```

### 原型prototype

注释：构造函数存在性能浪费的问题,那怎么解决呢😂，这里就提到了原型prototype,

- 每一个构造函数都有一个prototype属性(它指向另一个对象 即自身身的 __ proto __)。==这个对象的所有属性和方法，都会被构造函数所拥有==

- 原理：将一些不变的公用方法添加到原型上 这样多个实例对象就能共享 原型上的方法

- 注意：公共属性还是定义到构造函数里面，公用方法才定义到原型上

  ```js
  function Star(uname,age){ //构造函数
      this,uname = uname; //实例对象成员,
      this.age = age;//实例对象成员,
  }
  Star.prototype.say = function(){ // 将方法抽离出来添加到原型上 让所有实例进行共享
          console.log('唱歌');
  }
  let ldh = new Star('刘德华',18);//实例化将能访问原型上的方法
  let zxy = new Star('张学友',17);
  ldh.say(); // 
  zxy.say();
  ldh == zxy// false 
  ldh.say() == zxy.say() // true
  ```

### 对象原型

- 对象都会有一个属性 ==__ proto __== 它指向构造函数的prototype 原型对象，别搞混😂：对象的原型proto指向构造函数的原型对象 prototype；称为原型链 实例对象先从自身 --poto --上看有无say方法，没有继续往上找prototype  如果prototype也没有就指向prototype的-- proto--最后没有就返回null
-  -- proto -- 对象的原型与 原型对象prototype 是等价的，-- proto -- 对象原型的意义在于为对象的查找机制提供了一条路线，实际开发中不可以使用这个属性，它只是内部指向原型对象prototype

### constructor构造函数(重点)

- 对象原型（ ____proto____) 和构造函数 ( prototype )的原型对象，里面都有一个constructor属性，constructor称为构造函数，指回构造函数本身，(主要就是用来记录该对象引用于那个构造函数,也就是说让原型对象prototype重新指向原来的构造函数)

- 某些时候(指原型对象添加的公用方法过多时采用了对象的写法，此时就需要使用（constructor)进行重新指向

  ```js
  function Star(uname,age){ //构造函数
      this,uname = uname; //实例对象成员,
      this.age = age;//实例对象成员,
  }  
  Star.prototype = { // 方法太多我们将方法集合到了一个对象里面再将它赋值给Star，此时问题就会出现prototype里的constructor无法确定其引用对象了，因为对县级河相当于重新赋值覆盖
      constructor: Star, // 解决:手动添加constructor使其指向构造函数Star
      sing:function(){
             console.log('唱歌');
      },
      movie:function(){
             console.log('演戏');
      }
  }
  let ldh = new Star('刘德华',18);//实例化将能访问原型上的方法
  let zxy = new Star('张学友',17);
  ```

### ==构造函数、实例、原型的关系==

- 1：已上图为例：构造函数Star拥有其原型对象 prototype 即Star.prototype
- 2：Star.prototype 的 constructor 又指回其构造函数 也就是 Star.prototype.constructor
- 3:构造函数内部另外也创建了实例对象 new.Star(); 即构造函数指向其实例化对象，
- 4:实例化对象 new.Star(); 的__ proto __; 又指向构造函数的原型对象 即 Star.prototype；且实例化对象内部也有个 constructor 构造函数 它通过Star.prototype也指回了构造函数 Star内部的实例成员

总结：三者就是三角形或者说三角恋关系。Star.prototype 也有原型 即Star.prototype.__ proto __

它们内部也都有constructor 指向Objiect构造函数最后指向null



### JS成员查找机制

- 当访问一个对象的属性和方法时，首先查找对象自身有无该属性
- 如果没有就通过自身的__ proto __ 指向构造函数的原型对象prototype
- 如果还没有就继续查找prototype.__ proto __ 的Object原型一次类推直至找到Object为null止
- 原型链的好处就是本身没有的属性方法可以通过依次查找原型使用，如：ldh本身没有toStorng方法，照样可以使用 因为它的的上一级原型有这个方法

### 原型this的指向

- 原型对象里面的this和构造函数的this都是指向实例对象/调用者



## 扩展内置对象

注释：通过原型对象对原来的内置对象进行扩展 自定义的方法，比如给数组增加自定义求偶数功能

```js
Array.prototype.sum = function(){ // 向数组对象添加自定义求和方法
    let sum = 0;
    for(let i = =; i < this.length; i++){ //this指向实例对象 即sum的调用者arr
        sum += this[i];
    }  
}
let arr = [1,2,3];// 实例对象
 arr.sum(); // 调用方法
```

### call 继承

注释：可以调用函数，可以改变this指向

```js
function fn(){
    console.log('刘德华'); //指向的是windw
}
let sum = {
    name:'andy',
};
fn.call(sum); //使fn指向了sum 即sum继承了fn函数属性
```

### 借用构造函数继承父类属性

```js
funciton Fatch(uname,age){ //父构造函数
    this.uname = uname;
    this.age = age;
}
function Son(uname,age,score){ // 子构造函数
    Fatch.call(this，uname,age) // 重点：使用call改变父类构造函数this的指向，实现属性继承
    this.score = score; // 这个是子类自己添加的属性 uname和age是继承父类的属性
}
let son = new('刘德华',18,100)
```



### 借用构造函数继承父类方法

```js
funciton Fatch(uname,age){ //父构造函数
    this.uname = uname;
    this.age = age;
}
Fatch.prototype.money = function(){ //父类的方法
    console.log(1000);
}
 // 创建了一个独立的父类实例对象 将其赋值给子类Son，实现了方法的继承
Son.prototype = new Fatch(); // 缺点：父类的原型创建的实例对象覆盖了子类的原型
Son.prototype.constructor = Son;// 解决办法：用constructor让子类Son指回原来的原型对象
function Son(uname,age,score){ // 子构造函数
    Fatch.call(this，uname,age) // 重点：使用call改变父类构造函数this的指向，实现属性继承
    this.score = score; // 这个是子类自己添加的属性 uname和age是继承父类的属性
}

```



# ES6新增方法

## 数组方法1

新增：forEach(), map(), filter(), some(), every();

```js
forEach() // 作用：迭代(遍历)数组  //第三个参数array可以省略，只能迭代数组全部元素传递给回调函数
语法;array.forEach(function(currentValue,index,array))// 每次迭代后的当前值-索引号-数组本身
let arr= [1,2,3];
let sum = 0;
arr.forEach(function(value,index,array){ // index，array不需要可以不写，value可以改名item
    sum = sum + value; // 6；相当于for循环的i每次循环得到的值，
}) // value代表每次遍历拿到的值依次是1-2-3；index依次拿到的索引号0-1-2，array代表每次遍历道德数组本身 123
-------箭头函数
let sum = [10, 21, 20, 55,];
   sum.forEach((item, index) => { /参数是当前值，索引和数组本身。名字可以自己定义，
   console.log(item, index); // 10:0， 21:1， 20:2， 55:3，
 })
--------fliter();// 返回一个新的数组，新数组的元素是通过检查(筛选)指定数组中符合条件的所有元素
let arr= [1,2,3,4,5];
let sum = att.filter(function(value,index){ //返回的是新数组需要用变量sum接收处理
    return value >= 3; //将大于3的元素筛选出来返回新数组sum
    return value % 2 === 0; // 将数组中的偶数赛选出来
}) // sum = 3,4,5
---------some() //用于检索并判断数组中元素是否满足指定条件 即：查找 返回true或 false
let arr= [1,2,3,4,5,'pink'];
let flags = arr.some(function(value){
    return value = 'pink'; //true 找到第一个满足条件的元素循环就会结束退出
})
------map() //方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
let arr = [10,20,30,40,50];
let sum = arr.map((item,index) =>{ 
    console.log(item,index) //可以进行函数处理，return什么 就根据条件返回处理后的结果
})
```

## 数组方法2

- findIndex(item,index,arr) ：返回传入一个测试条件（函数），符合条件的数组第一个元素位置，为false时返回 -1，注意：当前元素必须，index，arr可选

  

## 数组降维

注释：什么是二维数组：数组的元素中又包含一个数组元素 如：let sum = [10,20,[1,2,3],30];

   需要进行直接操作的数据建议用forEach  因为它没有返回值 只是迭代和处理结果，可以使用return

```js
let arr = [10, 20, 30, [10, 1, 2, 3], 50] //将二维数组降维为以为数组
  let arrNew = [];
  arr.forEach((v) => {//对原数组进行迭代forEach不返回值，就是会改变原数组，
      // 对数组进行判断 是数组就用电语法进行展开 点语法的作用是可以将数组对象转换为真数组
      if (Array.isArray(v)) {
          arrNew.push(...v)
      } else {
          arrNew.push(v)
      }
  })
  console.log(arrNew)
```



## 数组升维

注释：有点难 插件有方法 待研究





##数组检测(重要)

- Array.isArray(arr);   检测是否是数组，返回true或false
- item instanceof Object:检测是否对象





## 字符串方法

```js
trim(); // 去除内容两侧的空格键 返回的是去除空格后的新字符串 不改变原字符串
input.value.trim();  // 常用于input输入框 可以将去除空格后的value赋值给需要的元素
```

## 对象方法

```js
Object.keys(obj); //用于获取对象自身所有的属性 类似于for...in, 返回一个由属性名组成的数组
let Objj = {
    id:1,
    pname:'小米',
    price:1999,
}; // 还可以进行属性修改和新增属性 与常规操作一样
let arr = Object.keys(Objj); // ['id','pname','price'] 拿到属性名 以数组形式返回
arr.forEach(function(value){ //  将返回的数组变量arr再进行遍历加工 获取到属性值
    console.log(value); // 1，小米， 1999
}) // keys与for..in区别，for...in不返回数组 接收还得先声明一个空数组进行接收赋值
----------Object.defineProperty(obj,prop,descriptor)
Object.defineProperty(objj,'price',{ // obkk是要修改的对象 price是对象要修改的属性
    value:1000; // 属性修改为1000.
}) // 其他还可以限定id属性是否可写(指更改) writable 默认false不可更改，
 //enumerable该属性是否可枚举遍历，false为不可遍历(不可遍历获取该属性)
---------
```



# 函数进阶

函数的调用

- 对象方法调用：对象名.方法名。即可调用对象内定义的方法函数

- 构造函数：new 函数名();
- 绑定事件函数： btn.onclick = function(){}; 点击按钮即调用函数
- 定时器函数：setTimeout(functin(){},1000);1秒后调用该函数执行
- 立即执行函数：(function(){},()); (function(){})(); 自调用函数

## this问题 (重点)

- 普通函数调用：this指向window

- 构造函数调用：this指向实例对象，原型对象里面的方法也指向实例对象

- 对象方法调用：this指向该方法所属对象  

- 定时器函数 ： this指向window

- 立即执行函数：this指向window

- 事件绑定方法：this指向绑定事件对象

  

## 改变this指向问题

注释：JS提供了三种改变函数内部this指向的 方法 call(); apply(); bind();==(bind比较常用)==

```js
let o = {
    name:'andy'//在call()方法改变指向后 o对象就拥有了自身属性跟 fn函数的计算属性
}
function fn(a，b){
    console.log(this); // 指向的是window,使用call后指向 o 对象
    console.log(a + b) // 3
}
// call()方法接收的是若干个参数的列表，可以改变函数fn的指向 使其指向o对象，call会调用函数
fn.call(o,1,2);// o 后面还可以用逗号隔开跟上实参 函数括号内用形参接收即可

---------apply(); //调用一个函数  接收的是多个参数的数组，改变this指向返回值就是函数的返回值
fn.apply(o,[1,2]);//3，改变this指向 o 传递的参数只能是伪数组形式 还可以利用它进行运算 如下
let arr = [1,2,8,9,15] //利用Math方法配合apply求最大值
let max = Math.max.apply(Math,arr) // 最大值15

---------bind() //不调用函数 但是能改变this的指向，返回的是一个新的函数拷贝 需接收处理
let sum = fn.bind(o); //绑定o对象 改变fn函数的指向 ，也可以传递参数逗号隔开即可
sum();//接收后还得调用接收的变量(即函数的拷贝)
bind的应用优点：以上两个方法都是调用时就执行，而bind可以指定执行时间
let btn = document.querySelector('button');
btn.onclick = function(){
    this.diasbled = true;// 按钮默认点击后就禁用
    setTimeout(function(){
        this.disabled = false; //如果不绑定bind指向window，window没有disabled属性 不生效果
    }.bind(this),3000) //办法：给定时器绑定bind方法改变this指向btn3秒后恢复btn按钮可用
} 优点：bind绑定的this实在函数外部且处在btn事件函数内部因此就实现了this指向了btn
// bind还可以套循环给循环的每个按钮都设置以上效果 new操作符无法调用bind绑定函数
```

总结：call经常用于做继承功能，apply经常用于数组相关 比如借助数学对象求数组最大值，==bind不调用函数，但是想改变this指向，比如定时器内部的this指向==



## 高阶函数

注释：高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值return输出

- function fn(){return function(){}}; fn();这就是高阶函数
- 函数也是一种数据类型，同样可以作为参数传递给另外一个参数使用，最典型的就是作为回调函数

```js
function fn(a,b,callback){ // 形参除了接收数值1，2，还接收了一个函数作为参数
    console.log(a + b);
    callback && callback(); //等上面打印完毕就回调函数执行
}
fn(1,2, function(){
    console.log('我是最后调用的')
}); // 实参1,2，加一个函数作为实参
```



## 闭包

注释：变量根据作用域的不同分为局部变量和全局变量，闭包就是指一个函数可以访问另一个函数作用域中的变量

- ==函数内部的函数可以访问外部函数的变量 = 产生闭包/外部函数访问内部的函数也产生闭包==
- 函数外部不可以使用函数内部的(局部)变量
- 函数执行完毕，局部作用域内的局部变量会被系统销毁 以释放内存
- 闭包的作用就是延伸了变量的作用范围(和生命周期)等所有函数都执行完毕才销毁里面的变量
- 闭包函数查找的规则是:在其定义的位置往上查找所需变量。而不是在它执行(闭包调用)的地方往上找

```js
//函数内部访问另外一个函数 闭包
function fn(){
    let num = 10;
    function fun(){
        console.log(num);
    } fun();//调用fn函数后，可以让fun使用fn函数内的num 即闭包
}
fn(); 
----------函数外部访问函数内部的另一个函数  闭包
function fn(){ // fn就是闭包函数
    let num = 10;
    function fun(){ //retrun也可以直接卸载function前面，简洁
        console.log(num);
    }
    return fun;//在fn函数作用域内return回fum给fn
}
let f = fn(); //调用fn,相当吧fun返回给fn，此时用变量进行接收即可访问fun
f();//调用f，f已被赋值它就是函数，即实现了在全局作用访问了函数内部的局部作用域
```

## 闭包的面试题

注释：利用闭包的方式得到当前的li的索引号

```js
<ul class="nav">
    <li>第一个</li>
    <li>第二个</li>
    <li>第三个</li>
</ul>
<script> //利用闭包的方式得到当前li的索引号
    let lis = document.querySelector('.nav').querySelectorAll('li');
    for (let i = 0; i < lis.length; i++) {
        (function (i) { //函数接收i
            console.log(i); //进行处理输出i
        })(i);//自调用函数传入参数i，每次循环都是当前循环出来的的i 即索引号
    }
</script>
-------- // 闭包计算打车价格
// 起步13元 3公里内，13，之后没多盈利加5元 如果拥堵总价格加10元
let car = (function () {
    let start = 13; // 起步价
    let total = 0; // 总价
    return { // 将对象里面的方法return返回给car
        price: function (n) {
            if (n <= 3) { //如果公里数小于3
                total = start; // 就收起步价13元
            } else {
        total = start + (n - 3) * 5; // 否则就总公里数减去起步的3公里 再乘以5元1公里，再加上起步价就是总价, }
return total; //return返回给price
 },
 yd: function (flag) { 
    return flag ? total + 10 : total; // 三元表达判断是否拥堵
   }
 }
})();
console.log(car.price(5)); // 调用car的price方法,假使用户输入的是5公里
console.log(car.yd(true)); // 默认拥堵
```

总结：==闭包就是函数中的函数，就是说一个函数要访问另外一个目标函数内部的变量，就要在目标函数中再定义一个函数（以此来把作用域链往下延长一段，目的就是为了利用js在找自由变量时,会沿着作用域链一级一级往上找的特点），并将这个定义的函数return出来，供外部使用。在实际开发中，闭包主要是用来封装变量，收敛权限。==



## 递归

注释：如果一个函数在内部可以调用其本身，那么这个函数就是递归函数

```js
let num = 1;
function fn(){
    console.log('打印5句话');
    if(num == 6){
        return; // 递归函数内部调用自身必须加return 否则就死循环
    }
    num++; // 如果num还没等于6 就 递 + 到了6再退出
    fn(); // 内部也调用自身 产生了递归，缺点任意发生栈内存溢出因为形成了死循环
}
fn(); // 外部正常调用函数fn

```

总结：num值默认1；函数fn调用后执行内部代码 首先输出console.log('打印5句话');往下进行到if判断那么1小于6 条件不满足不执行return，继续往下num的值+1，即本轮num = 2; 继续往下执行遇到fn()调用自身-此时继续打印console.log('打印5句话');流程按照上面的重复进行 直到num = 6,条件满足 return退出不再往下执行调用自身，==循环的产生是内部的fn一直在调用自身，所以必须设置一个条件进行return退出==

### 利用递归求数学题 阶乘

```js
// 求1*2*3...n 阶乘
function fn(n) {
   if (n === 1) { // 判断n = 1时才退出
       return 1;
    }
   return n * fn(n - 1); // 每次递减1 ，1不运算，因此每次递减到最后的值都是2，所有的递减的值每次都会存着 4,3,2，等递减完毕进行相乘，相乘的结果再去与参数5相乘 return结果
    }
console.log(fn(5)); // 120 这个递归阶乘没整明白，先套着用就行 
// 相乘的底数是 2，不包括1 因为1乘1还是1，但是 递减后相加的底数就包括1
----使用递归 求和 1 到 n 的和与上面相同 *称号改成+号就行
```

### 递归实现菲波拉契数

```js
斐波拉契数 1、1、2、3、5、8、13、21、34、55...
function fn4(n) {
    if (n == 1 || n == 2) { // 1和2不需要运算 斐波拉契数前两项就是1和2
        return 1;
    }
  // 获取 前一项 和 前前一项 (即每次获取前2项) 进行相加就是 第三个数的和
    return fn4(n - 1) + fn4(n - 2); 
    }
var result = fn4(20);
console.log(result);
// 斐波那契数列
        封装好了 函数fn
        十分耗费性能  因为函数成 指数倍 增长 每一个新的函数 都需要耗费 系统的资源
        每一次化简 都需要化到 最底部 1,2 才能够求和
----解决性能办法如下(利用闭包特性吧运算结果存进数组，避免重复计算)
var fibonacci = function () {
    let memo = [0, 1];
    let fib = function (n) {
        if (memo[n] == undefined) {
            memo[n] = fib(n - 2) + fib(n - 1)
        }
        return memo[n]
    }
    return fib;
   }()
console.log(fibonacci(8));

-----利用普通for循环实现 (速度快)
function fibonacci(n) {
    var n1 = 1, n2 = 1, sum;
    for (let i = 2; i < n; i++) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}
fibonacci(30)
```



### 递归求id返回对应数据对象

```js
利用递归 求id返回对应的数据对象
var data = [{
    id: 1,
    name: '家电',
    goods: [{
        id: 11,
        gname: '冰箱',
        goods: [{
            id: 111,
            gname: '海尔'
        }, {
            id: 112,
            gname: '美的'
        },]
    }, {
        id: 12,
        gname: '洗衣机'
    }]
  }, {
      id: 2,
      name: '服饰'
    }];
  // 我们想要做输入id号,就可以返回的数据对象
  // 1. 利用 forEach 去遍历里面的每一个对象
function getID(json, id) { // json形参接收的是data实参 指向data对象
   var o = {}; //用来保存筛选后的对象
   json.forEach(function (item) { // item代表数组对象的全部项 id1和id2，不包括理财嵌套
       if (item.id == id) { // 外层if就是递归的条件相当于return了，然后往下执行else
        o = item;
      // 2. 我们想要得里层的数据 11 12 可以利用递归函数
      // 里面应该有goods这个数组并且判断数组的长度不为 0 
    } else if (item.goods && item.goods.length > 0) {
      o = getID(item.goods, id);//递归调用自身,传入参数item内部的goods的id
    }
  });
  return o;//对筛选后的对象数据进行return返回给getID
   }
console.log(getID(data, 1));
console.log(getID(data, 2));
console.log(getID(data, 11));
console.log(getID(data, 12));
console.log(getID(data, 111));
```



## 深拷贝/浅拷贝

```js
let obj = {
    id:1,
    name:'andy',
    msg:{age:18},
    color:['pink','red']
};
let o = {};
for(let k in obj){ // k是属性名 obj[k] 是属性值
    o[k] = obj[k]; // 完成浅拷贝 拷贝的只是引用类型数据的地址
}
------ES6 //语法实现浅拷贝 (推荐)
Object.assign(o,obj) //assign指派的意思，参数0代表接收拷贝的对象，obj就是被拷贝的对象
// 也可以用于合并多个对象 返回一个新的对象😁

---------深拷贝 //封装函数实现 深拷贝的修改不会影响原对象属性
function deepCopy(newobj,oldobj){ //接收参数 o和obj
    for(let k in oldobj){ // 等同遍历obj
     let item = oldobj[k] //获取属性值
   // 判断属性值是否数组/对象，或者还是简单数据类型
     if(item instanceof Array){ //如果属性值检测是数组
         newobj[k] = []; // 等于空数组 数组需要放在对象之前判断 因为数组也是对象
         deepCopy(newobj[k],item) // 递归调用自身,将item拷贝给newobj即o
     }else if(item instanceof Object) { //如果是对象类型
          newobj[k] = {}; // 等于空对象
          deepCopy(newobj[k],item) // 递归调用自身,将item拷贝给newobj即o
          // 不进行递归调用自身无法实现嵌套内层只能深拷贝外层
     } else{
         newobj[k] = item; // 简单数据类型直接赋值拷贝
     }
  }
}
deepCopy(o,obj)//传参 接收深拷贝的o和被拷贝的obj
console.log(o);

----------深拷贝
 const oldObj = {
  name: '大哥',
  age: 20,
  colore: ['hello', 'word', 'God'],
  ferdd: { name: '大哥中的name' }
 }

function deepclone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    let result;
    // 进行拷贝
    if(obj instanceof Array){
        result = []; //设置空数组
    }else{
        result = {}; //设置空对象
    }
  for(let key in obj){ 
      if(obj.hasOwnProperty(key)){ // 判断是否是自身的属性 而不是原型上的
      result[key] = deepClone(obj[key]) //递归调用自身赋值才能实现嵌套深拷贝
       }
    }
    return result;
 }
 let sum = deepclone(oldObj);
 sum.name = '小弟'
 console.log(sum);
```



## JSO深拷贝

注释：这个方法有缺陷 不会拷贝未定义和函数

```js
var obj2 = JSON.parse(JSON.stringify(obj1))
```





# 对象的浅拷贝与合并

注释：我们经常会合并对象，利用Object.assign性质我们也可以实现对象的拷贝

```js
----浅拷贝
var obj1 = {a: 1, b: 2}
// 利用了空数组 拷贝obj1。注意第一个参数必须是一个空对象
var obj2 = Object.assign({}, obj1)
 
obj2.a = 4 // 修改了obj2的a属性值
console.log(obj1, obj2) // obj：a:1, b:2; obj2: a:4,b:2

------多个对象的合并
const target = { a: 1, b: 2 };
const source = { c: 4, d: 5 };
const returnedTarget = Object.assign(target, source);
console.log(returnedTarget);
缺点：如果对象中又相同的键名 后面的会覆盖前面 解决办法如下
var obj1 = { name: '张三' };
    var obj2 = { age: 18 };
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key) === true) { // 确保不是 obj2 的原型属性
            obj1[key] = obj2[key];
        }
    }
    console.log(obj1);
```







# 正则表达式RegExp

注释：正则表达式是用于匹配字符串组合的模式，正则表达式也是对象，

- 用于表单验证和过滤关键字(替换)及特点部分内容的提取

  

## RegExp对象创建正则表达式

- let regexp = new RegExp(/123/); 

- let fg = /123/;       字面量创建  ==(推荐)==  注意：斜杠内部不需要加引号

  

## 测试表达式test

注释：test(); 正则对象的方法，检测字符串是否符合规则， 返回true或false,参数为 需测试的字符串



## 元字符

- 边界符： ^ 尖括号表示匹配行首的文本(以谁开始)，   $ 符号表示匹配行尾的文本(以谁结束)

```js
let rg = /123/;
console.log(rg.test(1234)); // true 检测到包含数值型，加引号就是字符串也为true
------------ ^ 号
let rg = /^123/;
console.log(rg.test('323'));// false 未检测到123开头的数字
console.log(rg.test('123567'));// true 检测到以123开头的数字
---------- $ 符号
let rg = /123$/;
console.log(rg.test('323123'));// true 检测到以123结尾的数字
--------- 
let rg = /^123$/; 只允许以123开头同时结尾也为123 这三个值
console.log(rg.test('123123')); // false 未检测到123开头和结尾
console.log(rg.test('123')); // true 检测到123开头和结尾
```



## 字符类

- /[]/; 括号表示包含括号内任意1个即可，   /^[]$/;  表示多选1 即符合规则 超过1个就不符合   
- /^[a-z]$/; 表示多选1 在a-z 26个字母之间，注意：==区分大小写==  /^[a-zA-Z]$/ a-z/A-Z任意单个出现
- /^[a-zA-Z0-9_ -]$/;  字符组合 a-z/A-Z/0-9/ _- 下划线单杠都可以  任意单个出现  即符合规则true
- /^[ ^a-zA-Z0-9_ -]$/; ==[]号里面带^号表示取反  不能有包含里面的任意字符==

```js
let rg = /[abc]/; // abc包含任意一个即符合规则
console.log(rg.test('cgv')); // true 检测到包含c

------ /^[]$/
let rg = /^[abc]$/; // abc必须且只能出现单一1个，即符合规则
console.log(rg.test('c')); // true 检测到单个C
console.log(rg.test('bc')); // false 检测到还包含了b 

-------- /^[a-z]$/
let rg = /^[a-z]$/; // 包含a-z 26个英文字母中任意一个小写(只能是单个出现) 即符合规则
console.log(rg.test('A')); // false 检测到包含大写的A 
console.log(rg.test('ab')); // false 检测到包含a和b 

------ /^[a-zA-Z]$/;
let rg = /^[a-zA-Z]$/; // 包含a-z或A-Z 26个英文字母中任意一个(只能是单个出现)包含大小写
console.log(rg.test('A'));// true 检测到大写A
console.log(rg.test('aA')); // false 只能出现单个字符 这里出现了2个所以false

-------/^[ ^a-zA-Z0-9_ -]$/; // 取反
let rg = /^[^a-zA-Z0-9_ -]$/;
onsole.log(rg.test('asggfh25*')) //false 检测到了包含有规则内的仙丹字符
console.log(rg.test('>')) // true > 大于号未包含在仙丹字符内 为true
console.log(rg.test('>*')) //false 虽然两个字符都未包含在限定字符内，但是只能单个出现
```



## 量字符

简述：用来设定某个模式出现的次数

- *星号： 重复0次或多次；      + 号 ： 重复1次或多次
- ？号： 重复0次或1次；        {n} :  重复n次
- {n,}：重复n次或更多次；      {n,m}:重复n-m次
- /^[a-zA-Z0-9_-]{6,16}$/; 限定规则内的任意字符或组合，允许出现大于等于6及小于等于16次(位)==重点==
- /^abc{3}$/;  允许abc中的的c出现3次，ab不行
-  /^(abc){3}$/;  // 允许abc都出现3次

```js
let rg = /^a*$/; // 允许a出现0次或多次
console.log('aaaaaa'); // true 允许a出现0次或多次，0次即空也为true
-----
let rg = /^a+$/; //  允许出现1次或多次，不允许出现0次(即不允许为空)
---
let rg = /^a？$/;// 允许出现 0次或1次，才为true
-----
let rg = /^a{3}$/; // 允许a出现3次
let rg = /^a{3,}$/;  // 允许a出现的次数为 大于或等于3，也就是不低于3次
let rg = /^a{3,16}$/; //允许a 出现大于3次且 小于16次
------
let rg = /^abc{3}$/;  // 允许abc中的的c出现3次，ab不行
-----
let rg = /^(abc){3}$/;  // 允许abc都出现3次
-----------
let rg = /^[a-zA-Z0-9_-]{6,16}$/; 
console.log(rg.test('aaaaabb25651As')); // true 限定条件内任意字符或组合 大于6次小于16次
```



## 表单验证案例

```js
<input type="text" class="uname"> <span>输入用户名</span>
<script>
let reg = /^[a-zA-Z0-9_-]{6,16}$/; // 设定验证规则
let uname = document.querySelector('.uname');
uname.onblur = function () { //绑定失去焦点事件
  if (reg.test(this.value === true)) { //表单失去焦点后进行验证,this指向表单事件
    span.className = 'right';// css定义好的类名设置绿色样式，正确就添加类名实现换色
    span.innerHTML = '输入正确'; // 正确就让span的文本更换为正确提示
    console.log('正确');
  } else {
    console.log('错误');
  }
}
</script>
```

总结：小括号表示优先级，大括号表示限定出现次数， ^尖括号表示以谁开头 $表示以谁结尾，

## 手机号验证

- /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
- 以上1：表示以0 或86或17951开头，且只允许出现0或1次，
- 以上2：13、15/17/18/14 后面允许出现0-9任意单个数字
- 以上3：最后优先级最低的[0-9]{8}; 即0-9之间的数字 允许出现8次

## 网址验证

- /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i

## 邮箱验证

- /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/



## 正则中的替换与参数

- 正则表达式的参数 /表达式/[switch]；switch可选参数如下
- g:全局匹配； i 忽略大小写；  gi：全局匹配+忽略大小写
- 可用于敏感词替换

```js
let str = 'andy和red';
let sum = str.replace('andy', 'baby');//使用baby替换andy 返回新的字符串 不改变原字符串
console.log(sum);
------
<textarea name="" id="messg"></textarea> <button>提交</button>
<div></div>
<script>
  let text = document.querySelector('textarea');
  let btn = document.querySelector('button');
  let div = document.querySelector('div');
  btn.onclick = function () { // 过滤激情或者gay
  div.innerHTML = text.value.replace(/激情|gay/g, '**'); // *号替换敏感词，返回新的字符赋值给div,注意：/表达式/g；加G全局匹配否则只能过滤第一次出现的符合条件的字符
 }
</script>
```



# ES6

注释：

## 解构赋值

注释：数组解构允许我们按照--对应的关系从数组中提取值 然后将值赋值给变量，注意：==基本数值解构赋值是深拷贝，引用类型数据赋值是浅拷贝==

```js
传统方法操作数组值
let ary = [1,2,'刘德华'];
ary[0]; // 0:1;
ary[1]; // 1:2;
ary[2]; // 2:刘德华
----- ES6 解构赋值
let ary = [1,2,'刘德华']; 
let [a,b,c=5,d] = ary; // a:1;b:2;c:刘德华;d:undefined，c=5无效元素值还是刘德华，
//如果是下面这种情况，那么 C = 张国荣，因为这是直接赋值跟ary数组没有关系了，
let [a, b, c=5, d] = [1, 2, '张国荣'];
注意：解构中如果接收元素多于数组内的元素，则是添加了元素 值为undefined
----------解构赋值的变量交换
let sum = 1;
let sun = 3;
[sum,sun] = [sun,sum]; // 输出sum:3; sun:1
```



## 解构赋值的常见用法

```js
-------字符串用法
var [a,b,c,d,e] = "hello";//a:h, b:e, c:l, d:l, e:o,
-----函数方发
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
-----对象方法
```



## 对象解构赋值

```js
let person = {name:'刘德华',age:18,sex:'男'};
let {name,age,sex} = person; // 解构并赋值
```



## 箭头函数

简述:箭头函数内如果只有一句代码 且执行结果就是返回值,可以省略大括号，如果形参只有1个小括号也可以省

- 箭头函数没有绑定this关键字，箭头函数的this，指向的是函数定义位置的上下文环境
- ==对象不会产生作用域== 对象内部的this指向的是window，如果没有绑定上下文的话

```js
let fn = () => { // 等同let fn = function(){};小括号一样可以放参数
     console.log(123)
}
fn();
---------
let fn = (num1 num2) => num1 + num2;  fn(1,2) // 3 只有一句代码且执行的结果就是返回值大括号可以省略

```



## 剩余参数

注释：在传统函数里面如果想取到所有实参可以使用arguments()，但是箭头函数无法使用arguments,如下

```js
let sum = (...args) => { // 使用ES6的展开语法展开符 即可接收到所有的实参
    let total = 0;
    args.forEach(item => {
        total += item;
    })
    return total
};
let arr = sum(10, 20);// 30 调用函数传入实参 并接收返回值 给变量arr
let ass = sum(10, 22, 33); // 65
```



## 剩余参数和解构赋值的配合

```js
let ary1 = ['张三', '王五', '李四'];
let [s1, ...s2] = ary1; //s1接收的索引0张三，剩余的通过...展开语法以全部分配给了s2，s2得到的是一个数组里面有王五和李四，如果只有s1只能得到张三，如果只有s1且加上了展开语法,那么s1就得到了全部元素
```



## Array的扩展运算符

注释：==拓展运算符将数组拆分成以逗号分割的参数序列==以后，再将参数序列放入console.log(...arr); 参数序列中的逗号会被当做方法的参数分隔符，所以输出后就是没有逗号分隔的，但是实际拆分它是有逗号分割的

```js
let ary1 = [1, 2, 3, 4, 5,'刘德华'];
    console.log(...ary1);
```

### 拓展运算符应用于数组合并

- 2种方法进行合并

```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let sum = [...arr1, ...arr2]; //123456 数组名之间逗号隔开，合并后赋值给sum
-----第二种
arr1.push(...arr2);//y同样实现了数组的合并，区别在于将arr2合并入arr1
```



### 拓展运算将伪数组转换成真数组

注释：注意css3新增的选择器 不会返回伪数组，只有基础选择器返回伪数组节点NodeList

```js
<div>1</div>
<div>2</div>
<div>3</div>
let ary1 = document.getElementsByTagName('div');
let sum = [...ary1]; // 
sum.push(function(){console.log('哈哈');});// 可以向数组添加方法和属性
```



### Array构造函数方法

注释：Array.form() 将类数组或可遍历的对象转换成真正的数组 ==重要==

```js
let arrLik = {
    '0': '1',
    '1': '2',
    '2': '3',
    'length': 3
  }
 let ary = Array.from(arrLik, (item) => { //需转换的数组，item代表伪数组的每一项元素遍历
    return item * 2;
  });
console.log(ary);
```



## 实例方法find (重要)

注释：用于找出第一个符合条件的数组成员，如果没有就返回undefuned，函数参数有2个:当前项的值和索引号

```js
let ary = [{
   id: 1,
   name: '张三'
 }, {
   id: 2,
   name: '李四'
 }];
 let target = ary.find((item) => { // 只查找值，索引index省略不写
   return item.id == 2; // 找出第一个复合推荐的成员后就不再继续查找
 })
 console.log(target);
```



## 实例方法findIndex()

注释：用于找出第一个符合条件的数组成员，没有就返回 -1；函数参数有2个:当前项的值和索引号

```js
let ary = [10, 20, 22, 50];
  let sum = ary.findIndex(item => {
    return item > 15;//索引1 即20,后面的22和50虽然也满足条件但是不会被调用函数查找
})
```



## Array扩展方法includes

注释：includes(); 表示某个数组是否包含给定的值，返货true或false

```js
let ary = [1, 2, 5, 3, 'hello'];
let result = ary.includes('hello'); // 查找字符需要加引号
console.log('hello') // true 
```



# 模板字符串

注释：使用 双斜号 ``即模板字符串，可用于解析变量、 标签、和元素、插值

```js
let name = '张三';
let sayHello = `hello,我的名字叫${name}`; // 不需要使用+号拼接字符 使用${变量}即可
console.log(sayHello); 
-----模板字符串调用函数
let fn = () =>{
  return '我是fn函数';
 }
let html = `我是模板字符串 ${fn()}`;
```



## String字符串方法

- 注释：startsWith(); 表示参数字符串 是否再源字符串的头部 返回true或false

  ```js
  let str = 'hello ECMA 2015';
  let sum = str.startsWith('h');
  ```

- endsWith();;  表示参数字符串 是否再源字符串的尾部 返回true或false

```js
let str = 'hello ECMA 2015';
let sum = str.endsWith('15'); // true 2015 15都算满足5结尾
```



## repeat()方法

注释：将原字符串重复n次，返回一个新字符串

```js
console.log('y'.repeat(5)); // yyyyy
```



# set数据结构

注释：类似数组；但成员的值都是唯一的，自动去除重复值，Set本身就是一个构造函数，用来生成Set数据结构

- Set函数可以接收一个数组作为参数，用来初始化，注意：Set数据返回的只是一个类数组，即:伪数组

```js
let s1 = new Set();
console.log(s1.size); // size表示集合中元素的数量
let s2 = new Set(['a','b',12,12]); // 会自动去除重复值 牛逼
console.log(s2); // a,b,12
--------将Set转换为数组
let ary = [...s2];
console.log(ary);
```



## Set数据的实例方法

注释：

- add(value);添加某个值，返回Set结构本身
- delete(value); 删除某个值,返回一个布尔值，表示删除成功
- has(value);  返回一个布尔值表示该值是否为Set的成员
- clear();   清除所有成员,没有返回值

```js
-----添加值
let s1 = new Set();
s1.add('a').add('b');
console.log(s1.size);
-----删除值
let bol1 = s1.delete('a'); // 删除了a 返回true表示删除成功， s1的位数变为1,
-----判断某个值是否是Set数据局结构中的值 
let r1 = s1.has('a'); // true 
-----清空Set数据解构中的值
s1.clear();// 清空数据 没有返回值
console.log(s1.size); // 上面已进行清空数据 此时位数为0
```



## Set的遍历 forEach

- Set结构的实例与数组一样， 也拥有forEach方法，么有返回值，还可以使用keys遍历

```js
let s1 = new Set([1,2,3,99,5]);
s1.forEach(value => { // value就是循环的每个元素值
  console.log(value);
})
```



# Map数据结构

注释：类似于对象，是键值对的集合，但是键的数值类不限于字符串，各类型的值包括对象都能当作键，Map也实现了 iterator 迭代器接口，所以可以使用扩展运算符和 for...of进行遍历,也可以进行数据类型转换

- size  : 返回Map的元素个数
- set   : 增加一个新元素，返回当前Map本身
- get   ：返回键名对象的键值，即获取
- has   : 检测Map中是否包含某个元素，返回true或false
- delete: 删除某个键值
- clear : 清空集合元素。 返回undefined

```js
let m = new Map();
 m.set('name', '尚硅谷'); //向类对象添加键值
 m.set('age', '18');//向类对象添加键值
 m.set('sayHeelo', () => { //向类对象添加函数方法
   console.log('我是方法');
 });
 let key = { // 用对象作为键  传统方法不能这样只能是字符
   school:'北京一套对象房'// 添加对象作为键
 }
 m.set(key,['上海','北京','张家界']);  // 添加数组作为key对象的键值
 let ary = [...m]; // 转换成了数组 不改变原对象
 console.log(m); // Map数据结构的类对象 
 console.log(ary);
------其他的用法与Set数据结构差不多
for(let v of m){}; 循环遍历
```

总结：Set是类数组集合(伪数组) 与 Map是类对象集合(不算真真的对象)，

​     Set和Map主要的应用场景在于**数组去重**和**数据存储** 

PS：map怎么转对象和json待研究😄



# 生成器函数

注释：Generator 生成器函数提供一种异步编程的解决方案，属纯回调函数，语法与传统函数不同，配合promise实现异步编程，主要用来给自定义对象增加可迭代性，作为了解即可暂时不用

- function * fn(){yield '表达式/字符量'; yield* fn2()}； 与普通函数不同的是 多个星号
- yield 与 yield* ；都只能在生成器函数内使用, yield*是用来遍历函数返回的可迭代对象，否则调用的函数不会执行，注意：匿名函数内部也不能使用yield语句；

```js
 function* showWords() { // 比普通函数多个 * 号
      yield 'one'; // 利用 yield语句 后面可以跟表达式
      yield 'two';
      return 'three';
    }

    var show = showWords();//调用函数返回迭代器对象(指show是可迭代的对象)
    // 调用生成器函数内部的next()方法 执行第一句yield语句，输出状态done(值是否可遍历显示ture或false)，以及语句后面的表达式的结果值，注意：值不调用不返回，
    show.next() // {done: false, value: "one"}
    show.next() // {done: false, value: "two"}
    show.next() // {done: true, value: "three"}
    show.next() // {done: true, value: undefined}
    ----------------------
      function* showWords() {
        yield 'one';
        yield showNumbers();// 调用 showNumbers函数，注意：它不会执行
        //yield showNumbers(); 解决：语句后面加一个* 星号让它自动遍历该函数的可迭代对象
        return 'three';
      }

    function* showNumbers() { // 函数调用后返回的是可迭代的对象
      yield 10 + 1;
      yield 12;
    }

    var show = showWords();
    show.next() // {done: false, value: "one"}
    show.next() // {done: false, value: showNumbers}
    show.next() // {done: true, value: "three"}
    show.next() // {done: true, value: undefined}
```



------



- 

































