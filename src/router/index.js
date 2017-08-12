import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        hidden: true,
        component: resolve => require(['../views/login/index.vue'], resolve)
    }, {
        path: '/login',
        hidden: true,
        component: resolve => require(['../views/login/index.vue'], resolve)
    }, {
        path: '/dashboard',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/dashboard/index',
        noDropdown: true,
        icon: 'all',
        children: [{
            path: 'index',
            name: '首页',
            component: resolve => require(['../views/dashboard/index.vue'], resolve),
        }]
    }, {
        path: '/user',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        name: '用户管理',
        icon: 'account',
        children: [{
            path: 'wechat',
            name: '小程序用户',
            component: resolve => require(['../views/user/Wechat.vue'], resolve),
        },{
            path: 'library',
            name: '图书馆管理员',
            component: resolve => require(['../views/dashboard/index.vue'], resolve),
        },{
            path: 'wiki',
            name: 'Wiki系统用户',
            component: resolve => require(['../views/dashboard/index.vue'], resolve),
        }]
    }, {
        path: '/404',
        hidden: true,
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['../views/error/404.vue'], resolve)
        }]
    }, {
        path: '*',
        hidden: true,
        redirect: '/404'
    }]
})