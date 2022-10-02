import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        roles : []
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        setRoles(state,data) {
            state.roles = data
        }
    },
    getters:{
        isTuanOwnerOrTuanAdmin:(state)=>()=>{
            return state.roles.filter(it => it === 2 || it === 3).length > 0
        }
    }
})