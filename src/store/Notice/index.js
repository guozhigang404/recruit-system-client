import {getNotice} from '@/api/noticeService'

export default {
    namespaced: true,
    state: {
        noticeList: [],
        noticeTotal: 0
    },
    mutations: {
        setNoticeList(state, payload) {
            state.noticeList = payload
        },
        setNoticeTotal(state, payload) {
            state.noticeTotal = payload
        },
        setRead(state, id) {
            state.noticeList.forEach(item => {
                if (item.id == id) {
                    item.read = 1
                }
            })
        }
    },
    actions: {
        async loadNotice(ctx) {
            const resp = await getNotice();
            ctx.commit("setNoticeList", resp.data.data);
            ctx.commit("setNoticeTotal", resp.data.total)
        },
        async readNotice(ctx, id) {
            ctx.commit("setRead", id)
        }
    }
}
