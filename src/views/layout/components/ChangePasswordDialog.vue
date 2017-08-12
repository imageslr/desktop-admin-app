<template>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" @open="reset()">
        <el-form :rules="rules" label-width="120px" label-position="left" :model="form" ref="form">
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="form.newPassword" auto-complete="off" placeholder="长度6~25位"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword" auto-complete="off" placeholder="长度6~25位"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button style="float: left;" @click="reset()">重 置</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="submitForm()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { changePassword } from '../../../api/index.js';
export default {
    data() {
        return {
            form: {
                password: '',
                newPassword: "",
                confirmPassword: ""
            },
            rules: {
                password: {
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                },
                newPassword: [{
                    required: true,
                    trigger: 'blur',
                    message: '请输入密码，长度6~25位'
                }, {
                    min: 6,
                    max: 25,
                    trigger: 'blur',
                    message: '密码长度6~25位'
                }, {
                    validator: (rule, value, callback) => {
                        if (this.form.confirmPassword) {
                            this.$refs.form.validateField('confirmPassword');
                        }
                        callback();
                    }
                }],
                confirmPassword: [{
                    required: true,
                    message: '请再次输入新密码',
                    trigger: 'blur'
                }, {
                    validator: (rule, value, callback) => {
                        if (value !== this.form.newPassword) {
                            callback(new Error('两次输入密码不一致'));
                        } else {
                            callback();
                        }
                    }
                }]
            },

            dialogVisible: false,
            loading: false
        }
    },
    methods: {
        show() {
            this.dialogVisible = true;
        },
        reset() {
            this.$refs.form.resetFields();
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    changePassword(this.$store.getters.id, this.form.password, this.form.newPassword).then(() => {
                        this.dialogVisible = false;
                        this.$message.success('修改密码成功');
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            })
        },
    }
}
</script>