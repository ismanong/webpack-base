import Vue from 'vue'
import VueRouter from 'vue-router'

// 挂在路由上的展示组件
// import index from './doc/strart.md'



// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

//按需加载 两种方式
// const profit = resolve => require(['./pages/profit/profit.vue'], resolve )
const index = r => require.ensure([], () => r(require('./doc/strart.md')), 'index');
const model1 = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'model1');


// 3. Create the router
const routerMd = new VueRouter({
    //mode: 'history',
    //base: __dirname,
    routes: [
        // { path: '/', redirect: '/start' }, // 默认路由
        { path: '/', component: index },
        { path: '/model1', component: model1 },

        {
            path: '*',
            redirect: '/start'
        }
    ]

})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.

export default routerMd