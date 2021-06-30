# WebAPI

## 选择器

简介：用来获取DOM元素节点

-  DOM的入口点语法：document

- DOM节点都是类数组对象， 可迭代的(遍历)

- DOM不能通过childnodes[i]这样来访问操作

- DOM的遍历使用fo of 能获得键值对，而不应该用fo in

  ```js
  for (let li of document.querySelectorAll('li')) {
    ...
  }
  ```

  

### 基础选择器

- document.getElementById(id名)； 通过ID名获取 返回值：单个元素对象 或 null

  ```js
  let divBox = document.getElementById('box');
  // 因为id具有唯一性，所以此时获得的是一个满足条件的元素对象。getElement，不带s获得一个
  // id是元素的唯一标识，不能重复设置
  ```

- document.getElementsByTagName('标签名')； 返回值：元素对象集合（伪数组，数组元素是元素对象）

- ```js
  let divBox1 = document.getElementsByTagName('div')[0]; 
  // 所有div的集合，因为返回的是伪数组结构,所以想获得第几个div元素，可以通过数组的下标去获取。
  ```

- document.getElementsByClassName('类名')；根据类名返回元素值 快捷生成：dgc

  ```js
  let items1 = document.getElementsByClassName('items')[0]; //拿到的是所有items集合
  // 得到的是数组解构,如果想获得第几个items元素，那么可以通过数组的下标去获取。
  ```

总结：不带S的只返回一个元素  伪数组解构都可以通过下标[]访问

​     以上都是基础选择器 无需带符号直接根据元素选择



### css3新增元素选择器

简介：实际开发中常用一下2种方式 可以包含任意选择器或嵌套 与css用法一样，区别==c3的选择器获取的是元素返回的是纯元素标签，上面的基础选择器获取元素返回的是伪数组节点 NodeList==

- *querySelectorAll* ==(**重要**)==获得所有满足条件的元素，复数，得到的是数组结构， 选择器的使用与CSS一样，快捷生成：doq

  ```js
  document.querySelectorAll('ul > li:last-child'); // 选取所有ul下面的最后一个子节点li
  id前面需要加#   类需要加 .号 
  ```

- querySelector==重要== 根据指定的选择器 获得第一个满足条件的元素，单数， 选择器的使用与CSS一样，快捷生成：doa

  ```js
  querySelector('#nav') // id前面需要加#   类需要加 .号 
  ```

  总结：后面2个是css新增选择器 类需要加点号 id需要加#号，其他嵌套关系时跟css使用一样，获得元素只是会        的它的返回值 需要用变量进行接收处理(即获取后再进行赋值给变量) ==复杂选择就使用这2个，简单选择使用上面的三个==

### 点语法设置元素样式

- 注意点：凡是返回伪数组结构的选择器 设置样式时需要通过数组的方式去设置否则无效，如果想设置所有选中的元素就需要使用 遍历的方式设置  如下：

  ```js
  <div>这是一个寂寞的天</div>
  <div>这是一个寂寞的天</div>
  <div>这是一个寂寞的天</div>
  let sum = document.querySelectorAll('div'); // 返回的是一个元素集合 即伪数组
  console.log(sum);
    for(let i = 0;i < sum.length;i++) {
       if(i % 2 == 0){ // 判断偶数行变色
       sum[i].style.background = 'red';
       } 
   }
  ------------------------
  let sum = document.querySelectorAll('div:nth-child(odd/2)'); // 与css一样使用
      for(let i = 0;i < sum.length;i++) {
          sum[i].style.color = 'red';
      }
  ```

## 事件基础

简介：JS使我们有能力创建动态页面，而事件是可以被 JavaScript 侦测到的行为， **触发--- 响应机制**。

### 事件的三要素

1. 事件源：(是谁) :      触发事件的元素
2. 事件类型：(什么事件) ：例如 click 点击事件
3. 事件处理程序:(做啥,怎么做)：事件触发后要执行的代码(函数形式)，事件处理函数

###事件执行的步骤

```js
<button id="btn">唐伯虎</button>
var btn = document.getElementById('btn'); // 1 获取元素 即事件源
 btn.onclick = function() { // 2 注册事件类型
     alert('点秋香');  // 做什么 ：弹出一个警示框
     btn.onclick = null;//移除事件
}
```

### 操作元素的要点

- 操作元素来改变元素的内容：本质都是通过元素对象的属性实现的,如宽高 鼠标事件的属性等

### 常见的鼠标事件click

- onclick:    鼠标点击左键触发
- onmouseover: 鼠标经过触发
- onmouseout: 鼠标离开触发
- onmousemove: 鼠标移动触发
- onfocus:    获得鼠标焦点触发
- onblur:     失去鼠标焦点触发
- onmouseup:   鼠标弹起触发
- onmousedowdn: 鼠标按下触发

### 动态创建元素的3种方式(重要)

- document.write(); 直接将内容写入页面 执行完毕后，会导致页面重绘 **慎用**

- element.innerHTML； 采取拼接字符串方法将内容写入DOM时不会导致页面全部重绘，但是会产生效率低下问题 解决办法如下：

  ```js
  let array = [];
  for (let i = 0; i < 1000; i++) {
  array.push('<div style="width: 100px; height: 100px; border: 1px solid red;"></div>')}; 
  document.元素.innerHTML = array.join('');// 需要将数组转换为字符串
  // 以数组形式 采用JS循环后追加的方式 能解决直接拼接字符串产生的效率问题，比createElement();还要快
  ```

- element.createElement(); 大量创建新元素 效率高 耗时低，且结构清晰

  总结：==element.innerHTML如果以数组形式追加创建则比 createElement()更快速==

  

### **innerText和innerHTML的区别**

- 获取内容时的区别: innerText会去除空格和换行，而innerHTML会保留空格和换行

- 设置内容时的区别: innerText不会识别html的标签仅视作文本来解析，而innerHTML会识别

- input 操作只能用它本身带有的属性如value操作,不能使用innerText和innerHTML

  ```js
  btn.onclick = function () {
     btt.innerHTML = '<h1>hello</h1>'; // 如果是Text则会将h1标签当做文本来解析输出
  }
  ```

  

### 常用元素的属性操作

- innerText/innerHTML:改变元素内容
- src  href  id alt title

### 旗帜flags

- 巧用flags 

  

## 样式属性的操作

- element.style     行内样式操作  小量操作时使用，注意点：跟css不一样的是属性要注意大小写如:fontSize,在css是全部小写DOM里面S要大写，即第一个但此后面的每个单词开通都要大写
- element.className  类名样式操作
- style.backgroundImage = =='url('+ this.src +')'更换==
- JS操作的是元素行内样式   比css内部的样式权重高
- this 指向调用者  谁调用指向谁，如果要改变另一个元素那么函数体内就不能用this，直接写要操作的元素名

### 利用className修改属性样式

注释：适合样式较多情况下使用，使结构更为清晰

```js
定义一个类名写好样式
根据需要使用时 将当前元素的类名替换成定义好的类即可，相当于重新赋值(样式)
<style>
    .strs{
        width:100px;
        height:100px;
        background:pink;
    }
</style>
<div class="serf">hello</div> 
let btn = document.querySelector('div');
btn.onclick = function(){
    this.className = 'sevf strs' // 保留原类名的样式 并为当前元素div添加了strs类名的样式属性
} // 注意：如果div已有类名 则会被覆盖，解决：吧原有类名也加上 两个类名用空格隔开即可
```



### 表单/input验证

- 利用 value.length进行长度判断 

### 排他思想

如果同一组元素需要设置某种样式需要用到循环的排他思想,先默认清除所有样式再给当前元素设置样式

```js
 <button>1</button>
 <button>2</button>
 <button>3</button>
 let sum = document.querySelectorAll('button');
   for (let i = 0; i < sum.length; i++) {
      sum[i].onclick = function () { //循环注册事件
         for (let i = 0; i < sum.length; i++) {
             sum[i].style.background = '';//清空所有样式
         }
 this.style.background = 'pink'; //再留下当前元素的样式 因为外层循环一次所以就是当前单个元素
        }
   }
```

### 背景图片的更换

```js
<ul class="baidu">
  <li><img src="./imgs/1.jpg" alt=""></li>
  <li><img src="./imgs/2.jpg" alt=""></li>
  <li><img src="./imgs/3.jpg" alt=""></li>
  <li><img src="./imgs/4.jpg" alt=""></li>
</ul>
 <script>           // 多选择器
 let sum = document.querySelector('.baidu').querySelectorAll('li img');
 for (let i = 0; i < sum.length; i++) {
     sum[i].onclick = function () {
     document.body.style.backgroundImage = 'url(' + this.src + ')'
        }
    }
</script>
```

### 表格的隔行变色

```js
<tbody>
<tr>
 <td>1.05265</td>
 <td>定期债券</td>
 <td>1.05265</td>
 <td>1.05265</td>
 <td>1.05265</td>
 <td>1.05265</td>
</tr>
</tbody>
let trs = document.querySelector('tbody').querySelectorAll('tr');
for (let i = 0; i < trs.length; i++) {
  trs[i].onmouseover = function () {
   if (i % 2 == 0) { //判断奇数/偶数
      trs[i].style.backgroundColor = 'red'; // 也可以定义个类名样式使用className添加/更换
    }else{
      trs[i].style.backgroundColor = 'pink'
      }
    }
  trs[i].onmouseout = function(){
    trs[i].style.backgroundColor = ''；//清空颜色
    }
 }
```

### 表单的全选/取消全选

```js
<script>
let j_cbAll = document.getElementById('j_cbAll'); // 全选
let j_tbs  = document.getElementById('j_tb').getElementsByTagName('input');// 所有子复选框
j_cbAll.onclick = function(){
   for(let i = 0;i < j_tbs.length;i++) { //循环 子复选框
    j_tbs[i].checked = this.checked; // 将j_cbAll的选中状态也赋值给子复选框
     }
  }
  for (let i = 0; i < j_tbs.length; i++) {
     j_tbs[i].onclick = function () { // 给自复选框注册事件
     let flag = true; // 使用旗帜
   for (let i = 0; i < j_tbs.length; i++) {
    if (!j_tbs[i].checked) { // 取反复选框选中状态
     flag = false; //更改旗帜状态
     break; // 只要有一个未选中就退出 不执行下面的 即flag 保持为true
      }
    }
     j_cbAll.checked = flag; // 上面的子复选框未选中总复选框就不选中 反之则选中
   }
 }
</script>
```

### 获取自定义属性值的2种方式

- element.属性  ：  获取属性值 只能获取内置属性

- element.getAttribute('属性')，可以获取自定义属性==(常用)==

- element.dataset.index/[下标];  H5新增获取方式以==data开头==的自定义属性，如果自定义属性有多个链接单词如：data-list-name那么获取时直接 listName即可

  ```js
   <div id="demo" index="1x">hh</div>
  let sum = document.querySelector('div')
  console.log(sum.getAttribute('index')); // 1x
  ```

### 设置/移除自定义属性

注释：==开发中自定义属性以data-开头==

- element.属性 = 'test'; 将原先的属性名移除并更换成test
- element.setAttribute('属性','值')；重新设置属性值 ==重要==

 ```js
 <div id="demo" index="1x">hh</div>
let sum = document.querySelector('div')
sum.setAttribute('index','2x'); // 1x
------------移除属性
sum.removeAttribute('index'); // 移除自定义的属性index
 ```

### Tab栏切换技巧

```js
 <div class="tab">
     <div class="tab_list">
         <ul>
             <li class="current">商品介绍</li>
             <li>规格与包装</li>
             <li>售后保障</li>
             <li>商品评价（50000）</li>
             <li>手机社区</li>
         </ul>
     </div>
     <div class="tab_con">
         <div class="item" style="display: block;">
             商品介绍模块内容
         </div>
         <div class="item">
             规格与包装模块内容
         </div>
         <div class="item">
             售后保障模块内容
         </div>
         <div class="item">
             商品评价（50000）模块内容
         </div>
         <div class="item">
             手机社区模块内容
         </div>
     </div>
 </div>
<script>
let tab_list = document.querySelector('.tab_list');
let lis = tab_list.querySelectorAll('li'); //
let items = document.querySelectorAll('.item');// 获取每个item
for (let i = 0; i < lis.length; i++) {
    lis[i].setAttribute('index', i);//给5个li添加自定义属性(即类名) 01234
    lis[i].onclick = function () {
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = ''; // 先排它 
        }
        this.className = 'current'; // 留下当前元素样式
        let index = this.getAttribute('index');//取得自定义属性的li的索引
        for (let i = 0; i < items.length; i++) {//嵌套再li点击事件内 点击了li就对应items
            items[i].style.display = 'none'; //循环items 进行隐藏
        }
        items[index].style.display = 'block'; // 让5个li对应的当前item显示出来
        }
     }
 </script>
```



# DOM节点操作

简介：DOM提供的以上document入口获取元素的方法过于繁琐 逻辑性不强，因此有了节点操作

- nodeType : 节点类型 元素：1，属性：2， 文本节点：3， 节点类型检测：element.nodeType

### 获取父子节点

```js
<div class="box">
   <li class="erwei">1</li>
</div>
let sum = document.querySelector('.erwei');
erwei.parentNode; //获取erweima最近的父节点box 找不到就返回null
----------- 获取子节点
let sum = document.querySelector('.box');
sum.childNodes; //获取box所有子节点包含换行空格/即文本节点,此方法得到的节点需要进行判断处理
---------获取子节点(推荐)
sum.children; //只读属性，只返回子元素节点，不包括换行空格 ，伪数组结构
-------------获取第一/最后一个子节点
sum.children[0], // 因为返回的是伪数组结构可以用下标访问
sum.children[sum.length -1]// 动态获取最后一个元素
```

### 获取兄弟节点及函数封装

```js
获取兄弟节点 
sum.nextElementSibling; // 下一个兄弟节点
sum.previousElementSibling;//上一个兄弟节点 ，有兼容性问题
---------解决办法 封装函数
function getNextSibling(element){ //将元素传递进来
    let el = element; // 进行赋值给el
    while(el = el.nextSibling){ // 将el的所有节点获取过来
        if(el.nodeType === 1){ //判断类型 1 即是元素 那么就对了进行返值
            return el;
        }
    }
    return null; //返值返回null
}
```

### 创建and添加节点

```js
<ul></ul>
let li = document.createElement('li');//创建元素节点
let ul = document.querySelector('ul')//获取父节点
let lii = document.createElement('li');//创建元素节点
ul.appendChild(li); //将li添加到ul里面  添加到尾部  不会覆盖
ul.insertBefore(lii,ul.children[0]); //在ul里面li的前面下标0再插入一个元素
```

### 删除节点

```js
element.removeChild(ul.children[0]);// 删除ul里面的第一个子节点 会改变数组长度
ul.removeChild(li/this.parentNode);// 删除ul的子节点li的父节点，即ul自己
```

### 克隆/拷贝节点

```js
let ul = document.querySelector('li');
let lili = ul.children[0].cloneNode(空值则是浅拷贝只有节点没有值);// 克隆ul的第0个子节点
  (true),true为深拷贝  克隆包括节点里面的文本节点 即：值
ul.appendChild(lili)// 克隆完毕后将lili 添加到ul尾部
```

### DOM总结

#### 增删改查 创 取/设置

1. 增：appendChild();后增  insertBefore()前增
2. 删：removeChild();
3. 改: 如下
   - 修改元素属性: src   href  title等
   - 修改普通元素：innerHTML  innerText
   - 修改表单元素: value  type  disabled等
   - 修改元素样式: sty   className类
4. 查: 
   - css3方法：querySelector(); querySelectorAll();
   - 节点操作：parentNode()父节点;   children()子节点;  previousElementSibling()上一个兄弟节点，  nextElementSibling()下一个兄弟节点，
5. 属性操作：
   - setAttribute:设置dom的属性值，
   - getAttribute: 获取dom得属性值
   - removeAttribute:  移除属性
6. 元素的创建
   - element.createElement()；==(推荐) 结构清晰 速度也还行==
   - element.innerHTML ==(推荐)==注意：以数组形式追加 再转换字符串格式使用，不要直接使用字符串拼接
   - element.write();   执行完毕会导致页面重绘制 (不推荐)



## 事件

### 事件注册的2种方式

1. on ：传统方式如 onclick 点击事件, 一次只能注册一个事件 后面的会覆盖前面的。

2. addEventListener(type,listener,useCapture); 可为同一对象注册多个事件。

   -  参数：事件类型、事件处理函数、捕获(false/true)默认false, 捕获项可选可不选

   ```js
   btn.addEventListener('click',function(){ // 此处的click不能再加on了
        //事件处理函数
   })
   ```

### 移除事件

```js
btn.addEventListener('click',fn)//不能再使用匿名函数，将函数名fn写如到事件后,由于已注册绑定也不再需要加小括号()进行 回调函数
function fn(){
   btn.remoEventListener('click',fn); // 参数:移除的时间类型、事件函数名
}

```

### 事件捕获与冒泡

- 事件往下查找目标事件的过程称为事件捕获，事件执行时往上传播称为事件冒泡，js代码只能执行其中一个阶段

- onclick和attribute只能得到冒泡阶段

- addEventListener(type,listener,useCapture);==第三个参数如果是ture 表示在事件捕获阶段调用事件处理程序(一层一层往下时就执行事件函数)，如果是false(默认false)，表示事件在冒泡阶段调用事件处理程序==

  ```js
  sum.addEventListener('click',functuon(){},true);// 往下捕获目标事件时就开始执行函数
  ```

- onblur onfocus onmousmove 没有冒泡属性

### 事件对象(重要)

- 事件对象写在侦听函数的小括号内作为形参，只能存在创建的事件当中，属系统创建的对象 不需要再传递实参给它

```js
sum.addEventListener('click',functuon(event){},true); //event就是一个事件对象名
event事件对象也可以自定义命名如 xx/e 都可以 只要在侦听事件小括号内就被当做事件对象的参数，拥有事件对象的所有属性和方法，--它与绑定的事件类型相关，如果是鼠标事件则得到的是鼠标事件相关的属性和方法
```

#### 事件对象的属性

- e.preventDefault(); 阻止默认事件--如 阻止链接跳转 表单提交
- e.stopPropagation();阻止冒泡 
- e.target: 返回触发事件的对象,与this不同的是它指向触发事件的目标, 而this指向当前的注册事件即调用者
- e.type: 返回事件触发的类型

#### 事件委托/代理 (重要)

简介:直接给父节点设置监听器，利用冒泡机制去影响到每个子节点,提高了程序性能

#### 鼠标对象

- e.pageY();   e.pageX();  返回相对于文档页面的X,Y坐标 ==(常用)==

- e.screenX(); e.screenY();  返回相对于屏幕的X,Y坐标

  

#### 键盘事件

- onkeyup   : 键盘弹起(即松开)触发

- onkeydown : 键盘按下时触发,注意：按下与弹起 无论代码顺序怎么写 都会先执行按下再执行弹起

- onkeypress: 与keydown类似 不同在于不识别功能键，优点：区分字母大小写返回键码值

  ##### 键盘事件对象

  - keyCode: 获取到键码值，如：回车键-键码值=13

    ```js
    let search = document.querySelector('input');
    document.addEventListener('keydown', function (e) { //侦听键盘事件
         console.log(e.keyCode) // 如: 回车键=13 空格键32 不区分用户按下的字母大小写
        if(e.keyCode == 13){ //判断用户是否按下了键码值13 即回车键
           alert('你按下了回车键')
        } else if{
           if(e.keyCode == 83){ //如果用户按了S键，
             search.focus(); //就将光标焦点聚焦到搜索框，此功能将注册类型改为keyup更合适
           }
        }
    })
    ```

  - 模拟快递框单号查询

    ```js
    let con;let jd_input// xian huoqu yuansu 
    jd_input.addEventListener('keyup',function(){
        if(this.value == ''){ //判断用户是否输入
            con.style.display = 'none';
        } else{// 如果输入就让搜索框上面的提示框显示出来 再讲用户输入的文本内容放进去
            con.style.dispay = 'block';
            con.innerText = this.value;
        }
    })
    ```

  

# BOM对象

简介：BOM提供了一系列对象，且每个对象都提供了很多方法与属性供开发人员操作,独立于内容与浏览器进行交互即：window 它是浏览器的顶级对象 JS访问浏览器的接口。 全局定义的变量、函数、对象 都属于window

- window:包含了：document   location  navigation  screen   history

## 窗口事件

### 窗口加载事件

- onload  : 窗口(页面)加载事件 文档内容加载完毕后触发事件 (包括图像 脚本文件 css文件)并调用处理函数

  - <body onload="SomeJavaScriptCode"> 会造成页面性能问题，解决办法如下

    ```js
    document.addEventListener('DOMContLoaded',function(){})DOM加载完毕即可执行jS
    ```

### 调整窗口大小事件

- resize : 窗口大小的调整时触发事件，搭配属性window.innerWidth;获得窗口宽度，(常应用于响应式布局)

### 定时器|计时器

- setTimeout();    定时器  setTimeout(function(){},2000) 2秒后调用执行函数，省略时间=立即执行

  ```js
  function callback(){ //也可以采用这样写法函数与定时器相分离
      console.log('爆炸');}
  setTimeout(callback,2000) //调用上面的函数 并在2秒后执行它
  当页面有多个定时器时就需要对定时器进行标识 如下
  // let timer1 = setTimeout(callback,2000) 
  // let timer2 = setTimeout(callback,3000) 
  -------清除定时器: clearTimeout(调用标识符)
  let timer = setTimeout(function(){
      console.log('爆炸');
   },2000);
  btn.addEventListener('click',function(){ // 给btn按钮注册侦听器
      clearTimeout(timer); //清除timer定时器
  })
  ```

- setInterval();   计时器  setInterval(function(){},2000) 每间隔2秒调用一次执行函数,清除同上

  ```js
   手机号码：<input type="number">
   <button>倒计时</button>
   <script>
  let btn = document.querySelector('button');
  let timer = 5;
  btn.addEventListener('click', function () {
  btn.disabled = true; // 点击倒计时后 按钮的点击功能就禁用 
  let timer2 = setInterval(function () {
     btn.innerHTML = '还剩' + (timer--) + '秒';
      if(timer < 0){
        clearInterval(timer2); //计数器小于0就停止计时器
        btn.disabled = false; //倒计时结束 按钮恢复点击功能
        btn.innerHTML = '倒计时';//恢复文本值
        timer = 5; // 计数变量复原 等待下一次计数
     }
    }, 1000) // 手机验证码倒计时效果
  })
  ```

  

### 回调函数

- 普通函数是按顺序立即执行，而定时器里面的函数设置了指定时间，时间成立后再进行函数调用就称为==回调函数==
- 倒计时效果 页面刷新时会出现空白，解决办法：封装一个函数 刷新前先调用函数即可

### this的指向

- 谁调用指向谁 全局作用下指向window，BOM对象里面也指向window，函数内部同一作用域时指向的也是调用者即this引用指向实例，不在同一作用域 即函数套函数那么指向的是其作用域内的对象，

### JS执行机制异步/同步

- JS是单线程执行程序,即所有的任务最终都是由主线程来执行。单线程就意味着有任务队列的产生，前一个任务结束才能接着执行下一个，因此有可能造成线程阻塞。因此就有了异步与同步任务的区分
- 脚本再创建另一个异步任务队列 所有的异步任务按照顺序丢进去，待主线程空闲时再将异步任务拿出来按顺序执行
- 主线程空闲就会往异步队列查看有无新的异步任务，称为事件循环。event loop;

## location对象(重要)

简介：location属性用于获取和设置窗体的URL，并且可以解析URL，==返回的是一个对象==

### loaction对象

语法组成：

- protocol://host[:prot]/path/[?query]#fragment

  ```js
  http:www.itcast.cn/index.html?name=andy&age=18#link
  ```

- protocol : 即通信协议 http ftp maito

- host     : 主机(域名)www.itheima.com

- port     : 端口 可选省略时 默认为80端口

- path     : 路径 由0或多个'/'斜杠隔开的字符串 用来表示诸暨市的一个目录或文件

- query    : 参数 以键值对的形式 通过 & 符号分割开来

- fragment : 片段 # 号后面内容常见于链接 描点

  

### location对象的属性

- location.host  : 返回主机(域名)

- location.port  : 返回端口号如果未写 就返回空字符串

- location.pathname: 返回路径

- location.hash  : 返回片段 # 后面内容 常见与连接和描点

- location.href  : 获取或设置整个URL ==重点== 可以获取/重新赋值url

- location.search : 返回参数  ==重点== 如下：通过seach实现页面跳转和数据传输

  ```js
  //准备两个不同的页面 login.html index.html
  // login.html
  <form action="index.html"> //输入内容后点击提交 就跳转到index.html 并将输入内容带入页面
     用户名:<input type="text" name="uname"> // 输入内容
     <input type="submit" value="登录">
  </form>
  ------- //index.html
  <div></div>
  <script> // 将传入的字符串进行处理 截取需要的字符 返回新的字符串
     let params = location.search.substr(1); //从第1个开始截取到最后
     let arr = params.split('='); // 利用=号将字符串分割为数组形式 方便访问
     let div = document.querySelector('div'); 
     div.innerHTML = arr[1] + '哈哈'; //赋值给div
  </script>
  ```

### location的方法

- location.replace():替换页面 不记录历史，所以不能后退

- location.reload():重新加载页面 相当于刷新 参数为 true 就是强制刷新

- location.assign(: 与href一样 可以跳转页面，也被称为 重定向页面，如下：

  ```js
  <button>点击跳转</button>
  <script>
   let btn = document.querySelector('button');
   btn.addEventListener('click',function(){ 
     location.assign('http://www.baidu.com')
    })
  </script>
  ```

## navigator对象

简介：包含浏览器有关信息 具有很多属性 如 userAgent 可以返回由客户机发送服务器的user-agent头部值



## history对象

简介：与浏览器进行交互，包含用户再浏览器访问过的URL记录

​    history方法如下：

- back()   :  后退

- forward():  前进

- go(参数) :  前进后退功能 参数： 1 前进一个页面， -1 后退一个页面。

   

## 自执行函数

注释：立即执行函数称为自执行函数，即无需调用，如果页面有多个不同函数需要用分号结尾隔开

- 优点:创建了一个独立的作用域,即局部函数 ==相同的变量名在不同作用域不会产生命名冲突== 里面的变量在函数执行完毕后即回收内存,

```js
(function(形参) {})(实参);// 这就是自执行函数 
(function(形参) {}(实参)); // 这也是自执行函数
 以上2个是自执行匿名函数、也可以加函数名 如(function fn(形参) {}(实参));
```



## 轮播图的实现

```js
<img id="img" src="imgs/1.jpg" width="50%">
<!--定义图片标签-->
<script>
 //修改图片src属性
 var number = 1; /*用于控制循环次数*/
  function fun() {
   if (++number > 4) { /*总共四张图片需要切换*/
       number = 1;
     }
var img = document.getElementById("img");//获取img对象
img.src = "imgs/" + number + ".jpg";  /*修改图片标签的src属性达到切换图片的目的*/
 }//获取的是整个文件夹的图片
 setInterval(fun, 2000);/*每一秒切换一张图片*/
</script>

```



## 本地存储

1. sessionStorage: 会话存储 ，键值对形式，同一页面数据共享，浏览器窗口关闭即销毁，容量小

   ```js
   sessionStorage.setItem('key',value)// key代表键(可以理解为属性) value代表值
   // 在浏览器开发者工具内的Application应用层内的Storage可以查看到 存储的键值
   ------获取数据
   sessionStorage.getItem('key') //获取存储的值  key 即键 名字可以自己随便取
   ------删除数据
   sessionStorage.removeItem('key')//key 即键 名字可以自己随便取
   ```

2. localStorage  : 本地存储 ，数据存储在用户浏览器中，读取方便 容量大5M 永久存储 同一浏览器共享，需手动删除，注意：只能存储字符串 可以将对象json.stringify(),编码转换后存储

   ```js
   localStorage.setItem('key',value)// key代表键(可以理解为属性) value代表值
   // 在浏览器开发者工具内的Application应用层内的Storage可以查看到 存储的键值
   ------获取数据
   localStorage.getItem('key') //获取存储的值  key 即键 名字可以自己随便取
   ------删除数据
   localStorage.removeItem('key')//key 即键 名字可以自己随便取
   ------删除所有数据
   localStorage。clear() // 删除所有数据
   ```

   

