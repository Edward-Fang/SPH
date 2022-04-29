import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from './store';

// 三级联动组件--全局组件 第一个参数：全局组件的名字，第二个参数：哪一个组件
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination);

// 引入Mock
import '@/mock/serve';
// 引入swiper样式
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

// 但凡是在main.js中的Vue实例中注册的实体，在所有的组件中都会有（this.$.实体名）属性
new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate(){
      Vue.prototype.$bus = this;
    },
    // 注册路由 当这里书写router时,组件身上都拥有$route,$router属性
    // $route:可以获取路由信息(path,query,params)
    // $router:进行编程式路由跳转push|replace
    router,
    // 注册仓库，组件实例的会多一个$store属性
    store
}).$mount('#app')