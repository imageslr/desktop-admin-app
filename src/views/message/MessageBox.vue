<template>
    <div class="message-box">
        <div class="summary-text">一共{{total}}封邮件， 其中未读邮件{{unReadTotal}}封</div>
        <el-button type="text" @click="refresh">刷新</el-button>
        <el-button type="text" style="float: right; line-height: 20px" @click="showTip">查看提示</el-button>
        <el-table v-loading="tableLoading" :data="messages" style="width: 100%" :row-class-name="rowClassName" @row-click="navigateToDetail">
            <el-table-column width="40">
                <template scope="scope">
                    <icon-svg class="sidebar-icon" icon-class="email"></icon-svg>
                </template>
            </el-table-column>
            <el-table-column prop="senderName" label="发件人" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="主题">
                <template scope="scope">
                    <span class="title">{{scope.row.title}}</span><span class="body">{{scope.row.body}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="130" show-overflow-tooltip :formatter="formatTime"></el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="navigateToPage">
        </el-pagination>
    </div>
</template>
<script>
import { getMessages } from '../../api/message.js';
export default {
    props: ['senderType'],
    data: () => {
        return {
            tableLoading: false,
            pageSize: 15,
            messages: []
        }
    },
    computed: {
        total() {
            return this.$store.getters.messageNumbers[this.senderType - 1].total;
        },
        unReadTotal() {
            return this.$store.getters.messageNumbers[this.senderType - 1].unReadTotal;
        },
        currentPage(){
            return parseInt(this.$route.query.p) || 1;
        }
    },
    created: function() {
        this.fetchData();
    },
    methods: {
        // 获取数据
        fetchData() {
            this.tableLoading = true;
            var params = {
                sender_type: this.senderType,
                start: (this.currentPage - 1) * this.pageSize,
                count: this.pageSize
            };
            getMessages(params).then((res) => {
                this.messages = res.items;
                this.$store.commit('SET_MESSAGE_NUMBER_BY_TYPE', {
                    senderType: this.senderType,
                    total: res.total,
                    unReadTotal: res.unReadTotal
                });
            }).finally(() => this.tableLoading = false);
        },
        // 刷新页面
        refresh() {
            this.$router.replace({path: '', query: {t: Date.now()}});
        },
        navigateToDetail(row) {
            this.$router.push({
                name: '消息详情',
                params: { id: row.id }
            });
        },
        navigateToPage(page) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    p: page
                }
            })
        },
        rowClassName(row) {
            return row.isRead == 0 ? 'unread' : ''
        },
        formatTime(row) {
            var apz = this.addPrefixZero;
            var date = new Date(row.createTime);
            var today = new Date();

            if (date.getFullYear() == today.getFullYear()) {
                if (date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
                    return '今天' + apz(date.getHours()) + ': ' + apz(date.getMinutes());
                } else if (this.isYesterDay(date, today)) {
                    return '昨天' + apz(date.getHours()) + ': ' + apz(date.getMinutes());
                }
                return (date.getMonth() + 1) + '月' + date.getDate() + '日';
            }
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        },
        isYesterDay(date, today) {
            var month1 = date.getMonth() + 1;
            var month2 = today.getMonth() + 1;
            var date1 = date.getDate();
            var date2 = today.getDate();
            if (month1 == month2 && date1 == date2 - 1) {
                return true;
            } else if (month1 == month2 - 1 && date2 == 1) {
                if (month1 == 2 && date1 < 28) return false;
                return [1, 3, 5, 7, 8, 10, 12].some(i => i == month1 && date1 == 31) || [2, 4, 6, 9, 11].some(i => i == month1 && date1 == 30);
            }
            return false;
        },
        addPrefixZero(num) {
            return num < 10 ? '0' + num : num;
        },
        showTip() {
            this.$notify.info({
                title: '提示',
                message: '这里展示了各个平台用户的意见反馈，选择邮件可查看详情'
            });
        },
    }
}
</script>
<style scoped>
.el-pagination {
    margin-top: 20px;
    text-align: center;
}

.summary-text {
    display: inline-block;
    margin-bottom: 15px;
    margin-right: 10px;
    font-size: 14px;
    color: #475669;
}

.el-button {
    padding: 0;
}

.title {
    margin-right: 10px;
}

.body {
    color: #999;
    font-weight: normal;
}
</style>
<style>
.message-box .el-table .cell {
    white-space: nowrap;
}

.message-box .el-table__row:hover {
    cursor: pointer;
}

.message-box .unread {
    font-weight: bolder;
}
</style>