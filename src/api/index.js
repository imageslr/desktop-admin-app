import fetch from './fetch.js';

export function register(params) {
    return fetch.post('/api/wiki/users', params);
}

export function login(username, password) {
    return fetch.post('/api/wiki/users/login', {
        username,
        password,
        type: 1,
        isAdmin: true
    });
}

// 获取管理员的用户信息
export function getUserInfo(token) {
    return fetch.get('/api/wiki/users/info', {
        params: { token }
    });
}

export function changePassword(id, originPassword, newPassword) {
    return fetch.post('/api/wiki/users/password', {
        id,
        originPassword,
        newPassword
    });
}


export function getWechatUsers(params) {
    return fetch.get('/api/users', {params});
}
