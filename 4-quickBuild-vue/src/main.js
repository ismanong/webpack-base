import 'babel-polyfill'
import Vue from 'vue'

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式

import './js/common.js' //全局公共js
import APP from './App.vue'

import store from './store'

// import router from './router.js'
import routerMd from './router-md.js'
var router = routerMd;

/*
* element 完整引入
* */
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)

/*
* element 按需引入
* */
import {
    Menu,
    MenuItem,
    MenuItemGroup,
    Icon,
    Row,
    Col
}  from 'element-ui'
Vue.use(Menu) // Vue.component(Menu.name, Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)



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

