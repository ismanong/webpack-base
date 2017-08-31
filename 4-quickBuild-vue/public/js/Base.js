

window.Base = {
    Config: Setting,
    /*
    * 获取 url 的参数  并以返回
    * 参数为空，   返回 object 形式的所有参数
    * 参数不为空， 返回具体的参数的值
    * */
    getUrl: function (key) {
        var url = location.href,
            url_obj = {};
        // if (url.indexOf("?") > -1 && url.indexOf("=") > -1) {
        if (url.indexOf("?") > -1) {
            url = url.substring(url.indexOf("?") + 1);
            url = url.substring(0, url.lastIndexOf('#'));
            url = url.split("&");
            for(var i = 0; i < url.length; i ++) {
                url_obj[url[i].split("=")[0]] = decodeURI(url[i].split("=")[1]);
            }
        }
        return key ? url_obj[key] : url_obj;
    },
    //异步请求(事件监听请求是否返回)
    getAjax: function(url,callback){
        var request = new XMLHttpRequest();
        request.open('GET',__DEVAPI__ + url);
        request.onreadystatechange = function () {
            if(request.readyState === 4 && request.status === 200){
                var type = request.getResponseHeader('Conten-Type');
                //console.log(type)
                //if(type.match(/^text/)){//确保响应是文本
                    callback(JSON.parse(request.responseText));
                //}
            }
        };
        request.send(null);
    },


    /*
     * ajax获取json数据
     *     ##### 此处为GET方式获取，请求参数带到URL中
     *
     *      Modify 2015-4-8 Meric 增加请求方式，是否为异步
     *
     * @method fGetData
     * @param  {String} url         请求URL
     * @param  {Object} data        请求参数
     * @param  {Function} sCallback 请求成功的回调函数
     * @param  {Function} eCallback 请求失败的回调函数
     **/
    fGetData: function (url, data, sCallback, eCallback, async) {
        $.ajax({
            type: "GET",
            url: __DEVAPI__+url,
            dataType: "json",
            async: (async !== undefined) ? async : true,
            success: function (json) {
                if (typeof (sCallback) === "function") {
                    sCallback(json);
                }
            },
            error: function (json) {
                if (typeof (eCallback) === "function") {
                    eCallback(json);
                }
            }
        });
    },
    /*
    * 日期格式化
    * 20150809 => 2015-08-09
    * */
    _date: {
        adddatatime: function adddatatime(num){
            var year=num.toString().substring(0,4);
            var month=num.toString().substring(4,6);
            var days=num.toString().substring(6,8);
            return year+'-'+month+'-'+days;
        },
        //日期简写 11月22==1122
        dayJx: function dayJx(num){
            var month=num.toString().substring(0,2)
            var days=num.toString().substring(3,5)
            return month+days;
        },
        //日期简写 1122==11月22日
        dayHy: function dayHy(num){
            var month=num.toString().substring(0,2)
            var days=num.toString().substring(2,4)
            return month+'月'+days+'日';
        },
        //获取两个日期之间间隔的天数
        twoDaySpace: function twoDaySpace(d1,d2){
            if( d1 && d2 ){
                var tmp = d1.split("-");
                var date1 = new Date(tmp[0],tmp[1]-1,tmp[2]);


                var tmp = d2.split("-");
                var date2 = new Date(tmp[0],tmp[1]-1,tmp[2]);

                var daySpace = date2.getTime() - date1.getTime();

                return daySpace / ( 24 * 3600 * 1000 );
            }
            return 0;
        }
    },
    /*
     * 保留N位小数，无法转换的原样输出
     *     ###### Modify 2015-1-21 Meric  将!isNaN(obj) 改进为parseFloat(obj)!="NaN"避免报错
     *
     * @method fKeepDecimals
     * @param  {Object} obj 原始对象
     * @param  {Number} num 要保留的小数位数
     * @return 返回处理后的对象
     * @example
     *     > Base.fKeepDecimals(100,2)=100.00
     *     > Base.fKeepDecimals(100,4)=100.0000
     *     > Base.fKeepDecimals("aaa",4)="aaa"
     */
    fKeepDecimals: function (obj, num) {
        if (obj === "") {
            return obj;
        }
        else if ( (obj) != "NaN") {
            try {
                return obj.toFixed(num);
            } catch (e) {
                return obj;
            }

        }
        else {
            return obj;
        }
    },
    /*
     * 截取字符串并在最后加上...
     *
     * @method fSubstring
     * @param  {String} str            原始字符串_必须_
     * @param  {Number} length         截取字符串的长度并且后面跟..._必须_
     * @param  {Number} comparedLength 比较的字符长度,超过这个长度则进行截取`可选`
     * @return {String}                截取后的字符串
     * @example
     *     > Base.fSubstring("0123456",3)    ="012<label class="js-InfoTips" title="0123456">...</label>"
     *     > Base.fSubstring("0123456",3,4)  ="012<label class="js-InfoTips" title="0123456">...</label>"
     *     > Base.fSubstring("0123456",3,10) ="0123456"
     */
    fSubstring: function (str, length, comparedLength) {
        var result = "";
        if (!comparedLength) {
            comparedLength = length;
        }
        result = ((str.length > comparedLength) ? (str.substring(0, length) + "<label class=\"js-InfoTips\" title=\"" + str + "\">...</label>") : str);
        return result;
    },
    fStr2Date: function (str) {//字符转日期
        return new Date(Date.parse(str.replace(/-/g, "/"))); //转换成Data();
    },
    /*
     * 从URL中获取指定参数的值并进行URL解码
     *
     * @method GetParamByDecodeURIComponent
     * @param {String} paramName 要获取的参数名
     * @param {String} url       URL
     * @return {String} 解码后的参数值
     */
    GetParamByDecodeURIComponent: function (paramName, url) {
        var _paramValue = this.GetUrlParamByKey(paramName, url);
        return this.Decode(_paramValue);
    },
    /*
     * 终端弹框
     *
     * @method OpenLink
     * @param {String} url           页面地址
     * @param {Number} type          弹框类型
     *                                   + 1 当前页面跳转
     *                                   + 2 页面内mainFrame跳转
     *                                   + 3
     *                                   + 4 在一个新的多页夹中打开指定的一个Http连接
     *                                   + 5 下载
     *                                   + 6 在默认浏览器中打开
     *                                   + 7 调用终端方法的弹出 是以EM://开始的 add by glw
     *                                   + 8 调用默认浏览器 add by lym
     * @param {[type]} title         弹框标题
     * @param {[type]} windowOptions 终端弹窗的配置信息 如果不传则调用Global.Config.WindowOptions
     */
    OpenLink: function (url, type, title, windowOptions) {//打开链接

        if (typeof (type) == 'undefined' || type === "") {
            type = 2;
        }
        switch (type) {
            case 1:
                window.location = url;
                break;
            case 2:
                window.frames.mainFrame.location = url;
                break;
            case 3:
                try {
                    windowexternal.SetOpenTitle(title);
                    if (windowOptions) {
                        windowexternal.SetWindow(windowOptions);
                    }
                    else {
                        windowexternal.SetWindow(Base.Config.InfoWindowOptions);
                    }
                    window.open(url);
                }
                catch (err) {
                    if (windowOptions) {
                        window.open(url, title, windowOptions + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                    }
                    else {
                        window.open(url, title, Base.Config.InfoWindowOptions + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                    }
                }
                break;
            case 4:  // 在一个新的多页夹中打开指定的一个Http连接
                var _url_temp = "";
                try {
                    if (url.indexOf("http") !== 0) {
                        _url_temp = Base.Config.Url + url;
                    }
                    else {
                        _url_temp = url;
                    }
                    windowexternal.OpenPage(title, _url_temp);
                }
                catch (err) {
                    window.open(_url_temp, title);
                }
                _url_temp = null;
                break;
            case 5: //下载
                try {
                    //windowexternal.OpenInIE(url);
                    if (title) {
                        windowexternal.DownLoad(url, Base.Base.fReplaceSpecialCharacter(title.trim()));
                    }
                    else {
                        windowexternal.OpenInIE(url);
                    }
                }
                catch (err) {
                    window.location = url;
                }
                break;
            case 6: //在默认浏览器中打开
                try {
                    windowexternal.OpenExternalWebBrowser(url);
                }
                catch (err) {
                    window.open(url, title);
                }
                break;
            case 7: // 调用终端方法的弹出 是以EM://开始的 add by glw
                try {
                    if (url.indexOf("EM") === 0) {
                        windowexternal.OpenPage(title, url);
                    }
                    //windowexternal.OpenPage(title, _url_temp);
                }
                catch (err) {
                    window.open(url, title);
                }
                _url_temp = null;
                break;
            case 8: // 调用默认浏览器 add by lym
                try {
                    windowexternal.OpenDefaultByBroswer(url);
                }
                catch (err) {
                    try {
                        windowexternal.OpenInIE(url);
                    }
                    catch (e) {
                        window.open(url, title);
                    }
                }
                break;
            // 在一个新的多页夹中打开指定的一个Http连接
            // 对4的一个修正
            // add by yyf 20150203
            case 9:
                try {
                    windowexternal.SetOpenTitle(title);
                    if (url.toLowerCase().indexOf("http") !== 0) {
                        _url_temp = Base.Config.Url + url;
                    }
                    else {
                        _url_temp = url;
                    }
                    //windowexternal.OpenPage(title, _url_temp);
                    window.open(_url_temp);
                }
                catch (err) {
                    window.open(_url_temp, title);
                }
                _url_temp = null;
                break;
        }
        //}
    },
    /*
     * 导出html到文件
     *
     * @method fExportHtml
     * @param  {Number} type 导出类型 1：Excel   2：Word  3：Text
     * @param  {String} html 要导出的html
     * @param  {String} name 导出的文件名
     */
    fExportHtml: function (type, html, name) {
        if (html === "") {
            html = "<table width='100%' sheetName='" + name + "'><tr class='text_center'><td align='center'>暂无数据</td></tr></table>";
        }
        if (typeof (windowexternal) != "undefined") {
            if (typeof (name) != "undefined") {
                switch (type) {
                    case 1: //Excel
                        windowexternal.ExportHtmlTableToExcel(Base.Base.fReplaceSpecialCharacter(name.trim()) + ".xls", html);
                        break;
                    case 2: //Word
                        windowexternal.ExportHtmlToWord(Base.Base.fReplaceSpecialCharacter(name.trim()) + ".word", html);
                        break;
                    case 3: //Text
                        windowexternal.ExportHtmlToTxt(Base.Base.fReplaceSpecialCharacter(name.trim()) + ".txt", html);
                        break;
                }
            } else {
                switch (type) {
                    case 1: //Excel
                        windowexternal.ExportHtmlTableToExcel("新建 Microsoft Excel 工作表.xls", html);
                        break;
                    case 2: //Word
                        windowexternal.ExportHtmlToWord("新建 Microsoft Word 文档.word", html);
                        break;
                    case 3: //Text
                        windowexternal.ExportHtmlToTxt("新建 文本文档.txt", html);
                        break;
                }
            }
        }
    },
    /*
     * 固定表格列数，执行此函数后，可以固定表格的某些列，超过容器边界时，显示滚动条，固定列不随滚动条滚动
     *
     * @method FixTable
     * @param {String} TableID         要控制的表格ID
     * @param {Number} FixColumnNumber 需要固定的列数
     * @param {Number} width           表格宽度
     * @param {Number} height          表格高度
     * @param {Number} marginwidth     margin值，算宽度时会减去此值
     * @param {Number} minWidth        表格的最小宽度
     * @param {Number} minHeight       表格的最小高度
     */
    FixTable: function (TableID, FixColumnNumber, width, height, marginwidth, minWidth, minHeight) {
        var scrollLeft = 0;
        if ($("#" + TableID + "_tableLayout").length !== 0) {//不是第一次加载 获取table横滚动条位置
            scrollLeft = $("#" + TableID + "_tableData").scrollLeft();
        }
        if (typeof (minWidth) != "undefined" && typeof (minHeight) != "undefined")//设置出锁表头的临界值
        {
            if (minWidth <= width && minHeight <= height) {
                if ($("#" + TableID + "_tableLayout").length !== 0) {//不是第一次加载 即resize调用
                    console.log("------恢复------");
                    $("#" + TableID).css("width", "");
                    scrollLeft = $("#" + TableID + "_tableData").scrollLeft();
                    scrollTop = $("#" + TableID + "_tableData").scrollTop();
                    $("#" + TableID + "_tableLayout").before($("#" + TableID));
                    $("#" + TableID + "_tableLayout").remove();
                }
                return;
            }
        }
        //滚动条的宽度
        var _scrollWidth = 18;
        if ($("#" + TableID).height() + _scrollWidth < height) {
            if ($("#" + TableID).width() <= width)     //edit by sgj 当不存在横向滚动条时，空白区域控制。
                height = $("#" + TableID).height() + 2;
            else {
                //                height = $("#" + TableID).height() + _scrollWidth + 4;
                //2015.3.13 leihongping修改，使横向滚动条永远在最低下
                height = height;
            }
        }
        //-----------------------------------自适应宽度 add by lym  钢铁行业使用---------------------------------------
        if (typeof (marginwidth) !== "undefined") {
            $("#" + TableID).css("width", $("#content").width() - 17 - marginwidth + "px");
        }
        else {
            var _width = width || $("#content").width();
            if ($("#" + TableID).height() <= height && $("#" + TableID).width() <= width) {
                $("#" + TableID).css("width", _width + "px");
            }
            else {

                $("#" + TableID).css("width", (_width - 17) + "px");
            }
            _width = null;
        }

        //-----------------------------------自适应宽度 add by lym---------------------------------------

        if ($("#" + TableID + "_tableLayout").length !== 0) {
            $("#" + TableID + "_tableLayout").before($("#" + TableID));
            $("#" + TableID + "_tableLayout").remove();
            $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:visible;height:" + height + "px; width:" + width + "px;'></div>");
        }
        else {
            $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:visible;height:" + height + "px; width:" + width + "px;'></div>");
        }
        var _tmphtml = '<div id="' + TableID + '_tableFix"></div>';
        _tmphtml += '<div id="' + TableID + '_tableHead"></div>';
        _tmphtml += '<div id="' + TableID + '_tableColumn"></div>';
        _tmphtml += '<div id="' + TableID + '_tableData"></div>';
        $(_tmphtml).appendTo("#" + TableID + "_tableLayout");

        var oldtable = document.getElementById(TableID).outerHTML;
        document.getElementById(TableID).outerHTML = "";
        if (FixColumnNumber > 0) {
            $("#" + TableID + "_tableFix").append(oldtable);
            $("#" + TableID + "_tableFix #" + TableID).attr("id", TableID + "_tableFixClone");

            $("#" + TableID + "_tableColumn").append(oldtable);
            $("#" + TableID + "_tableColumn #" + TableID).attr("id", TableID + "_tableColumnClone");
        }

        $("#" + TableID + "_tableHead").append(oldtable);
        $("#" + TableID + "_tableHead #" + TableID).attr("id", TableID + "_tableHeadClone");


        $("#" + TableID + "_tableData").append(oldtable);

        $("#" + TableID + "_tableLayout table").each(function () {
            $(this).css("margin", "0");
        });
        var HeadHeight = $("#" + TableID + "_tableHead thead").height();
        HeadHeight += 2;
        var ColumnsWidth = 0;
        var ColumnsNumber = 0;
        $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () {
            ColumnsWidth += $(this).outerWidth(true);
            ColumnsNumber++;
        });
        ColumnsWidth += 2;
        if ($.browser.msie) {
            switch ($.browser.version) {
                case "7.0":
                    if (ColumnsNumber >= 3) ColumnsWidth--;
                    break;
                case "8.0":
                    if (ColumnsNumber >= 2) ColumnsWidth--;
                    break;
            }
        }

        $("#" + TableID + "_tableHead").css("height", HeadHeight);

        if (FixColumnNumber > 0) {
            $("#" + TableID + "_tableFix").css("height", HeadHeight);
            $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
            $("#" + TableID + "_tableFix").css("width", ColumnsWidth);
        }

        $("#" + TableID + "_tableData").scroll(function (e) {
            e.cancelBubble = true;
            $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
            if (FixColumnNumber > 0) {
                $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
            }
        });
        /* Add Meric 2015-2-26 增加左侧固定列的同步滚动*/
        $("#" + TableID + "_tableColumn").get(0).onmousewheel = function (e) {
            //阻止事件冒泡以防窗体滚动
            e.cancelBubble = true;
            e.preventDefault();
            $("#" + TableID + "_tableData").scrollTop($("#" + TableID + "_tableData").scrollTop() - e.wheelDelta);
        };

        $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width - _scrollWidth, "position": "relative", "z-index": "45" });
        // 20153.13  leihongping 修改表格高度，使横向滚动条永远在最低端
        $("#" + TableID + "_tableData").css({ "overflow": "auto", "width": width, "height": height, "position": "relative", "z-index": "35" });


        var _offset = $("#" + TableID + "_tableLayout").offset();
        if (FixColumnNumber > 0) {
            $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50" });
            $("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height - _scrollWidth, "position": "relative", "z-index": "40" });

            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                //            console.log("XXXXXXXXXXXXXX");
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + _scrollWidth);
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                //            console.log("XXXXXXXXXXXXXX");
                // 20153.13  leihongping 修改表格高度，使横向滚动条永远在最低端
                var $tableData = $("#" + TableID + "_tableLayout").height();
                var $tableColumn = $("#" + TableID + "_tableLayout").height() - 18;
                $("#" + TableID + "_tableColumn").css("height", $tableColumn + "px");
                $("#" + TableID + "_tableData").css("height", $tableData + "px");
            }
            $("#" + TableID + "_tableFix").offset(_offset);
            $("#" + TableID + "_tableColumn").offset(_offset);
        }
        //======start 2013-05-13 Modify By Yrj 不管是否FixColumnNumber，都要重新定位滚动条==========================
        if ($("#" + TableID + "_tableLayout").length !== 0) {//不是第一次加载 设置table横滚动到的位置
            $("#" + TableID + "_tableData").scrollLeft(scrollLeft);
        }
        //======end   2013-05-13 Modify By Yrj 不管是否FixColumnNumber，都要重新定位滚动条==========================
        $("#" + TableID + "_tableHead").offset(_offset);
        $("#" + TableID + "_tableData").offset(_offset);
        _offset = null;
        oldtable = null;
        scrollLeft = null;
        //        tableFixClone = null;
        //        tableHeadClone = null;
        //        tableColumnClone = null;

    },
    /*
     * 从URL中获取指定参数的值
     *
     * @method GetUrlParamByKey
     * @param {String} paramName 要获取的参数名
     * @param {String} url       URL
     * @return {String} 参数值
     */
    GetUrlParamByKey: function (paramName, url) {
        var _paramValue = "", _isFound = false, _arrSource, i = 0, _queryString;
        if (typeof (url) == 'undefined') {
            if (location.search.indexOf("?") === 0 && location.search.indexOf("=") > 1) {
                _arrSource = location.search.substring(1, location.search.length).split("&");

            }
        }
        else {
            if (url.indexOf("?") > 0 && url.indexOf("=") > 1) {
                _queryString = url.substring((url.indexOf("?") + 1));
                _arrSource = _queryString.split("&");
            }
        }
        if (typeof (_arrSource) != 'undefined') {
            while (i < _arrSource.length && !_isFound) {
                if (_arrSource[i].indexOf("=") > 0) {
                    if (_arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        _paramValue = _arrSource[i].split("=")[1];
                        _isFound = true;
                    }
                }
                i++;
            }
        }
        return _paramValue;
    },
    /*
     *
     *      ###### add by liupf
     *
     * @param  {String} str   原始字符串
     * @param  {String} width 文字区域的最多宽度
     * @return {[type]}       [description]
     */
    fSubstringByWidth: function (str, width) {
        var _length = 0;
        _length = Math.floor((width - 30) / 6);
        //return (str.length > _length) ? (str.substring(0, _length - 1) + "...") : str
        return (Base.stringWidth(str) > _length) ? (Base.subStringWidth(str, 0, _length - 5) +
        "<label class=\"js-InfoTips\" title=\"" + str.replace(/"/g, "&quot;") + "\">...</label>") : str;
    },
    Decode: function (str) { //js自动的通用编码
        try {
            return decodeURIComponent(decodeURIComponent(str));
        }
        catch (ex) {
            return str;
        }
    },
    /**
     * CommonFunc的部分方法集合，主要处理字符编码解码格式化等
     *
     * @submodule Base
     */
    Base: {
        /**
         * 去除字符串中的限制字符， \/:*?"<>|
         *
         * @method fReplaceSpecialCharacter
         * @param  {String} str 原始字符串
         * @return {[type]}     处理过的字符串
         */
        fReplaceSpecialCharacter: function (str) {//
            // return str.replace(/\\/g, " ")
            //         .replace(/\//g, " ")
            //         .replace(/\:/g, " ")
            //         .replace(/\*/g, " ")
            //         .replace(/\?/g, " ")
            //         .replace(/\"/g, " ")
            //         .replace(/\</g, " ")
            //         .replace(/\>/g, " ")
            //         .replace(/\|/g, " ");
            return str.replace(/[\\\/\:\*\?\"<>\|]/g, " ");
        },
        /**
         * 将字符串转化为ascii码
         *
         * @method fStr2Asc
         * @param  {String} str 原始字符串
         * @return {[type]}     转换后的字符串
         */
        fStr2Asc: function (str) {
            return str.charCodeAt(0).toString(16);
        },
        /**
         * 将ascii码转换为字符串
         *
         * @method fAsc2Str
         * @param  {String} str 原始字符串
         * @return {[type]}     转换后的字符串
         */
        fAsc2Str: function (str) {
            return String.fromCharCode(str);
        },
        /**
         * 对字符串进行URL编码
         *
         * @method fEncode
         * @param  {String} str 原始字符串
         * @return {[type]}     编码后的字符串
         */
        fEncode: function (str) {
            return encodeURIComponent(str);
        },
        /**
         * 为中文进行两次URL编码，以传递给后台   在ie等浏览器中必须采用两次编码
         *
         * @method fEncodeChinese
         * @param  {String} str 原始URL
         * @return {[type]}     编码后的字符串
         */
        fEncodeChinese: function (str) {
            return encodeURIComponent(encodeURIComponent(str));
        },
        /**
         * 解码字符串（两次解码）
         *
         * @method fDecode
         * @param  {String} str 原始URL
         * @return {[type]}     解码后的字符串
         */
        fDecode: function (str) {
            return decodeURIComponent(decodeURIComponent(str));
        },
        /**
         * 对URL编码
         *
         * @method fUrlEncode
         * @param  {String} str 原始URL
         * @return {[type]}     编码后的字符串
         */
        fUrlEncode: function (str) {
            var ret = "";
            var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
            var tt = "";
            for (var i = 0; i < str.length; i++) {
                var chr = str.charAt(i);
                var c = Base.Base.fAsc2Str(chr);
                tt += chr + ":" + c + "n";
                if (parseInt("0x" + c) > 0x7f) {
                    ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
                } else {
                    if (chr == " ")
                        ret += "+";
                    else if (strSpecial.indexOf(chr) != -1)
                        ret += "%" + c.toString(16);
                    else
                        ret += chr;
                }
            }
            return ret;
        },
        /**
         * 对URL进行解码
         *
         * @method fUrlDecode
         * @param  {String} str 原始URL
         * @return {[type]}     解码后 URL
         */
        fUrlDecode: function (str) {
            var ret = "";
            for (var i = 0; i < str.length; i++) {
                var chr = str.charAt(i);
                if (chr == "+") {
                    ret += " ";
                }
                else if (chr == "%") {
                    var asc = str.substring(i + 1, i + 3);
                    if (parseInt("0x" + asc) > 0x7f) {
                        ret += Base.Base.fAsc2Str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                        i += 5;
                    } else {
                        ret += Base.Base.fAsc2Str(parseInt("0x" + asc));
                        i += 2;
                    }
                } else {
                    ret += chr;
                }
            }
            return ret;
        },
        /**
         * 处理html标签 &"<>
         *
         * @method fHtmlEncode
         * @param  {String} str 原始HTML字符串
         * @return {[type]}     处理过的字符串
         */
        fHtmlEncode: function (text) {
            return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        /**
         * HTML解码
         *
         * @method fHtmlDecode
         * @param  {String} str 原始HTML
         * @return {[type]}     解码后的HTML
         */
        fHtmlDecode: function (text) {
            return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        },
        /**
         * Add 2015-1-12 Meric 实现string.format方法
         *
         * @method fStringFomat
         * @author Meric
         * @return {String} 返回格式化后的字符串
         * @example
         *     Base.Base.fStringFormat("param1={0}&param2={1}&param3={2}",p1,p2,p3)
         */
        fStringFormat: function () {
            if (!arguments) return "";
            return arguments[0].format(arguments.slice(1));
        },
        fPathCombine: function () {
            if (!arguments || arguments.length <= 0) return "";
            if (arguments.length == 1) return arguments[0];
            var regex = /(^[\s\/\\]*)|([\s\\\/]*$)/g;
            var str = "";
            var temp = "";
            for (var i = 0; l = arguments.length, i < l; ++i) {
                if (str !== "") str += "/";
                str += arguments[i].replace(regex, "");
            }
            return str;
        }
    },
}