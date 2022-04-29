import { reqAddressInfo } from '@/api'
const state = {
    address: []
}
const mutations = {
    ADDRESSINFO(state, address) {
        state.address = address
    }
}
const actions = {
    // 获取用户地址信息
    async addressInfo({ commit }) {
        let result = await reqAddressInfo();
        commit('ADDRESSINFO', result.data);
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}