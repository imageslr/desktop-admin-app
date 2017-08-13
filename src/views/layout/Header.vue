<template>
    <div class="header">
        <router-link to="/dashboard" class="header-logo">超级管理员后台</router-link>
        <div class="header-action">
            <screenfull class='header-action__screenfull' fill="#353535"></screenfull>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="header-action__link">
                    欢迎你，{{nickname}} 
                    <i class="el-icon-setting" style="margin-left: 5px"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changepassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <change-password-dialog ref="changePasswordDialog"></change-password-dialog>
    </div>
</template>
<script>
import screenfull from '../../components/Screenfull.vue';
import changePasswordDialog from './ChangePasswordDialog.vue';
export default {
    components: {
        screenfull,
        changePasswordDialog
    },
    data() {
        return {}
    },
    computed: {
        nickname() {
            return this.$store.getters.nickname;
        },
    },
    methods: {
        handleCommand: function(command) {
            if (command == 'logout') {
                this.$store.dispatch('LOGOUT').then(() => {
                    this.$router.replace({ path: '/login' });
                });
            }
            if (command == 'changepassword') {
                this.$refs.changePasswordDialog.show();
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    padding: 0 25px;
    height: 50px;
    font-size: 18px;
    color:#353535;
    background-color: #eef1f6;
}

.header-logo {
    float: left;
    margin-right: 50px;
    line-height: 50px;
    color: currentColor;
    text-decoration-line: none;
}

.header-action {
    float: right;
    line-height: 50px;
}

.header-action__screenfull {
    margin-right: 10px;
}

.el-dropdown,
.header-action__link {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    color: currentColor;
    font-size: 14px;
}
</style>