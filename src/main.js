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

// 每隔一定时间查询消息数量
if (store.getters.token) {
    store.dispatch("GET_MESSAGE_NUMBERS")
}
setInterval(() => {
    if (store.getters.token) {
        store.dispatch("GET_MESSAGE_NUMBERS")
    }
}, 5000);


router.beforeEach((to, from, next) => {
    NProgress.start();

    // 如果进入登录页，在有token的时候跳至主页
    if (to.path == '/login') {
        if (getToken()) {
            next({ path: '/dashboard' })
            NProgress.done();
        } else {
            next();
        }
    }
    // 如果进入的不是登录页，在有token的时候获取用户信息，没token的时候跳到登录页
    else if (!getToken()) {
        next({ path: '/login' })
        NProgress.done(); // hack
    } else {
        if (store.getters.id == '') {
            store.dispatch('GET_INFO').then(() => {
                next();
            }).catch(() => {
                ElementUI.Message.error("获取用户信息失败，请刷新重试");
                NProgress.done();
            });
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