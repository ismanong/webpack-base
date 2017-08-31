/*
 * @class String
 * 扩展字符串，实现format方法
 * @method String.prototype.format
 * @return {String} 返回格式化后的字符串
 * @example　"{0} worked at {1}, earns ${2} per month.".format("Meric","EastMoney","100");
 */
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{\{|\{(\d+)\}/g, function (m, i, o, n) {
        if (m == "{{") return "{";
        return args[i];
    });
};
String.prototype.formatDate = function (fmt) {
    if (!this) return "";
    try {
        return new Date(Date.parse(this)).format(fmt);
    } catch (e) {
        return "";
    }
};
/*
 *
 *
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,               //月份
        "d+": this.getDate(),                    //日
        //"H+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    var week = {
        "0" : "星期日",
        "1" : "星期一",
        "2" : "星期二",
        "3" : "星期三",
        "4" : "星期四",
        "5" : "星期五",
        "6" : "星期六"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            // We must check against these specific cases.
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

