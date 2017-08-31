import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'; // Progress 进度条
// Progress 进度条 样式
import 'nprogress/nprogress.css';
// highlight theme
import 'highlight.js/styles/monokai-sublime.css';

import './js/common.js' //全局公共js
import APP from './App.vue'
// import router from './router.js'
import routerMd from './router-md.js'
import store from './store'

var router = router || routerMd;

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {

    NProgress.start();

    next();

    NProgress.done();
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(APP)
})

//挂载
//new Vue({ }).$mount('#src') ==> new Vue({ el: '' })

// 渲染组件 第一种
// template : `<APP><APP>`,
// components:{
//     APP
// },
// 渲染组件 第二种
// render: h => h(APP)

