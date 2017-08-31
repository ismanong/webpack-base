import Vue from 'vue'
import axios from 'axios'
import * as types from '../types'

// initial state
// shape: {}
const state = {
    Venture0: {},
    Venture1: {},
    Venture2: {},
    Config: {},
    Ranking0:{},
    Ranking1:{},
    Ranking2:{},
}

// mutations
const mutations = {
    [types.MAINPAGE_ADD] (state,  payload) {
        Vue.set(state, payload.name, payload.data);

    },
}

// action
const actions = {

    index_AjaxData: (context,payload) => {
        // axios.get( __DEVAPI__ + payload.url)
        //     .then(function (response) {
        //         console.log(response);
        //         context.commit(types.MAINPAGE_ADD,{
        //             name: payload.name,
        //             data: response.data
        //         });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        /*
         Base.getAjax(payload.url,function (data) {
         context.commit(types.MAINPAGE_ADD,{
         name: payload.name,
         data: data
         });
         })
         */

        Base.fGetData(payload.url, [], function (data) {
            context.commit(types.MAINPAGE_ADD,{
                name: payload.name,
                data: data
            });
        });
    },
    index_AjaxDataArr: (context,payload) => {
        let delayArray = [];
        let setTime = null;
        for(var i=0;i<payload.length;i++){
            if(payload[i].delay) {
                delayArray.push(payload[i])
            }else {
                context.dispatch('index_AjaxData',payload[i]);
            }
        }
        if(delayArray.length>0){
            setTime = setTimeout(()=>{
                for(var i=0;i<delayArray.length;i++){
                    context.dispatch('index_AjaxData',delayArray[i]);
                }
            },1500)
        }
    },
    //头部渐变效果
    fadeTo: function(context,payload){
        const sttI = function() {
            $(payload).fadeTo(1000, 0.35, function () {
                $(payload).fadeTo(1000, 1);
            });
        }
        const interval = setInterval(sttI,1000);
    }
}



const getters = {
    getterData (state,getters,rootState){
        if( !state.GetRealTimeInfo_Main )  return "";
        let json = state.GetRealTimeInfo_Main;
        if (json.data1!=undefined && json.data1.stockInfo != undefined && json.data1.indexInfo != undefined && json.data1.marketInfo != undefined) {
            let jsonResult = JSON.parse(json.data1.stockInfo);//估值指标
            let industryResult = JSON.parse(json.data1.indexInfo);
            let indexResult = JSON.parse(json.data1.marketInfo);
            let dateResult = JSON.parse(json.data1.date);
            if (industryResult.isResult != undefined && indexResult.isResult != undefined && dateResult.isResult != undefined) {
                if (industryResult.isResult && industryResult.isResult == "true" && indexResult.isResult && indexResult.isResult == "true" && dateResult.isResult && dateResult.isResult == "true") {
                    let dateTime = dateResult.result.date.toString();
                    let time = "";
                    if (dateResult.result.time > 150000) {time = "150000";}
                    else if (dateResult.result.time < 100000) {time = "0" + dateResult.result.time.toString();}
                    else {time = dateResult.result.time.toString();}
                    if (jsonResult.result.list[0]!=undefined && jsonResult.result.list[0]["value"] != undefined) {
                        //-------------------------------------头部  最新价格
                        let values = {
                            name: Config.name,
                            price: jsonResult.result.list[0]["value"][0] == null ? "-" : jsonResult.result.list[0]["value"][0],
                            change: jsonResult.result.list[0]["value"][2] == null ? "-" : Base.fKeepDecimals(jsonResult.result.list[0]["value"][2], 3),
                            rate: jsonResult.result.list[0]["value"][1] == null ? "-" : jsonResult.result.list[0]["value"][1],
                            date: dateTime.substr(4, 2) + "-" + dateTime.substr(6, 2) + " " + time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2)
                        };
                        //-------------------------------------头部  最新价格 end
                        //-----------------------------------行情报价
                        let marketValue = {
                            CSHARE: jsonResult.result.list[0]["value"][12] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][12]) / 100000000, 2),
                            DEC_TSHARE: jsonResult.result.list[0]["value"][13] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][13]) / 100000000, 2),
                            DEC_ZSZ: jsonResult.result.list[0]["value"][14] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][14]) / 100000000, 2),
                            DEC_CSHARESZ: jsonResult.result.list[0]["value"][15] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][15]) / 100000000, 2),
                            DEC_SYLTTM: jsonResult.result.list[0]["value"][16] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][16], 2),
                            DEC_SJLMRQ: jsonResult.result.list[0]["value"][17] == null ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][17], 2)
                        };
                        let industryChange = "",
                            indexChange = "",
                            stockChange = (jsonResult.result.list[0]["value"][2] == null ? 0 : jsonResult.result.list[0]["value"][2]);
                        if (industryResult.result.list[0]!=undefined && industryResult.result.list[0]["value"] != undefined) {
                            industryChange = industryResult.result.list[0]["value"][6] == null ? 0 : industryResult.result.list[0]["value"][6];
                        } else {
                            industryChange = 0;
                        }
                        if (indexResult.result.list[0] != undefined && indexResult.result.list[0]["value"] != undefined) {
                            indexChange = indexResult.result.list[0]["value"][6] == null ? 0 : indexResult.result.list[0]["value"][6];
                        } else {
                            indexChange = 0;
                        }
                        let marketHtml = [
                            ["最新",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][0] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][0], 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][0] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][0], 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][0] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][0], 2))
                            ],
                            ["开盘",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][4] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][4], 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][1] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][1], 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][1] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][1], 2))
                            ],
                            ["最高",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][5] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][5], 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][2] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][2], 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][2] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][2], 2))
                            ],
                            ["最低",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][6] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][6], 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][3] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][3], 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][3] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][3], 2))
                            ],
                            ["昨收",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][3] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][3], 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][4] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][4], 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][4] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][4], 2))
                            ],
                            ["涨跌幅",
                                (stockChange > 0 ? "r" : (stockChange < 0 ? "g" : "")) + ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][1] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][1], 2))+"%",
                                (industryChange > 0 ? "r" : (industryChange < 0 ? "g" : "")) + ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][5] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(industryResult.result.list[0]["value"][5]), 2))+"%",
                                (indexChange > 0 ? "r" : (indexChange < 0 ? "g" : "")) + ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][5] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(indexResult.result.list[0]["value"][5]), 2))+"%"
                            ],
                            ["涨跌",
                                (stockChange > 0 ? "r" : (stockChange < 0 ? "g" : "")) + ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][2] == null) ? "-" : Base.fKeepDecimals(stockChange, 2)),
                                (industryChange > 0 ? "r" : (industryChange < 0 ? "g" : "")) + Base.fKeepDecimals(industryChange, 2),
                                (indexChange > 0 ? "r" : (indexChange < 0 ? "g" : "")) + Base.fKeepDecimals(indexChange, 2)
                            ],
                            ["换手率",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][8] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][8], 2))+"%",
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][7] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][7] * 100, 2))+"%",
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][7] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][7] * 100, 2))+"%"
                            ],
                            ["成交量(万手)",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][7] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][7]) / 1000000, 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][8] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(industryResult.result.list[0]["value"][8]) / 1000000, 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][8] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(indexResult.result.list[0]["value"][8]) / 1000000, 2))
                            ],
                            ["成交额(万元)",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][9] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(jsonResult.result.list[0]["value"][9]) / 10000, 2)),
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][9] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(industryResult.result.list[0]["value"][9]) / 10000, 2)),
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][9] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(Number(indexResult.result.list[0]["value"][9]) / 10000, 2))
                            ],
                            ["振幅",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][10] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][10], 2))+"%",
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][10] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][10], 2))+"%",
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][10] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][10], 2))+"%"
                            ],
                            ["60日涨跌幅",
                                ((jsonResult.result.list[0] == undefined || jsonResult.result.list[0]["value"][11] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(jsonResult.result.list[0]["value"][11], 2))+"%",
                                ((industryResult.result.list[0] == undefined || industryResult.result.list[0]["value"][11] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(industryResult.result.list[0]["value"][11], 2))+"%",
                                ((indexResult.result.list[0] == undefined || indexResult.result.list[0]["value"][11] == null) ? Base.fKeepDecimals(0, 2) : Base.fKeepDecimals(indexResult.result.list[0]["value"][11], 2))+"%"
                            ]
                        ];
                        //-----------------------------------行情报价-end

                        //----------------------------资金流向
                        let Data = $.parseJSON(json.data2);
                        if (Data.isResult != undefined) {
                            if (Data.isResult != "false" && Data.result.list != undefined && Data.result.list.length > 0 && Data.result.list[0]["value"] != undefined) {
                                let fundValue = {
                                    smallin: Data.result.list[0]["value"][0] == null ? 0 : Data.result.list[0]["value"][0] / 10000,
                                    smallout: Data.result.list[0]["value"][1] == null ? 0 : Data.result.list[0]["value"][1] / 10000,
                                    middlein: Data.result.list[0]["value"][2] == null ? 0 : Data.result.list[0]["value"][2] / 10000,
                                    middleout: Data.result.list[0]["value"][3] == null ? 0 : Data.result.list[0]["value"][3] / 10000,
                                    bigin: Data.result.list[0]["value"][4] == null ? 0 : Data.result.list[0]["value"][4] / 10000,
                                    bigout: Data.result.list[0]["value"][5] == null ? 0 : Data.result.list[0]["value"][5] / 10000,
                                    superin: Data.result.list[0]["value"][6] == null ? 0 : Data.result.list[0]["value"][6] / 10000,
                                    superout: Data.result.list[0]["value"][7] == null ? 0 : Data.result.list[0]["value"][7] / 10000
                                }
                                Data.fundValue = fundValue;
                            }
                        }
                        //----------------------------资金流向 end
                        let dataJSON = {
                            jsonArr : marketHtml,
                            hedeInfo : marketValue,
                            values : values,
                            fundValue : Data.fundValue,
                        };
                        //Vue.set(state,'getterData',dataJSON);
                        //return state.getterData
                        return dataJSON
                    }
                }
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}