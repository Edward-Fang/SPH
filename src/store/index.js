import Vue from "vue";
import Vuex from "vuex";
// 需要使用插件
Vue.use(Vuex);

// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from './shopcart';
import user from './user';
import trade from './trade';
export default new Vuex.Store({
    // 实现vuex模块化式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});