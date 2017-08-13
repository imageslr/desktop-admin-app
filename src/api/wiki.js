import fetch from './fetch.js';

export function getUsers(params) {
    return fetch.get('/api/wiki/users', { params });
}

export function updateUserInfoById(id, params) {
    return fetch.post('/api/wiki/users/' + id, params);
}

export function block(id) {
    return fetch.post('/api/wiki/users/' + id + '/block');
}

export function unblock(id) {
    return fetch.post('/api/wiki/users/' + id + '/unblock');
}