// 引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
// 配置路由
export default [{
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        // :keyword 表示 占位需要传递params参数, 加上 ? 表示可传可不传
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由传递props  三种方法
        // 布尔值 只能传params
        // props: true,
        // 对象方法  额外传一些props给路由组件
        // props: { a: 1, b: 2 }
        // 函数写法: 可以写params参数,query参数,通过props传递给路由
        props: ($route) => ({
            keyword: $route.params.keyword,
            k: $route.query.k
        })
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true },
        name: 'addcartsuccess'
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true },
        name: 'shopcart'
    }, {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    // 重定向
    {
        path: "*",
        redirect: "/home"
    }
]