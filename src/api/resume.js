import request from '@/api/request';

export async function getResume(userId) {
    try {
        const resp = await request.get(`/api/resume/${userId}`);
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function applyJob(userId, recruitmentInfoId) {
    try {
        let resp = await request.put(`/api/resume/${userId}`, {
            recruitmentInfoId,
        });
        return resp.data
    } catch (err) {
        console.log(err);
    }
}

export async function getNewApply(page = 1, limit = 10) {
    try {
        let resp = await request.get("/api/resume/admin/apply", {
            params: {
                page,
                limit
            }
        });
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function getApplyById(id) {
    try {
        let resp = await request.get(`/api/resume/admin/apply/${id}`);
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function passApply(userId, examId, resumeId) {
    try {
        let resp = await request.put("/api/resume/admin/apply/pass", {
            userId,
            examId,
            resumeId
        });
        return resp.data;
    } catch (err) {
        console.log(err);
    }
}

export async function reject(resumeId, reason) {
    try {
        let resp = await request.put("/api/resume/admin/apply/reject", {
            resumeId,
            remark: reason
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}
