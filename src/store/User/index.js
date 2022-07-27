import {logOut, userLogin, userWhoAmi} from '@/api/userService'
export default {
    namespaced: true,
    state: {
        isLoading: false,
        userData: null,
    },
    getters: {
        curStatus(state) {
            if (state.isLoading) {
                return "loading";
            } else if (state.userData) {
                return "login";
            } else {
                return "unlogin";
            }
        },
        integrity(state) {
            let userInfo = state.userData;
            return !!(userInfo["major"] && userInfo["qualifications"] && userInfo["university"]);
        }

    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        setUserData(state, payload) {
            state.userData = payload;
        }
    },
    actions: {
        async userLogin(ctx, payload) {
            ctx.commit("setIsLoading", true);
            const resp = await userLogin(
                payload.loginId,
                payload.loginPwd
            );
            ctx.commit("setUserData", resp.data);
            ctx.commit("setIsLoading", false);
            return resp;
        },
        async whoAmi(ctx) {
            ctx.commit("setIsLoading", true);
            const resp = await userWhoAmi();

            if(resp) {
                ctx.commit("setUserData", resp.data);
            } else {
                ctx.commit("setUserData", null);
            }
            ctx.commit("setIsLoading", false)
            return resp;
        },
        async logOut(ctx) {
            ctx.commit("setIsLoading", true);
            await logOut();
            ctx.commit("setUserData", null);
            ctx.commit("setIsLoading", false);
        }
    }
}
