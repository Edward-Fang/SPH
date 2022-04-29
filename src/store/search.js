import { reqSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块参数
    async searchList({ commit }, params = {}) {
        // 调用函数获取服务器数据，至少传递一个参数(空对象)
        // params形参，是当用户派发action的时候，第二个参数传递过来的至少是一个空对象
        let result = await reqSearchInfo(params);
        if (result.code == 200) {
            commit("SEARCHLIST", result.data);
        }
    }
};
const getters = {
    // 当前形参state, 是当前仓库中的state, 不是大仓库的state
    goodsList(state) {
      // 假如网络不好，返回undefined,则给一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
      return state.searchList.trademarkList || [];
    },
    attrsList(state){
      return state.searchList.attrsList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}