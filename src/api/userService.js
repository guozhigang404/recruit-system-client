import request from '@/api/request';

export async function userLogin(loginId, loginPwd) {
    const resp = await request.post("/api/user/login", {
        loginId,
        loginPwd
    });
    return resp.data;
}

export async function userWhoAmi() {
    try {
        const resp = await request.get("/api/user/auth/whoami");
        return resp.data;
    } catch (err) {
        return null
    }
}

export async function logOut() {
    localStorage.removeItem("token")
}

export async function register(name, loginPwd, tel, sex) {
    try {
        const resp = await request.post("/api/user", {
            name,
            loginPwd,
            tel,
            sex
        });
        console.log(resp.data)
        return resp.data;
    } catch (err) {
        console.log(err)
        return null;
    }
}

export async function uploadPhoto(data) {
    try {
        let resp = await request.post("/api/user/uploadphoto", data, {
                'Content-Type': 'multipart/form-data'
            }
        );
        return resp.data;
    } catch (err) {
        console.log(err);
    }
}

export async function updateBaseInfo(data) {
    try {
        let resp = await request.put("/api/user/update/base", data);
        return resp.data;
    } catch (err) {
        console.log(err)
    }
}

export async function uploadResume(data) {
    try {
        let resp = await request.post("/api/user/uploadresume", data, {
                'Content-Type': 'multipart/form-data'
            }
        );
        return resp.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getUserList(page = 1, limit = 10, q = "") {
    try {
        let resp = await request.get("/api/user/", {
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

export async function getUserById(id) {
    try {
        let resp = await request.get(`/api/user/${id}`);
        return resp.data;
    } catch (e) {
        console.log(e)
    }
}

export async function changeUserType(userId, userTypeId) {
    try {
        let resp = await request.put(`/api/user/admin/update/usertype/${userId}`, {
            userTypeId
        });
        return resp.data;
    } catch (e) {

    }
}
