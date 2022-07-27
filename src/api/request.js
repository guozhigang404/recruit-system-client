import axios from 'axios';
import {messageBox} from '@/utils'

let ins = axios.create();

ins.interceptors.request.use(
    (request) => {
        let token = localStorage.getItem("token");
        if (token) {
            request.headers["authorization"] = "bearer " + token;
        }
        return request;
    },
    (reason) => {
        console.log(reason);
        return Promise.reject(reason)
    }
);

ins.interceptors.response.use(
    (response) => {
        if (response.headers.authorization) {
            localStorage.setItem("token", response.headers.authorization);
        }
        return response;
    },
    (reason) => {
        if(reason.response.status === 403) {
            console.log("403");
            localStorage.removeItem("token");
        } else if(reason.response.status === 500) {
            messageBox(
                "服务器开小差了",
                "error",
                2000
            )
            return;
        }
        return Promise.reject(reason)
    }
);

export default ins;
