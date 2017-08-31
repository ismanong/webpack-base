/*
*config对象
*     ### 包含
*         + URL               :带http://的域名
*         + InfoWindowOptions :弹出框的大小样式
*         + ImgPath           :图片路径
*         + docTypeImg        :不同文档类型对应的图标图片
*         + BlankChar         :数据为空时展示的字符
*         + StaticServer      :静态化服务器地址
*         + StaticNodeServer
*         + IsLocal           :是否本地打开
*
* @property Config
* @type {Object}
**/
window.Setting = {
    Url: window.location.host.indexOf("http") !== 0 ? "http://" + window.location.host + "/" : window.location.host + "/",
    InfoWindowOptions: "height=554,width=801,resizable=no,max=no,min=no",
    InfoWindowOptionsAuto: "height=554,width=801,resizable=yes,max=yes,min=yes",
    ImgPath: "../images/comm/",
    docTypeImg: ["pdf.gif", "doc.gif", "exc.gif", "ppt.gif", "jpg.gif", "txt.gif", "html.gif", "rar.gif", "rar.gif", "other.gif", "jpg.gif"],
    CapitalType: [{ "value": "1", "name": "股", "chinese": "股" }, { "value": "1000", "name": "千股", "chinese": "千股" }, { "value": "10000", "name": "万股", "chinese": "万股" }, { "value": "1000000", "name": "百万股", "chinese": "百万股" }, { "value": "100000000", "name": "亿股", "chinese": "亿股" }, { "value": "1000000000", "name": "十亿股", "chinese": "十亿股" }],
    BlankChar: "-",
    StaticServer: "http://cdn.jg.eastmoney.com/", //"http://183.136.162.230/",
    InfoDetailServer: "http://183.136.162.253/",//"http://mainbody.jg.eastmoney.com/","http://183.136.163.84:8082", //资讯服务详情页地址
    StaticNodeServer: "http://183.136.162.206",
    WebServer: "http://app.jg.eastmoney.com/",
    GuBaServer: "http://guba.eastmoney.com/", //股吧地址
    IsLocal: location.href.indexOf("localhost") > 1 ? true : false //是否是本地
}








