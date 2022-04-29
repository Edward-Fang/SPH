import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
    cartList: [],
};
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表数据
    async cartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("CARTLIST", result.data)
        }
    },
    // 删除购物车某一产品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('出错啦'))
        }
    },
    // 修改购物车某一产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('出错啦'))
        }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取购物车中全部的数据(数组)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = item.isChecked ? dispatch('deleteCartById', item.skuId) : ''
            PromiseAll.push(Promise);
        });
        // 只有PromiseAll数组内的全部Promise返回值都成功，Promise.all才成功
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的状态 
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {
                skuId: item.skuId,
                isChecked
            })
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}