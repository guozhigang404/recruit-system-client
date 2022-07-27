import request from '@/api/request';

export async function getBlackByUserId(id) {
    try {
        let resp = await request.get(`/api/blacklist/user/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export async function addBlackList(userId, reason) {
    try {
        let resp = await request.post("/api/blacklist", {
            userId,
            reason
        });
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export async function removeBlackListById(id) {
    try {
        let res = await request.delete(`/api/blacklist/${id}`);
        return res.data;
    } catch (err) {

    }
}


export async function getBlackListByPage(page = 1, limit = 10) {
    try {
        let res = await request.get("/api/blacklist/admin/all", {
            params: {
                page,
                limit
            }
        });
        return res.data
    } catch (err) {
        console.log(err)
    }
}
