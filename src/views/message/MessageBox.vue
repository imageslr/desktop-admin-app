<template>
    <div class="message-box">
        <div class="summary-text">一共{{total}}封邮件， 其中未读邮件{{unReadTotal}}封</div>
        <el-button type="text" @click="refreshTable">刷新</el-button>
        <el-button type="text" style="float: right; line-height: 20px" @click="showTip">查看提示</el-button>
        <el-table v-loading="tableLoading" :data="messages" style="width: 100%" :row-class-name="rowClassName">
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
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="fetchData">
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
            currentTableType: 'all', // all || search
            pageSize: 15,
            currentPage: 1,
            messages: [],
            searchOptions: {
                nickname: undefined,
                email: undefined,
                states: []
            },
        }
    },
    computed: {
        total() {
            return this.$store.getters.messageNumbers[this.senderType-1].total;
        },
        unReadTotal() {
            return this.$store.getters.messageNumbers[this.senderType-1].unReadTotal;
        }
    },
    created: function() {
        this.fetchData(1);
    },
    methods: {
        // 搜索
        handleSearch() {
            this.currentTableType = 'search';
            if (this.currentPage == 1)
                this.fetchData(1);
            else this.currentPage = 1;
        },
        // 刷新表格，取消搜索状态
        refreshTable() {
            this.currentTableType = 'all';
            if (this.currentPage == 1)
                this.fetchData(1);
            else this.currentPage = 1;
        },
        // 获取数据
        fetchData(p) {
            this.tableLoading = true;
            var params = {
                sender_type: this.senderType,
                start: (p - 1) * this.pageSize,
                count: this.pageSize
            };
            if (this.currentTableType == 'search') {
                params = Object.assign(params, this.searchOptions);
            }
            getMessages(params).then((res) => {
                this.messages = res.items;
                this.$store.commit('SET_MESSAGE_NUMBERS_BY_TYPE', {
                    type: this.senderType,
                    total: res.total,
                    unReadTotal: res.unReadTotal
                });
            }).finally(() => this.tableLoading = false);
        },
        rowClassName(row) {
            return row.isRead == 0 ? 'unread' : ''
        },
        formatTime(row) {
            var date = new Date(row.createTime);
            var today = new Date();
            if (date.getFullYear() == today.getFullYear()) {
                if (date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
                    return '今天' + date.getHours() + ': ' + date.getMinutes();
                } else if (this.isYesterDay(date, today)) {
                    return '昨天' + date.getHours() + ': ' + date.getMinutes();
                }
                return (date.getMonth() + 1 )+ '月' + date.getDate() + '日';
            }
            return date.getFullYear() + '/' + (date.getMonth() + 1 )+ '/' + date.getDate();
        },
        isYesterDay(date, today) {
            var month1 = date.getMonth() + 1;
            var month2 = today.getMonth() + 1;
            var date1 = date.getDate();
            var date2 = today.getDate();
            if (month1 == month2 && date1 == date2 - 1) {
                return true;
            } else if (month1 == month2 - 1 && date2 == 1) {
                if(month1 == 2 && date1 < 28) return false;
                return [1, 3, 5, 7, 8, 10, 12].some(i => i == month1 && date1 == 31) || [2, 4, 6, 9, 11].some(i => i == month1 && date1 == 30);
            }
            return false;
        },
        showTip(){
            this.$notify.info({
                title: '提示',
                message: '这里展示了各个平台用户的意见反馈，选择邮件可查看详情'
            });
        }
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
    font-weight: bold;
}
</style>