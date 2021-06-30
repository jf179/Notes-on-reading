# Proimse

注释：promise是一种异步编程的解决方案，用来替代回调函数方案，支持链式调用可以解决回调地狱问题

- promise  也是一个构造函数，也是一个对象，用来封装一个异步操作并可以获取其成功或失败的结果值
- peding: 待定/等候结果， ==返回2中状态结果  1： resolved 成功/已解决； 2 ：rejected 失败/拒绝==
- 成功的结果一般称为value, 失败的结果一般称为reason, 注意：这2个都只是称呼 不是实际应用

状态详解：成功处理如下：new Promise

- 执行异步操作 - 成功执行resolve--promise对象--回调then()即：resolved---返回新的promise

状态详解：失败处理如下：new Promise

- 执行异步操作--失败执行reject()--promise对象 即：rejected -- 回调rejected()即then/catch()失败原因--返回新的promise对象
- resolve成功  和 reject失败 都是函数类型的参数  promise 接收函数类型参数
- 成功 接收 then方法，失败  try{}方法

```js
// 生成随机数  使用Promise封装一个异步任务
 function rand(m, n) {
   return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
 }
 const btn = document.querySelector('#btn');
 btn.addEventListener('click', function () {
   const p = new Promise((resolve, reject) => { // promise可以包裹一个异步任务
     setTimeout(() => {
       let n = rand(1, 100); // 设定随机值参数范围，并声明n接收返回的值
       if (n <= 30) { // 低于30%说明中奖
         resolve(n); // promises对象的状态设置为 成功，并将结果放入函数方法内
       } else {
         reject(n); //promises对象的状态设置为 失败，并将结果放入函数方法内
       }
     }, 1000)
   })
   // 调用then()方法 设置2个箭头函数处理成功和失败的结果，then方法返回成功和失败2个结果，用参数接收n变量内的随机数值即可 value放在成功的函数内 resion放在返回失败的函数内
p.then((value) => { console.log('恭喜,你的中奖号码为' + value); }, (resion) => { console.log('失败,你的号码为' +resion); })
 });
```



## async函数

注释：用来标识函数 使其形成 async 函数，函数的返回值为promise对象，promise对象的结果由 async 函数执行的返回值决定

```js
async function main() {
 // 如果返回值是一个非promise类型的数据 就是成功的状态
 //   return '521';
 // 如果返回的值一个promise对象 return的结果 就决定了函数的返回值
 return new Promise((resolve, reject) => {
     // resolve('OK'); // return的是成功 那么使用者返回的也是成功
     // reject('error'); // return的是失败 那么使用者返回的也是失败状态
     throw 'hello,出现异常'; // 如果抛出的是异常 那么失败的结果就是抛出的结果
 })
}
let result = main(); // 将async 函数的返回值赋值给变量
console.log(result);
```



## await 表达式

注释：await 右侧的表达式一般为 promise对象，但也可以是其他值，

-  如果是promise对象，await 返回的是promise 成功的值
-  如果表达式是其他值。直接将此值作为 await 的返回值
-  await必须写在async函数中，但 async 函数中可以没有 await
-  如果await 的 promise 失败了，就会抛出异常，需要通过try...catch 捕获处理

```js
async function coltk() {
let fn = new Promise((resolve, reject) => {
     // resolve('ok'); //成功状态
     reject('error'); // 失败状态
 })
 // 右侧为promise的情况
 // let res = await fn;
 // console.log(res); // 如果成功会返回fn的promise实例对象的
 // ---------分割线
 try { // 如果promise是失败状态 需要放在try对象内使用 catch()进行失败捕获
     let res2 = await fn;
 } catch (e) {
     console.log(e);
   }
}
coltk()
```



## async与await结合

注释：利用try...catch捕获处理错误比回调函数进行判断灵活许多

```js
const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile)
async function fn() { // async在函数前
    // 读取第一个文件
    try { // await 在要执行的操作体前
        let data1 = await mineReadFile('./prom1.html');
        let data2 = await mineReadFile('./prom2.html');
        let data3 = await mineReadFile('./prom3.html');
        console.log(data1 + data2 + data3);
    } catch (e) {
          console.log(e.code);
    }
}
fn();
```





------



# axios

注释：基于 xhr + promise 的异步 ajax 请求库，浏览器端/node 端都可以使用，支持请求／响应拦截器

支持请求取消，请求/响应数据转换，批量发送多个请求。能自动转换JSON格式

- npm install axios : 安装
- json-server --watch db.json : 在文件夹使用命令行打开文件端口
- json-server --watch db.json -d 2000: 本地服务端延时2秒发送请求



## 响应查看

- 在调式工具查看Network网络层-Headers头部信息下的-Request Headers(内部含有请求方式 路径 http等)
- preview：预览文本内容， 包括对象属性和属性值， Response响应返回的属性值

## 指令含义

- GET:    对资源的查找操作，参数通过URL传递，会被浏览器主动缓存且保存在历史记录上，   用来查找数据
- POST:   post设置在请求体data对象中，不会被浏览器主动缓存，后一个请求不会覆盖前一个，用来增加数据
- PUT:    可更改指定url，如果两个请求相同 后一个会覆盖前一个，主要用作向服务端发送数据，用来修改数据
- DELETE: 删除某一个指定资源的内部数据,
- cancel(): axios 取消请求方法

## axios发送get请求

- 主要用来查找资源  **查**

```js
btns[0].onclick = function () { // 利用axios发送get请求
   // 发送axios请求
   axios({
     // 请求类型
     method: 'GET',
     // 请求地址URL
     url: 'http://localhost:3000/posts/5',// 请求id为5的文章
     // 返回的是一个promise对象可以使用then方法进行接收处理
       params: {get请求参数} // 根据需要设置params
   }).then((response) => {
     console.log(response);
   })
 }
```



## axios发送 post请求

注释:将设置好的请求体以post方式和json格式传给服务器，服务器接收到后将其进行保存到db.json文件内

- 主要用来进行增加数据   **增**

```js
btns[1].onclick = function () {
   // 发送axios请求
   axios({
     // 请求类型
     method: 'POST',
     // 请求地址URL
     url: 'http://localhost:3000/posts', //仅请求地址不知道特定id
     // 设置请求体
     data: {
       title:'这是一个寂寞的天',
       author:'下着寂寞的雨'
     }
     // 返回的是一个promise对象可以使用then方法进行接收处理
   }).then((response) => {
     console.log(response);
   })
 }
```



## axios发送 PUT请求

- 主要用来 修改数据 需要指定id   **改**

```js
const btns = document.querySelectorAll('button');
console.log(btns[2]);
btns[2].onclick = function () {
  // 发送axios请求
  axios({
    // 请求类型
    method: 'PUT',
    // 请求地址URL 需要指定ID
    url: 'http://localhost:3000/posts/6',
    // 设置请求体
    data: {
      title:'这是一个寂寞的天，它不下鱼',
      author:'这就更改了'
    }
    // 返回的是一个promise对象可以使用then方法进行接收处理
  }).then((response) => {
    console.log(response);
  })
}
```



## axios发送 DELETE请求

- 用作删除数据 直接在url上指定要删除的项即id 数据删除后会保留id，  **删**

```js
 const btns = document.querySelectorAll('button');
 btns[3].onclick = function () {
   // 发送axios请求
   axios({
     // 请求类型
     method: 'PUT',
     // 请求地址URL 需要指定ID 只删除数据  id会保留
     url: 'http://localhost:3000/posts/7',
     // 返回的是一个promise对象可以使用then方法进行接收处理
   }).then((response) => {
     console.log(response);
   })
 }
```



## axios的请求响应结果的结构

- config:  配置对象：包含 请求类型、 请求体 、URL 
- data  ： 服务器响应返回的处理结果(数据)，对象类型
- headers: 响应头信息
- request: 原生AJAX的请求对象()
- status :  响应的状态码
- statusText: 响应的状态字符串/即：状态码的对或错



## axios配置对象

- {url, 请求方式，baseURL(url的基地址：设置好后 前面的url就只需要设置后边的路径即可，系统会自动将baseURL与url进行匹配形成最终的url)，}

## axios自定义默认设置(重要)

```js
 const btns = document.querySelectorAll('button');
 btns[3].onclick = function () {
   // 默认配置
   axios.defaults.method = 'GET'; //设置默认请求类型
   axios.defaults.baseURL = 'http://localhost:3000';//设置基础地址 后面不需要加参数
   // 请求参数也可以设置默认
   axios.defaults.params = {id:1}
   axios.defaults.timeout = 3000; //还可以设置默认超时时间
   axios({
     url: '', //上面以默认配置基础地址 此处只要设置路径和对应的URL参数就行
     data: { post请求参数 },
     params: { get请求参数 } //上面如果设置好参数此处就不需要了
   }).then((res) => {
     console.log(res)
   })
 }
```



## axios创建实例对象发送请求

```js
const brns = document.querySelectorAll('button');
 const duanzi = axios.create({
    baseURL: 'https://autumnfish.cn', // 后面的接口参数由下面的对象设置
    timeout: 3000
  })
  // 这里duanzi与 axios 对象的功能几乎一样
 console.log(duanzi);
  duanzi({
      url:'/api/joke',// 实力内部的基地址以设置好这里只需要设置后面的路径即可
  }).then((res) => {
    console.log(res.data);
 })
```



## axios拦截器

- 请求拦截器：发送请求之前设置函数对请求参数和内容进行一些处理，相当于关卡 满足设定的条件才允许发送请求
- 响应拦截器：在响应返回，处理结果之前利用函数 对结果进行一些预处理，满足条件才交由用户
- 拦截器添加多个注意点：以请求和响应各2个为例：执行顺序为 21 12，即第2个请求拦截器先执行--第1个请求拦截器--第1个响应拦截器--第2个响应拦截器

```js
 axios.interceptors.request.use(function (config) { //axios请求拦截器使用配置对象
     // config配置对象即可以对请求参数进行修改。
    // 在发送请求之前做些什么
    console.log('请求拦截器成功');
    return config; 
//throw '老板跑路了'；如果使用throw语句抛出错误则不执行下面代码直接跳往响应拦截器的错误处理函数继续
  }, function (error) {
    // 对请求错误做些什么
    console.log('请求拦截失败');
    return Promise.reject(error)
  });
  //响应拦截器
  axios.interceptors.response.use( //axios请求使用
    function (response) { //对响应返回成功的数据进行函数处理
      // 对响应数据做点什么
      console.log('响应拦截器成功');
      return response; //如果只想单独处理某一块数据就 return.data即可，
    },
    function (error) {  //对响应返回错误的数据进行函数处理
      // 对响应错误做点什么
      console.log('响应拦截器失败');
      return Promise.reject(error)
    }
  )
  // 发送axios请求 
  axios({
    method: 'GET',
    url: 'http://localhost:3000/posts' // 需要开启终端服务
  }).then(response => {// 自定义函数接收以上拦截器处理后的数据进行需求处理即可
    console.log(response.data);
  })
```



## axios取消请求

- 使用cancel()；方法进行请求取消

```js
const btns = document.querySelectorAll('button');
 let cancel = null;//声明一个全局变量
 btns[0].onclick = function () {
   // 检测上一次请求是否完成 如果未完成后面的请求全部取消不允许发送
   if (cancel !== null) {
     // 取消上一次请求
     cancel(); // cancel() 可以对请求进行取消
   }
   axios({
     method: 'GET',
     url: ' http://localhost:3000/posts',
     // 实例化 添加配置对象的属性
     cancelToken: new axios.CancelToken(function (c) { //传入参数
       cancel = c; // 将参数赋值给变量cancel
     })
   }).then(res => {
     console.log(res);
     cancel = null; //请求完成后将cancel变为null,类似旗帜的用法
   })
 }
 btns[1].onclick = function () {
   cancel(); // 可以对请求进行取消
 }

```



# 宏任务与微任务

- promise异步属于微任务(如果内部没有同步的话)，定时器属于宏任务，顺序：同步任务 ---> 微任务 --> 宏任务.
- 异步任务在生成的时候如计时器 在js执行解析时就开始执行然后时间到了再放入异步队列等候主线程空闲
- 如果同时有2个定时器异步任务 会按照顺序放进队列等候执行，区别在于如果后面的定时器设置的时间比前面的短，那么系统会优先将后面的异步任务放进队列优先执行，

主要的异步任务有：

- Event: 事件，
- setTimeout: 定时器和计时器
- AJAX：AJAX请求也是异步任务
- promise:async 函数 function也属于异步，单纯的函数执行取决于是否放在同步之前



# 模块化开发

注释：将功能函数进行独立的封装，使用时按需引用即可，形成作用域，避免全局命名冲突

- script标签内需要使用 type="module" 标识；
- 模块化引用输出跨域错误：解决办法--> Live Server使用该插件 Open with Live Server打开网页即可
- 模块化里面有些别名是规定好的不能更改，比如title url，更改就会报错
- 模块的作用域：不同的script脚本标签内的模块不能让互相访问，同一标签下的不同的import引入也是独立的作用域
- 模块功能的具名导出与导入：js内统一使用export{}进行具名导出，外部使用import导入具名即可

```js
html页面
<script type="module">
 import {title,url,show} from './promise.js'; //引用js开放的功能，设置引用路径
 console.log(title,url);
 console.log(show(1,2));// 给模块化函数show传参 进行运算
-------js页面
let title = '后盾人';
let url = 'houdunren.com';
// 函数对象只要是需要的都可以设置
function show(a,b){ // 设置一个运算函数
     return a + b;
}
// 开放指定功能
export { // 可以开放需要开放的功能或属性
    title,url,show
};
------模块的批量导入(不推荐，增加打包体积)
import * as api from './路径'
console.log(api.title)
```



## 模块的别名导入/导出

注释：避免命名冲突，别名可以在导出时转名。也可以再都时转名

```js
---导出
export {title as hd} // 将title 转名为hd。外部使用名直接写hd即可、
------导入
import {hd} from './路径'
```



## 模块默认导出dafault(重要)

注释：默认导出 只能是一个/一个大的功能模块，不能是多个独立的模块，外部接收直接起个变量名接收就行

```js
---js模块
export default function show(){
   return 'show jek'
}
-----------外部使用
import hy from './promise.js';//自己起个变量名即可，起什么名使用时就用什么名
console.log(hy或者hy.属性);
```



## 按需动态加载模块

注释：通过import函数进行加载模块文件，then方法接收

```js
---js模块页面
const title = 'hello';
function fn(){
    console.log('hellobbc');
}
export{title,fn}

------外部使用
<button>点击</button>
<script type="module">
 document.querySelector('button').addEventListener('click', () => {
   import('./promise.js').then(module => {
      console.log(module);
    })
 })
</script>
```



# git版本管理

注释:有个git插件 叫小乌龟 很好用 待了解

- **安装git小乌龟，https://tortoisegit.org/download/，同样的，一直next即可完成安装，但是，需要注意的是必须先安装git，在安装git小乌龟**
- **安装语言包，同样是https://tortoisegit.org/download/，然后一直next即可，要先装完小乌龟在安装语言包。**
- 先建立仓库，再进行如下操作

```css
初始化
git init
查看文件跟踪状态
git status
添加至暂存
git add .
添加到本地仓库
git commit -m"注释"
和远程仓库建立 联系
git remote add origin 地址
如果提示错误 没有上游分支 就设置当前主分支为默认上游分支
git push --set-upstream origin master
提交到远程仓库
git push -u origin master // 设置好号，后续只要git push即可
删除联系地址
git remote remove origin
git remote add origin 地址
完整提交
git push -u origin master
创建分支
git branch 分支名
切换分支
git checkout 分支名
删除本地分支
git branch -d 分支名
删除远程分支
git push origin :远程分支名(第一种)
git push origin --delete 远程分支名(第二种)
查看分支
git branch
合并分支(先切换到主分支，再将某分支合并到当前主分支)
git merge 被合并的分支名   合并前记得先拉取代码
接取服务器代码 
git pull
重置代码
git reset --hard 版本号
查看log
git log
查看所有log
git reflog --oneline
拉取服务器代码至当前分支并进行替换
git reset --hard origin/远程分支名
```



## 分支使用

- 实际开发是多人开发，为了避免冲突，需要拉取 主分支代码，再建立自己的分支，再切换到自己的分支写代码写完提交本地，再切换到主分支进行更新 合并(git merge 要合并的分支名 )，==完成再切换到自己的分支写代码。切记 切记==
- 分支写完全部代码是先add .本地缓存 再commit添加本地仓库，之后提交远程，
- 再切换主分支拉取最新代码--> 再决定合并，合并完成进行主分支提交，然后删除自己的分支
- 如果是开发中代码没写完就先不用删除自己的分支，直接再切回自己的分支写代码即可

总结：自己写什么功能分支就起什么名字。实际工作中不需要我们合并代码一般由部门老大操作合并流程

我们一般是去老大创建的分支拉取代码(此时分支就相当于次主分支，其他同事的代码也是合并到这个次分支)





















