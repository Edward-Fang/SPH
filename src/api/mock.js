// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start: 进度条开始  done: 进度条结束
// 引入相应样式
import 'nprogress/nprogress.css';

// 1.利用axios对象的方法create,去创建一个axios实例
// 2.requests就是axios,只不过配置过
const requests = axios.create({
    // 配置对象
    baseURL: '/mock', // 基础路径,路径中会出现api
    timeout: 5000 // 请求超过超时时间为5s
});

// 请求拦截器: 在发请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事
// config:配置对象,对象里面的header属性很重要
requests.interceptors.request.use(config => {
    nprogress.start();
    return config;
})

// 相应拦截器: 
requests.interceptors.response.use(res => {
    nprogress.done();
    return res.data
}, err => {
    return Promise.reject(new Error('failed'))
});

// 对外暴露
export default requests;