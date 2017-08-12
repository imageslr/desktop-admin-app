import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store/index.js';

// 创建axios实例
const service = axios.create({
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = store.getters.token; // 让每个请求携带token
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code < 200 || res.code >= 300) {
            console.log(res);
            // 404直接重定向
            if (res.code != 404) {
                Message({
                    message: res.errmsg,
                    type: 'error',
                    duration: 3 * 1000
                });
            }
            return Promise.reject(res);
        } else {
            return res.data;
        }
    },
    error => {
        console.log('err' + error); // for debug
        //console.log(error.response);
        Message({
            message: '网络超时',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
)

export default service;