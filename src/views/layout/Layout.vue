<template>
    <div class="container">
        <el-menu class="sidebar" :unique-opened="true" :default-active="isMessagePath?'/message/':$route.path" theme="dark" router>
            <template v-for="(item,index) in $router.options.routes">
                <el-menu-item v-if="!item.hidden&&item.noDropdown" :index="item.path+'/'+item.children[0].path">
                    <template slot="title">
                        <icon-svg v-if='item.icon' class="sidebar-icon" :icon-class="item.icon"></icon-svg>{{item.children[0].name}}
                        <el-badge class="menu-badge" v-if="item.isMessageItem && messageNumber" :value="messageNumber" />
                    </template>
                </el-menu-item>
                <el-submenu :index="index+''" v-if="!item.noDropdown&&!item.hidden">
                    <template slot="title">
                            <icon-svg v-if='item.icon' class="sidebar-icon" :icon-class="item.icon"></icon-svg>{{item.name}}
                    </template>
                    <el-menu-item v-for="child in item.children" :index="item.path+'/'+child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                </el-submenu>
            </template>
            <a href="https://api.mymoonlight.cn/wiki/" target="_blank">
                <li class="el-menu-item">
                    <icon-svg class="sidebar-icon" icon-class="viewlist"></icon-svg>图书管理
                </li>
            </a>
        </el-menu>
        <div class="main">
            <app-head ref="header"></app-head>
            <div class="content-container">
                <bread-crumb v-if="!noBreadCrumb"></bread-crumb>
                <transition name="fade" mode="out-in">
                    <router-view :key="$route.fullPath" v-on:showLogin="$refs.header.showLogin()"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import AppHead from './Header.vue';
import BreadCrumb from './BreadCrumb.vue';
export default {
    components: {
        AppHead,
        BreadCrumb
    },
    computed: {
        noBreadCrumb() {
            //return false;
            return this.$route.matched[this.$route.matched.length-1].meta.noBreadCrumb;
        },
        messageNumber(){
            return this.$store.getters.unReadMessageNumber;
        },
        isMessagePath(){
            return this.$route.matched.some(i => i.path == '/message');
        }
    }
}
</script>
<style scoped>
.container {
    width: 100%;
    height: 100%;
}

.sidebar {
    z-index: 1001;
    position: fixed;
    width: 180px;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar-icon {
    margin-right: 16px;
}

.main {
    position: relative;
    min-height: 100%;
    margin-left: 180px;
}

.content-container {
    padding: 20px;
}

.el-menu {
    border-radius: 0;
}

.el-breadcrumb {
    margin-bottom: 15px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
    opacity: 0
}
</style>
<style>
.menu-badge {
    margin-left: 8px;
    line-height: 1;
}
.menu-badge .el-badge__content {
    border: 0;
}
</style>