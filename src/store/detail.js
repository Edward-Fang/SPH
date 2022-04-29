import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的动作
    async goodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    // 将产品添加到购物车或更新
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结构，发请求之后前台将参数带给服务器，服务器写入数据成功并没有返回数据，只有code==200,代表操作成功
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    }
};
const getters = {
    // 详情页导航
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 详情信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 售卖属性
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}