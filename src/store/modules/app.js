import { getNumberOfMessages } from '../../api/message';
import Vue from 'vue';
import notifyMessage from '../../utils/notify.js';

const app = {
    state: {
        showMessageTip: '',
        // 不同类型用户的消息数量:{total, unReadTotal}，依次对应：wiki系统(type: 1)、图书馆(type: 2)、小程序(type: 3)
        messageNumbers: [{ senderType: 1, total: 0, unReadTotal: 0 }, { senderType: 2, total: 0, unReadTotal: 0 }, { senderType: 3, total: 0, unReadTotal: 0 }]
    },

    mutations: {
        SET_SHOW_MESSAGE_TIP: (state, showMessageTip) => {
            state.showMessageTip = showMessageTip;
        },
        SET_MESSAGE_NUMBERS: (state, messageNumbers) => {
            // 未读邮件增加时发送通知
            state.messageNumbers.filter((i, index) => i.unReadTotal < messageNumbers[index].unReadTotal).map((i) => i.senderType).map(i => notifyMessage(i));
            state.messageNumbers = messageNumbers;
        },
        SET_MESSAGE_NUMBERS_BY_TYPE: (state, obj) => {
            // 未读邮件增加时发送通知
            if(state.messageNumbers[obj.type-1].unReadTotal < obj.unReadTotal) {
                notifyMessage(obj.type);
            }
            state.messageNumbers[obj.type-1].total = obj.total;
            state.messageNumbers[obj.type-1].unReadTotal = obj.unReadTotal;
        },
    },

    actions: {
        // 获取未读消息的数量
        GET_MESSAGE_NUMBERS({ commit, state }) {
            return new Promise((resolve, reject) => {
                getNumberOfMessages().then(response => {
                    commit('SET_MESSAGE_NUMBERS', response);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default app;