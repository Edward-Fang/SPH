// 登录与注册模块
import { reqCode, reqLogin, reqRegister, reqUserInfo, reqLogout } from "@/api";
import { setTOKEN, getTOKEN, removeTOKEN } from '@/utils/token';
const state = {
    code: '',
    token: getTOKEN(),
    userInfo: {},
};
const mutations = {
    CODE(state, code) {
        state.code = code;
    },
    LOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARUSERINFO(state) {
        // 清空仓库和本地存储中的数据
        state.token = '';
        state.userInfo = {};
        removeTOKEN();
    }
};
const actions = {
    // 获取验证码
    async code({ commit }, phone) {
        let result = await reqCode(phone);
        if (result.code == 200) {
            commit('CODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    // 注册
    async register({ commit }, user) {
        let result = await reqRegister(user);
        if (result.code == 200) {
            commit('LOGIN', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    async login({ commit }, user) {
        let result = await reqLogin(user);
        if (result.code == 200) {
            commit('LOGIN', result.data.token); // token是唯一标识符
            //持久化存储token
            setTOKEN(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('账号或密码错误'));
        }
    },
    // 获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200){
            commit('USERINFO', result.data);
            return 'OK';
        } else {
          return Promise.reject(new Error('出错啦'));
        }
    },
    // 退出登录
    async logOut({ commit }) {
        // 只是向服务器发请求
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEARUSERINFO');
            return 'OK'
        } else {
            return Promise.reject(new Error('出错啦'))
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}