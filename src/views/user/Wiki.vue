<template>
    <div>
        <el-form inline :model="searchOptions" ref="searchForm">
            <el-form-item prop="email">
                <el-input v-model="searchOptions.email" placeholder="邮箱" @keyup.enter.native="handleSearch()"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchOptions.nickname" placeholder="昵称" @keyup.enter.native="handleSearch()"></el-input>
            </el-form-item>
            <el-form-item prop="states">
                <el-select v-model="searchOptions.states" multiple placeholder="账号状态">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="已拉黑" value="0"></el-option>
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
            <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" show-overflow-tooltip :formatter="column.formatter">
            </el-table-column>
            <el-table-column label="状态" min-width="90">
                <template scope="scope">
                    <el-tag v-if="scope.row.isAdmin == 1" type="primary">管理员</el-tag>
                    <el-tag v-else :type="scope.row.state|type">{{scope.row.state|label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template scope="scope">
                    <el-button size="small" @click="showEditDialog(scope.$index)">编 辑</el-button>
                    <el-button v-if="scope.row.state == 0" size="small" type="success" @click="moveOutBlacklist(scope.$index)">解 除</el-button>
                    <el-button v-else-if="scope.row.isAdmin == 0" size="small" type="text" @click="setAdmin(scope.$index)">设为管理员</el-button>
                    <el-button v-else size="small" type="text" @click="cancelAdmin(scope.$index)">取消管理员</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="fetchData">
        </el-pagination>
        <div>一共{{total}}个用户</div>
        <el-dialog title="图书馆信息" :visible.sync="editDialog.visible">
            <el-form label-width="120px" label-position="left" :model="editDialog.data">
                <el-form-item v-for="item in columns" :label="item.label">
                    <el-input :disabled="item.disabled" v-model="editDialog.data[item.prop]" :type="item.isPassword? 'password' : ''"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state == 1 && users[editDialog.index].isAdmin == 0" type="danger" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveToBlacklist(editDialog.index)">拉 黑</el-button>
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state == 0" type="success" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveOutBlacklist(editDialog.index)">解除拉黑</el-button>
                <el-button @click="editDialog.visible = false">取 消</el-button>
                <el-button type="primary" :loading="editDialog.updateBtnLoading" @click="updateUserInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getUsers, updateUserInfoById, block, unblock } from '../../api/wiki.js';
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
                prop: 'email',
                label: '邮箱',
                disabled: true,
                minWidth: '150',
            }, {
                prop: 'nickname',
                label: '昵称',
                minWidth: '150',
            }, {
                prop: 'password',
                label: '密码',
                minWidth: '120',
                isPassword: true,
                formatter: function(row) {
                    return '******';
                }
            }],
            searchOptions: {
                nickname: undefined,
                email: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    id: undefined,
                    nickname: undefined,
                    email: undefined,
                    password: undefined,
                    isAdmin: undefined,
                    state: undefined
                },
                updateBtnLoading: false, // 编辑用户信息的提交按钮
                blacklistBtnLoading: false, // 拉黑按钮
            }
        }
    },
    filters: {
        type(state) {
            return state == 0 ? 'danger' : 'gray';
        },
        label(state) {
            return state == 0 ? '已拉黑' : '正常';
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
        // 重置表格，取消搜索状态
        resetTable() {
            this.$refs.searchForm.resetFields();
            this.currentTableType = 'all';
            if (this.currentPage == 1)
                this.fetchData(1);
            else this.currentPage = 1;
        },
        // 获取数据
        fetchData(p) {
            this.tableLoading = true;
            var params = {};
            if (this.currentTableType == 'search') {
                params = Object.assign({}, this.searchOptions);
            }
            params.start = (p - 1) * this.pageSize;
            getUsers(params).then((res) => {
                this.total = res.total;
                this.users = res.subjects;
            }).finally(() => this.tableLoading = false);
        },
        // 显示编辑Dialog
        showEditDialog(index) {
            this.editDialog.index = index;
            this.editDialog.data = Object.assign({}, this.users[index]);
            this.editDialog.visible = true;
        },
        // 编辑用户信息
        updateUserInfo() {
            this.editDialog.updateBtnLoading = true;
            updateUserInfoById(this.editDialog.data.id, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach((key) => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                });
                this.editDialog.visible = false;
                this.$message.success("修改用户信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(index) {
            this.$confirm('拉黑后该用户将无法登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                block(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                })
            });
        },
        // 将用户移出黑名单
        moveOutBlacklist(index) {
            this.$confirm('解除拉黑后该用户可正常登录系统并使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                unblock(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 1;
                    this.editDialog.data.state = 1;
                })
            });
        },
        // 将用户设为管理员
        setAdmin(index) {
            this.$confirm('该用户可以管理员身份登录此系统并进行相关操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateUserInfoById(this.users[index].id, {isAdmin: true}).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].isAdmin = true;
                })
            });
        },
        // 取消管理员
        cancelAdmin(index) {
            this.$confirm('该用户将不能以管理员身份登录此系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateUserInfoById(this.users[index].id, {isAdmin: false}).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].isAdmin = false;
                })
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