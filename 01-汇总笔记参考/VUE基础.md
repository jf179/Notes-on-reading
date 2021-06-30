# vue基础

注释：vue只关注视图层，无需直接操作DOM ，只需 布局(指模板内进行正常布局) -->  vue渲染

```js
<div id="app"> // vue实例的作用范围
    {{msg}} // 插值语法 自动渲染data内的msg数据
</div>
<script src="../js/vue.js"></script>
<script>
    const app = new Vue({ // 实例化vue
        el: '#app', //元素挂载及传递(el就是做了一个查询选择id为app的DOM,确定vue语法的使用范围)
        data: { // 统一数据管理点
            msg: 'hello vue'
        },
    })
</script>
```



# vue 指令集

- v-text='变量' :类似innerText, 会覆盖标签范围内的文本，所以一般使用插值语法 {{msg}}; 可以使用一句话表达式，如三元表达式、变量、基本运算
- v-html='变零':   类似innerHTML，可以解析富文本(指标签)
- v-modle='变量':能够实现表单元素的数据双向绑定，如input textarea select,需要在data中声明初始值
- v-on='click' : 简写@。 事件绑定
- v-for="(item, index) in arr" :key="index"; item为每一项元素,index为数组索引, arr为被迭代的数组对象，:key='index',为区别值，不写的话有时候vue无法区别数组的每一项元素，注意：==item只能在v-for指令的作用域内使用，不同于data内的数据随处可用== 
  - 用于数组是 值 索引 本身，用于对象-值-键(属性名)-索引

```js
---用于数组
<style>
   .ys {color: red;}
</style>
<p v-for="(item, index) in arr" :key="index" :class="{ys:index % 2 == 0 }">寂寞天</p>
// 将索引为偶数的元素变成红色，
------v-for用于对象与数组的区别
<div id="app">
 <div v-for="(value, key,index) in obj" :key="key">{{value}}---{{key}}---{{index}} </div>
 </div>
const app = new Vue({
   el: '#app',
   data: {
      obj: {
          name: '董浩飞',
          age: 18
       }
    }
})
```



- v-bind:属性名='属性值'：属性(如src) 属性值(如图片地址) 用于动态修改元素的属性或样式，如图片路径

- v-bind:class='{类名.条件表达式}' -> class类的使用，v-bind类的执行取决于条件的成立与否

  

```vue
<style>
   .text {
     color: red;
     }
</style>
<div id="app"> // v-bind简写  ： 符号
   <button @click="bol=!bol">点击修改颜色</button>// 取反bol即true实现切换
   <p :class="{text:bol}">积木的天</p> // 类里面可以绑定多个样式,执行与否取决于条件是否成立
</div>
 <script>
   const app = new Vue({
      el: '#app',
      data: {
          bol: false // 条件默认false 不切换
      },
      methods: {
      }
  })
 </script>
```

- v-if, v-else-if, v-else: 对条件进行判断 再渲染标签元素，语句不能分割，必须是连续相邻在一起才能形成作用范围

```vue
<ul>
 <li v-if="currentValue >= 20000">今天可以上班</li>
 <li v-else-if="currentValue >= 6000">可以等两天</li>
 <li v-else-if="currentValue >= 5000">可以等1天</li>
 <li v-else="currentValue <=4000">工资太低</li>
</ul>
```



- v-show='';  控制标签元素是否显示 DOM结构依然存在 只是进行了元素隐藏

## v-if小技巧

- 如果使用了生命周期的created请求axios，页面标签又有地方需要用到axios请求的数据则浏览器会报错，因为axios请求的数据没有它渲染快，
- 解决办法：在父标签上 使用v-if = '数据元素' 判定使用到的数据元素是否已存在，存在就渲染，不存在就先不渲染。



## vue中的this

- methods:{};   method 如果想访问data里面的数据需要加 this ,注意：不能使用箭头函数

- 1.不应该使用箭头函数来定义一个生命周期方法
  2.不应该使用箭头函数来定义 method 函数
  3.不应该使用箭头函数来定义计算属性函数
  4.不应该对 data 属性使用箭头函数
  5.不应该使用箭头函数来定义 watcher 函数

- 原因：箭头函数绑定了父级作用域的上下文，this 将不会按照期望指向 Vue 实例。
  也就是说，你不能使用this来访问你组件中的data数据以及method方法了。
  this将会指向undefined

- 原因2：vue在实例化之后会将里面的数据平铺到实例上以供使用。箭头函数的this将不能指向vue实例化，也就是说不能使用里面的数据了，除非使用变量对this进行转存，如 let that = this;

- vue实例化以后 内部的数据属性进行了平铺，内部就可以使用this互相使用，方法可以调用方法，方法可以调用data内部的数据，data内部也可以使用method内部的方法

- 注意：==axios中由于嵌套了层数，里层的this将不能正确指向实例，解决办法：外层用变量对this进行转存，另外一种就是直接使用箭头函数，因为箭头函数没有this 所以它指向的是运行时的上下文环境==

  

## 事件修饰符

- @事件名.stop='事件执行代码'；    阻止冒泡
- @事件名.prerent='事件执行代码'； 阻止默认事件,如跳转， ----> 阻止跳转和阻止冒泡可以同时添加😂
- @keyup.enter='事件执行代码'；   键盘弹起.回车事件
- v-model.trim='事件执行代码'；   过滤用户输入的首尾空白字符，v-mokdel专用
- v-model.number='事件执行代码'； 将用户的输入值转为数值类型, v-mokdel专用



## 延迟v-model的实时变化

注释：有时候我们不想实时变化 仅想当按下回车键时才触发事件变化，可以在绑定的键盘事件函数内使用变量进行转换，即将v-model的变化赋值给变量，变量再给v-if去判断渲染



## 对象转数组(重要)

- v-for="(item, index) in Object.values(obj)：  利用循环；对象值(值)转数组
- v-for="(item, index) in Object.keys(obj)"；   利用循环；对象名(键)转数组
- v-for="(item, index) in Object.entries(obj)   利用循环；对象 键值 转数组



## key的基本使用

- key='1';  用作身份区别，上面的for循环已经使用过



## axios的使用

注释：get和post请求区别，post直接在{}内设置请求增加的参数内容即可，而get可以使用params统一设置

-   axios请求 url:url地址?参数=值

```vue
  <div id="app">
      <button @click="axiosGet">点击</button>
   <ul>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
   </ul>
   </div>
  <script src="../js/vue.js"></script>
 <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script>
   new Vue({
     el: '#app',
     data: {
       list:[]
     },
 methods: {
  axiosGet() {
      // 外层不能使用箭头函数
     axios.get('https://autumnfish.cn/api/joke/list', { //这里就不要跟参数了
         params: { // 将参数单独设置在params内
             num: 3
         }
     }).then((res) => { // 里面使用箭头函数才能正确指向vue实例
         console.log(res);
         // 以后这里可以对请求成功的数据进行需求处理
         this.list = res.data.jokes
     }).catch((err) => {
         console.log(err);
   })
   }
  }
})
</script>
```



## axios配置模式config

注释：==推荐==

```vue
    <div id="app">
        <button @click="axiosGet">点击</button>
        <br />
        <input type="text" v-model="inputValue">

        <ul>
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
    </div>
    <script src="../js/vue.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script>
new Vue({
 el: '#app',
 data: {
     list: [],
     inputValue: ''
 },
 methods: {
  axiosGet() {
   axios({
       method: 'POST', //默认是get请求
       url: 'https://autumnfish.cn/api/user/reg',
       data: {//设置请求体 参数
           username: this.inputValue
       }
   }).then((res) => {
       console.log(res);
       this.inputValue = res.data //注册成功
   }).catch((err) => {
       console.log(err);
   })
  }
  }
})
</script>
```



# axios基地址配置与全局调用

- 普通全局注册

```js
---main.js内注册
import axios from 'axios' //导入
Vue.prototype.$axios = axios // 在vue原型上添加axios
axios.default.baseURL = 'https://autumnfish.cn' //配置了基地址
-----组件内使用
//不需要再导入axios
this.$axios({
    url:'只需要跟参数就行了，域名不需要再写main.js已配置好基地址'
  //比如：https://autumnfish.cn/personalized/newsong 只需要personalized/newsong 即可，
})
```



- 高级全局注册

# axios的单独封装

注释：实际开发中用这种比上面的全局注册还要好

- 在src中创建一个utils工具文件夹 --> 并创建一个request.js文件
- request.js专门封装用来处理网络请求
- 将axios的创建单独放到这个文件内
  - 自定义一个实例副本 并暴露出去
  - 组件内导入/main.js导入，--使用导入名发送axios请求即可，axios内部的 url不用再进行基地址拼接了 只需要参数就行，注意:组件内使用基地址赋值的变量保持不变：可以直接用导入名进行赋值或者采用开发环境配置的基地址赋值都行
- 然后在main.js中导入





# 计算属性computed

注释：用于复杂逻辑处理，通过计算取到一个值，依赖一个或多个值产生一个新的值，依赖的值发生了改变，它立马就改变，且对产生的新值进行缓存

```vue
 <div id="app">
    <button @click="axiosGet">修改</button>
    <!-- //将字符串分割成字符串数组 进行反转 再转换为字符串 -->
    <!-- 原始方法 -->
    <!-- <h3>{{str.split('').reverse().join('')}}</h3>
    <h3>{{str.split('').reverse().join('')}}</h3>
    <h3>{{str.split('').reverse().join('')}}</h3> -->
    <!-- ---计算属性computed的值 -->
    <h2>{{getString}}</h2>
    <h2>{{getString}}</h2> // 将计算属性的方法当值使用即可无需加小括号
 </div>
 <script src="../js/vue.js"></script>
 <script>
   new Vue({
     el: '#app',
     data: {
        str: 'abcdefg'
    },
 computed: { // 计算属性
   getString() {
     return this.str.split('').reverse().join('')
         }
      },
  methods: {
     axiosGet() {
      this.str = Date.now() + '';//原始值修改 上面的计算属性也会立马发生改变且进行缓存
        }
    }
 })
</script>
```



## 计算属性案例

```vue
<div id="app">
 <ul>
   <li v-for="(item, index) in list" :key="index">
     <span>{{item.name}}</span>
     <button @click="add(item)">+</button>
     <input type="text" v-model="item.num">
     <button @click="next(item)">-</button>
     <span>{{item.price}}</span>
     <span>单个总价：{{item.num * item.price}} 元</span>
   </li>
 </ul>
 <h2>总价:{{gotTotal}} 元</h2>
</div>
<script src="../js/vue.js"></script>
 <script>
new Vue({
    el: '#app',
    data: {
        list: [{
            name: '西瓜',
            num: 0,
            price: 3
        },
        {
            name: '香蕉',
            num: 0,
            price: 4
        },
        {
            name: '桂味荔枝',
            num: 0,
            price: 5
        }
        ]
    },
    computed: {
        gotTotal() {
            let _sum = 0;
            this.list.forEach((item) => {
                _sum += item.num * item.price
            })
            return _sum
        }
    },
methods: {
    add(item) {
        item.num++
    },
    next(item) {
                if (item.num > 0) {
                    item.num--
                }
            }
        }
    })
</script>
```



# 生命周期(重要)

注释： Vue 实例在被创建时都要经过一系列的初始化过程，在这个过程中 会调用一系列生命周期钩子函数，

​     因此用户可以在不同的阶段添加自己所需的代码方法，总结：使用户能够知道当前vue实例处在那一阶段

​     vue里面也是分同步异步的

- beforeCreate ： 创建前 --> 还不能访问 data与methods; (实际开发几乎不用)
- created()      ： 创建完成-->能够访问data与methods；还不能访问vue渲染后的DOM，因为属性虽以绑定但是DOM还未生成   (==常用==:如用于进入页面时接口请求)，只执行一次，后面不刷新不执行
- beforeMount  ： 模板编译/挂载前 绑定el确定了渲染范围，但还没渲染DOM
- mounted      ： 模板编译/挂载后(可以拿到DOM渲染后的同步元素)  (常用) 最早进入页面进行的操作
- beforeUpdate ： 更新前 检测到修改但是还未更新 ，不用 容易引发问题
- updated      ： 更新后 (可以拿到DOM的异步元素) 页面数据发生修改时获取  ，不用 容易引发问题
- beforeDestroy： 实例 销毁前，常用于一些善后工作 即销毁前要做些什么，比如定时器和hashchange事件还有滚动事件等无法自动销毁，就需要用到这个
- destroyed    ： 实例 销毁后，还是能够访问data与methods，一样能进行销毁操作，只不过它不能访问vue渲染后的DOM，相当于使用它就是中断渲染

```vue
<div id='app'>
    <p>{{msg}}</p>
</div>
<script src='../js/vue.js'></script>
<script>
 new Vue({
    el: '#app',
    data: {
        msg: 'hello'
    },
    methods: {
        fn() {
            console.log(123);
        }
    },
    beforeCreate() { //创建前阶段 undefined 这个勾子实际开发几乎不用
        window.console.log('beforCreate', this.msg)
        // console.log(this.fn());// 调用报错
    },
    created() { // 创建完成 取到 'hello'
    window.console.log('created', this.msg);
    console.log(this.fn()); // 调用成功
    }
  })
</script>
```

## ref获取DOM

- ref='div';   指令 获取DOM元素，this.$refs.div,  vue不建议频繁操作DOM

```js
<div ref="div"></div> // 绑定ref
<button @click="btnk">点击</button>
 new vue({
     el: '#app',
     data: {
       msg: 'hello'
     },
     created() {
       this.$refs.div; // undefined,获取DOM 也可以在其他方法里获取它 操作方法是一样的
   },
  methods: {
      btnk() {
        console.log(this.$refs.div)// hello
      }
   }
})
```



## $nextTick异步

注释：setTimeut的升级版   实际还是异步函数

- $nextTick(){};  在它前面的所有同步处理的数据在页面渲染完成后执行



## map()方法处理返回数据(重要)

注释：比forEach()加工数组或字符更方便，return什么就返回什么，比如只需要name值

经常用于加工字符串对象，提取需要的属性值

- 有点绕需要更详细的研究😄

```js
注意：// 是在axios的then内部进行以下步骤的
-----聊表调用处
{{ item.song.artists | fn1 }} // 有时候接口的数据结构比如详情信息接口变成了songs
// 而全局过滤器是之前按照song设置的，此时就无法正确获取，解决办法如下：
// 在接口返回参数后用map(迭代并添加song以供过滤器正确获取参数)进行处理并return
// 然后当前组件内的参数就能正确的使用过滤器的方法 fn1 进行渲染了
this.list = res.data.result.map((item,index,arr1) =>{//一般只需要item就只写item
 // 这里还可以添加对象  如下：添加是为了得到想要的数据结构，
   //item.picUrl = item.cover // 如果是MV 则需要重新赋值图片
   item.song = {
       artits:item.artits, //经过处理后artits,就被提取到新的对象里可以被使用了
       album:item.album
       //album：{name:item.name} 根据需要还可以继续添加对象数据
   }
   // return之前先经过上面的处理步骤，只需要加工后提取到的数据
   return item; // 这里还可以进行处理 比如转字符串等
 })

```



## findIndex()方法

注释：返回值 = 数组.findIndex(item,index,arr) =>{return };返回一个符合测试条件的数组第一个            元素位置，测试条件为return时返回符合条件的元素的索引号。然后结束，如果为找到就返回-1，

```js
let arr = [1, 2, 3, 3, 5, 6, 7, 8];
 let sum = arr.findIndex((item, index, tempArr) => {
     return item > 3 // return什么就返回什么 否则不返回
 })
 console.log(sum); // 索引4也就是5满足条件，然后结束不再继续查找
```



# 单元素动画

注释：单元素动画就是只有一个标签的动画，没有兄弟节点.   多元素动画差不多 使用选择器进行操作就行

vue提供了transtion的组件功能，可以给任何一下元素添加进入和离开动画

- 条件渲染v-if，  
- 条件显示 v-show,  if或者show二选一都可以
- 动态组件
- 组件根节点

```vue
 <style>
  .box {
      width: 100px;
      height: 100px;
      background: pink;
  }
  /* 进入动画 */
  .xxx-enter-active,
  /* 离开动画 */
  .xxx-leave-active {
      transition: opacity 1.5s;
  }
  /* 进入和离开时的透明度 */
  .xxx-enter,
  .xxx-leave-to {
      opacity: 0;
  }
  </style>
</head>

<body>
 <div id="app">
   <button @click="bol = !bol">点击切换</button>
   <transition name='xxx'> //必须使用transition标签包裹，并起个name名
       <div class="box" v-show="bol"></div>
   </transition>
 </div>
 <script src="../js/vue.js"></script>
 <script>
    new Vue({
       el: '#app',
       data: {
           bol: false
       },
       methods: {
       }
   })
</script>
```



# 组件

注释：封装一段功能代码， 可复用 易于维护

1. 一般公共组件放components, 路由放router，跟路由相关的组件放views,静态资源放assets



## 安装组件依赖

- npm install -g @vue/cli ： 在cmd命令窗口输入（在任意的路径都可以）

- vue -V                  ： 安装成功检测版本号

- 如果安装失败 就以管理员身份运行cmd或者window自带的命令工具 shift+右键

- npm cache clean -f    ： 是个失败 清除缓存继续安装

-  set-ExecutionPolicy RemoteSigned  ： 如果电脑系统禁止脚本 就输入这句命令

- npm install @vue/cli-service-global -g ：安装单文件依赖包

- 

  ------

  注释：使用淘宝镜像国内服务安装

- npm install -g cnpm --registry=https://registry.npm.taobao.org 淘宝镜像

  - cnpm install -g @vue/cli   淘宝镜像安装好后就使用cnpm安装
  - cnpm install @vue/cli-service-global -g

- 安装成功后使用：vue serve 文件名    : 单文件运行命令



## 组件结构分析

```vue
// template模板
<template>
  <!-- html 内不能有兄弟标签，只能由一个div在外层进行包裹，其他布局卸载里面即可 -->
  <div class="box">
    <ul>
      <li>{{msg}} </li>
    </ul>
    <button @click="btnTic">点击</button>
  </div>
</template>
<script>
// 默认导出 这里不再需要el挂载元素实例确定作用范围
// 默认导出的作用范围就是template模板
export default {
  // data现在必须是一个函数再return一个对象出去
  data () {
    return { // 每次 return的是对象将不再需要担心引用类型值的泄露
        msg:'hello'
    }
  },
  create () {
    alert(123)
  },
  methods:{
    btnTic(){
      this.msg =  Math.random()
    }
  }
}
</script>
<style>
/* 导入css样式使用 import */
@import url();
.box {
  width: 100px;
}
</style>

```



## 组件间的引用

注释：组件间的引用，注意：组件名不要使用关键词和标签名 但是改大写就不报错😁

- 导入组件：import 自定义一个 --> 组件名 from '组件的路径'
- 注册组件：组件名：导入的名字
- 使用组件：使用组件名 而不是导入名，不过一般在注册时直接就用了简写 ，简写啥就用啥，简写必须是导入名

```vue
<template>
  <div>
    <!-- 使用组件 当标签使用即可 -->
    <Top></Top>
    <banner></banner>
    <Son></Son>
  </div>
</template>
<script>
// 导入组件
import xxx from './components/Top.vue'
import xxx1 from './components/banner.vue'
import xxx2 from './components/Son.vue'

export default {
  components: { // 注册组件
    Top: xxx, // 也可以直接简写一个变量名跟上面导入保持同名即可
    banner: xxx1,
    Son: xxx2
  }
}
</script>
<style></style>
```



## 组件传值

- 父组件内的 子组件标签 处定义ref标签(类似获取DOM)
- 使用：   this.$refs.标签名 (实际就是获取到子组件的this进行使用)
- 备注：音乐播放器 研究下html5的播放事件

```js
------父组件传值子组件
1:引入子组件  2：conponents内注册  3：组件名当标签使用
<music_list ref="musiceList"></music_list>  //标签内定义ref
<button @click='btn'>点击传值</button>
methods:{
   data(){
      return{
        xxx:1
      }
  }
   btn(){
   // 通过ref标签获取到子组件的this，即可传值操作，list是子组件那边data内定义的空数组
   // 只要取到子组件的this就可以向子组件的任意需要的地方传值
   this.$refs.musiceList.list = Math.random() * 10;
    }
}

-------子组件传值父组件
<button @click='btn2'>我要修改父组件的xxx值</button>
methods:{
  btn2(){
  //子组件通过$parent获取父组件的this,向父组件内的xxx变量传值
   this.$parent.xxx = Math.random() * 99; //也可以传递自身组件内获取到的数据
  // 可以向父组件内任意需要的地方传递数据
   }
}
-------通过父组件实现兄弟组件传值
// 在子组件内通过 父组件向兄弟组件comment传值，
this.$parent.$refs.comment.commentList //父组件内的子组件comment的ref标签名即可
```



总结：路由传值需要接收如this.id = this.$router.query.id，组件传值只需要定义变量或数组接收并使用即可，无需向路由这样接收，

## 组件如何使用外部插件

注释：使用外部插件先下载 npm/npm i 插件名，如下

- 下载  ： cnpm i axios

- 导入  ： import 插件名 from '路径'

- 使用  ：  正常使用就行跟以前使用一样

  

## 组件路由的关系

- 路由对应的组件一般放在 views 下面

- 公共子组件(很多地方要用到的)：一般放在 components里面

  

# 公共组件的封装

注释：公共组件封装到components里面，并进行全局注册 --> 页面使用, 

​    封装的东西比如需要用到的参数数据 数值比如list:[] 方法比如@click='(item.id)',路由跳转等都  需要写在data和methods内，跟平常操作一样，之后就是在其他组件使用：使用步骤如下

1. 组件内导入公共组件：import list from './components/list' 哪里需要就哪里导入就行
2. 注册：   components:{musiclist}
3. 使用 ：  在合适的布局位置 将公共组件名当标签使用即可
4. 传值：   属于父传子，公共组件属子

```js
<list ref='musiclist'></list> //给标签定义ref获取DOM

this.$refs.musiclist.list //list是公共组件模块的空数组 用于接收参数
-----
```

组件使用时传递的参数如果公共组件无法识别 可以在data定义 type：'audio' 即明确了时播放功能，并且在父组件内(调用者都属于父)将播放的方式如MV赋值过去 this.$refs.musiclist = 'mv',最后公共组件的方法内还要进行if判断时mv就调转mv页面，是音乐就跳转音乐页面



## 组件全局注册

注释：全局注册后可以在所有组件使用，就不需要再每个组件页接着导入和注册了，直接用即可

```js
---在main.js注册
import 组件名xxx from './components/路径和组件名' // 导入
Vue.component('组件名abc',组件名xxx)  //全局注册,  abc就可以在全局当做标签使用了
```







# 脚手架创建

注释：脚手架 Vue.cli

- vue create 项目名 ：项目名尽量用英文

- 选择需要的插件和需求： 回车安装

- cd 项目名：  切换到项目文件

- npm i   : 安装所有依赖包

- npm run serve : 运行命令即可启动项目

  

## 脚手架文件目录说明

注释：我们写的代码都是放在src里面的

- config  ： 项目环境配置
- public  :  vue入口html
- src     :  源码目录
  - App.vue: 根组件
  - components: 公共子组件目录
    - title
  - assets:样式css’图片、静态资源目录，会被打包工具构建
    - imsges: 图片资源
    - logo  : 图片资源
  - router  : 前端路由配置
    - index.js ：路由文件
  - store   :   应用存储仓库
    - index.js: 
  - views   :    页面目录
    - hello.vue:页面文件
- static   :  纯静态资源 如图片、不会被打包工具构建
- test     ： 测试文件目录
- build    ：webpack 的配置
- utils    :  工具库
- main.js  :  入口js文件， 主要作用是初始化vue实例并使用需要的插件
- gitignore: git目录 可以将一些不需要git管理的文件添加到这里
- babel.config.js    :高版本js转换低版本js 照顾浏览器兼容性
- package-lock.json  : 下载的依赖包记录
- package.json       : 下载的插件记录
- README.md          ： 说明文件  
- eslintrc.js        :  es语法检测



## 脚手架文件详细说明

- maxin.js : 入口js

```js
import Vue from 'vue' // 导入了vue
import App from './App.vue' // 导入父组件
import router from './router' // 引入整个路由文件
import store from './store' //引入仓库文件

Vue.config.productionTip = false // 是否开启语法或其他提示 默认不开启

new Vue({ // 创建vue实例 
  router, // 注册路由
  store, // 注册仓库文件
 // 类似 render:createElement => {return createElemetn(App)} 替换了id='app' 标签
 // 相当于 读取App组件的内容创建元素 并替换了入口index.html内的id='app' 进行渲染
  render: h => h(App) // 渲染到app元素标签上
}).$mount('#app') // 将实例挂载到入口html文件的app标签 类似 el：‘#app
```



## 组件的使用步骤

- 导入组件 ：导入、注册、当标签使用
- 导入插件 ：装包、导包、使用
- 组件传值 ：父传子(ref使用)、子传父(this.$parent===父组件this)



## 图片src的变量更换问题

- 当将src进行绑定变量进行动态时， 有需要在data 将图片开始的默认路径赋值给变量时 webpack将不能识别
- 解决办法：cove:require('./路径')； 给变量加个require路径即可正常解析

## css的作用域控制

- 子组件与父组件之间如果有相同的类名，互相引入后css样式就是全局作用相互影响
- scope : 样式标签内加scope限制作用范围，缺点:只作用域标签外层的样式，无法作用组件标签内的嵌套的标签的样式

## vue深拷贝

```js
//  使用JSON方法将数据解析成字符串，之后再转换成JSON对象数据
1 var vs=[1,2,453,12,432]
2 var gets=JSON.parse(JSON.stringify(vs))
3 gets.push(0)
4 console.log(vs)
//此时vs值不会变化，两个值是独立存在的
-----封装函数实现
function getShen (obj) {
    return JSON.parse(JSON.stringify(obj))
}
export default getShen // 将函数暴露出去 哪里要使用就import引入,使用时再调用getShen(arr)即可
```



# 跨域问题

注释：跨域一般后端处理 比较方便 前端处理比较麻烦

- JSONP   ：将不同源的服务端请求写在script标签属性中，因为src属性不受同源策略的影响，
- vue代理： 只能在开发环境有用  上线还是需要后端处理



# 路由

注释：路由就是一个指向，将路径指向相应的组件地址，即根据不同的路径切换去显示对应的组件，

传统的监听页面变化是使用侦听器 并利用hashchange事件 监控页面hash值（#号后面的锚点部分）的改变进行切换，本质是前进后退，路由步骤如下



## 路由的配置

- 安装
- 导入插件 
- 注册插件
- 实例化
- 挂载
- 使用  ： 路由项配置好之后 需要在哪里展示路由出口就将路由出口放入哪里

```js
------manin.js 后期如果页面路由太多可以抽离出去放路由文件夹。main.js只做总入口
// 导入vue和根组件 因为路由出口要展示在App.vue页面
import Vue from 'vue'
import App from './App.vue'
// import router from './router/index' //导入路由文件 可以简写 router
// 导入组件
import Son1 from './components/Son1.vue'
import Son2 from './components/Son2.vue'

Vue.config.productionTip = false //开发环境提示 默认关闭

// 1、导入路由插件
import VueRouter from 'vue-router'

// 2、注册路由插件
Vue.use(VueRouter)

//3、实例化
const router = new VueRouter({ 
 //路由配置项 routes 不要写router
  routes:[
    {
      path:'/Son1', //如果是单独一个斜杠则代表默认路径
      component:Son1 // 只有一个组件component不要带s
    },
    {
      path:'/Son2',
      component:Son2
    }
  ]
})
// 4、挂载
new Vue({ // 挂载路由 类似el：'#app'
  router,
  // components,
  render: h => h(App) 
}).$mount('#app') //挂载并渲染到入口html文件的app作用区

--------App.vue页面使用
<template>
  <div>
    //相当于a标签内href属性通过路由选择了Son1文件的路径  实现了切换跳转功能
    <a href="#/Son1">">我是son1</a>
// 使用下面这种也可以跳转 里面包装的实际也是a标签，也可以手动更改如 tag=’div‘,就成了div标签
 <router-link to="./Son1">发现音乐</router-link>
    <br>
        // 路由出路 有了它App.vue页面才能使用
    <router-view />
    <a href="#/Son2">我是son2</a>
  </div>
</template>
<script>
export default {}
</script>
```



## 编程式导航(跳转路由)

a标签或者router-link标签都可以跳转，但是实际开发我们使用下面这种更方便：

```js
----根组件App.vue 设置跳转
<button @click="btnClick('/home')">跳转home页</button> //还可以这样传参路径
<button @click="btnClick('/index')">index页</button>
<router-view></router-view> // 路由出口
export default {
  methods:{
    btnClick(str){ // str就是形参 上面的home和index都算是路径实参
      this.$router.push(str) // $router相当于全局路由，只要路由配好就能用
    }
  }
}
```



## 抽离路由

注释：将入口main.js文件中的部分路由功能抽取出去放router文件内，注意：只要router挂载在main.js内就行，其他的组件和插件路由都可以抽取出去 放router文件内全局注册并暴露出来就行，这边就能获取并挂载;

- 实际就是模块化思维，定义暴露  ，外部--引入--> 使用

```js
--------router路由文件下的index.js脚本文件
import Vue from 'vue'
import ElementUI from 'element-ui' // d导入Element插件
import 'element-ui/lib/theme-chalk/index.css';// Element插件 的css样式问价
Vue.use(ElementUI) // 注册ElementUI
// 导入路由插件
import VueRouter from 'vue-router'
//Vue全局注册路由
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    routes: []
})

export default router  // 将整个路由暴露出

------main.js入口，引入router文件夹的index.js 
import Vue from 'vue'
import App from './App.vue' //跟组件
import router from './router/index.js'
```



## 在vue中使用Element UI库

1. 安装：  npm i element-ui -s
2. 引入：  在main.js 中引入， 如下：

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
```

3. 注册： 在main.js 中注册 如下：

4. ```js
   Vue.use(ElementUI); //全局注册
   ```

- 在element布局栏标签中加入 router(路由模式)， v-for循环出来的index就是导航栏对应的路由跳转path,然后将index对应的项，更改为组件路径名即可，前提是在标签内启用了路由模式，如下

```js
router 
<el-menu-item index="/news">
```

- object-fit: contain/cover; 代表完整显示如果过比例不合适就留白居中。以及最大限度适配多于的裁剪



## $route代表当前路由信息

```js
:default-active="$route.path" //默认选中当前路由下的路径
```

## $router与$route (重要)

- $router.path： 属于路由实例化对象,整个路由的管理者，管理跳转 (类似大老板)
- $route.path :  this.$route.path 获取当前路由的基本信息， (类似老板的助理)



## 路由间直接跳转

- 从一个组件直接跳转到另一个组件页面

```js
---组件直接跳转组件。在home页内定义路径
<template>
  <div class="home">
    我是home页
    <button @click="btnClick">我要跳转到xxx页</button>
  </div>
</template>
<script>
export default {
    methods:{
        btnClick(){ // 无参数直接引号写上路径即可
            this.$router.push('/xxx') //写文件夹名就行
        }
    }
}
</script>
```



## 路由传值

- 传： this.$router.query.参数名 == 值，，数据少时query可以不用 数据较多时配置模式才用
- 收： this.$route.query.参数名 == 值  。注意：接收 route不带r
- 传递过去以后 在对应界面接收，哪里需要使用数据就哪里接收 比如data数据需要或者方法里面需要，
- 注意：==路由传值的路径不需要加点直接斜杠加路径名即可，只有导入才需要全路径==

```js
---home页面传值
<template>
  <div class="home">
    我是home页
    <button @click="btnClick">跳转到xxx页面</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: 'home' // 定义需要传递的数据
    }
  },
  methods: {
    btnClick () { //  将自身数据和随机数 通过路径拼接传递给xxx页面文件
      this.$router.push((`/xxx?id= ${this.id}&num=${Date.now()}`))
    }
  }
}
</script>

--------- xxx页面接收
<template>
  <div class="index">
    我是xxx的index页
    <h3>我是index页，跳转到{{fromFgs}} </h3>
  </div>
</template>
<script>
export default {
  data() {
      return {
          fromFgs:'',//定义变量用作接收数据
          num:this.$route.query.num //这样也可以接收对面传递过来的数据
      }
  },
  created(){
      this.fromFgs = this.$route.query.id // id后面的参数
      console.log(this.$route);
  }
}
</script>
```



## 配置模式传值

注释：当数据较多时使用

```js
this.$router.push({
    path:'/路径',
    query:{
        参数：值 // 指url 及 拼接参数值
        id:this.id, // 比如这样使用变量，或者写具体值
        num:(Date.now()),
        参数2：值 // 指url 及 拼接参数值
    }
})
```



## router-link传值的2种方式

 router-link标签默认是包装的a标签效果，==自己可以更改 如 tag=’div‘,它就变成了div标签==

1. 注释：直接在router-link to='' 标签内使用参数传值.to需要绑定：

```js
 <router-link :to="`/xxx?id= ${this.id}&num=${Date.now()}`"></router-link>
```

2. 注释：router-link :to 标签的配置模式😂(传值方式真尼玛多)

```js
<router-link
  :to="{
    path: '../xxx',
    query: {
    id: this.id,
    num: Date.now()
    }
  }"
 ></router-link>
```



## 测试路由是否成功

```js
<router-link to="123">点击</router-link> // 查看url锚点是否有123
```



## default active搭配$route.path

注释：elementui的属性  默认选中当前

```js
如果直接写死默认显示某一个元素在刷新页面时会丢失当前选中项，此时使用$route.path；就能解决  
<el-menu :router='true' :default-active='$route.path'> // $route能获取当前路由信息
```

## 路由重定向(重要)

注释：

```js
const router = new VueRouter({
  routes: [
     {
      alias:'/findxxx' //跟path是一样的，如果需要网址显示别名时可以用它，一般不用
      path:'/',
      redirect:'/find' //重定向
    },
      {
      path:'*', //匹配所有如果没有该网址
      redirect:'/find' //就重新重定向到find页面
    },
    {
      path: '/find',
      component: find
    },
    {
      path: '/news',
      component: news
    },
    {
      path: '/mv',
      component: mv
    },
  ]
})
```





# 过滤器

注释：filters:{}, 作用  字符加工，返回一个新数组。数组中的元素为原始数组经过函数处理后的值，return什么就返回什么(根据处理后的条件返回)，

- 全局过滤器：定义在main.js文件内，
- 局部过滤器：定义在所在组件内，只能当前页面使用

- 注意点：它外层不能使用this ，且只能用于 {{}}插值语法，v-bind也不能用
- 调用  ： ==**{{参数 | 方法名}}**==
- 过滤器是内置的对象不需要导入 直接使用就行，在全局时就用注册Vue.filter(方法和函数都写这里面)

```js
----传统方法
fn1 (){
    let sum = arr.map(funtion(item){ 
    item.name //只需要迭代后的每一项元素的name值
    return sum.join(',') //再将接收后的值转换为字符串
)}
--------过滤器filters
<div id='app'>
歌手{{item.song.artists | fn1}} //调用 使用数据的参数名 + 函数方法名即可 得到的就是处理后的名字
  <div>
new Vue({
  data(){
      return{
        arr:[
          {name:'张三'},
          {name:'李四'}
        ]
      }
    },
  filters:{
    fn1 (arr){ // 不能使用this 因此只能传参解决 调用方法的时候传参
     let sum = arr.map(item => item.name) // 只需要提取item里面的name，map/forEach都行
     return sum.join(',') //再将接收后的值转换为字符串
}},
})

```



## 全局过滤器

- Vue.filter('方法名',function(参数){return 值})，可以跟多个参数,全局注册 filter不加s
- 调用：  与局部过滤器一样使用,  优点：所有组件都可以使用

```js
标签内使用
{{参数如item.song.artists | 方法名如formatTime}} //前面的参数是数据的参数
------组件内定义
Vue.filters('方法名'function(参数1,参数2){return 值}) //可以有多个参数
------全局过滤器-在main.js文件定义
Vue.filter('formatTime',function(arr){ // 注册了过滤器 且定义了一个方法formatTime
    return arr.map(item =>item.name.join('&'))
})

```





## 时间戳转换插件moment

注释：用于时间转换，歌曲时长处理等等

官网：https://momentjs.bootcss.com/

- 下载-- 导入--使用

```js
npm install moment --save  //下载
import moment from 'moment' // 导入
```



- 后端一般给到的时间格式是：时间戳或者 Date.now()
- 使用过滤器全局注册的时候写在过滤器内部：Vue.filter('方法名',function(参数){return moment('mm:ss')})

```js
{{time}};时间戳： 556656897838
data:{time:''}
cerated(){ // 时间戳转换 根据需要转 只要分秒就只写分秒格式
  this.time = moument(556656897838).format('YYYY年MM月DD日 HH:mm:ss') // 时间格式
}
-------使用方法 -方法需要卸载过滤器内部
// 使用方法跟过滤器一样  参数 | 方法
<td class="i4">{{ item.song.duration | formatTime }}</td>
  formatTime(time){ // 调用方法的时候传参 --处理
       return moment(time).format('mm:ss')
  },
------获取时间戳
new Date().getTime()
```



## export export default import

- import  : 一个页面可以写多个 import {名字} from '路径' 必须和export对得上名字,因为它是解构赋值，man.js那边导入的时候名字也要加 花括号 {}

- export default: 导出的值 名字可以随便起

  

# git版本管理

注释：先建立仓库再进行操作

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
查看所有远程仓库状态
git remote -v 
提交到远程仓库
git push -u origin master // 设置好号，后续只要git push即可
删除关联的联系地址
git remote remove origin 第一种
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
git merge 被合并的分支名   合并前记得拉取最新代码先，然后合并完毕再提交 否则切回分支文件就没了
接取服务器代码 (需要处在主分支，即拉取主分支最新的代码，没有更新就会提示没有最新代码)
git pull
重置代码
git reset --hard 版本号
查看log
git log
查看所有log
git reflog --oneline
拉取服务器代码至当前分支并进行替换
git reset --hard origin/远程分支名
添加多个远程仓库 
git remote add 17MOX  远程仓库名 ：推送和拉取的时候
```

- 实际开发是多人开发，为了避免冲突，需要拉取 主分支代码，再建立自己的分支，再切换到自己的分支写代码写完提交本地，再切换到主分支进行更新 合并(git merge 要合并的分支名 )，==完成再切换到自己的分支写代码。切记 切记==
- 分支写完全部代码是先add .本地缓存 再commit添加本地仓库，
- 再切换主分支拉取最新代码--> 再决定合并，合并完成进行主分支提交，然后删除自己的分支
- 如果是开发中代码没写完就先不用删除自己的分支，直接再切回自己的分支写代码即可

总结：自己写什么功能分支就起什么名字。实际工作中不需要我们合并代码一般由部门老大操作合并流程

我们一般是去老大创建的分支拉取代码(此时分支就相当于次主分支，其他同事的代码也是合并到这个次分支)



## JS深拷贝

```js
     const obj1 = {
            a: 1,
            b: ['e', 'b', 'c'],
            c: [{ h: 20 }, { f: 19 }, ['word', { g: 99 }]],
            say: function () {
                console.log('hello');
            }
        };

        // 深拷贝函数 接收一个函数/对象作为参数
        function deepClone(obj) {
            // 判断该参数不是对象或为空 就不做处理直接返回
            if (typeof obj !== 'object' || obj == null) {
                return obj
            }
            // 定义一个变量 并判断参数类型，由实参的数据类型决定它的类型为数组还是对象
            let result
            if (obj instanceof Array) {
                result = []
            } else {
                result = {}
            }
            // 遍历该数组/对象
            for (let key in obj) {
                // 判断遍历后的值是否为该对象/数组本身包含的值
                if (obj.hasOwnProperty(key)) {
                    // 如果是就将其依次拷贝给变量
                    result[key] = deepClone(obj[key])
                }
            }
            // 返回变量(结果)
            return result
        }
        let sum = deepClone(obj1);
        sum.b.e = 99;
        console.log(obj1);
        console.log(sum);
        sum.say()
        // 总结 深拷贝的意义在于重新开辟了一块堆空间而不是引用原始数据， 拷贝后的数据进行的修改不再会影响到原本数据

        // -----------浅拷贝
        const obj2 = {
            a: 3,
            b: ['e', 'b', 'c'],
            c: [{ h: 20 }, { f: 19 }, ['word', { g: 99 }]],
            say: function () {
                console.log('hello');
            }
        };

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
        arr.c.h = 55;
        console.log(obj2);
        console.log(arr);
```





























































