import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入路由信息
import routes from './routes.js';
// 引入仓库
import store from '@/store';
//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 返回y代表滚动到最上面
        return { y: 0 }
    }
});

// 全局守卫，前置守卫(在路由跳转之间进行判断)
router.beforeEach(async(to, from, next) => {
    next();
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 有token表示已经登录
    if (token) {
        // 登录,去login界面停留在主界面
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            // 登录, 去的不是login
            // 如果用户名已有
            if (name) {
                next();
            } else {  // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('userInfo');
                    next();
                } catch (e) {
                    // token信息失效获取不到用户信息 清楚登录
                    store.dispatch('logOut');
                    next('/login');
                }
            }
        }
    } else { // 未登录
        next();
    }
})

export default router;