import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";
// home模块的小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerlist) {
        state.bannerList = bannerlist;
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    // 通过API里面的接口，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    // 获取首页轮播图的数据
    async bannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit('BANNERLIST', result.data);
        }
    },
    async floorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('FLOORLIST', result.data);
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