import fetch from './fetch.js';

export function getUsers(params) {
    return fetch.get('/api/users', { params });
}

export function updateUserInfoByPhone(phone, params) {
    return fetch.post('/api/users/' + phone, params);
}

export function updateStateByPhone(phone, state, reason) {
    return fetch.post('/api/users/' + phone + '/state', {
        state,
        reason
    });
}

export function block(phone) {
    return fetch.post('/api/users/' + phone + '/block');
}

export function unblock(phone) {
    return fetch.post('/api/users/' + phone + '/unblock');
}