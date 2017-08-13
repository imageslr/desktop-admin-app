import fetch from './fetch.js';

export function getUsers(params) {
    return fetch.get('/api/libraries', { params });
}

export function updateLibraryInfoById(id, params) {
    return fetch.post('/api/libraries/' + id, params);
}

export function updateStateById(id, state, reason) {
    return fetch.post('/api/libraries/' + id + '/state', {
        state,
        reason
    });
}

export function block(id) {
    return fetch.post('/api/libraries/' + id + '/block');
}

export function unblock(id) {
    return fetch.post('/api/libraries/' + id + '/unblock');
}