/**
 * 股票F9的Control对象
 *     ###提供以下功能
 *         +RestoreButton:还原
 *         +RotateButton:旋转
 *         +ScopeButton:范围选择
 *         +SeparateButton
 *         +OrderButton:排序
 *         +ExcelButton:导出Excel
 *         +ExchangeSelect
 *         +UnitSelect
 *         +CustomSelect
 *
 * @module F9Control
 *
 */

/**
 * @class F9Control
 * @static
 */

/**
 * F9Control的默认选项
 *
 * @property Defaults
 */
;
F9Control.Defaults = {
    Url: '',
    Buttons: {
        RestoreButton: {
            Display: false,
            Handler: function () { }
        },
        RotateButton: { //必须配置
            Status: 0, //0：不旋转；1：旋转
            Display: false //是否显示
        },
        ExcelButton: {
            Status: -1, //-1：没有选中的样式状态改变
            Display: true,
            Handler: function () { }
        },
        ScopeButton: {
            Display: false,
            Scope: this,
            ReportScopeOptions: null
        },
        SeparateButton: { //必须配置
            Status: 0, //0：不旋转；1：旋转
            Display: false //是否显示
        },
        OrderButton: {
            Status: 1, //0：降序；1：升序
            Display: false
        },
        ExchangeSelect: {
            Display: false,
            Data: [] //select按钮绑定的选项数据[{value,name,chinese}](值，显示中文，title)
        },
        UnitSelect: {
            Display: false,
            Data: [] //select按钮绑定的选项数据[{value,name,chinese}](值，显示中文，title)
        },
        CustomSelect: { //自定义下拉框
            Display: false,
            Data: [],
            paramName: '' //请求的参数名
        },
        /**
         * Add 2015-3-12 Meric 隐藏空行按钮
         */
        HideEmptyButton: {
            Status: 0, //0 显示全部；1:隐藏空行
            Display: false
        }
    },
    /**
     * Add 2015-3-16 Meric 增加缓存记录功能
     */
    Cache: {},
    CallbackFunc: { //请求数据后的回调方法
        UnSeparateAndRotate: function () { },
        UnSeparateAndUnRotate: function () { },
        SeparateAndRotate: function () { },
        SeparateAndUnRotate: function () { },
        Custom: function () { }
    }
};
F9Control.Global = {
    Map: {
        "rotate": "RotateButton",
        "hideEmpty": "HideEmptyButton"
    },
    Buttons: {
        // 还原
        RestoreButton: {
            Id: 'RestoreButton',
            BtnType: 'button',
            Status: 0, //按钮的当前状态   -1：不更改状态；0：未点击；1:已点击；
            Display: true, //是否显示该按钮
            Value: 1, //
            Handler: function () { },
            Html: '<li class="restore" id="RestoreButton"><span><i class="icon-restore"></i><input type="button" value="还原" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="restore "' + (status === 1 ? "active" : "") + '" id="RestoreButton"><span><i class="icon-restore"></i><input type="button" value="还原" /></span></li>';
            }
        },
        // 旋转
        RotateButton: {
            Id: 'RotateButton',
            BtnType: 'button',
            Status: 0,
            Value: 1,
            Display: true,
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="spin" id="RotateButton"><span><i class="icon-spin"></i><input type="button" value="旋转" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="spin ' + (status === 1 ? "active" : "") + '" id="RotateButton"><span><i class="icon-spin"></i><input type="button" value="旋转" /></span></li>';
            }
        },
        // 范围
        ScopeButton: {
            Id: 'ScopeButton',
            BtnType: 'button',
            //ReportScopeObj: null,
            Status: -1,
            Display: true,
            BlockUI: false, // 点击确定触发数据请求时,是否block ui,默认不触发. add by glw 2013-12-09
            RequestBlockUIDomId: '#content', // 点击确定触发数据请求时,block ui的dom id. add by glw 2013-12-09
            Scope: this,
            //ReportScopeOptions: null,
            Handler: function (scope) {
                if (!scope.options.ReportScopeObj) {
                    scope.options.ReportScopeObj = $('#ScopeButton').EMReportScope(scope.options.ReportScopeOptions);
                    $('#ScopeButton').click();
                }
            },
            Html: '<li class="range" id="ScopeButton"><span><i class="icon-range"></i><input type="button" value="范围选择" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="range ' + (status === 1 ? "active" : "") + '" id="ScopeButton"><span><i class="icon-range"></i><input type="button" value="范围选择" /></span></li>';
            }
        },
        SeparateButton: {
            Id: 'SeparateButton',
            BtnType: 'button',
            Display: true,
            Status: -1,
            Display: true,
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="separator" id="SeparateButton"><span><i class="icon-split"></i><input type="button" value="分隔" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="separator ' + (status === 1 ? "active" : "") + '" id="SeparateButton"><span><i class="icon-split"></i><input type="button" value="分隔" /></span></li>';
            }
        },
        // 排序
        OrderButton: {
            Id: 'OrderButton',
            BtnType: 'button',
            Display: true,
            Status: -1,
            Display: true,
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="sort" id="OrderButton"><span><i class="icon-sort-desc"></i><input type="button" value="时间排序" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="sort ' + (status === 1 ? 'active' : '') + '" id="OrderButton"><span><i class="icon-sort-desc"></i><input type="button" value="时间排序" /></span></li>';
            }
        },
        // 刷新
        RefreshButton: {
            Id: 'RefreshButton',
            BtnType: 'button',
            Display: false,
            Status: -1,
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="refresh" id="RefreshButton"><span><i class="icon-refresh"></i><input type="button" value="刷新" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="refresh ' + (status === 1 ? 'active' : '') + '" id="RefreshButton"><span><i class="icon-refresh"></i><input type="button" value="刷新" /></span></li>';
            }
        },
        QuoteButton: {
            Id: 'QuoteButton',
            BtnType: 'button',
            Status: -1,
            Display: false,
            Handler: function () { },
            Html: '<li class="k" id="QuoteButton"><span><i class="icon-k"></i><input type="button" value="行情K线" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="k ' + (status === 1 ? 'active' : '') + '" id="QuoteButton"><span><i class="icon-k"></i><input type="button" value="行情K线" /></span></li>';
            }
        },
        ExchangeSelect: {
            Id: 'ExchangeSelect',
            BtnType: 'select',
            Display: false,
            Value: 0,
            Data: [],
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="select" id="ExchangeSelect"><select><option>1</option></select></li>',
            fGetHtml: function (status) {
                var str = '';
                var self = this;
                $.each(this.Data, function (i, item) {
                    /**
                     * Add 2015-3-17 Meric 增加默认值的选中
                     */
                    str += '<option value="{0}" title="{1}" {2}>{3}</option>'.format(item.value, item.chinese, item.value == self.Value ? ' selected="selected"' : '', item.name);
                    if (self.Value != 0) return;
                    if (i == 0) {
                        self.Value = item.value;
                    }
                });
                return '<li class="select" id="ExchangeSelect"><select>' + str + '</select></li>';
            }
        },
        UnitSelect: {
            Id: 'UnitSelect',
            BtnType: 'select',
            Display: false,
            Value: 0,
            Data: [],
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="select" id="UnitSelect"><select><option>1</option></select></li>',
            fGetHtml: function (status) {
                var str = '';
                var self = this;
                $.each(this.Data, function (i, item) {
                    str += '<option value="{0}" title="{1}" {2}>{3}</option>'.format(item.value, item.chinese, item.value == self.Value ? ' selected="selected"' : '', item.name);
                    if (self.Value != 0) return;
                    if (i == 0) {
                        self.Value = item.value;
                    }
                    // str += '<option value="' + item.value + '" title="' + item.chinese + '">' + item.name + '</option>';
                });
                return '<li class="select" id="UnitSelect"><select>' + str + '</select></li>';
            }
        },
        ExcelButton: {
            Id: 'ExcelButton',
            BtnType: 'button',
            Status: -1,
            Display: true,
            Handler: function () { },
            Html: '<li class="export-xls" id="ExcelButton"><span><i class="icon-export-xls"></i><input type="button" value="导出到excel" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="export-xls ' + (status === 1 ? 'active' : '') + '" id="ExcelButton"><span><i class="icon-export-xls"></i><input type="button" value="导出到excel" /></span></li>';
            }
        },
        CustomSelect: {
            Id: 'CustomSelect',
            BtnType: 'select',
            Display: false,
            Value: 0,
            Data: [],
            paramName: '',
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="select" id="CustomSelect"><select><option>1</option></select></li>',
            fGetHtml: function (status) {
                var str = '';
                var self = this;
                $.each(this.Data, function (i, item) {
                    str += '<option value="{0}" title="{1}" {2}>{1}</option>'.format(item.value, item.name, item.value == self.Value ? ' selected="selected"' : '');
                    if (self.Value != 0) return;
                    if (i == 0) {
                        self.Value = item.value;
                    }
                });
                return '<li class="select" id="CustomSelect"><select>' + str + '</select></li>';
            }
        },
        /**
         * Add 2015-3-12 Meric 隐藏空行按钮
         */
        HideEmptyButton: {
            Id: "HideEmptyButton",
            BtnType: 'button',
            Status: 0,
            Value: 1,
            Handler: function (func) {
                if (typeof (func) === 'function') {
                    func.call(this);
                }
            },
            Html: '<li class="spin" id="HideEmptyButton"><span><i class=""></i><input type="button" value="隐藏空行" /></span></li>',
            fGetHtml: function (status) {
                return '<li class="spin ' + (status === 1 ? "active" : "") + '" id="HideEmptyButton"><span><i class=""></i><input type="button" value=' + (status === 1 ? "显示空行" : "隐藏空行") + ' /></span></li>';
            }
        }
    }
};


//add by lym F9里面按钮控件
/**
 * 定义F9Control插件
 * Modify 2015-1-19 Meric 整理插件代理
 * @param  {[type]} $ jQuery
 */
;
(function ($) {
    $.fn.EMF9Control = function (options) {
        return new F9Control(this, options);
    };
})(jQuery);


//F9Control类
function F9Control(div, settings) {
    this.options = $.extend(true, {}, F9Control.Defaults, F9Control.Global, settings || {});
    this.options.Cache = $.extend(true, {}, settings.Cache || {})

    /**
     * Add 2015-3-16 Meric 使用缓存里的值设置控件值
     */
    var _cache = this.options.Cache;
    var _btns = this.options.Buttons;
    for (var key in _btns) {
        if (!_cache[key]) continue;
        if (["UnitSelect", "ExchangeSelect", "CustomSelect"].indexOf(key) > -1) {
            this.options.Buttons[key].Value = _cache[key];
        } else {
            this.options.Buttons[key].Status = _cache[key];
        }

    }

    // var Btns = settings.Buttons;
    // for (var key in Btns) {
    //     this.options.Buttons[key] = $.extend({}, F9Control.Global.Buttons[key], settings.Buttons[key] || {});
    // }
    this.$dom = div;
    this.init();
}


//私有方法
F9Control.prototype = {
    options: {},
    $dom: null,
    fGetOptions: function () {
        return this.options;
    },
    fBindBtnClick: function (event) {
        if (this.options.Buttons[$(event.currentTarget).attr('id')].Status != -1) {
            if ($(event.currentTarget).is('.active')) {
                $(event.currentTarget).removeClass('active');
                this.options.Buttons[$(event.currentTarget).attr('id')].Status = 0;
                if ($(event.currentTarget).attr('id') == "HideEmptyButton") {
                    $(event.currentTarget).find(":button").val("隐藏空行");
                }
            } else {
                $(event.currentTarget).addClass('active');
                this.options.Buttons[$(event.currentTarget).attr('id')].Status = 1;
                if ($(event.currentTarget).attr('id') == "HideEmptyButton") {
                    $(event.currentTarget).find(":button").val("显示空行");
                }
            }
        }
        this.options.Buttons[$(event.currentTarget).attr('id')].Handler.call(this, this.fGetData);
    },
    fBindSelectChange: function (event) {
        this.options.Buttons[$(event.currentTarget).attr('id')].Value = $(event.currentTarget).find('option:selected').attr('value');
        this.options.Buttons[$(event.currentTarget).attr('id')].Handler.call(this, this.fGetData);
    },
    fWrapper: function () {
        var _html = '<div class="ui-f9-search"><ul class="left_btn">';
        var Btns = this.options.Buttons;
        var _status;
        for (var key in Btns) {
            if (Btns[key] && Btns[key].Display) {
                _html += Btns[key].fGetHtml(Btns[key].Status);
            }
        }
        _html += '</ul></div>';
        return _html;
    },
    fUIEffect: function () {
        var Btns = F9Control.Global.Buttons;
        for (var key in Btns) {
            if (Btns[key].Display) {
                switch (key) {
                    case 'ScopeButton':
                        break;
                    default:
                        break;
                }
                //绑定按钮事件 add by lym
                var _self = this;
                if (Btns[key].Status === -1) {
                    $('#' + Btns[key].Id).click(function (e) {
                        Btns[$(e.currentTarget).attr('id')].Handler(_self);
                    });
                } else {
                    $('#' + Btns[key].Id).click(function (e) {
                        //alert('a');
                        if ($(e.currentTarget).is('.active')) {
                            $(e.currentTarget).removeClass('active');
                            $(e.currentTarget).data('key', 0);
                        } else {
                            $(e.currentTarget).addClass('active');
                            $(e.currentTarget).data('key', 1);
                        }
                        //Btns[$(e.currentTarget).attr('id')].Handler();
                        _self.fGetData();
                    });
                }
            }
        }
    },
    fBindBtnEvent: function () {
        var _self = this;
        var Btns = this.options.Buttons;

        for (var key in Btns) {
            switch (key) {
                case 'ScopeButton':
                    Btns.ScopeButton.ReportScopeOptions = $.extend({}, {
                        callback: function (json) {
                            _self.fGetData();
                        }
                    }, Btns.ScopeButton.ReportScopeOptions || {});
                    /**
                     * Add 2015-3-17 Meric 对ReportScope使用缓存
                     */
                    Btns.ScopeButton.ReportScopeObj = $('#ScopeButton').EMReportScope(
                                                        $.extend({},
                                                                Btns.ScopeButton.ReportScopeOptions,
                                                                { Cache: _self.options.Cache.ReportScope || {} }));
                    break;
                case 'ExcelButton':
                    $('#' + Btns[key].Id).click(function (e) {
                        _self.options.Buttons[$(e.currentTarget).attr('id')].Handler();
                    });
                    break;
                default:
                    if (Btns[key].BtnType == 'button') {
                        $('#' + Btns[key].Id).click(function (e) {
                            _self.fBindBtnClick.call(_self, e);
                        });
                    } else if (Btns[key].BtnType == 'select') {
                        $('#' + Btns[key].Id).bind('change', function (e) {
                            _self.fBindSelectChange.call(_self, e);
                        });
                    }
                    break;
            }
        }
    },
    fGetData: function () {
        var _self = this;
        var url = _self.options.Url;
        var data = {
            rotate: _self.options.Buttons.RotateButton ? _self.options.Buttons.RotateButton.Status : 0,
            seperate: _self.options.Buttons.SeparateButton ? _self.options.Buttons.SeparateButton.Status : 0,
            order: _self.options.Buttons.OrderButton ? (_self.options.Buttons.OrderButton.Status == 0 ? 'desc' : 'asc') : 'desc',
            cashType: _self.options.Buttons.UnitSelect ? _self.options.Buttons.UnitSelect.Value : 0,
            exchangeValue: _self.options.Buttons.ExchangeSelect ? _self.options.Buttons.ExchangeSelect.Value : 0,
            customSelect: _self.options.Buttons.CustomSelect ? _self.options.Buttons.CustomSelect.Value : 0
        };



        if (_self.options.Buttons.ScopeButton) {
            if (url.indexOf('?') > 0) {
                url += _self.options.Buttons.ScopeButton.ReportScopeObj.getRequestParams();
            } else {
                /**
                Modify 2015-2-9 Meric 去掉.url
                url += _self.options.Buttons.ScopeButton.ReportScopeObj.getRequestParams().url.substring(1);
                前面补上?
                */
                url += "?" + _self.options.Buttons.ScopeButton.ReportScopeObj.getRequestParams().substring(1);
            }
            /**
             * Add 2015-3-16 Meric ReportScope缓存
             */
            _self.options.Cache["ReportScope"] = _self.options.Buttons.ScopeButton.ReportScopeObj.options.Cache;
        }
        if (_self.options.Buttons.CustomSelect) {
            if (url.indexOf('?') > 0) {
                url += '&' + _self.options.Buttons.CustomSelect.paramName + '=' + _self.options.Buttons.CustomSelect.Value;
            } else {
                /**
                    Modify 2015-2-9 Meric 前面补上“？”
                */
                url += "?" + _self.options.Buttons.CustomSelect.paramName + '=' + _self.options.Buttons.CustomSelect.Value;
            }
        }
        if (_self.options.Buttons.ScopeButton && _self.options.Buttons.ScopeButton.BlockUI) {
            $(_self.options.Buttons.ScopeButton.RequestBlockUIDomId).block({
                message: '<h1><img src="../images/comm/busy.gif">数据加载中...请稍候</h1>',
                css: {
                    border: '3px solid #777777'
                }
            });
            //blockUIExtend.fShowBlockUI($(_self.options.Buttons.ScopeButton.BlockUI));
        }


        /**
         * Add 2015-3-16 Meric 获取数据前将当前控件状态保存到控件缓存中
         */
        this.options.Cache["RotateButton"] = data.rotate;
        this.options.Cache["SeparateButton"] = data.seperate;
        this.options.Cache["OrderButton"] = _self.options.Buttons.OrderButton.Status;
        this.options.Cache["UnitSelect"] = data.cashType;
        this.options.Cache["ExchangeSelect"] = data.exchangeValue;
        this.options.Cache["CustomSelect"] = data.customSelect;



        $.getJSON(url, data, function (json) {
            if (_self.options.Buttons.SeparateButton.Status == 0) {
                if (_self.options.Buttons.RotateButton.Status == 0) {
                    if (typeof (_self.options.CallbackFunc.UnSeparateAndUnRotate) == 'function') {
                        _self.options.CallbackFunc.UnSeparateAndUnRotate(json);
                    }
                } else {
                    if (typeof (_self.options.CallbackFunc.UnSeparateAndRotate) == 'function') {
                        _self.options.CallbackFunc.UnSeparateAndRotate(json);
                    }
                }
            } else {
                if (_self.options.Buttons.RotateButton.Status == 0) {
                    if (typeof (_self.options.CallbackFunc.SeparateAndUnRotate) == 'function') {
                        _self.options.CallbackFunc.SeparateAndUnRotate(json);
                    }
                } else {
                    if (typeof (_self.options.CallbackFunc.SeparateAndRotate) == 'function') {
                        _self.options.CallbackFunc.SeparateAndRotate(json);
                    }
                }
            }
            if (_self.options.Buttons.ScopeButton && _self.options.Buttons.ScopeButton.BlockUI) {
                $(_self.options.Buttons.ScopeButton.RequestBlockUIDomId).unblock();
                //blockUIExtend.fHideBlockUI($(_self.options.Buttons.ScopeButton.BlockUI));
            }
            /**
             * Add 2015-3-13 Meric 传递了回调函数则调用回调函数
             * Add 2015-3-16 Meric 将缓存回传给回调函数
             */
            if (_self.options.CallbackFunc.Custom && typeof (_self.options.CallbackFunc.Custom) == 'function') {
                _self.options.CallbackFunc.Custom(json, _self.options.Cache);
            }


        });
    },
    /**
     * Add 2015-1-20 解析URL中的控件控制参数，执行选定操作
     */
    mapQueryString: function () {
        var _self = this;
        var q = Base.QueryString;
        $.each(_self.options.Map, function (k, v) {
            if (q && q[k] && q[k] == 1) {
                _self.options.Buttons[v].Status = 1;
            }
        })
    },
    init: function () {
        //首先解析URL中的控制参数
        this.mapQueryString();
        this.$dom.html(this.fWrapper());
        //this.fUIEffect();
        this.fBindBtnEvent();
        return this;
    },
    fGetOptions: function () {
        return this.options;
    },
    fGetControl: function () {

    },
    fShowData: function () {
        this.fGetData();
    },
    /**
     * Add 2015-3-12 Meric 控件扩展方法，隐藏按钮
     *
     * @method fHideControl
     * @param  {String} btn 需要隐藏的按钮
     * @return {F9Contorl}     新的F9Control实例
     */
    fHideControl: function (btn) {
        if (!this.options.Buttons[btn] || !this.options.Buttons[btn].Display) return;
        this.options.Buttons[btn].Display = false;
        return this.init();
    },
    /**
     * Add 2015-3-12 Meric 控件扩展方法，显示按钮
     *
     * @method fHideControl
     * @param  {String} btn 需要显示的按钮
     * @return {F9Contorl}     新的F9Control实例
     */
    fShowControl: function (btn) {
        if (!this.options.Buttons[btn] || this.options.Buttons[btn].Display) return;
        this.options.Buttons[btn].Display = true;
        return this.init();
    },
    extend: function (options) {
        $.extend(F9Control.Global.Buttons, options || {});
        return this;
    }
};