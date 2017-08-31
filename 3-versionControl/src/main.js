import './modelOne.js'
import './modelTwo.js'

(function someFn(){
    document.write("-----------1-------------<br>")
})();
(function someFn2(){
    document.write("-----------2-------------<br>")
})();
(function someFn3(){
    document.write("-----------3-------------<br>")
})();
(function someFn4(){
    document.write("-----------4-------------<br>")
})();
(function someFn5(){
    document.write("-----------5-------------<br>")
})();


document.getElementById('btn1').addEventListener('click',btnFunc1,false)
document.getElementById('btn2').addEventListener('click',btnFunc2,false)

function btnFunc1(){
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