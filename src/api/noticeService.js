import request from '@/api/request';

export async function getNotice() {
    try {
        const resp = await request.get("/api/notice");
        return resp.data;
    } catch (err) {
        console.log("get notice", err)
        return null;
    }
}

export async function readNotice(id) {
    try {
        const resp = await request.put(`/api/notice/read/${id}`);
        console.log(resp)
    } catch (err) {
        console.log(err)
        return null;
    }
}
