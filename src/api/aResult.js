import request from '@/api/request'

export async function getResult(examId) {
    try {
        let resp = await request.get("/api/aresult", {
            params: {
                examId
            }
        });
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function getUndoneResultByExamId(examId, page = 1, limit = 10) {
    try {
        let res = await request.get(`/api/aresult/admin/exam/${examId}`, {
            params: {
                page,
                limit
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function submitGrade(id, subjective, total) {
    try {
        let res = await request.post(
            `/api/aresult/admin/grade/${id}`,
            {
                subjective,
                total
            }
        );
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function getResultsByTestId(paperId, page = 1, limit = 10) {
    try {
        let resp = await request.get(`/api/aresult/admin/results/${paperId}`, {
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

export async function getStatisticsResultsByTestId(paperId, page = 1, limit = 10) {
    try {
        let resp = await request.get(`/api/aresult/admin/results/statistics/${paperId}`, {
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

export async function createResultsExcel(paperId) {
    try {
        let res = await request.get(`/api/aresult/admin/result/file/${paperId}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export async function getResultByTelAndPaperId(paperId, tel) {
    try {
        let res = await request.get("/api/aresult/admin/userresult", {
            params: {
                paperId,
                tel
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

