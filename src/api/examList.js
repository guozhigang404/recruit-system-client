import request from '@/api/request'

export async function getExamList(page = 1, limit = 10) {
    try {
        let resp = await request.get("/api/examlist/all", {
            params: {
                page,
                limit
            }
        });
        return resp.data;
    } catch (err) {
        console.log("getExamList", err);
    }
}
