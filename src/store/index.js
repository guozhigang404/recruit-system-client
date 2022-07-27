import Vue from 'vue'
import Vuex from 'vuex'
import user from "./User"
import notice from './Notice'
import resume from '@/store/resume'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        notice,
        resume
    },
    strict: true
})
