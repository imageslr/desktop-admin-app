<template>
    <div>
        <el-form inline :model="searchOptions" ref="searchForm">
            <el-form-item prop="phone">
                <el-input v-model="searchOptions.phone" placeholder="手机号" @keyup.enter.native="handleSearch()"></el-input>
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
                    <el-form label-position="left" label-width="110px">
                        <el-form-item label="地址">{{ props.row.location || '未填写' }}</el-form-item>
                        <el-form-item label="邮政编码">{{ props.row.postcode || '未填写' }}</el-form-item>
                        <el-form-item label="身份证（正面）">
                            <img v-if="props.row.idCardImgFront" class="id-card-img" :src="props.row.idCardImgFront" @click="handlePicturePreview(props.row.idCardImgFront)">
                            <div v-else>未上传</div>
                        </el-form-item>
                        <el-form-item label="身份证（反面）">
                            <img v-if="props.row.idCardImgBack" class="id-card-img" :src="props.row.idCardImgBack" @click="handlePicturePreview(props.row.idCardImgBack)">
                            <div v-else>未上传</div>
                        </el-form-item>
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
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button v-if="scope.row.state == 0" size="small" type="primary" @click="showApprovalDialog(scope.row, scope.$index)">审 核</el-button>
                    <el-button size="small" @click="showEditDialog(scope.row, scope.$index)">编 辑</el-button>
                    <el-button v-if="scope.row.state != 0 && scope.row.state != 3" size="small" type="danger" @click="moveToBlacklist(scope.row.phone, scope.$index)">拉 黑</el-button>
                    <el-button v-if="scope.row.state == 3" size="small" type="success" @click="moveOutBlacklist(scope.row.phone, scope.$index)">解 除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="fetchData">
        </el-pagination>
        <div>一共{{total}}个用户</div>
        <el-dialog title="用户信息" :visible.sync="editDialog.visible">
            <el-form label-width="120px" label-position="left" :model="editDialog.data">
                <el-form-item label="手机号">
                    <el-input disabled v-model="editDialog.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editDialog.data.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="editDialog.data.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editDialog.data.location"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input v-model="editDialog.data.postcode"></el-input>
                </el-form-item>
                <!-- <el-form-item label="账号状态">
                    <el-select v-model="editDialog.data.state" placeholder="请选择">
                        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <div slot="footer">
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state != 3" type="danger" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveToBlacklist(editDialog.data.phone, editDialog.index)">拉 黑</el-button>
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state == 3" type="success" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveOutBlacklist(editDialog.data.phone, editDialog.index)">解除拉黑</el-button>
                <el-button @click="editDialog.visible = false">取 消</el-button>
                <el-button type="primary" :loading="editDialog.updateBtnLoading" @click="updateUserInfo">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="审核结果" :visible.sync="approvalDialog.visible">
            <el-form ref="approvalForm" label-width="120px" label-position="left" :model="approvalDialog.data">
                <el-form-item label="手机号">{{approvalDialog.data.phone || '未填写' }}</el-form-item>
                <el-form-item label="姓名">{{approvalDialog.data.name || '未填写' }}</el-form-item>
                <el-form-item label="身份证号">{{approvalDialog.data.idNumber || '未填写' }}</el-form-item>
                <el-form-item label="地址">{{approvalDialog.data.location || '未填写' }}</el-form-item>
                <el-form-item label="邮政编码">{{approvalDialog.data.postcode || '未填写' }}</el-form-item>
                <el-form-item label="身份证（正面）">
                    <img v-if="approvalDialog.data.idCardImgFront" class="id-card-img" :src="approvalDialog.data.idCardImgFront" @click="handlePicturePreview(approvalDialog.data.idCardImgFront)">
                    <div v-else>未上传</div>
                </el-form-item>
                <el-form-item label="身份证（反面）">
                    <img v-if="approvalDialog.data.idCardImgBack" class="id-card-img" :src="approvalDialog.data.idCardImgBack" @click="handlePicturePreview(approvalDialog.data.idCardImgBack)">
                    <div v-else>未上传</div>
                </el-form-item>
                <el-form-item label="审核结果">
                    <el-radio v-model="approvalDialog.data.state" :label="1">通过</el-radio>
                    <el-radio v-model="approvalDialog.data.state" :label="2">未通过</el-radio>
                </el-form-item>
                <el-form-item v-if="approvalDialog.data.state == 2" label="反馈信息" :rules="approvalDialog.reasonRule" prop="reason">
                    <el-input type="textarea" :rows="3" placeholder="请输入审核未通过的原因" v-model="approvalDialog.data.reason">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="approvalDialog.visible = false">取 消</el-button>
                <el-button type="primary" :loading="approvalDialog.btnLoading" @click="approve">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog v-model="previewDialog.visible">
            <img width="100%" :src="previewDialog.imageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { getUsers, updateUserInfoByPhone, updateStateByPhone, block, unblock } from '../../api/wechat.js';
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
                    if (!row['idNumber']) return '---';
                    return row['idNumber'].slice(0, 6) + '******';
                }
            }],
            stateOptions: [
                { value: 0, label: "未审核", type: 'warning' },
                { value: 1, label: "已审核", type: 'success' },
                { value: 2, label: "未通过", type: 'danger' },
                { value: 3, label: "已拉黑", type: 'gray' },
            ],
            searchOptions: {
                phone: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    phone: undefined,
                    name: undefined,
                    idNumber: undefined,
                    location: undefined,
                    postcode: undefined,
                    //state: undefined
                },
                updateBtnLoading: false, // 编辑用户信息的提交按钮
                blacklistBtnLoading: false, // 拉黑按钮
            },
            approvalDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {},
                btnLoading: false,
                reasonRule: { required: true, message: '请填写反馈信息', trigger: 'blur' },
            },
            previewDialog: {
                visible: false,
                imageUrl: ""
            }
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
        // 显示审核Dialog
        showApprovalDialog(row, index) {
            this.approvalDialog.index = index;
            this.approvalDialog.data = Object.assign({}, row);
            this.approvalDialog.data.state = 1;
            this.approvalDialog.data.reason = "";
            this.approvalDialog.visible = true;
        },
        // 提交审核信息
        approve() {
            this.$refs.approvalForm.validate((valid) => {
                if (!valid) return;
                this.approvalDialog.btnLoading = true;
                updateStateByPhone(this.approvalDialog.data.phone, this.approvalDialog.data.state, this.approvalDialog.data.reason).then(() => {
                    this.approvalDialog.visible = false;
                    this.users[this.approvalDialog.index].state = this.approvalDialog.data.state;
                    this.$message.success("操作成功");
                }).finally(() => this.approvalDialog.btnLoading = false);
            })
        },
        // 显示编辑Dialog
        showEditDialog(row, index) {
            this.editDialog.index = index;
            this.editDialog.data = Object.assign({}, row);
            this.editDialog.visible = true;
        },
        // 编辑用户信息
        updateUserInfo() {
            this.editDialog.updateBtnLoading = true;
            updateUserInfoByPhone(this.editDialog.data.phone, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach((key) => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                });
                this.editDialog.visible = false;
                this.$message.success("修改用户信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(phone, index) {
            this.$confirm('拉黑后该用户将无法使用该手机号登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                block(phone).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 3;
                    this.editDialog.data.state = 3;
                })
            });
        },
        // 将用户移出黑名单
        moveOutBlacklist(phone, index) {
            this.$confirm('解除拉黑后该用户可正常登录系统并使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                unblock(phone).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                })
            });
        },
        handlePicturePreview(url) {
            this.previewDialog.imageUrl = url;
            this.previewDialog.visible = true;
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

.id-card-img {
    max-height: 200px;
    max-width: 100%;
}
</style>