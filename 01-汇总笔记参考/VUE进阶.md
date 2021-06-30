# VUE进阶

注释：vue插件：vetur语捷语法提示

## @关键字

- @表示一个路径，如img src='@assets/logo.jpg'; 用于简化路径嵌层时查找，
- 导入组件和插件时也可以用如：import hello from '@/components/hello.vue'
- css样式的使用：@import url('~ @assets/index.css'); url里面开头是~波浪线接@中间没有空格😁

## name的使用

注释：在页面标签内或方法内些个name名，有利于VUE调式时使用能方便的找到页面结构



## vue脚手架中使用less

注释：less预处理器，官网有说明

- 安装：npm install -D less-loader less
- 使用：在组件样式style标签中 使用如下;如果报错就查看是否版本问题、换一个低版本安装

```css
<style lang='less'></style>
```



# lodash函数库的使用

注释：强大的函数库

- 安装：npm install lodash --save
- 全局导入：import lodash from 'lodash'
- 全局注册：Vue.prototype.$lodash= lodash
- 使用：this.$lodash或直接书写 _.cloneDeep()这样





## 慕客的使用

注释：进入项目设计稿里面有开发 模式，预览模式，

- 开发模式可以显示尺寸样式css代码、 下载切图操作等(下载的图片报解压里面有2张图，1张2倍1张1倍)
- 预览模式：专注于预览
- 清除内外边距在App.vue根组件设置😁
- 如果设置的页面宽度需要更改最好也在App.vue 因为它就是路由展示口

```css
html,body, .app{ // 给它设置100%高度 否则其他组件内的最外层元素就是靠内容决定高度
    height: 100%;
}
```

## 本地跨域

- 在C盘根目录建立：C:\MyChromeDevUserData 文件夹
- 再创建一个谷歌浏览器的快捷方式
- 在快捷方式上点击右键==》属性==》目标输入框里最后加上(记得要有一个空格)  --disable-web-security --user-data-dir=C:\MyChromeDevUserData， --user-data-dir的值就是刚才新建的目录。
- 点击应用和确定后关闭属性页面，并打开chrome浏览器。
- 提示有 你使用的是不受支持的命令行标记“--disable-web-security”相关的提示，说明chrome又能正常跨域工作了。



## 基地址使用

```js
//将基地址定义成变量 再采取拼接参数的方式，参数记得再加引号
<img class="codeImg" :src="baseURL + '/captcha?type=login'" alt="">
data () {
    return {
      form: {//将要用的属性集合到一个对象里面方便统一管理获取
        phone: '', // 手机号
        password: ''
      },
      //将地址定义成一个变量
      baseURL:'http://127.0.0.1/heimamm/public'
    }
  }
}
```



## 表单验证

- 使用elementui提供的验证方式，不会就看它官方文档，里面除了校验还有事件方法正则等供使用



## 错误集合

- Invalid prop: type check failed for prop "rules". Expected Object, got Strin 验证规则类型错误，一般是:rules="rules"前面没有加冒号，或者value也就是验证规则的数据类型不对



# 环境变量

注释：将接口赋值给变量 以便复用，叫做基地址，而接口地址单独放一个文件进行全局配置，就不需要再每个组件都定义一次基地址了。也方便修改地址，就叫做换将变量。环境变量分2种：开发环境和生产环境

1. 开发环境：.env.development  :直接在根目录建立此文件 只在生成环境有效
2. 生产环境：.env.production   :直接在根目录建立此文件  只在开发环境有效
3. 使用步骤如下

```js
-----创建env.development文件 并配置环境注意大写
VUE_APP_BASEURL = http://127.0.0.1/heimamm/public
------组件间使用
// 意思是将环境基地址赋值给baseURL 使用时跟之前一样 变量拼接参数菊科
baseURL: process.env.VUE_APP_BASE //将环境进程赋值给变量，并重启npm runserve
```



## axios封装

注释：将网络请求的东西封装到工具文件夹

```js
// utils 文件 专门用于存放处理网络请求的代码 
// 1 导入
import axios from 'axios'
// 2 创建一个自定义 axios 实例副本
  var instance = axios.create({
      baseURL: 'http://127.0.0.1/heimamm/public'
  })
// 3 将实例副本暴露出去
export default instance  // 这个可以直接到组件内使用也可以接着抽离api封装 如下

-----抽离网络请求继续封装成api接口函数
// 用于存放所有的网络请求
// 导入封装的axios实例副本 _http就是axios暴露的instance 相当于向用于组件内的instance单独再这里又进行了短信获取的封装
// 同一个组件如果用的都是这个封装api的功能只需要导入一次在大括号写上对应的方法即可
import _http from '@/utils/request.js'
// 封装获取短信接口  按需导出 外部组件也是按需导出
export function getCode({
    code,
    phone
}) {
  return _http({
      url: '/sendsms',
      method: 'POST',
      data: {
          code: code,
          phone: phone
      },
      //携带kooie
      withCredentials: true
   })
}
------组件导出使用
import { getCode,可以按需导出多个方法函数} from "@/api/index.js";  
getCode({}) // 网络请求写在内部跟axios一样
```



# axios拦截器

注释：分为 请求拦截器 与 响应拦截器，实际是axios提供的一组回调函数 用于在特定的时候添加自定义逻辑

- 请求拦截器 ： 请求之前触发的回调函数 - 对请求做些什么要求
- 响应拦截器 ： 数据响应返回时触发的回调函数，-对响应数据做些什么 


```js
// 添加请求拦截器  谁 要用它，那么就用谁替代axios。比如axios的实例副本变量名那就将其替换开头的axios,相当于axios发起请求时也会调用拦截器进行处理 如下
var instance = axios.create({
  baseURL: 'http://127.0.0.1/heimamm/public', // 当前 instance 副本发送请求时的基本地址
  withCredentials: true // 发送请求时，携带 token
})
-----拦截器 instance替换下面的开头axios 表示组件调用instance接口时 拦截器也会生效
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```





# token的封装

```js
--封装成api接口
// 设置
function setToken (value) {
  window.localStorage.setItem('token', value)
}

// 取值
function getToken () {
  // 这里的 return 必须要写，否则将来外界取不到
  return window.localStorage.getItem('token')
}

// 删除
function removeToken () {
  window.localStorage.removeItem('token')
}

// 暴露给外界
export { setToken, getToken, removeToken }
------组件内按需导入 
import { setToken, getToken } from '@/utils/token.js'
// 登录成功后保存token
 setToken(res.data.token) // 这就相当于传参给封装好的api
----如果不封装的话就是这样用
window.localStorage.setItem('token', res.data.token) //将成功后的token给token存储
```



## 非组件中跳转页面

注释：在js页面中处理过期token并跳转登录页面

```js
--导入封装好的token接口
import { getToken, removeToken } from '@/utils/token.js'
----响应拦截器
instance.interceptors.response.use(
function (response){
    // 206表示token过期
    if (response.data.code === 206) {
    // 提示用户 token 过期
    Message.error('token 错误')
    // 将过期的 token 清除
    removeToken()
    // 跳转到登录页面
    router.push('/login')
   }
 }
)
```



## 嵌套路由

注释：当业务逻辑复杂以后如一个组件嵌套多个子组件 就需要嵌套路由进行跳转管理

```js
---一级路由 出口放App.vue内  <router-view></router-view>
import login from './views/login'
import home from './views/home'
----------------------------------
二级路由
import data from '../views/home/data'
import data user '../views/home/user'

---- 路由页面 router.js文件内导入子组件
const router = new VueRouter({
routes:[
    {path:'/login', component:login},
    // 此处 children:[] 就是一级路由home下的嵌套子路由
    {path:'/home', component:home, children:[
    // 子路由下面如果有页面结构需要还可以继续children:[]进行嵌套跳转
        {path:'/home/data', component:data},
        {path:'/home/user', component:user}
    ]},
  ]
})
------------
子路由出口 比如子组件同属home就放home根组件内 <router-view></router-view>

```



## 路由元信息

注释：用于设置显示页面的 元标签meta 内的 title标题

```js
var router = new VueRouter({
  // 添加当前项目的路由选项
  routes: [
    // 路由重定向
 {
    {
    path: '/login', // 登录的路由
    component: Login,
    meta: { //设置路由元信息
      msg: '登录'
     }
  },
    path:'/',
    redirect:'/home',
      children:[
      path: '/home/chart',
      component: chart,
      meta:{ // 设置路由元信息
      msg:'我是元信息😁'
    }
   ]
  }
]
-----导航守卫
 // 使用路由副本的实例名 创建 前置导航守卫 函数
router.beforeEach((to, from, next) =>{
      next() // 决定是否要执行
// 将路由元信息的属性值赋值给 文档的title 标题显示
  document.title = to.meta.msg
})
```







# 导航守卫

注释：从一个路由中跳转到另一个路由中时， 如果要执行一些逻辑代码，可以使用导航守卫，

- to   : 跳转去哪里   (目标路由的信息)
- from : 从哪里来 (发起跳转的路由 的信息，即本身信息)
- next(): 回调函数，是否执行跳转

注释：又分为 -> 前置导航守卫 和 后置导航守卫，在路由文件内使用路由实例名新建一个函数

  函数内书写落实代码并调用插件导入名如 NProgress.start(),后置一样 改NProgress.done()

1. router.beforeEach((to,from,next) =>){路由进入前的处理代码}; 全局前置导航守卫
2. router.afterEach((to,from) =>){//路由进入后的处理代码}；     全局后置导航守卫



##搭配nprogress进度条

注释：路由导航跳转时显示的进度条效果

- 在前置守卫(跳转前) 开启进度条效果
- 在后置守卫(完成进入后) 关闭进度条

```js
// 导入进度条插件 和 css样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 使用路由副本的实例名 创建 前置导航守卫 函数
router.beforeEach((to, from, next) =>{
    // 设置进度条
      NProgress.start()
      next() // 决定是否要执行
})
// 后置守卫
router.afterEach((to, from) =>{
  //设置进度条关闭时间
  setTimeout(() =>{
    NProgress.done()
  },500)
})
```



## 总结

注释：路由拦截器放工具文件夹 axios实例副本下面  ，token存取删除接口都封装放工具文件夹token文件内，路由跳转主要放路由文件内，嵌套路由。路由元信息、导航守卫也都是放路由文件；

axios请求都封装好放API文件内，

封装好的文件根据需要可以互相导入进行使用处理



# VUEX详解

注释：😏 vuex 是专门用于vue应用程序的 状态管理 模式， 本质是 公用数据管理与共享，主要用于大型多页面开发，数据复用 数据状态共享与管理

1. store  :  建立仓库存放文件
   1. npm i vuex --save   : 下载
   2. 导入 
   3. 注册
   4. 创建实例仓库，
   5. 组件访问 ：{{ this.$store.state.数据名 }}  

```js
-----main.js 开发中会将vuex抽离出去封装
// 导入vuex
import Vuex from 'vuex'
// 注册Vuex
Vue.use(Vuex)
// 创建一个Vuex仓库对象
var store = new Vuex.Store({
  state: {
    msg: '我是vuex共享数据'
  }
})

// 挂载出去
new Vue({
  router, // 挂载路由
  store, // 将vuex仓库实例注册到Vue
  render: h => h(App)
}).$mount('#app')

------组件内使用
<div> 我是vuex {{this.$store.state.msg}} </div>
总结：开发中将抽离出去专门放一个仓库文件  store
```



## vuex单独封装

- 创建store 仓库 新建index.js 文件
- 导入vue 和vuex
- 注册vuex 并创建实例仓库
- 将封装好的接口暴露出去
- 在main.js 导入并挂载即可
- 组件内 {{this.$store.state.数据名}};使用即可

总结：状态管理state内的 数据可以增加，多个组件可以共享数据并使用，某个组件修改了store的组件数据，共享数据的成员组件内使用的数据将一起被改变🤔

```js
// 专门管理Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 注册Vuex
Vue.use(Vuex)
// 创建Vuex实例对象
var store = new Vuex.Store({
    // 公用数据
    state: {
        msg:'我是vuex',
        userInfo:{} // 用户信息 可以从登录页面赋值过来
    }
})
// 暴露出去
export default store

---------main.js 导入 并挂载
import store from '@store/index.js'

new Vue({
  store, // 将vuex仓库实例挂载到Vue
  router, // 挂载路由
  render: h => h(App)
}).$mount('#app')
-----某组件
// 将登录的用户信息 赋值给Vuex的state数据管理的userInfo
this.$store.state.userInfo = this.useInfo 
组件内使用 
<img :src="baseURL + '/' + this.$store.state.userInfo.avatar" alt="" />
<span class="span1">{{ this.$store.state.userInfo.username }},您好</span>
```



# 组件传值

注释：父传-> 子接props;  子传$emit 父接 @属性名



## 父传子

- 父传子： ==单项数据流== 只能在父组件进行修改，不能在子组件内修改
- 在父组件的 子标签内定义 属性名='属性值'， 子组件接收 ->  props:['abc'],

```js
<template>
  <div class="f">
    <h4>父组件 {{msg}} </h4>
<!-- 将子组件当做标签使用 将要传送的值、赋值给自定义属性abc -->
    <son :abc="msg"></son>

<!-- 只能通过组组件进行数据修改 -->
<button @click="changAbc">点我修改msg</button>
  </div>
</template>
<script>
// 父传子  导入子组件
import son from "./son";
export default {
  data() {
    return {
      msg: "father",
    };
  },
  // 注册子组件
  components: {
    son,
  },
 methods: {
  // 修改数据
  changAbc() {
   this.msg = "changed";
   },
 },
};
</script>

---------子组件接收使用
<template>
<div class="s">
 <h4>子组件</h4>
 <!-- 传递过来的属性通过props接收后 与data的使用方式一样 -->
   <div>这是父组件传过来的 {{abc}} </div>
</div>
</template>
<script>
export default {
// 子组件接收 自定义属性变量abc (与data的使用方式一样)
 props:['abc']
}
</script>

------根组件App.vue
// 将父组件当做标签展示
<father></father>
//导入父组件
import father from '.components/father'
export defatlt {
  // 注册父组件
    components:{
        fathet
    }
}
```



## 子传父

注释：通过$emit('方法名', 参数值)传递， 父组件接收 -> 子组件标签内 @方法名='自定义方法名'

使用：将属性名当做参数传入事件方法内，进行赋值即可

- 子传父也可以不带参数直接，操作还是一样的，也叫做子组件调用父组件方法

```js
--子组件
<template>
<div class="s">
 <h4>子组件</h4>
<div>子组件的 {{msg}} </div>
<button @click="pass">点我向父组件传值</button>
</div>
</template>
<script>
export default {
  data() {
      return {
          msg:'son'
      };
  },
  methods:{
      pass(){
    // 将参数从子组件传入父组件 passValue就是给父组件那边接收用的方法名 msg就是参数
    this.$emit('passValue', this.msg)
      }
  }
}
</script>

----------父组件
<template>
 <div class="f">
   <h3>父组件</h3>

   <!-- 使用子组件 -->
   <!-- 子组件传递的passValue方法 在子组件标签上 @接收使用 -->
   <son @passValue="getValue"></son>
   <!-- 接收后的值处理后使用 -->
   <div>{{ mymsg }}</div>
 </div>
</template>
<script>
// 导入子组件
import son from "./son";
export default {
  // 注册子组件
  components: {
    son,
  },
  data() {
    return {
      mymsg: "",
    };
  },
  methods: {
    // 将@接收的passValue当做参数使用 它对应的就是子组件的this.msg
    getValue(passValue) {
    // 将接收的参数赋值给data中的mymsg
      this.mymsg = passValue
    },
  },
};
</script>

------根组件App.vue
// 将父组件当做标签展示
<father></father>
//导入父组件
import father from '.components/father'
// 导入子组件 
import son from './components/father'
export defatlt {
  // 注册父子组件
    components:{
        fathet,
        son
    }
}
```



## 富文本编辑器

注释：vue生态资源内都有各类插件和资源使用

















