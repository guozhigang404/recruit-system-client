import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "@/styles/index.less"
import router from '@/router'
import store from '@/store'

store.dispatch("user/whoAmi").then(resp => {
    if (!resp) {
        router.push({
            name: "Home"
        }).catch(r => {
        });
    } else {
        let userId = resp.data.id
        store.dispatch("resume/loadResume", userId).then(r => {
        })
    }
}).catch(reason => {
    console.log(reason)
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
