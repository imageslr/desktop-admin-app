import fetch from './fetch.js';
import axios from 'axios';
import { getToken } from '../utils/auth.js';

export function getMessages(params) {
    return fetch.get('/api/messages/recipients/1', { params });
}

export function getMessageById(id) {
    return fetch.get('/api/messages/' + id);
}

export function getNumberOfMessages() {
    return axios.get('/api/messages/recipients/1/number', { headers: { token: getToken() } }).then(response => {
        const res = response.data;
        if (res.code < 200 || res.code >= 300) {
            console.log(res);
            return Promise.reject(res);
        } else {
            return res.data;
        }
    });
}