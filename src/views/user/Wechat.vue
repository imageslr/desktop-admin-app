<template>
    <div>
        <el-form inline :model="searchOptions" ref="searchForm">
            <el-form-item prop="phone">
                <el-input v-model="searchOptions.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="states">
                <el-select v-model="searchOptions.states" multiple placeholder="账号状态">
                    <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch()">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetTable()">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="tableLoading" :data="users" stripe style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left">
                        <el-form-item label="地址">{{ props.row.location || '未填写' }}</el-form-item>
                        <el-form-item label="邮政编码">{{ props.row.postcode || '未填写' }}</el-form-item>
                        <el-form-item label="注册时间">{{ props.row.createTime}}</el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" show-overflow-tooltip :formatter="column.formatter">
            </el-table-column>
            <el-table-column label="状态" width="90">
                <template scope="scope">
                    <el-tag :type="stateOptions[scope.row.state].type">{{stateOptions[scope.row.state].label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="fetchData">
        </el-pagination>
        <div>一共{{total}}个用户</div>
        <el-dialog title="设置馆藏" :visible.sync="dialogFormVisible" @close="resetFields">
            <el-form label-width="120px" label-position="left" :model="dialogData">
                <el-form-item label="订单id">
                    <el-input disabled :value="dialogData.id"></el-input>
                </el-form-item>
                <el-form-item label="借阅人">
                    <el-input disabled :value="dialogData.user.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input disabled :value="dialogData.user.phone"></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                    <el-input disabled :value="dialogData.book_brief.title"></el-input>
                </el-form-item>
                <el-form-item label="ISBN">
                    <el-input disabled :value="dialogData.book_brief.isbn"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="dialogStateValue" :placeholder="dialogData.stateTitle">
                        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-popover ref="confirmPopover" placement="top" width="160" v-model="popoverVisible">
                    <p>删除此订单可能影响该图书的可借数量，确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                        <el-button type="text" size="mini" @click="handleDelete()">确定</el-button>
                    </div>
                </el-popover>
                <el-button class="deleteBtn" type="danger" v-popover:confirmPopover :loading="dialogDeleteBtnLoading">删除此订单</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="dialogSubmitBtnLoading" @click="handleSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getWechatUsers } from '../../api/index.js';
export default {
    data: () => {
        return {
            tableLoading: false,
            currentTableType: 'all', // all || search
            pageSize: 20,
            currentPage: 1,
            total: 0, // 用户总数
            users: [], // 表格数据
            columns: [{
                prop: 'phone',
                label: '手机号',
                width: '150',
            }, {
                prop: 'name',
                label: '姓名',
                formatter: function(row) {
                    return row['name'] || '---';
                }
            }, {
                prop: 'username',
                label: '昵称',
                minWidth: '150',
            }, {
                prop: 'idNumber',
                label: '身份证号',
                width: '150',
                formatter: function(row) {
                    return row['idNumber'].slice(0, 6) + '******';
                }
            }],
            stateOptions: [
                { value: 0, label: "未审核", type: 'warning'},
                { value: 1, label: "已审核", type: 'success'},
                { value: 2, label: "未通过", type: 'danger'},
                { value: 3, label: "已拉黑", type: 'gray'},
            ],
            searchOptions: {
                phone: undefined,
                states: []
            },
            dialogData: {
                id: null,
                state: null,
                user: {
                    name: null,
                    phone: null
                },
                book_brief: {
                    title: null,
                    isbn: null
                }
            },
            dialogStateValue: "", // 选择的订单状态
            dialogFormVisible: false,
            dialogSubmitBtnLoading: false,
            dialogDeleteBtnLoading: false,

            popoverVisible: false,
        }
    },
    created: function() {
        this.fetchData(1);
    },
    methods: {
        handleSearch() {
            this.currentTableType = 'search';
            if (this.currentPage == 1)
                this.fetchData(1);
            else this.currentPage = 1;
        },
        fetchData(p) {
            this.tableLoading = true;
            var params = {};
            if(this.currentTableType == 'search') {
                params = Object.assign({}, this.searchOptions);
            }
            params.start = (p - 1) * this.pageSize;
            getWechatUsers(params).then((res) => {
                this.total = res.total;
                this.users = res.users;
            }).finally(() => this.tableLoading = false);
        },
        resetTable() {
            this.$refs.searchForm.resetFields();
            this.currentTableType = 'all';
            if (this.currentPage == 1)
                this.fetchData(1);
            else this.currentPage = 1;
        },
        resetFields() {
            this.dialogStateValue = "";
        },
        handleEdit(row) {
            this.dialogData = row;
            this.dialogFormVisible = true;
        },
        handleSubmit() {
            if (!this.dialogStateValue)
                return this.dialogFormVisible = false;

            const self = this;
            self.$axios.post('/api/orders/' + self.dialogData.id, {
                state: self.dialogStateValue
            }).then(res => {
                self.dialogSubmitBtnLoading = false;
                if (res.data.code == 200) {
                    self.dialogFormVisible = false;
                    self.$message.success("修改成功");
                    self.fetchData(self.currentPage);
                } else {
                    self.$message.error("修改失败");
                }
            })
        },
        handleDelete() {
            this.popoverVisible = false;
            this.dialogDeleteBtnLoading = true;

            const self = this;
            self.$axios.delete("/api/orders/" + self.dialogData.id).then(res => {
                self.dialogDeleteBtnLoading = false;
                if (res.data.code == 200) {
                    self.dialogFormVisible = false;
                    self.$message.success("删除订单成功");

                    // 从数组中删除订单
                    self.orderData.splice(self.orderData.findIndex(i => i.id == self.dialogData.id), 1);
                } else {
                    self.$message.error("删除订单失败：" + res.data.errmsg);
                }
            }).catch(_ => {
                self.dialogDeleteBtnLoading = false;
                self.$message.error("删除订单失败");
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

.el-table .el-form-item {
    margin: 0;
}

.dialog-footer>.deleteBtn {
    float: left;
}
</style>