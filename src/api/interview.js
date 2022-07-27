import request from '@/api/request'

export async function getInterviewList(page = 1, limit = 10) {
    try {
        let resp = await request.get("/api/interview/interviews", {
            params: {
                page,
                limit
            }
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function addInterview(data, resultId) {
    try {
        let res = await request.post(`/api/interview/admin/pass/${resultId}`, data);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function unPass(resultId, userId) {
    try {
        let res = await request.put("/api/interview/admin/unpass", {
            resultId,
            userId
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getInterviewData(tel) {
    try {
        let res = await request.get("/api/interview/admin/interviews/data", {
            params: {
                tel
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}


export async function interviewPass(resumeId, interviewId) {
    try {
        let resp = await request.put("/api/interview/admin/interviews/pass", {
            resumeId,
            interviewId
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function interviewReject(resumeId, interviewId, remark = "") {
    try {
        let resp = await request.put("/api/interview/admin/interviews/reject", {
            resumeId,
            interviewId,
            remark
        });
        return resp.data;
    } catch (err) {
        console.log(err);
    }
}