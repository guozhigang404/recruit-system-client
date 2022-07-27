import request from '@/api/request'

export async function getJobList(page = 1, limit = 2, q = "") {
    try {
        let resp = await request.get("/api/rinfo", {
            params: {
                page,
                limit,
                q
            }
        });
        return resp.data;
    } catch (err) {
        console.log("getJobList", err);
        return null;
    }
}

export async function getHotJobList(q = "") {
    try {
        const resp = await request.get(
            "/api/rinfo",
            {
                params: {
                    page: 1,
                    limit: 4,
                    q
                }
            }
        );
        return resp.data;
    } catch (err) {
        console.log("getHotJobList", err);
        return null;
    }
}

export async function getJobById(id) {
    try {
        let resp = await request.get(`/api/rinfo/${id}`);
        return resp.data;
    } catch (err) {
        console.log("getJobById", err)
    }
}

export async function updateJobById(id, formData) {
    try {
        let resp = await request.put(`/api/rinfo/${id}`, {
            formData
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function deleteJobById(id) {
    try {
        let resp = await request.delete(`/api/rinfo/${id}`);
        return resp.data;
    } catch (err) {
        console.log(err);
    }
}

export async function addJob(data) {
    try {
        let resp = await request.post("/api/rinfo", data);
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}
