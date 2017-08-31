/*
*
*   按需加载 两种方式
*   1 webapck自带的 require.ensure (需要配置相对应的入口)
*   2 bundle-loader （不用手动定义require.ensure）
*
* */

document.getElementById('btn1').addEventListener('click',btnFunc1,false)
document.getElementById('btn2').addEventListener('click',btnFunc2,false)

function btnFunc1(){
        /*
        * require.ensure 只加载模块
        * param1 []  模块的依赖关系 为空则取cb调用的模块
        * param2 cb 模块加载完毕的回调
        * param3 '' 设置webpack分割模块的文件名字
        * */

        /*
        * 官方示例
        * -------------------------------------
            require.ensure(["module-a", "module-b"], function() {
                var a = require("module-a");

            });
        * -------------------------------------
        * */

        require.ensure([], function(require) {                     //加载模块
            var app = require('./modelLoad1.js');                  //取对应模块的导出对象 module.exports
            console.log(app)
        },'one')                                                   //生成一个名字为one.js的异步chunk模块
}
function btnFunc2(){

    require.ensure([], function(require) {
        var app = require('./modelLoad2.js');
        console.log(app)
    },'tow')

}

/*
*
* 方案一：webpack(require.ensure)+ react-router
* 因为使用require.ensure需要足够深的文件层级并且在对应文件需要定义js文件作为require.ensure入口，
* 书写起来比较麻烦，而且相对于工作量来说也是大有增加
*
* 方案二：webpack(bundle-loader)+ react-router(lazyLoadComponent)
* 优势：
* 1、不用过多的文件层级，保持文件的prue。
* 2、不用自己定义require.ensure
*
* */


