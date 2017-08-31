import * as types from './types'

export default {
    Common_AjaxData: (context,payload) => {
        Base.fGetData(payload.url, [], function (data) {
            context.commit(types.AJAX,{
                name: payload.name,
                data: data
            });
        })
    },
    getBasicInfo:function (context) {
        if(Config.loadNumber){
            return
        }else{
            Comm.getCommpanyType(function () {
                console.log("%c获取股票基本信息",'color:green;font-size:2em;');
                Config.loadNumber = true;

                context.commit(types.AJAX,{
                    name: 'config',
                    data: Config
                });
            })
            Comm.getExchangeData();
        }
    }
}


