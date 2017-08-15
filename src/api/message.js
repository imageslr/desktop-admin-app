import fetch from './fetch.js';

export function getMessages(params) {
    return fetch.get('/api/messages/recipients/1', { params });
}

export function getNumberOfMessages() {
    return fetch.get('/api/messages/recipients/1/number');
}