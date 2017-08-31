import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import createLogger from "../../public/devtool/vue/plugins/logger";


// 首页
import mainPage from "./modules/mainPage";
// 股东户数
import holderNumber from './modules/holderNumber'

// 将vuex注入到实例中
Vue.use(Vuex)

const state = {
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        mainPage,
        holderNumber
    },
    plugins: __DEV__ ? [createLogger()] : [],
    // plugins:[createLogger()],
    // 严格模式
    //strict: true   //可能会造成内存溢出 maximum call stack size exceeded
})

