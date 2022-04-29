# 开发一个前端模块可以概括为以下几个步骤：
  （1）写静态页面、拆分为静态组件；
  （2）发请求（API）；
  （3）vuex（actions、mutations、state三连操作）；
  （4）组件获取仓库数据，动态展示；

# 1、vue文件目录分析
  1.public文件夹：静态资源，webpack进行打包的时候会原封不动打包到dist文件夹中。

  2.pubilc/index.html是一个模板文件，作用是生成项目的入口文件，webpack打包的js,css也会自动注入到该页面中。我们浏览器访问项目的时候就会默认打开生成好的index.html。

  3.src文件夹（程序员代码文件夹）
    assets： 存放公用的静态资源
    components： 非路由组件（全局组件），其他组件放在views或者pages文件夹中
    App.vue： 唯一的跟组件
    main.js： 程序入口文件，最先执行的文件

  4.babel.config.js: 配置文件（babel相关）
  package.json: 项目的详细信息记录
  package-lock.json: 缓存性文件（各种包的来源）

# 2、项目配置
  1.项目运行,浏览器自动打开
    package.json
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
    },

  2.关闭eslint校验工具(不关闭会有各种规范,不按照规范会报错) 
    在根目录下创建vue.config.js,进行配置
    module.exports = {
    //关闭eslint
    lintOnSave: false
    }

  3.src文件夹配置别名,创建jsconfig.json,用@/代替src/,exclude表示不可以使用该别名的文件
     {
      "compilerOptions": {
          "baseUrl": "./",
              "paths": {
              "@/*": [
                  "src/*"
              ]
          }
      },
      "exclude": [
          "node_modules",
          "dist"
      ]
    }

# 3、项目路由的分析
    vue-router  前端所谓路由:kv键值对
      key: URL(地址栏中的路径)
      value: 相应的路由组件
    注意: 项目上中下结构
    
    路由组件: 
      home首页路由组件、Search路由组件、Login登陆路由、Refister注册路由
    非路由组件
      Header(首页和搜索页)、Footer(登录页没有Footer)

# 4、完成非路由组件Header与Footer业务
    开发项目的步骤:
      1.书写静态页面
      2.拆分组件
      3.获取服务器的数据动态展示
      4.完成相应的动态业务逻辑
    
    注意1: 创建组建的时候,组件结构+组件样式+图片资源
    注意2: 
           1)组件页面的样式使用的是less样式，浏览器不识别该样式，需要下载相关依赖
            npm install --save less less-loader@5
           2)如果想让组件识别less样式，则在组件中设置
            <script scoped lang="less">
           3)vue是单页面开发，我们只需要修改public下的index.html文件
            <link rel="stylesheet" href="reset.css">

# 5、路由组件的搭建
    下载vue-router  创建pages文件夹，并创建路由组件
    创建router文件夹，并创建index.js进行路由配置，最终在main.js中引入注册
    
    路由组件和非路由组件区别：
      非路由组件放在components中，路由组件放在pages或views中
      非路由组件通过标签使用，路由组件通过路由使用
      在main.js注册完路由，所有的路由和非路由组件身上都会拥有$router $route属性
      $router：一般进行编程式导航进行路由跳转
      $route： 一般获取路由信息（name path params等）

# 6、footer组件显示与隐藏
    footer在登录注册页面是不存在的，所以要隐藏，v-if 或者 v-show
    这里使用v-show，因为v-if会频繁的操作dom元素消耗性能，v-show只是通过样式将元素显示或隐藏
    配置路由的时候，可以给路由配置元信息meta,
    在路由的原信息中定义show属性，用来给v-show赋值，判断是否显示footer组件

# 7、路由传参
    路由跳转方式
      声明式导航router-link标签 ,可以把router-link理解为一个a标签，它 也可以加class修饰
      编程式导航 ：声明式导航能做的编程式都能做，而且还可以处理一些业务
      $router:进行编程式导航的路由跳转
      this.$router.push|this.$router.replace
      $route:可以获取路由的信息|参数
      this.$route.path
      this.$route.params|query
      this.$route.meta
      
    params参数：路由需要占位，程序就崩了，属于URL当中一部分
    query参数：路由不需要占位，写法类似于ajax当中query参数
    路由传递参数先关面试题
      1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
          不可以：路由跳转传参数的时候,对象的写法可以是name和path,但是path这种写法不能与params参数一起使用,程序会崩掉
      2:如何指定params参数可传可不传? 
          如果路由要求传递params参数,但不传送会导致url出错(在该项目中,url里会少了search)
          想要指定,须在占位后面添加"?",代表params参数可传可不传
      3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
          如果是空串,url会出错(在该项目中,url里会少了search)
          使用undefined解决: params参数可以传递、不传递(空的字符串)
      4: 路由组件能不能传递props数据?

# 8、编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
    编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题
    这种异常，对于程序没有任何影响的
    为什么会出现这种现象:由于vue-router最新版本3.5.3，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象
    解决方案：push是一个promise，promise需要传递成功和失败两个参数
    this.$router.push({name:‘Search’,params:{keyword:"…"||undefined}},()=>{},()=>{})后面两项分别代表执行成功和失败的回调函数
    这种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
    push是VueRouter.prototype的一个方法，在router中的index重写该方法即可(看不懂也没关系，这是前端面试题)

# 9、将Home组件的静态组件拆分
    1静态页面（样式）
    2拆分静态组件
    3发请求获取服务器数据进行展示
    4开发动态业务
    拆分组件：结构+样式+图片资源
    一共要拆分为七个组件

# 10、三级联动组件完成
    三级联动在Home、Search、Detail,把三级联动注册为全局组件
    全局组件注册完之后可直接使用

# 11、其他组件的完成 
    HTML + CSS + 图片资源

# 12、POSTWOMAN测试接口

# 13、axios二次封装
    请求拦截器：可以在发送之前处理一些业务
    相应拦截器：当服务器数据返回之后，可以处理一些事情
    项目当中的API文件夹放置axios

# 14、接口统一管理
    请求时候出现跨域问题
    本地服务器: http://localhost:8080
    后台服务器: http://39.98.123.211
    解决办法: JSONP,CROS,代理
    在根目录下的vue.config.js中配置,proxy为通过代理解决跨域问题。
    我们在封装axios的时候已经设置了baseURL为api,所以所有的请求都会携带/api，这里我们就将/api进行了转换。如果你的项目没有封装axios，或者没有配置baseURL，建议进行配置。要保证baseURL和这里的代理映射相同，此处都为'/api'。
    
    在文件夹api中创建index.js文件，用于封装所有请求
    将每个请求封装为一个函数，并暴露出去，组件只需要调用相应函数即可，这样当我们的接口比较多时，如果需要修改只需要修改该文件即可。

# 15、nprogress的使用
    打开一个页面时，往往会伴随一些请求，并且会在页面上方出现进度条。它的原理时，在我们发起请求的时候开启进度条，在请求成功后关闭进度条，所以只需要在request.js中进行配置。

# 16、vuex状态管理库
    首先确保安装了vuex,根目录创建store文件夹，文件夹下创建index.js,之后还要在main.js中引入

# 17、完成TypeNav三级联动展示数据业务

# 18、完成一级分类的背景效果
    第一种解决方案：CSS  hover 
    第二种：JS
    事件委托

# 19、完成动态展示2|3联动结构
    :style="{display:currentIndex==index?'block':'none'}"

# 20、函数的节流与防抖
    正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
    防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次
    节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

# 21、完成三级联动节流操作
    changeIndex: throttle(function (index) {this.currentIndex = index}, 50)
    不使用箭头函数

# 22、三级联动路由的跳转与传参
    第一种声明式导航:为什么使用router-link组件的时候，会出现卡顿那？
    router-link是一个组件：相当于VueComponent类的实例对象，一瞬间new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。
    
    第二种编程式导航:push|replace
    三级分类由于使用router-link的时候，会出现卡顿现象，因此采用编程式导航。
    路由跳转的时候【home->search】：需要进行路由传递参数【分类的名字、一、二、三级分类的id】
    this.$router.push()
    { 
      name:'search',
      query:{
        categoryName:'电子书',
        category2Id:4
      }
    }



# 23、搜索模块中的三级联动与过渡动画
    初始化三级联动在home界面是显示的，当路径是search时就隐藏
    div添加的enterShow方法，鼠标移动到div就显示三级联动，针对search界面
    添加的leaveaIndex方法，鼠标离开时home界面不显示二级三级目录，search界面不显示整个三级联动
    过渡动画：
      前提：组件|元素务必要有v-if|v-show指令
      使用：transition   name-enter name-enter-to name-enter-active

# 24、三级联动优化
    Vue在路由切换的时候会销毁旧路由。
    我们在三级列表全局组件TypeNav中的mounted进行了请求一次商品分类列表数据。
    由于Vue在路由切换的时候会销毁旧路由，当我们再次使用三级列表全局组件时还会发一次请求。
    由于信息都是一样的，出于性能的考虑我们希望该数据只请求一次，所以我们把这次请求放在App.vue的mounted中。（根组件App.vue的mounted只会执行一次）
    注意：虽然main.js也是只执行一次，但是不可以放在main.js中。因为只有组件的身上才会有$store属性

# 25、合并params和query参数
    将params和query一起传递，可以先点手机再点华为，也可以先点华为再点手机，效果一样

# 26、开发home首页 ListContainer和Floor
    mock用来拦截前端ajax请求，返回我么们自定义的数据用于测试前端接口。
    将不同的数据类型封装为不同的json文件，创建mockServer.js文件
    
    虚拟数据mock使用步骤：
      第一步:安装依赖包mockjs
      第二部：在src文件夹下创建一个文件夹，文件夹mock文件夹。
      第三步:准备模拟的数据
        把mock数据需要的图片放置于public文件夹中！
        比如:listContainer中的轮播图的数据
        [
          {id:1,imgUrl:'xxxxxxxxx'}, 
          {id:2,imgUrl:'xxxxxxxxx'}, 
          {id:3,imgUrl:'xxxxxxxxx'}, 
        ]
      第四步：在mock文件夹中创建一个server.js文件
        注意：在server.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。
        对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。
      第五步:通过mock模块模拟出数据
        通过Mock.mock方法进行模拟数据
      第六步:回到入口文件，引入serve.js
        mock需要的数据|相关mock代码页书写完毕，关于mock当中serve.js需要执行一次，
        如果不执行，和你没有书写一样的。
      第七步:在API文件夹中创建mock【axios实例：baseURL:'/mock'】
        专门获取模拟数据用的axios实例。
      在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK
    
    Swiper使用步骤：
    第一步：引入依赖包【swiper.js|swiper.css】
    第二步:静态页面中结构必须完整【container、wrap、slider】，类名不能瞎写
    第三步:初始化swiper实例


# 27、ListContainer
    行完再去创建swiper，而是先创建了swiper实例，但是此时我们的轮播图数据还没有获得，就导致了轮播图展示失败。
    解决方法一：等我们的数据请求完毕后再创建swiper实例。只需要加一个1000ms时间延迟再创建swiper实例
    
    解决方法二：我们可以使用watch监听bannerList轮播图列表属性，因为bannerList初始值为空，当它有数据时，我们就可以创建swiper对象
    即使这样也还是无法实现轮播图，原因是，我们轮播图的html中有v-for的循环，我们是通过v-for遍历bannerList中的图片数据，然后展示。我们的watch只能保证在bannerList变化时创建swiper对象，但是并不能保证此时v-for已经执行完了。假如watch先监听到bannerList数据变化，执行回调函数创建了swiper对象，之后v-for才执行，这样也是无法渲染轮播图图片（因为swiper对象生效的前提是html即dom结构已经渲染好了）。mounted中创建Swiper实例失败的原因：我们在mounted中先去异步请求了轮播图数据，然后又创建的swiper实例。由于请求数据是异步的，所以浏览器不会等待该求执
    
    完美解决方案：使用watch+this.$nextTick()
    之前我们在学习watch时，一般都是监听的定义在data中的属性，但是我们这里是监听的computed中的属性，这样也是完全可以的，并且如果你的业务数据也是从store中通过computed动态获取的，也需要watch监听数据变化执行相应回调函数，完全可以模仿上面的写法。

# 28、Floor
    开发Floor组件：Floor组件它被复用的（重复使用两次）
    Floor组件获取mock数据，发请求的action书写在哪里?
      派发action应该是在父组件的组件挂载完毕生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。
    父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件
    v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用
    
    组件间通信******面试必问的东西
    props:父子
    插槽:父子
    自定义事件:子父
    全局事件总线$bus:万能
    pubsub:万能
    Vuex:万能
    $ref:父子通信
    
    Floor是子组件，我们在home组件中调用了Floor，我们把home组件认为父组件，我们在home组件中实现了由home组件向Floor组件传递信息的操作，即父组件向子组件传递信息。

# 29、将轮播图模块提取为公共组件
    需要注意的是我们要把定义swiper对象放在watch中执行，并且还要设置immediate：true属性，这样可以实现，无论数据有没有变化，上来立即监听一次。
    上一小节刚刚讲了props实现父组件向子组件传递消息，这里同样也会将轮播图列表传递给子组件，原理相同。
    
    （1）老师将该组件在main.js中引入，并定义为全局组件。我这里只是在使用到该组件的地方引入并声明
    （2）引用组件时要在components中声明引入的组件
    （3）我们将轮播图组件已经提取为公共组件Carouse，所以我们只需要在Carouse中引入swiper和相应css样式

# 30、search模块开发
    1.先静态页面 + 静态组件拆分出来
    2.发请求 api
    3.vuex(三连环)
    4.组件获取仓库数据，动态展示数据

# 31、动态展示产品列表
    getters是vuex store中的计算属性。
    如果不使用getters属性，我们在组件获取state中的数据表达式为：this.$store.state.子模块.属性，
    如果有多个组件需要用到此属性，我们要么复制这个表达式，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。
    Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    个人理解：getters将获取store中的数据封装为函数，代码维护变得更简单（和我们将请求封装为api一样）。而且getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    注意：仓库中的getters是全局属性，是不分模块的。即store中所有模块的getter内的函数都可以通过$store.getters.函数名获取

# 32、根据不同参数获取数据展示
    Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    Object.assign(target, ...sources)    【target：目标对象】，【souce：源对象（可多个）】
    注意：
    1.如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性
    2.Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标
    对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如
    果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到
    原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。


# 33、监听路由变化实现动态搜索
    我们每次进行新的搜索时，我们的query和params参数中的部分内容肯定会改变，而且这两个参数是路由的属性。我们可以通过监听路由信息的变化来动态发起搜索请求。

# 34、面包屑相关操作
    本次项目的面包屑操作主要就是两个删除逻辑。
    1.当分类属性（query）删除时删除面包屑同时修改路由信息。
    2.当搜索关键字（params）删除时删除面包屑、修改路由信息、同时删除输入框内的关键字。
    1、query删除时
    因为此部分在面包屑中是通过categoryName展示的，所所以删除时应将该属性值制空或undefined。可以通过路由再次跳转修改路由信息和url链接
    2、params删除时
    和query删除的唯一不同点是此部分会多一步操作：删除输入框内的关键字（因为params参数是从输入框内获取的）输入框实在Header组件中的
    
    这里通过$bus实现header和search组件的通信。
    $bus使用
      （1）在main.js中注册
      （2）search组件使用$bus通信，第一个参数可以理解为为通信的暗号，还可以有第二个参数（用于传递数据），我们这里只是用于通知header组件进行相应操作，所以没有设置第二个参数。
      （3）header组件接受$bus通信
      注意：组件挂载时就监听clear事件
    
    SearchSelector组件有两个属性也会生成面包屑，分别为品牌名、手机属性
    此处生成面包屑时会涉及到子组件向父组件传递信息操作，之后的操作和前面讲的面包屑操作原理相同。唯一的区别是，这里删除面包屑时不需要修改地址栏url，因为url是由路由地址确定的，并且只有query、params两个参数变化回影响路由地址变化。
    
    至此面包屑部分内容结束。
    总结：面包屑由四个属性影响：parads、query、品牌、手机属性(要进行数组去重)
    面包屑生成逻辑
    判断searchParams相关属性是否存在，存在即显示。

# 35、排序操作
    排序的逻辑比较简单，只是改变一下请求参数中的order字段，后端会根据order值返回不同的数据来实现升降序。
    order属性值为字符串，例如‘1：asc’、‘2：desc’。1代表综合，2代表价格，asc代表升序，desc代表降序。
    
    图标是iconfont网站的图标，通过引入在线css的方式引入图标在public文件index引入该css

# 36、分页器组件
    实际开发中是不会手写的，一般都会用一些开源库封装好的分页，比如element ui。但是这个知识还是值得学习一下的。
    核心属性：pageNo（当前页码）、pageSize、total、continues（连续展示的页码）
    核心逻辑是获取 连续页码 的起始页码和末尾页码，通过计算属性获得。（计算属性如果想返回多个数值，可以通过对象形式返回）
    当点击页码会将pageNo传递给父组件，然后父组件发起请求，最后渲染。这里还是应用通过自定义事件实现子组件向父组件传递信息。



# 37、开发商品详情页面
    1.先注册路由
    2.点击图片进行跳转并携带params参数 
    3.将注册路由分成两部分：index.js和routes.js
    4.使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。样例：
      const router = new VueRouter({
        routes: [...],
        scrollBehavior (to, from, savedPosition) {
          // return 期望滚动到哪个的位置
        }
      })

# 38、获取产品详细数据
    1.通过getters获取导航信息
    2.访问undefined的属性值会引起红色警告，可以不处理，但是要明白警告的原因。
    以获取商品categoryView信息为例，categoryView是一个对象。return state.goodInfo.categoryView
    原因：假设我们网络故障，导致goodInfo的数据没有请求到，即goodInfo是一个空的对象，当我们去调用getters中的return state.goodInfo.categoryView时，因为goodInfo为空，所以也不存在categoryView，即我们getters得到的categoryView为undefined。所以我们在html使用该变量时就会出现没有该属性的报错。
    即：网络正常时不会出错，一旦无网络或者网络问题就会报错。
    总结：所以我们在写getters的时候要养成一个习惯在返回值后面加一个||条件。即当属性值undefined时，会返回||后面的数据，这样就不会报错。
    如果返回值为对象加||{}，数组：||[ ]。


# 39、获取产品属性值
    利用排他算法设置点击高亮

# 40、获取产品详细照片设置点击高亮
    在轮播图组件中设置一个currendIndex，用来记录所点击图片的下标，并用currendIndex实现点击图片高亮设置。当符合图片的下标满足currentIndex===index时，该图片就会被标记为选中。
    轮播图组件和放大镜组件是兄弟组件，所以要通过全局总线通信。
    在轮播图组件中，点击图片触发全局事件getIndex，参数为图片所在数组的下标。

# 41、放大镜效果
    获取鼠标相对于盒子的偏移量并赋给遮罩层
    同时右侧的偏移量放大两倍

# 42、购买产品个数的操作
    对多种输入情况进行判断

# 43、加入购物车操作
    点击加入购物车时，会向后端发送API请求，但是该请求的返回值(一个Promise)中data为null，所以我们只需要根据状态码code判断是否跳转到‘加入购物车成功页面’。
    跳转时需要将产品信息传送过去  一些简单的数据，比如skuNum通过query传过去复杂的数据通过session存储，sessionStorage、localStorage只能存储字符串

# 44、购物车组件开发
    根据api接口文档封装请求函数。
    但是如果想要获取详细信息，还需要一个用户的uuidToken，用来验证用户身份。但是该请求函数没有参数，所以我们只能把uuidToken加在请求头中。
    创建utils工具包文件夹，创建生成uuid的js文件，对外暴露为函数（记得导入uuid => npm install uuid）。
    生成临时游客的uuid（随机字符串）,每个用户的uuid不能发生变化，还要持久存储

# 45、购物车商品数量修改
    购物车商品信息展示  every函数使用  handler函数，修改商品数量时，加入节流操作。
    添加到购物车和对已有物品进行数量改动使用的同一个api，可以查看api文档。
    handler函数有三个参数，type区分操作，disNum用于表示数量变化（正负）,cart商品的信息

# 46、购物车状态修改和商品删除

# 47、删除多个商品
    由于后台只提供了删除单个商品的接口，所以要删除多个商品时，只能多次调用actions中的函数。
    我们可能最简单的方法是在method的方法中多次执行dispatch删除函数，当然这种做法也可行，但是为了深入了解actions，我们还是要将批量删除封装为actions函数。
    context中是包含dispatch、getters、state的，即我们可以在actions函数中通过dispatch调用其他的actions函数，可以通过getters获取仓库的数据。
    Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。

# 48、修改全部产品的选中状态

# 49、注册登陆业务
    由于登录按钮的父节点是一个form表单，如果使用@click触发登录事件，form表单会执行默认事件action实现页面跳转。这里我们使用@click.prevent，它可以阻止自身默认事件的执行。

# 50、导航守卫
    需要判断name:因为store中的token是通过localStorage获取的，token有存放在本地。当页面刷新时，本地token不会消失，所以store中的token也不会消失。但是，store中的其他数据（用户信息等）会清空，此时会出现用户信息不存在，但是有token，这种情况是不可以访问其他页面的，必须先去获取用户信息。由于用户信息是一个对象，所以我们通过它的一个属性name判断用户信息是否存在。
    所以不仅要判断token,还要判断用户信息

