import Vue from 'vue'
import VueRouter from 'vue-router'

// 挂在路由上的展示组件
import index from './components/index.vue'



// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

//按需加载 两种方式
// const profit = resolve => require(['./pages/profit/profit.vue'], resolve )
const model1 = r => require.ensure([], () => r(require('./components/model1.vue')), 'model1');
const model2 = r => require.ensure([], () => r(require('./components/model2.vue')), 'model2');
const model3 = r => require.ensure([], () => r(require('./components/model3.vue')), 'model3');


// 3. Create the router
const router = new VueRouter({
    //mode: 'history',
    //base: __dirname,
    routes: [
        { path: '/', component: index },
        { path: '/model1', component: model1 },
        { path: '/model2', component: model2 },
        { path: '/model3', component: model3 }
    ]
})
// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.

export default router