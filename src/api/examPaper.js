import request from '@/api/request'

export async function getExamPaperQuestions(id) {
    try {
        let resp = await request.get(`/api/exampaper/questions/${id}`);
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function getExamPaperQuestionsAdmin(id) {
    try {
        let resp = await request.get(`/api/exampaper/admin/questions/${id}`);
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function submitExamAnswer(id, data) {
    try {
        let resp = await request.post(`/api/exampaper/submit/${id}`, data)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function getExamPapers(page = 1, limit = 10, q = '') {
    try {
        let resp = await request.get("/api/exampaper", {
            params: {
                page,
                limit,
                q
            }
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function submitPaper(data) {
    try {
        let resp = await request.post("/api/exampaper", data);
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}
