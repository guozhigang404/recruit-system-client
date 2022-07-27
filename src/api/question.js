import request from '@/api/request'

export async function getObjectives(page = 1, limit = 10, q = '') {
    try {
        let res = await request.get("/api/question/objective", {
            params: {
                page,
                limit,
                q
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getSubjective(page = 1, limit = 10, q = '') {
    try {
        let res = await request.get("/api/question/subjective", {
            params: {
                page,
                limit,
                q
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteSubjectiveById(id) {
    try {
        let res = await request.delete(`/api/question/subjective/${id}`);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function deleteObjectiveById(id) {
    try {
        let res = await request.delete(`/api/question/objective/${id}`);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function updateObjective(id, data) {
    try {
        let res = await request.put(`/api/question/objective/${id}`, data);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function updateSubjective(id, data) {
    try {
        let res = await request.put(`/api/question/subjective/${id}`, data);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export async function addObjective(data) {
    try {
        let res = await request.post("/api/question/objective", data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function addSubjective(data) {
    try {
        let res = await request.post("/api/question/subjective", data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
