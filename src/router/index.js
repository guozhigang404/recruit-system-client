import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'
import MessageBox from '@/utils/message-box'

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    let loginStatus = store.getters["user/curStatus"];
    if (to.meta["auth"]) {
        if (loginStatus === "login") {
            // 已经登录了
            next();
        } else if (loginStatus === "loading") {
            next({
                name: "Loading",
                query: {
                    origin: to.name
                }
            })
            // 正在登录
        } else {
            // 没有登录
            MessageBox(
                "请登录",
                "error",
                1500,
                null,
                null
            )
            next({
                name: "Home"
            })
        }
    } else {
        // 不需要登录
        next();
    }
})

export default router
