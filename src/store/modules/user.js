import { login, getUserInfo } from '../../api/index';
import { getToken, setToken, removeToken } from '../../utils/auth';

const user = {
    state: {
        id: '',
        nickname: '',
        token: getToken(),
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        LOG_OUT: (state) => {
            state.token = '';
        }
    },

    actions: {
        // 登录
        LOGIN({ commit }, params) {
            const email = params.email.trim();
            return new Promise((resolve, reject) => {
                login(email, params.password).then(response => {
                    commit('SET_ID', response.id);
                    commit('SET_NICKNAME', response.nickname);
                    commit('SET_TOKEN', response.token);
                    setToken(response.token);
                    console.log(response.token)
                    console.log(getToken());
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 获取用户信息
        GET_INFO({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    commit('SET_ID', response.id);
                    commit('SET_NICKNAME', response.nickname);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端 登出
        LOGOUT({ commit }) {
            return new Promise(resolve => {
                commit('LOG_OUT');
                removeToken();
                resolve();
            });
        },
    }
};

export default user;