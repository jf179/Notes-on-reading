### Emmet语法

1. 相同标签  如: div*10        快速生成10个div标签
2. 父子级     如: div>li          生成一个div包含li标签,也可以使用*号指定数量
3. 兄弟关系 如: div+p          生成div并p标签
4. id/类名     如:  .demo, #two    前者生成类选择器   后者生成id选择器
5. 标签类      如:  p.one         给p标签生成one类名,(因为默认是div标签类)
6. 顺序           如: .pig$*10      生成10个按照顺序排列的类名div标签
7. 嵌套          如:  ul>li#two    给ul的子元素li生成一个id名two
8. 工厂模式  如:  div{寂寞的天}*10     生成10个相同且带文字的div
9. .top+.banner+.footer:  此种写法可以生成3个带类名的div盒子
10. **总结** ：**各类语法可以混合使用**

###  浏览器开发者模式

1. Elements  DOM文档元素结构的展示
2. Console     控制台输出 / 报错展示
3. Sources      源代码查看区
4. Network     查看加载时长/请求信息

# css常用属性

### 主要属性

1.  a  超链接标签  属性: href路径, target 跳转目标(默认在当前页面打开至跳转目标), 属性:  _bank跳转至新窗口打开

### table表格

1. table 
   1. 可选属性: 行<tr>, 列<td>,表头单元格<th>
   2. th 属于表格的表头 必须包含在==单独的==tr内部,
   3. 所有的表格元素都包含在 table标签内
2. colspan:指定要合并的单元格(行); 并将对应位置的单元格(行)删掉。
3. rowspan:指定要合并的单元格(列);并将对应位置的单元格(列)删掉。
4. border:指定表格边框粗细；
5. cellspacing:数值;设定单元格间距，cellpadding:数值;设定单元格内边距
6. border-collapse:collapse; 可以合并相邻的边框

### form表单

1. 表单的组成(表单域  表单控件(即元素)  提示信息)

   ```html
   <form action="url地址" method="提交方式" name="表单域名">
       用户名: <input type="text"> //定义文本输入
       密码:   <input type="password"> // 定义密码输入
       单选:   <input type="radio">女 // 定义单选按钮
       复选:   <input type="checkbox"> // 定义多选框
       vaule值: <input type="text" value="请输入">
       checked:<input type="text" checked="checked">
       提交;    <input type="submit" value="提交"> 
       重置:    <input type="rest" value="重新填写"> 
       botton: <input type="botton" value="获取短信"> 
       上传：   <input type="file" value="上传文件"> 
       label:  <label for="sex">男</label>
               <input type="radio" id="sex"> 
       下拉选项;<select>
               <option select="select">湖南</option>
               <option>山东</option>
               </select>
       文本区: <textarea row="3" cols="20"></textarea>
       提交表单: <input type="submit" value="提交">
   </form>
   ```

   1. url 用于指定接收处理表单数据的服务器地址
   2. method提交方式：  可选: get / post
   3. name 用于区分页面中的多个表单 (提交的属性值)
   4. resize:none;  禁止拖拽文本域

##### input表单元素    type 可选属性值

1. 多个单选框实现多选一,需要在多个input内启用相同的name名如:name="sex"，复选框也一样
2. vaule 值是input元素自带的属性，可定义内容值,
3. checked   定义默认选中,  maxlength  定义输入字符长度
4. image 定义图像按钮，rest 定义重置按钮
5. button 定义可点击按钮,搭配js使用 ，submit 定义提交按钮
6. label 为input元素定义标注 增加用户体验,使用for在label标签内定义一个名字，对应 input内的 ==id== 名,即可作用于标签内，目的就是增加了作用范围
7. outline: none;  取消input和文本域 默认边框颜色

##### select表单下拉元素

1. select内包含任意多个 option属性，用户多项选择如籍贯等
2. select="select"         定义默认选中项 ，简写 selected

##### textarea 表单文本元素

1. textearea 用于定义表单文本，大量书写文字的时候
2. rows定义文本区行数，cols 定义文本区最大字符数量



## 调整文字间距

注释：letter-spacing：px;   可用于调整文字之间的间距



## object-fit

注释：主要用于图片或播放器 的裁剪，适应宽高

------



### 元素要点

#### 元素的特点

1. 块级元素：默认独占一行,可以设置宽高，常见的块级元素有：div ul dl form  address  h1-h6  ol  p  table  td  
2. 行内元素: 一行可以显示多个,不能直接设置宽高,默认宽度是本身内容的宽度, 可以通过==display== 转换成块级/行内块来设置宽高，常见的行内元素有：a strong b em i span s 等
3. 行内块元素: 可以设置宽高,且一行可以显示多个,但多个元素之间会有默认间距,解决默认间距的办法：设置margin:right | left ; 为合适的==负值==即可

注意: 行内元素里面不能放块级元素, a标签除外(如果放块级元素最好吧a也转换下),    

1. display:block;转为块级元素，inline-block行内块元素，inline 行内元素
2. font-style:normal;    取消元素默认样式

#### 元素的显示/隐藏

1. visibility: visible / hidden; 可见性(使元素不可见,元素原位置继续==保留==)
2. display: block / none;   显示方式 (none使元素隐藏,==不保留==元素原有位置)  
3. float:浮动方位；只能左右浮动
4. overflow: visibile/auto/hidden/scroll;  溢出内容管理auto自动适应 scroll为元素添加滚动条 无论内容是否溢出

#### 元素/轮廓边框

1. outline: color | style | width;   轮廓的复合属性写法,画border外边 作用于图片 按钮 input 等
2. border: width | style | color;    边框的复合属性写法,      详细边框的样式看看离线文档，
3. border:复合写法 四个值分别为：左上 右上  右下 左下。顺时针。

### 选择器

​	1.并集选择器: 标签之间使用逗号分割, 如 ：div, p

​	2.后代选择器: 可以是任何标签 父标签 后面空格跟上子标签即可,如:           	      	  .pig li	

​	3.交集选择器：可以是任何标签按照各自规则书写即可，

​           如: div,p, .pig li

### 伪类选择器

1. anchor链接伪类   注意书写顺序 (==无herf属性则不作用==)

   - a:link  /设置a对象未被访问前的样式
   - a:visited /设置a对象已被访问后的样式
   - a:hover /设置a对象被鼠标悬停时的样式
   - a:active / 设置a对象被鼠标点击未弹起时的样式

2. first-child 结构伪类

   - p:first-line     /p标签内的第一个子元素 (==只作用块级元素==)
   - p:first-letter  / 选中p标签的第一个字符，(只作用块级元素)

   - p:first-child    / p标签的第一个子元素
   - p:last-child    / p标签的最后一个子元素
   - p > span:first-child  / p标签中span标签的第一个子元素
   - p:nth-child(2)         / 选择 p 元素的第二个子元素
   - p:nth-child(n+2)    /选择P元素的子元素从第2个开始，
   - p:nth-last-child(2)   / 选择P元素倒数第二个子元素
   - p:first-letter             / 选择所有P元素的第一个字母
   - :not(p)                       /选中所有除P以外的标签

3. focus 表单伪类

   - input:focus              / input获取焦点

4. 伪元素

   - :before      /在元素之前插入

   - :after         /在元素之后插入

     

     

### css三大特性

1. 层叠性

   - 用于解决样式冲突,同类标签遵循就近原则,未产生冲突的属性不层叠

2. 继承性

   - 子元素可以继承父元素的某些样式如 text-, font-,line-,以及color颜色,设置父元素的行高如1.5可以动态更改子元素的行高

3. 优先级

   - 选择器相同执行层叠性

   - 选择器不同, 则根据选择器权重执行

   - 权重可以叠加，不会产生进位问题,==注意==继承的权重为0

     ```html
     选择器             权重
     *通配符选择器        0
     元素选择器           1
     类、伪类选择器       10
     id选择器            100
     行内style样式       1000
     !important         无穷大
     max/min-width      会覆盖!important
     而max/min-width 之间相互覆盖取最大值优先
     ```

   - z-index:auto | 数值;  用于定位的元素层叠级别， auto 遵从父元素的层叠顺序。数值越小代表权重越高

### 背景属性

#### 背景图片

复合写法:

1. background:url(图片路径) 是否平铺repeat  图片位置position(上右下左)
2. background:position | size | repeat | attachment | image | color | clip ;  。
3.  position 的取值如果只写2个，  则 第一个代表X轴 第二个代表Y轴，如果只写一个值则默认X轴 Y轴默认50%即居中,如果写四个值则是:上/右/下/左
4. attahment:默认scoll随页面滚动而滚动,使用属性 fixed则可以固定位置。
5. 背景属性取值, 可以使用 ==复合写法==，如;background:red url() no-repeat fixed center top;即颜色 地址 是否平铺 固定方式 位置设定。

#### 背景色半透明

可以设定盒子元素半透明

1. background:rgba(0, 0, 0, .3); r代表红色  g代表绿色  b代表蓝色  a  .3代表透明度。注：盒子内部的内容不受影响

### 盒子模型

#### 垂直外边距合并与塌陷

1. 当两个兄弟元素相邻 其中一个设定margin-buttom  而另一个同时设置了margin-top时 会取最大值作用  而不是2个盒子外边距的相加和，
2. 当两个嵌套关系的盒子 同时设定了margin-top即上外边距时，会产生塌陷，==不会产生塌陷的前提：父元素定义了边框。== 让边框透明即可，而如果实际中我们不需要边框呢-- 解决办法：为父元素设置上内边距 或 添加overflow:hidden;  

#### 盒子模型的自适应大小

子元素宽度如未直接设定默认为父级的100%(图片除外),高度默认为其内容的高度

常规盒子设置内边距会撑大盒子,

1. box-sizing: border-box; 使边框自减去盒子总宽高,即自适应
2. 使用宽度分离原则: 嵌套使width宽度独立占用一层标签,内外边距与边框属性书写在子元素身上即可，但是新的问题又会产生，如果边距过大超过父盒子时 子元素又会溢出父元素，因此推荐使用第一种盒模型方式,或者根据需要使用==overflow:hidden;==
3. margin：方位；   4个值分别代表 上右下左,  2个则时为:上下与左右
4. 行内元素居中:      给父元素添加 text-align:center;   即可
5. 元素默认宽度是父级的宽度,高度由内容决定,如果使用margin:0 auto;则会自动分配空间

#### 元素的水平/居中/对齐

1. text-align; 设置在父元素上  前提是转换成inline-balok，
2. margin：0 auto；
3. 开启弹性布局：justify-content:center;   align-items;center;
4. vertical-align: middle/top/bottom;  行/行内块元素如图片表单与文字中线对齐，只对行内及行内块元素有效
5. 图片底部缝隙解决：1 转成块级元素，2 使用vertical-align:bottom;(推荐)

#### 盒子阴影

1. box-shadow:x轴 y轴 模糊度  v轴(远近距离)   rgba(0,0,0,0-1之间)

### 浮动(float)

浮动可以改变元素的默认排列方式,如多个块级元素纵向用标准流，横向用浮动

1. 浮动的元素脱离标准流，不再占有原来的位置,浮动元素只影响后面的元素
2. 任何元素都可以浮动，添加浮动之后就具有行内块元素的特性,无需再进行行内块转换
3. ==浮动的盒子不会造成外边距塌陷==

#### 浮动元素的布局准则

1. 浮动元素布局搭配标准流，即---- 用标准流父元素进行上下排列 内部再使用子元素浮动进行==横向排列==, 浮动排列的盒子一行显示且没有缝隙
2. 注意:一浮全浮。布局尽量不要进行太多层的嵌套
3. 导航栏一般采用li标签包含a链接,防止关键字堆彻风险,且可以增加点击范围

#### 清除浮动带来的影响

由于浮动的元素不再占有原来的位置，布局时在父元素不方便给出固定高度的时候，此时如果子元素进行了浮动就会导致父元素的高度为0，此时就需要清除浮动

1. 为==父元素==添加 ：overflow:hidden;   <u>ps</u>:此方法无法显示溢出部分

2. ```css
   .clearfix:after{ // 在(元素)...后插入伪元素。
       content:"";  // 生成虚拟内容块
       display:block;  //必须是块级元素
       height:0;
       clear:both;  // 清除两端的浮动影响
       visibility:hidden;   //可见性=隐藏
   }   // 然后在需要清除浮动的父元素类名内部直接调用 clearfix 如: <div class="btn clearfix">即可
   ```

3. ```css
   双伪元素清除浮动
   .clearfix:before,
   .clearfix:after{
       content:"";
       display:table; // 必须是块级元素
   }
   .clearfix:after{clear:both;} 
   .clearfix{*zoom:1;} // 照顾IE7以下低版本浏览器
   在父元素内部调用即可
   ```

#### 清除浮动的前提

1. 父级元素未设置高度(不方便给出固定高度即:需要让内容自动撑开)

2. 子盒子浮动，且影响后面元素的布局时，

   给添加浮动的元素设置margin:bottom;时需要精确计算父盒子的高度值，

#### 浮动小技巧

1. 一排浮动的盒子如果设置了边框,相邻的边框会产生1+1大于1的情况，即相邻边框变粗，
2. 利用margin:负值;  使相邻的边框叠压即可解决，
   1. 如果此时想让鼠标经过某个相邻盒子显示四个边框，那么使用z-index层叠权重即可，（前提是设置了相对定位，相对定位的盒子会压住其他盒子而如果相邻的盒子都加了相对定位就使用z-index）

#### 行内块小技巧

1. 父元素没有宽高的居中办法,使用text-align:center; 内部子元素即可居中
2. 将a标签转换成行内块,可以进行分页按钮设置

###  定位(position)

定位可以让盒子自由在某个盒子内部移动位置/固定，并且可以压住其他盒子

#### 定位的组成

定位模式+边偏移  （即定位方式+移动位置(坐标)）定位模式如下

1. relative:  以自身位置为参照坐标,移动后原来位置继续占有/不脱离标准流.
2. absolute:以祖先元素为参照坐标, 移动后不再占有原来位置/ 脱离标准流.
3. fixed :  固定在浏览器可视区的某一位置,不随滚动条而滚动. 脱离标准流
4. 1
   1. 子绝父相: 即子元素使用absolute绝对定位时,必须搭配父元素relative，来进行范围限制
   2. fixed小技巧: 固定定位的盒子走可视区(版心)left:50%; 再让固定定位的盒子margin-left走版心宽度的一半,即可实现右侧外固定，垂直居中同理

####  定位的叠放次序

1.  X 水平轴   Y 垂直轴   Z 三维轴(即空间轴), 布局中如果出现盒子重叠的情况,可以使用 Z轴 z-index 来控制盒子(同一坐标位置)的前后排列次序，
2. z-index:正整数/负整数/0;   数值越大越往上,默认是auto 即按照顺序层叠 后来者居上,==只有开启定位的盒子才有z-index属性==
3. 开启绝对定位的盒子不能再通过 margin: auto; 进行水平居中,解决办法left:50%; 再使用margin-left:负自身宽度的一半；
4. 开启固定/绝对定位的盒子与浮动类似,行内元素也可以直接进行宽高设置块级元素设置固定/绝对定位宽高默认为其内容的大小

浮动元素只会压住其后面标准流的盒子 不会压住盒子内的文字内容，因为浮动本身就是设计用来进行图文环绕展示的，而==绝对==定位的盒子会将后面的标准流元素整个压住

#### 布局的准则

一个完整的网页布局(骨架)，由标准流、浮动、定位组成

1. 标准流：使盒子上下排列
2. 浮动：    使多个块级元素一行显示/左右对齐
3. 定位：    有层叠特性,可以使多个盒子前后上下自由移动叠压来显示,

### 字体图标的使用

1. 下载字体图标文件---打开style.css复制@font-放入css样式表--打开demo.html--再将fonts文件夹放在根目录下-
2. 然后在demo.html里面复制想要使用的图标代码放入需要使用的html文档标签内即可

#### 三角形的做法

1. 设置一个没有宽高的盒子--给每个角设定边框粗细+实线+背景颜色--此时可以根据需要将其中三个边框的颜色同时设置为透明状即可得到一个三角形，
2. 调整边框的大小可以调整不同形状值的三角
3. 使用定位+负值--可以让三角形凸出在父盒子外部
4. 设定2个边框配合2D旋转可作出倒三角

#### 单行/多行文本溢出省略

```css
white-space:nowrap; 强制一行显示
overflow:hidden; 溢出部分隐藏
text-overflow:ellipsis; 用省略号代替溢出部分
```

```css
overflow:hidden; 溢出部分隐藏
text-overflow:ellipsis; 用省略号代替溢出部分
display:-webkit-box; 开启弹性盒子模型
-webkit-line-clamp:2; 限制在一个块级元素显示的文本行数值
-webkit-box-orient:vertical; 设置检索伸缩盒子的子元素排列方式
```

### HTML5 新增语义化标签

1. header:  头部标签   2. nav:  导航标签
2. article: 内容标签     3. section:   定义文档区域 - 类似div
3. aside :  侧边栏标签  4. footer:   尾部/底部标签

#### 新增input表单元素

以下新增标签必须包含在form标签内部，提交时才能进行验证

1. search: 搜索          2. email: 限制输入类型必须为邮箱
2. url: 必须为url        3. date: 必须为日期类型
3. month:必须为月   4.week:必须为周
4. time:必须为时间     5. number:必须为数字类型
5. tel:手机号码            6. color:生成一个颜色选择表单

#### 新增表单属性

1. required: 内容不能为空        2. placeholder:提示文本信息/==占位符==
2. autofocus: 文档加载完毕后自动聚焦到指定表单
3. multiple: 可以多选文件提交
4. autocomplete: 根据用户前期输入记录进行提示选项,默认打开:autocomplete="on",关闭 autocomplete="off"

#### 新增选择器

新增的选择器极大的提高了效率,对相同元素的选择不再需要单独使用类名

##### 新增属性选择器  (权重10)

1. p[btn] :                 选择具有btn属性的p元素

2. p[btn="val"] :      选择具有btn属性且属性值等于val的p元素==(重点使用)==

3. p[btn^="val"] :    匹配具有btn属性且值以val开头的p元素

4. p[btn$="val"] :    匹配具有btn属性且值以val结尾的p元素

5. p[btn*="val"] :    匹配具有btn属性且值中包含有val的p元素

   ```css
   input[value]{}        1
   <input type="text" value="输入账号">
   <input type="text">  //end
   input[type=text]{}    2
   <input type="text">  |  <input type="password">
   div[class^=icon]{}    3 结尾同理
   <div class="icon1-data"> |<div class="icon2-data">
   ```

##### 新增结构伪类选择器

1. p:first-child:                   匹配父元素中的第一个子元素p

2. p:last-child:                    匹配父元素中最后一个子元素p

3. p:nth-child(5n):            以5为参照往上递增如: ==5 10 15 20 25....==

4. p:nth-child(even/odd): 匹配偶数行/奇数行。写2n/2n+1也代表偶/奇数

5. p:nth-child(n)：          匹配父元素中第n个子元素p。n代表第几个,n+2代                                              

   ​                                         表从第二个开始算起(包含后面的所有元素)多个。     	                                  ==-n+2  代表前2个 包含第2个==

6. p:first-of-type:               指定类型p的第一个元素

7. p:last-of-type:                指定类型p的最后一个元素

8. p:nth-of-type(n)            指定类型p的第n个元素

   ```css
   ul li:nth-child(1){}
   <ul>
   <li>第一个</li>
   <li>第二个</li>
   <li>第三个</li>
   </ul>          选择ul里面的li标签第一个
   ```

   **nth-child与nth-of-type的区别**：

   当父元素下面有多个子级元素(即相同的子级间=兄弟元素),此时nth-child就无法进行精确选择,就是需要用到nth-of-type,它会先区分指定的子元素再进行匹配,

##### 新增伪元素选择器(==重点==)

伪元素选择器可以利用css创建新的标签,不真实存在html文档内部 (**权重为1**)

1. ::before              在元素内部的前面插入内容

2. ::after                  在元素内部的后面插入内容

   ```css
   div::before{
       content:"字符/符号/数值"; // 生成内容
       可以使用定位/转换/图片等属性
   }
   <div>我</div>   
   before与after伪元素属于行内元素,无法设置宽高,需要转换才行
   <常用于输入框和一些小图标的场景>
   ```

##### 新增滤镜filter

图片模糊处理

```html
img{
    filter:blur(4px); /数值越大越模糊
}
img：hover{
    filter:blur(0); /鼠标经过显示原图
}
新增属性处理函数
div{
    width:calc(100% - 30px) /子盒子永远比父盒子小30px
}
```

#### 新增过渡动画(transition)

transition: 需要过渡的属性  花费时间 运动曲线 何时开始；书写在作用元素上

1. 属性: 宽高 背景颜色 内外边距，all 代表所有属性，
2. 花费时间:  单位秒  (必须有单位)   如：0.5s/1s
3. 运动曲线：默认ease (可以省略)
4. 何时开始：单位是秒  (必须有单位)  如:预设触发时间 3s 后开始,默认0

```
div{
    transition:all .5s ease-in 3s;
} 
即:所有属性  花费0.5秒  ease可选由快到慢/由慢到快  3S后触发开始
过渡属性经常搭配 :hover  使用
```

#### 新增视频标签



```css
<video src="url路径"> </video>
可选属性
autoplay="autoplay"  视频准备就绪后自动播放,谷歌浏览器需搭配静音
muted="mured"        静音播放
poster="url路径"      加载等待时的画面图片
loop="loop"          播放完毕继续循环
controls             向用户展示播放控件
width-height         设置播放器宽高
```

#### 新增音频播放器

```css
<audio src="url路径"> </sudio>
可选属性
autoplay="autoplay"  音频准备就绪后自动播放,谷歌浏览器需搭配静音
muted="mured"        静音播放
controls             向用户展示播放控件
loop="loop"          播放完毕继续循环播放
```



### 网站favicon图标

1. 借助第三方网站将png图片转换成icon再放入文件夹根目录再导入使用即可



# css3 动画

## 2D变形(transform)

可选属性: 平移translate  旋转rotate   缩放scale  transition过渡时间 等

### 平移translate

```css
transform:translate(x,y) // x轴,y轴 如果单独移动一个轴另外一个轴写0即可, 
transform:translateX(100px) // 也可以这样单独写一个轴
transform位移的特性：不影响其他元素的位置。百分比单位仅相对自身元素,
利用百分比配合定位 可以动态的使盒子水平/垂直居中,对行内标签没有效果
position:absolute; top50%;left:50;
transform:translate(-50%,-50%)
```

### 旋转rotate

```css
transform:rotate(45deg) /旋转45度 
倒三角做法 /利用伪元素插入一个盒子 根据需要设置2个边框进行旋转
  div::after{
         content: '';
         position: absolute;
         top: 8px;
         right: 15px;
         width: 15px;
         height: 15px;
         border-right: 1px solid #000;
         border-bottom: 1px solid #000;
         transform: rotate(45deg);
         transition: all 0.5s; // 旋转向上的过渡时间
     }
   // 鼠标经过让旋转盒子再倒旋转向上
 div:hover::after{
         transform: rotate(225deg);
         margin-top: 7px;
     }
```

### 设置2D转换的中心点 transform-origin

```css
transform /默认以自身中心点为延展点,
transform-origin:x y; //修改中心点(谁作用 就给谁设置) 默认50%
/ 可选方位如:left right bottom top center或者百分比


```

### 缩放scale

```css
transform:scale(x,y)   1相当于本身宽高 2 放大2倍 0.1-0.9即缩小
scale 也可以设置转换中心点进行缩放 默认以中心点延展,且不影响其他元素
额外知识点: cursor：pointer;  光标样式   小手
```

### **2D转换注意点**

1. 复合写法

   ```css
   transfoem:translate() rotate() scale(); 属性间需要有空格,按照顺序 先位移 后旋转 再缩放
   ```

2. 位移 缩放不影响其他元素盒子,设置转换中心点的参数可以是百分比像素或者方位名词

3. animation 3D动画专用,其他属性基本都是通用的如过渡 变形和轴

## 动画(animation)

动画相比较过渡,可以实现更多的变化 控制 自动播放等

1. 基本使用：1 定义   2.使用

   ```css
   定义动画帧:
   @keyframes move{ // moveji即动画名 哪里使用哪里调
       0%{  //起始状态时 使用form也行
           transform:translateX(0px)   }
       100%{ //结束状态时 使用to也行
           transform:translateX(100px) }
   调用：
   复合写法
   animation:动画名 持续时间 运动曲线(linear/ease) 触发时间 播放次数 是否反方向   动画开始或者结束时状态；
     forwards 停止在动画结束时位置 
     alternate 动画结束后回到起始状态
     infinite 播放无限次
     steps(步长数值) 配合大小/宽度, 与运动曲线冲突只能2选一
    animation-play-state:running/pause; 鼠标悬停时是否   暂停或播放此属性不能进行复合写法 只能单独书写
   ```

2. 定义动画帧时使用的如果是精灵图背景就用background-position:X,Y;

3. 平移使用ease/linear,  动画帧(精灵图背景)使用steps 步长，

   ```css
   div {
    position: absolute;
    width: 200px;
    height: 100px;
    background: url(./Upind/bear.png) no-repeat;
    多个动画名用逗号隔开即可
    animation: w 1s steps(8) infinite, c 1s forwards;
     }
   @keyframes w{
       0%{background-position: 0 0;}
       100%{background-position: -1600px 0;}
   }
   @keyframes c{
       0%{left:0;}
       100%{left:50%}
       transform:translate(-50%，0); /走自身50%实现X轴     居中
   }
   ```

## 3D动画

### 3D变形 (transform)

特点:视距-----近大远小   物体后面遮挡不可见

三维坐标

1. x轴:  水平向右    左负 右正
2. y轴:  垂直向下    上负 下正
3. z轴:  垂直屏幕     外正 里负

简写: transform:translate3d(x,y,z)==不能省略,必须有值/0都可以==。

### 3D透视(perspective)

想要实现3D效果必须借助于 perspective 视距属性,单位必须是像素PX,且必须书写在其父元素身上。

```css
div{
    perspective:500px;
}
li{
  width:200px; height:200px;
  transform:translateX() rotateX/Y/Z/3d(45deg,45deg,)
}
3D的rotateX 即沿着X轴上下旋转  rotateY 即沿着Y轴左右旋转
rotateZ 即视距方向顺时针旋转
```

1. ==3D的旋转属性：rotateX： 即沿着X轴上下旋转  rotateY 即沿着Y轴左右旋转rotateZ 即视距方向顺时针旋转==
2. transform-style:preserve-3d;开启3D环境,默认关闭,==书写在父元素身上==用于多个子盒子间作协调效果
3. transfoem:translate() rotate() scale(); 属性必须  先位移 后旋转 再缩放,动画效果也可以先旋转

# 浏览器私有前缀

1. -moz- : 代表firefox 火狐浏览器

2. -ms- ：代表ie浏览器

3. -webkit- : 代表Safari、chrome 

4. -o-  :        代表Opera  浏览器

   ```css
   -webkit-border-radius:10px;
   border-radius:10px;
   这样书写代表兼容性
   ```

   















 



