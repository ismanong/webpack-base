; (function ($, window, document, undefined) {
    var needchange = false;
    $.fn.fixTable = function (options) {
        var tableFunc = new TableFunc(this, options);
    }
    function TableFunc(ele, options) {
        this.defaults = {
            json: "", //json数据           
            isShowEmpty: false,//是否为空
            tablename: "",//table名称
            widthArr: [280, 30],//表格每列宽度
            tableStyle: [],//json中要过滤掉的字段
            colLock: 2,//锁定列数
            tableImgSrc: "../images/comm/warn_small.gif",
        }
        this.ele = ele
        this.opt = $.extend(true, {}, this.defaults, options || {});
        this.ininitial(this.opt.json, options.isShowEmpty);
    }
    TableFunc.prototype = {
        ininitial: function (json, isShowEmpty) {
            var self = this;
            window.onresize = function () {
                self.judgeFixTable(self.opt.tablename, self.ele.attr("id"), needchange);
            }
            self.baseInit();
            json = JSON.parse(json);
            if (json != null && json.length > 0) {
                var result;
                json = isShowEmpty ? self.JsonRemoveBlank(json) : json;
                result = json;
                self.jsonList = json;
                var templateModel=""
                if (result.length > 1) {
                    templateModel = self.getTemplate(result, 0, self.opt.widthArr, ["", ""], self.opt.tableStyle);
                    self.addToThead(result[0], self.opt.tablename + " thead", templateModel);
                    result.shift();
                    templateModel = self.getTemplate(result, 1, self.opt.widthArr, ["text_left", "text_right"], self.opt.tableStyle);
                    self.addToTbody(result, self.opt.tablename + " tbody", templateModel);
                    /*添加导出excel的属性*/
                    if (this.opt.excel) {
                        this.opt.excel();
                    }
                    needchange = true;
                    this.judgeFixTable(this.opt.tablename, this.ele.attr("id"), needchange)
                }
            }
            else {
                needchange = false;
                this.showNoData();
            }
        },

        showNoData: function () {
            $("#" + this.opt.tablename + " tbody").append("<tr><td align='center' style=\"" + this.opt.containerStyle.width + "\">" + "<p class=\"no_data_small\"><img alt=\"\" src=" + this.opt.tableImgSrc + ">暂无数据</p>" + "</td></tr>");
            needchange = false;
        },
        baseInit: function () {
            var templateModel = "";
            this.clearTable(this.opt.tablename, this.ele.attr("id"));

        },
        JsonRemoveBlank: function (json) {
            for (var i = 0; i < json.length; i++) {
                var tmp = json[i];
                var flag = true;
                var col0 = 0;
                for (var key in tmp) {
                    if (col0++ < this.opt.tableStyle.length + 2) continue;
                    var p = tmp[key];
                    var resultFlag = (p == "0.00" || p == "-")
                    flag = flag && resultFlag
                };
                if (flag) delete json[i];
            }
            return json;
        },
        // 处理数据成为模板
        getTemplate: function (data, type, widths, aligns, hideCol) {
            /*
            data:传过来的json
            type:类型为0，拼接th，为1，拼接td
            widths:传入数组，不能为null或者undefined，可以为[]
            aligns:传入数组，不能为null或者undefined，可以为[]
            */
            //获取属性格式 当作列数
            var self = this;
            var length = 0;
            var widthStatus = false;
            var alignStatus = false;
            var attrArray = new Array();
            //存储属性名称以及个数
            if (typeof (data) == "object") {
                //传入对象是否是Json形式或单个对象进行判断
                if (typeof (data.length) != "undefined") {
                    for (var attr in data[0]) {
                        if (hideCol !== "undefined") {
                            if (hideCol.indexOf(attr) == -1) {
                                attrArray.push(attr);
                                length++;
                            }
                        } else {
                            attrArray.push(attr);
                            length++;
                        }
                    }
                } else {
                    for (var attr in data) {
                        attrArray.push(attr);
                        length++;
                    }
                }
            }
            if (widths instanceof Array && widths.length > 1) {
                widthStatus = true;
            }
            if (aligns instanceof Array && aligns.length > 1) {
                alignStatus = true;
            }
            var str = new Array();
            for (var i = 0; i < length; i++) {
                //表头
                var _temp = new Array;
                if (type == 0) {
                    _temp.push("<th ", "style=\"", "\"><%=", attrArray[i], "%></th>");
                    if (widthStatus) {
                        //传入的数组长度大于i，就赋值为width[i],否则取数组的最后一位。(数组长度为1除外，为一时不传长度)
                        if (widths.length > i) {
                            if (widths[i] !== "") {
                                if (i == 0) {
                                    _temp.splice(2, 0, "border-right:none;", "width:", widths[i], "px;");
                                } else {
                                    _temp.splice(2, 0, "bborder-left:none;width:", widths[i], "px;");
                                }
                            }
                        }
                        else {
                            if (widths.length != 1) {
                                if (widths[widths.length - 1] !== "") {
                                    _temp.splice(2, 0, "width:", widths[widths.length - 1], "px;");
                                }
                            }
                        }
                    }
                    if (alignStatus) {
                        //传入的数组长度大于i，就赋值为align[i],否则取数组的最后一位。(数组长度为1除外，为一时不传左右对齐参数)
                        if (aligns.length > i) {
                            if (widths[i] !== "") {
                                _temp.splice(1, 0, " class=\"", aligns[i], "\" ");
                            }
                        }
                        else {
                            if (aligns.length != 1) {
                                if (widths[widths.length - 1] !== "") {
                                    _temp.splice(1, 0, " class=\"", aligns[aligns.length - 1], "\" ");
                                }
                            }
                        }
                    }
                }
                    //tbody
                else {
                    _temp.push("<td ", "style=\"", "\"><%=", attrArray[i], "%></td>");
                    if (i == 1) {
                        _temp.splice(2, 0, "vertical-align:middle;");
                    }
                    if (widthStatus) {
                        //传入的数组长度大于i，就赋值为width[i],否则取数组的最后一位。(数组长度为1除外，为一时不传长度)
                        if (widths.length > i) {
                            _temp.splice(2, 0, "width:", widths[i], "px;");
                        }
                        else {
                            if (widths.length != 1) {
                                _temp.splice(2, 0, "width:", widths[widths.length - 1], "px;");
                            }
                        }
                    }
                    if (alignStatus) {
                        //传入的数组长度大于i，就赋值为align[i],否则取数组的最后一位。(数组长度为1除外，为一时不传左右对齐参数)
                        if (aligns.length > i) {
                            _temp.splice(1, 0, " class=\"", aligns[i], "\" ");
                        }
                        else {
                            if (aligns.length != 1) {
                                _temp.splice(1, 0, " class=\"", aligns[aligns.length - 1], "\" ");
                            }
                        }
                    }
                }
                str.push(_temp.join(""));
            }
            //传入了大于两个宽度
            if (widthStatus) {
                var totalWid = new Number();
                if (widths.length == 2) {
                    totalWid = widths[0] + widths[1] * (length - 2);
                }
                if (widths.length > 2) {
                    for (var k = 0; k < widths.length - 1; k++) {
                        totalWid = totalWid + widths[k];
                    }
                    totalWid = totalWid + widths[widths.length - 1] * (length - widths.length + 1);
                }
                if (totalWid <= this.ele[0].clientWidth) {
                    if (type == 0) {
                        str.push("<th></th>");
                    }
                    else {
                        str.push("<td></td>");
                    }
                }
            }
            return str.join("");
        },
        //数据添加至thead
        addToThead: function (item, tableId, templateId) {
            var _dataStar = "<tr>";
            var _dataEnd = "</tr>";
            if ($(templateId).length > 0) {
                var template = _.template(templateId, item);
            }
            else {
                var template = _.template($("#" + templateId).html(), item);
            }

            if (template != undefined) {
                $("#" + tableId).append(_dataStar + template + _dataEnd);
            }
            else {
                $("#" + tableId).append(template);
            }
            template = null;
        },
        //数据添加至tbody
        addToTbody: function (List, tableId, templateId) {
            var self = this
            var DomList = [];
            _.each(List, function (item, i) {
                var itemNew = [];
                itemNew = item;
                self.getStyle(itemNew);
                if ($(templateId).length > 0) {
                    var template = _.template(templateId, item);
                }
                else {
                    var template = _.template($("#" + templateId).html(), item);
                }
                var _dataStar = "<tr>";
                var _dataEnd = "</tr>";
                if (template != undefined) {
                    DomList.push(_dataStar, template, _dataEnd);
                }
                else {
                    DomList.push(_dataStar, _dataEnd);
                }
                template = null;
            });
            $("#" + tableId).append(DomList.join(''));
            DomList = null;
        },
        //对数据进行加粗等一系列操作
        getStyle: function (item) {
            item.IsShowChart = item.IsShowChart == 1 ? '<img class="tooltip chartimg"  src="../../../f9/src/images/zhuzhuang_icon.gif" style="display:table-cell;vertical-align:middle"/>' : '';
            if (item.IsBold == "1") {
                for (var itemListData in item) {
                    if (item[itemListData] !== null) {
                        if (itemListData !== "IsShowChart") {
                            item[itemListData] = "<b>" + item[itemListData] + "<b>";
                        }
                    }
                }
            }
            if (item.Indent !== "0") {
                var blankNum = item.Indent;
                for (var blankStar = 0; blankStar < blankNum; blankStar++) {
                    item.IndexName = "&nbsp" + item.IndexName;
                }
            }
            item.IsBold = "";
            item.Indent = "";
        },
        //清空表格
        clearTable: function (tablename, divContent) {
            $("#" + tablename + " thead").html("");
            $("#" + tablename + " tbody").html("");
            var dom_summary = $("#" + tablename).clone();
            $("#" + divContent).html("");
            $("#" + divContent).append(dom_summary);
            dom_summary = null;
        },
        //财务部分判断是否锁表头，以及怎么锁的逻辑
        judgeFixTable: function (tablename, divContent, needchange) {
            var containerResult = this.opt.containerStyle();
            if (needchange == true) {
                this.changeColLockColor(tablename, this.opt.colLock);
                if ($("#" + this.opt.tablename).height() >= containerResult.height || $("#" + this.opt.tablename).width() >= containerResult.width) {
                    this.fixTableHead(tablename, this.opt.colLock, containerResult.width, containerResult.height);
                }
                else {
                    $("#" + tablename).width(this.opt.containerStyle().width);
                    var dom_table = $("#" + tablename).clone();
                    $("#" + divContent).html("");
                    $("#" + divContent).append(dom_table);
                    dom_table = null;
                }
            }
            else {
                $("#" + tablename).width(containerResult.width - 17);
            }

        },
        //改变颜色
        changeColLockColor: function (domId, col) {
            $("#" + domId + " tr:even").addClass('even');
            $("#" + domId + " tr:odd").addClass('odd'); //奇偶变色，添加样式
            var trList = $("#" + domId + " tbody tr");
            $.each(trList, function (i, item) {
                $(item).children().eq(0).addClass('theader').css("border-right", "none");
                for (var k = 1; k < col - 1; k++) {
                    $(item).children().eq(k).addClass('theader').css({ "border-left": "none", "border-right": "none" });
                }
                $(item).children().eq(col - 1).addClass('theader').css("border-left", "none");
            });
            trList = null;
        },
        //固定表头
        fixTableHead: function (TableID, FixColumnNumber, width, height, marginwidth, minWidth, minHeight) {
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
                    // height = $("#" + TableID).height() + _scrollWidth + 4;
                    //使横向滚动条永远在最低下
                    height = height;
                }
            }
            //-----------------------------------自适应宽度 add by lym  钢铁行业使用---------------------------------------
            if (typeof (marginwidth) !== "undefined") {
                $("#" + TableID).css("width", this.ele.width() - 17 - marginwidth + "px");
            }
            else {
                console.log(this.ele)
                var _width = width || this.ele.width();
                if ($("#" + TableID).height() <= height && $("#" + TableID).width() <= width) {
                    $("#" + TableID).css("width", _width + "px");
                }
                else {

                    $("#" + TableID).css("width", (_width - 17) + "px");
                }
                _width = null;
            }


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
            /*增加左侧固定列的同步滚动*/
            $("#" + TableID + "_tableColumn").get(0).onmousewheel = function (e) {
                //阻止事件冒泡以防窗体滚动
                e.cancelBubble = true;
                e.preventDefault();
                $("#" + TableID + "_tableData").scrollTop($("#" + TableID + "_tableData").scrollTop() - e.wheelDelta);
            };

            $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width - _scrollWidth, "position": "relative", "z-index": "45" });
            // 修改表格高度，使横向滚动条永远在最低端
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
            //======重新定位滚动条==========================
            if ($("#" + TableID + "_tableLayout").length !== 0) {//不是第一次加载 设置table横滚动到的位置
                $("#" + TableID + "_tableData").scrollLeft(scrollLeft);
            }
            //======重新定位滚动条==========================
            $("#" + TableID + "_tableHead").offset(_offset);
            $("#" + TableID + "_tableData").offset(_offset);
            _offset = null;
            oldtable = null;
            scrollLeft = null;
            //        tableFixClone = null;
            //        tableHeadClone = null;
            //        tableColumnClone = null;

        },
    }
})(jQuery, window, document);