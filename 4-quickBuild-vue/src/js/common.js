//项目公用
import '../../public/js/Prototype' //js原生类型扩展
import '../../public/js/Setting' //公共配置
import '../../public/js/Base' //公共函数
import '../../public/js/jquery1.7.2/jquery.js' //jquery

// import '../../../../../public/js/em.tab/TabPanel.js' //

//项目私用
import './config' //私有配置

window.Comm = {
    $: function (id) {
        if(typeof id === 'string'){
            console.log(id)
            if(id.indexOf('#') > -1){
                id = id.replace("#", "");
                return document.getElementById(id)
            }
        }
    },


};
