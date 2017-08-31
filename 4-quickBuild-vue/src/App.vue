<template>
    <div id="app">
        <Top></Top>
        <el-row>
            <el-col :span="4">
                <!--<el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" :style="winHeight">-->
                    <!--<el-menu-item-group title="分组一">-->
                        <!--<el-menu-item index="1"><i class="el-icon-message"></i><router-link to="/" class="indexmain" exact>ETL导入配置</router-link></el-menu-item>-->
                        <!--<el-menu-item index="2"><i class="el-icon-message"></i><router-link to="/libraryInitial">导入库表初始化</router-link></el-menu-item>-->
                    <!--</el-menu-item-group>-->
                    <!--<el-menu-item-group title="分组二">-->
                        <!--<el-menu-item index="3"><i class="el-icon-message"></i><router-link to="/profit">任务管理系统</router-link></el-menu-item>-->
                        <!--<el-menu-item index="4"><i class="el-icon-message"></i><router-link to="/profit">应用注册系统</router-link></el-menu-item>-->
                    <!--</el-menu-item-group>-->
                <!--</el-menu>-->
                <el-menu mode="vertical" :default-active="$route.path"  class="el-menu-vertical-demo" router :style="winHeight">
                    <el-menu-item-group title="分组一">
                        <el-menu-item index="/"><i class="el-icon-message"></i>模块</el-menu-item>
                        <el-menu-item index="/model1"><i class="el-icon-message"></i>模块1</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组二">
                        <el-menu-item index="/model2"><i class="el-icon-message"></i>模块2</el-menu-item>
                        <el-menu-item index="/model3"><i class="el-icon-message"></i>模块3</el-menu-item>
                    </el-menu-item-group>
                </el-menu>
                <!--<el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" router :style="winHeight">-->
                    <!--<el-menu-item-group title="分组一">-->
                        <!--<el-menu-item index="1" :route="{path:'/'}"><i class="el-icon-message"></i>ETL导入配置</el-menu-item>-->
                        <!--<el-menu-item index="2" :route="{path:'/libraryInitial'}"><i class="el-icon-message"></i>导入库表初始化</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                    <!--<el-menu-item-group title="分组二">-->
                        <!--<el-menu-item index="3" :route="{path:'/profit'}"><i class="el-icon-message"></i>任务管理系统</el-menu-item>-->
                        <!--<el-menu-item index="4" :route="{path:'/profit'}"><i class="el-icon-message"></i>应用注册系统</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                <!--</el-menu>-->
            </el-col>
            <el-col :span="20">
                <div id="content" :style="winHeight">
                    <router-view class="view"></router-view>
                </div>
            </el-col>
        </el-row>

        <!--<Top :config="config"></Top>-->

    </div>
</template>
<style>

</style>
<script>
    //引入主体样式文件css
    import './css/base.css'
    import './css/style.scss'

    //展示组件
    import Top from './components/TopBar.vue'
    import {mapState} from 'vuex'


    export default{
        data(){
            return {
                windWidth: window.innerWidth,
                windHeight: window.innerHeight,
            }
        },
        components:{
//            LeftMenu,
            Top,
        },
        computed:{
            ...mapState([
                'config'
            ]),
            winHeight: function () {
                return {
                    height: this.windHeight + 'px',
                    overflow: 'auto'
                }
            },
//            content: function () {
//                return {
//                    width: '100%',
//                    height: '100%',
//                    overflow:'auto'
//                }
//            },
        },
        created (){
//            this.$store.dispatch('getBasicInfo')
        },
        methods: {
            reSize: function () {
                this.windWidth = window.innerWidth;
                this.windHeight = window.innerHeight;
            }
        },
        mounted: function(){
//            this.leftWidth = document.getElementById('left').offsetWidth;
//            this.topHeight = document.getElementById('top').offsetHeight;

            window.onresize = function () {
                this.reSize();
            }.bind(this)
        },
        updated() {
            window.onresize = function () {
                this.reSize();
            }.bind(this)
            //第二次渲染触发
            //$('.box_conts').css('height', ($(window).height() - 30 - 44) + 'px');
        }
    }
</script>
