<template>
    <div v-loading="loading" class="container">
        <el-popover ref="info" placement="right" width="200" trigger="hover">
            <div v-if="message.senderType == 1">
                <div>邮箱：{{message.senderInfo.email}}</div>
                <div>昵称：{{message.senderInfo.nickname}}</div>
            </div>
            <div v-else-if="message.senderType == 2">
                <div>名称：{{message.senderInfo.name}}</div>
                <div>电话：{{message.senderInfo.phone}}</div>
                <div>地址：{{message.senderInfo.location}}</div>
                <div>管理员姓名：{{message.senderInfo.adminName}}</div>
                <div>管理员电话：{{message.senderInfo.adminPhone}}</div>
            </div>
            <div v-else-if="message.senderType == 3">
                <div>姓名：{{message.senderInfo.name}}</div>
                <div>昵称：{{message.senderInfo.username}}</div>
                <div>手机号：{{message.senderInfo.phone}}</div>
                <div>身份证号：******</div>
                <div>地址：{{message.senderInfo.location}}</div>
                <div>邮编：{{message.senderInfo.postcode}}</div>
            </div>
        </el-popover>
        <div class="title-container">
            <h1>{{message.title}}</h1>
            <div class="subtitle">发件人: <span class="sender-name" v-popover:info>{{message.senderName}}</span></div>
            <div class="subtitle">时&nbsp;&nbsp;&nbsp;间: <span class="send-time">{{message.createTime}}</span></div>
        </div>
        <div class="body-container">{{message.body}}</div>
    </div>
</template>
<script>
import { getMessageById } from '../../api/message.js';

export default {
    data() {
        return {
            loading: true,
            message: {
                id: undefined,
                senderType: undefined,
                senderId: undefined,
                senderName: undefined,
                title: undefined,
                body: undefined,
                createTime: undefined,
                senderInfo: undefined
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            this.loading = true;
            getMessageById(this.$route.params.id).then(res => {
                this.message = res;
                if (!res.isRead) {
                    this.$store.commit('DECREASE_MESSAGE_NUMBER_BY_TYPE', res.senderType);
                }
            }).catch((res) => {
                if (res.code == 404)
                    this.$router.replace({ path: '/404' });
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>
<style scoped>
.container {
    border: 1px solid #eee;
}

.title-container {
    padding: 10px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #eee;
}

.body-container {
    padding: 20px 10px;
}

h1 {
    padding-top: 6px;
    margin-top: 0;
    margin-bottom: 5px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    outline: 0;
    font-size: 15px;
    line-height: normal;
    font-weight: 700;
}

.subtitle {
    color: #A8ADB8;
    font-size: 13px;
    line-height: 19px
}

.sender-name {
    color: #20a0ff;
    font-weight: bold;
}

.sender-name:hover {
    cursor: pointer;
}

.send-time {
    color: #7f7f7f;
}
</style>