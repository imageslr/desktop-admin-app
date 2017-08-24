import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/index.vue';
import Dashboard from '../views/dashboard/index.vue';
import Layout from '../views/layout/Layout.vue';
import Wechat from '../views/user/Wechat.vue';
import Library from '../views/user/Library.vue';
import Wiki from '../views/user/Wiki.vue';
import MessageDetail from '../views/message/MessageDetail.vue';
import Message from '../views/message/index.vue';
import Error404 from '../views/error/404.vue';


Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    hidden: true,
    redirect: '/login'
  }, {
    path: '/login',
    hidden: true,
    component: Login
  }, {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    noDropdown: true,
    icon: 'all',
    children: [{
      path: 'index',
      name: '首页',
      component: Dashboard,
    }]
  }, {
    path: '/user',
    component: Layout,
    name: '用户管理',
    redirect: '/user/wechat',
    icon: 'account',
    children: [{
      path: 'wechat',
      name: '小程序',
      component: Wechat,
    }, {
      path: 'library',
      name: '图书馆',
      component: Library,
    }, {
      path: 'wiki',
      name: 'Wiki系统',
      component: Wiki
    }]
  }, {
    path: '/message',
    component: Layout,
    noDropdown: true,
    isMessageItem: true,
    icon: 'email',
    children: [{
      path: '',
      name: '消息中心',
      redirect: '/message/wiki',
    }, {
      path: 'detail/:id',
      name: '消息详情',
      component: MessageDetail,
    }, {
      path: ':name',
      name: '收件箱',
      //meta: { noBreadCrumb: true },
      component: Message,
    }, ]
  }, {
    path: '/404',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      component: Error404
    }]
  }, {
    path: '*',
    hidden: true,
    redirect: '/404'
  }]
})