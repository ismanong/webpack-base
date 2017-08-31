import Vue from 'vue'
import * as types from "../types";

// state
const state = {
    holderNumberDatas: {}
}


// actions
const actions = {
    holderNumber_GetData(context,payload){

        Base.fGetData(payload.url, [], function (data) {
            context.commit(types.HOLDERNUMBER_GETDATA, {
                data
            })
        })


    },


}

// mutation
const mutations = {
    [types.HOLDERNUMBER_GETDATA](state, {data}){
        state.holderNumberDatas = data
    }
}

// getters
const getters={

}


export default {
    state,
    actions,
    mutations,
    getters
}
