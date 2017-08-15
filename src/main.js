import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // NProgress样式
import router from './router';
import store from './store';
import { getToken } from './utils/auth.js';
require('promise.prototype.finally').shim();
import './assets/iconfont.js'; // iconfont
import IconSvg from './components/IconSvg.vue'; // svg 组件

Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg);

// 每隔5秒钟查询消息数量
setInterval(() => store.dispatch("GET_MESSAGE_NUMBERS"), 5000);


router.beforeEach((to, from, next) => {
    NProgress.start();
    // 如果已经登录
    if (getToken()) {
        // 如果没有获取用户信息，则获取用户信息
        if (store.getters.id == '') {
            store.dispatch('GET_INFO').then(() => {
                next();
            }).catch(() => {
                ElementUI.Message.error("获取用户信息失败，请刷新重试");
                NProgress.done();
            });
        } else {
            NProgress.done();
            next();
        }
    } else {
        if (to.path != '/login') {
            next({ path: '/login' });
            NProgress.done();
        } else {
            next();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});