; (function ($, window, document, undefined) {

    var PopDiv = function (ele, opt) {
        this.$ele = ele;
        this.options = opt;
        this.init();
    }
    PopDiv.prototype = {
        init: function () {
            var _self = this
            this.$ele.live("mouseenter", function (e) { _self.mouseenterContro(e) });
            this.$ele.live("mouseleave", function (e) { _self.mouseleaveContro(e) });
        },
        creatPop: function (obj) {
            var pop = document.createElement("div");
            var $pop = $(pop);
            $pop.attr("id", "pop");
            var defaultPop = {
                "width": "500px",
                "height": "300px",
                "display": "none",
                "position": "absolute",
                "overflow": "hidden",
                "border": "2px solid orange",
                "border-radius": "5px",
                "z-index": "1000"
            }
            var lastPop = $.extend(true, {}, defaultPop);
            $pop.css(defaultPop);
            $("body").append($(pop));
            $("#pop").on("mouseenter", this.mouseenterPop);
            $("#pop").on("mouseleave", this.mouseleavePop);
            var containerStr = '<div id="container" style="width:' + lastPop.width + ';height:' + lastPop.height + '"></div>';
            $pop.append(containerStr);
            var imgTop = obj.offset().top;
            var imgLeft = obj.offset().left;
            var targetHeight = obj[0].offsetHeight;
            if (imgTop < document.documentElement.clientHeight / 2) {
                $("#pop").css("top", imgTop + targetHeight + 3 + "px");
            } else {
                $("#pop").css("top", imgTop - targetHeight - 3 - $("#pop").height() + "px");
            }
            $("#pop").css("left", imgLeft - 10 + "px");
            $("#pop").fadeIn(600);
        },
        creatHeighchart: function (targetCon) {
            if (this.options&&typeof this.options=="function") {
                var userNum = this.options(targetCon);
            }
            var defaultHighChartSetting = $.extend(true, {}, {
                type: "column",         //图标类型
                data: [],         //数据
                columns: [],     //x轴列
                unit: "",       //y轴刻度单元
                title: ""       //图表的标题
            }, userNum || {});
            $('#container').highcharts({
                chart: {
                    type: defaultHighChartSetting.type
                },
                title: {
                    text: defaultHighChartSetting.title
                },
                tooltip: {
                    //提示框设置
                    animation: true,
                    pointFormat: defaultHighChartSetting.title + "{point.y}" + defaultHighChartSetting.unit,
                    shared: true
                },
                xAxis: {
                    categories: defaultHighChartSetting.columns,//x轴横坐标
                    title: {
                        text: ''
                    },
                    labels: {
                        rotation: -45,
                        align: 'right',
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value + defaultHighChartSetting.unit;//纵坐标单位
                        }
                    }
                },
                series: [
                    {
                        name: defaultHighChartSetting.title,
                        data: defaultHighChartSetting.data//数据
                    }],
                credits: {
                    enabled: false // 禁用版权信息
                },
                legend: {
                    enabled: false//横坐标标题
                }
            });

        },
        mouseenterContro: function (e) {

            var _self = this
            var $that = $(e.target)
            $that.addClass("onContro");
            setTimeout(function () {
                if (!$("#pop")[0] && $that.hasClass("onContro")) {
                    _self.creatPop($that);
                    _self.creatHeighchart($that);

                }
            }, 300)

        },
        //鼠标移出控制点
        mouseleaveContro: function (e) {
            var $targetOne = $(e.target)
            $targetOne.removeClass("onContro")
            setTimeout(function () {
                if (!$("#container").hasClass("over")) {
                    $('#pop').remove()
                }
            }, 100);
        },
        //鼠标进入折线图
        mouseenterPop: function () {
            $("#container").addClass("over");
        },
        //鼠标移出折线图
        mouseleavePop: function () {
            $("#container").removeClass("over");
            $("#pop").remove();
        }
    }
    $.fn.tipChart = function (options) {
        var popdiv = new PopDiv(this, options);
    }
})(jQuery, window, document);