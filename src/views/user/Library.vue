<template>
    <div>
        <el-form inline :model="searchOptions" ref="searchForm">
            <el-form-item prop="name">
                <el-input v-model="searchOptions.name" placeholder="图书馆名称" @keyup.enter.native="handleSearch()"></el-input>
            </el-form-item>
            <el-form-item prop="adminPhone">
                <el-input v-model="searchOptions.adminPhone" placeholder="管理员手机号" @keyup.enter.native="handleSearch()"></el-input>
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
                    <el-form label-position="left" label-width="50px">
                        <el-form-item label="描述" class="library-description">{{ props.row.description || '未填写' }}</el-form-item>
                        <el-form-item label="地址">{{ props.row.location || '未填写' }}</el-form-item>
                        <el-form-item label="照片">
                            <el-carousel v-if="props.row.imageUrls && props.row.imageUrls.length" :interval="4000" type="card" height="200px" style="max-width: 700px">
                                <el-carousel-item v-for="item in props.row.imageUrls" :key="item">
                                    <img :src="item" style="max-height: 200px" @click="handlePreview({url: item})">
                                </el-carousel-item>
                            </el-carousel>
                            <div v-else>未上传</div>
                        </el-form-item>
                        <el-form-item label="资质证明文件" label-width="100px">
                            <el-carousel v-if="props.row.qualificationImageUrls && props.row.qualificationImageUrls.length" :interval="4000" type="card" height="200px" style="max-width: 700px">
                                <el-carousel-item v-for="item in props.row.qualificationImageUrls" :key="item">
                                    <img :src="item" style="max-height: 200px" @click="handlePreview({url: item})">
                                </el-carousel-item>
                            </el-carousel>
                            <div v-else>未上传</div>
                        </el-form-item>
                        <el-form-item label="注册时间" label-width="70px">{{ props.row.createTime}}</el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <template v-for="column in columns">
                <el-table-column v-if="!column.hiddenInTable" :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" show-overflow-tooltip :formatter="column.formatter">
                </el-table-column>
            </template>
            <el-table-column label="状态" width="90">
                <template scope="scope">
                    <el-tag :type="stateOptions[scope.row.state].type">{{stateOptions[scope.row.state].label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button v-if="scope.row.state == 0" size="small" type="primary" @click="showApprovalDialog(scope.$index)">审 核</el-button>
                    <el-button size="small" @click="showEditDialog(scope.$index, scope.row)">编 辑</el-button>
                    <el-button v-if="scope.row.state != 0 && scope.row.state != 3" size="small" type="danger" @click="moveToBlacklist(scope.$index)">拉 黑</el-button>
                    <el-button v-if="scope.row.state == 3" size="small" type="success" @click="moveOutBlacklist(scope.$index)">解 除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="fetchData">
        </el-pagination>
        <div>一共{{total}}个用户</div>
        <el-dialog title="编辑图书馆信息" :visible.sync="editDialog.visible" @close="resetEditDialog">
            <el-form label-width="120px" label-position="left" :model="editDialog.data">
                <el-form-item v-for="item in columns" :label="item.label">
                    <el-input :disabled="item.disabled" v-model="editDialog.data[item.prop]" :type="item.type" :rows="item.rows"></el-input>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="editDialog.data.state" placeholder="请选择">
                        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图书馆照片">
                    <el-upload action="/api/libraries/upload" name="picture" :file-list="editDialog.imageList" list-type="picture-card" accept="image/jpeg, image/jpg, image/png" :on-preview="handlePreview" :before-upload="beforePictureUpload" :on-change="handlePictureChange" :on-remove="handlePictureChange" :httpRequest="httpRequest">
                        <div slot="tip" class="el-upload__tip">最多上传9张照片，每张照片不超过2MB</div>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="资质证明文件">
                    <el-upload action="/api/libraries/upload" name="picture" :file-list="editDialog.qualificationImageList" list-type="picture-card" accept="image/jpeg, image/jpg, image/png" :on-preview="handlePreview" :before-upload="beforePictureUpload1" :on-change="handlePictureChange1" :on-remove="handlePictureChange1" :httpRequest="httpRequest">
                        <div slot="tip" class="el-upload__tip">资质证明文件包括：图书馆经营许可证、法人身份证件等；最多上传9张照片，每张照片不超过2MB</div>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state != 3" type="danger" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveToBlacklist(editDialog.index)">拉 黑</el-button>
                <el-button v-if="users[editDialog.index] && users[editDialog.index].state == 3" type="success" style="float: left" :loading="editDialog.blacklistBtnLoading" @click="moveOutBlacklist(editDialog.index)">解除拉黑</el-button>
                <el-button @click="editDialog.visible = false">取 消</el-button>
                <el-button type="primary" :loading="editDialog.updateBtnLoading" @click="updateUserInfo">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="approve-dialog" title="审核结果" :visible.sync="approvalDialog.visible">
            <el-form ref="approvalForm" label-width="120px" label-position="left" :model="approvalDialog.data">
                <el-form-item v-for="item in columns" :label="item.label">{{item.isPassword ? "******" : (approvalDialog.data[item.prop] || '未填写') }}</el-form-item>
                <el-form-item label="照片">
                    <el-carousel v-if="approvalDialog.data.imageUrls && approvalDialog.data.imageUrls.length" :interval="4000" type="card" height="200px" style="max-width: 700px">
                        <el-carousel-item v-for="item in approvalDialog.data.imageUrls" :key="item">
                            <img :src="item" style="max-height: 200px" @click="handlePreview({url: item})">
                        </el-carousel-item>
                    </el-carousel>
                    <div v-else>未上传</div>
                </el-form-item>
                <el-form-item label="资质证明文件">
                    <el-carousel v-if="approvalDialog.data.qualificationImageUrls && approvalDialog.data.qualificationImageUrls.length" :interval="4000" type="card" height="200px" style="max-width: 700px">
                        <el-carousel-item v-for="item in approvalDialog.data.qualificationImageUrls" :key="item">
                            <img :src="item" style="max-height: 200px" @click="handlePreview({url: item})">
                        </el-carousel-item>
                    </el-carousel>
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
            <img width="100%" :src="previewDialog.url" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { getUsers, updateLibraryInfoById, updateStateById, block, unblock } from '../../api/library.js';
import httpRequest from '../../utils/httpRequest';
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
                prop: 'name',
                label: '图书馆名称',
                minWidth: 200
            }, {
                prop: 'phone',
                label: '联系电话',
                width: '150',
                formatter: function(row) {
                    return row['phone'] || '---';
                }
            }, {
                prop: 'description',
                label: '描述',
                type: 'textarea',
                rows: 5,
                hiddenInTable: true
            }, {
                prop: 'adminName',
                label: '管理员姓名',
                width: '120',
                formatter: function(row) {
                    return row['adminName'] || '---';
                }
            }, {
                prop: 'adminPhone',
                label: '管理员手机号',
                disabled: true,
                width: '150',
            }, {
                prop: 'adminPassword',
                label: '管理员密码',
                width: '120',
                isPassword: true,
                type: 'password',
                formatter: function(row) {
                    return '******';
                }
            }],
            stateOptions: [
                { value: 0, label: "未审核", type: 'warning' },
                { value: 1, label: "已审核", type: 'success' },
                { value: 2, label: "未通过", type: 'danger' },
                { value: 3, label: "已拉黑", type: 'gray' },
            ],
            searchOptions: {
                name: undefined,
                adminPhone: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    id: undefined,
                    name: undefined,
                    phone: undefined,
                    description: undefined,
                    adminPhone: undefined,
                    adminName: undefined,
                    adminPassword: undefined,
                    state: undefined,
                    imageUrls: [], // 图书馆照片，只保存链接
                    qualificationImageUrls: []
                },
                imageList: [], // 图书馆照片的信息对象列表
                qualificationImageList: [],
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
                url: ""
            },
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
        showApprovalDialog(index) {
            this.approvalDialog.index = index;
            this.approvalDialog.data = Object.assign({}, this.users[index]);
            this.approvalDialog.data.state = 1;
            this.approvalDialog.data.reason = "";
            this.approvalDialog.visible = true;
        },
        // 提交审核信息
        approve() {
            this.$refs.approvalForm.validate((valid) => {
                if (!valid) return;
                this.approvalDialog.btnLoading = true;
                updateStateById(this.approvalDialog.data.id, this.approvalDialog.data.state, this.approvalDialog.data.reason).then(() => {
                    this.approvalDialog.visible = false;
                    this.users[this.approvalDialog.index].state = this.approvalDialog.data.state;
                    this.$message.success("操作成功");
                }).finally(() => this.approvalDialog.btnLoading = false);
            })
        },
        // 显示编辑Dialog
        showEditDialog(index, row) {
            this.editDialog.index = index;
            this.editDialog.data = Object.assign({}, this.users[index]);
            if (row.imageUrls) {
                this.editDialog.imageList = row.imageUrls.map((i) => {
                    return { name: '', url: i, status: 'success', response: { data: i } };
                });
            } else {
                this.editDialog.imageList = [];
            }
            if (row.qualificationImageUrls) {
                this.editDialog.qualificationImageList = row.qualificationImageUrls.map((i) => {
                    return { name: '', url: i, status: 'success', response: { data: i } };
                });
            } else {
                this.editDialog.qualificationImageList = [];
            }
            this.editDialog.visible = true;
        },
        // 关闭编辑dialog时将图片列表设为空，防止编辑其他行时图片列表有退出动画
        resetEditDialog() {
            this.editDialog.imageList = [];
            this.editDialog.qualificationImageList = [];
        },
        // 编辑用户信息
        updateUserInfo() {
            this.editDialog.updateBtnLoading = true;
            this.editDialog.data.imageUrls = this.editDialog.imageList.map((i) => i.response.data);
            this.editDialog.data.qualificationImageUrls = this.editDialog.qualificationImageList.map((i) => i.response.data);
            updateLibraryInfoById(this.editDialog.data.id, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach((key) => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                })
                this.editDialog.visible = false;
                this.$message.success("修改图书馆信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(index) {
            this.$confirm('拉黑后该用户将无法使用该手机号登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                block(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 3;
                    this.editDialog.data.state = 3;
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
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                })
            });
        },
        handlePreview(file) {
            this.previewDialog.url = file.url;
            this.previewDialog.visible = true;
        },
        handlePictureChange(file, fileList) {
            this.editDialog.imageList = fileList;
        },
        beforePictureUpload(file) {
            if (this.editDialog.imageList.length > 9) {
                this.$message.error('最多只能上传9张图片');
                return false;
            }
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB');
            }
            return isJPG && isLt2M;
        },
        handlePictureChange1(file, fileList) {
            this.editDialog.qualificationImageList = fileList;
        },
        beforePictureUpload1(file) {
            if (this.editDialog.qualificationImageList.length > 9) {
                this.$message.error('最多只能上传9张图片');
                return false;
            }
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB');
            }
            return isJPG && isLt2M;
        },
        httpRequest: httpRequest,
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

.el-carousel__item {
    text-align: center;
}

.library-description {
    white-space: pre-wrap;
}
</style>
<style>
.approve-dialog .el-form-item__content {
    white-space: pre-wrap;
}
</style>