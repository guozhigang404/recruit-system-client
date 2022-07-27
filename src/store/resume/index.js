import {getResume} from '@/api/resume'

export default {
    namespaced: true,
    state: {
        resumeData: null
    },
    mutations: {
        setResume(state, payload) {
            state.resumeData = payload;
        }
    },
    actions: {
        async loadResume(ctx, userId) {
            const resp = await getResume(userId);
            ctx.commit("setResume", resp.data);
            return resp.data;
        }
    }
}
