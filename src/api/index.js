// api进行统一管理
// 引入二次封装的ajax(这里的request)
import requests from "./request";
import mock from './mock';

// 三级联动的接口 /api/product/getBaseCategoryList  GET  
// 发请求: axios发请求返回结果是Promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

// 获取banner和floor(home首页的轮播图)
export const reqBannerList = () => mock.get('/banner');
export const reqFloorList = () => mock.get('/floor');

// 获取搜索模块数据 /api/list  post 
// 当前这个接口，给服务器传递默认参数params，至少是一个空对象
export const reqSearchInfo = (params) => requests({ url: "/list", method: "post", data: params });

// 获取商品详情   /api/item/{ skuId }  get 
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });

// 添加到购物车  /api/cart/addToCart/{ skuId }/{ skuNum }  post 
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车数据列表  /api/cart/cartList  get
export const reqCartList = () => requests({ url: "/cart/cartList", method: "get" });

// 删除购物车商品  /api/cart/deleteCart/{skuId}  delete 
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

// 切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 获取验证码  /api/user/passport/sendCode/{phone}   get
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 注册 /api/user/passport/register  post 
export const reqRegister = (data) => requests({ url: "/user/passport/register", data, method: "post" });

// 登录 /api/user/passport/login post 
export const reqLogin = (data) => requests({ url: "/user/passport/login", data, method: "post" });

// 获取用户信息(带着token向服务器请求用户信息)  /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录  /api/user/passport/logout
export const reqLogout = () => requests({ url: "/user/passport/logout", method: "get" });

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" });