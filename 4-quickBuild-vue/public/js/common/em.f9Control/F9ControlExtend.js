/*
对F9Control控件进行扩展 add by glw
*/

(function($){
    $.fn.EMF9ControlExtend = function (options) {
        options = $.extend({},{
            Url: "",
            Buttons: {},
            CallbackFunc:{}
        },options || {}) ;
        var extendButtons = {
            Buttons:{
                AlertButton:{
                    Id:"AlertButton",
                    BtnType:"button",
                    Status: 0,
                    Display: false, //是否显示该按钮
                    Handler: function (func) {
                        var imageSelect = $("#AlertButton i");
                        if(imageSelect.hasClass("icon-image")){
                            imageSelect.removeClass("icon-image");
                            imageSelect.addClass("icon-date");
                            imageSelect.next().val("数据表格");
                        }
                        else{
                            imageSelect.removeClass("icon-date");
                            imageSelect.addClass("icon-image");
                            imageSelect.pre().val("图形分析");
                        }
                        imageSelect = null;
                        if (typeof (func) === 'function') {
                            func.call(this);
                        }
                    },
                    Html: "<li class=\"\" id=\"AlertButton\"><span><i class=\"icon-image\"></i><input type=\"button\" value=\"图形分析\" /></li>",
                    fGetHtml: function (status) {
                        return "<li class=\"\" id=\"AlertButton\"><span><i class=\"icon-image\"></i><input type=\"button\" value=\"图形分析\" /></li>";
                        }
                },
                PeriodSelect: {
                    Id: "PeriodSelect",
                    BtnType: "select",
                    Display: false,
                    Value: 0,
                    Data: [],
                    paramName:"cycleType",
                    Handler: function (func) {
                        if (typeof (func) === 'function') {
                            func.call(this);
                        }
                    },
                    Html: "<li class=\"select\" id=\"PeriodSelect\"><select><option>1</option></select></li>",
                    fGetHtml: function (status) {
                        var str = "";
                        var self = this;
                        $.each(this.Data, function (i, item) {
                            if (i === 0) {
                                self.Value = item.value;
                            }
                            str += "<option value=\"" + item.value + "\">" + item.name + "</option>";
                        });
                        return "<li class=\"select\" id=\"PeriodSelect\"><select>" + str + "</select></li>";
                    }
                },
                WordSizeSelect: {
                    Id: "WordSizeSelect",
                    BtnType: "select",
                    Display: false,
                    Value: 0,
                    Data: [],
                    Handler: function (func) {
                        if (typeof (func) === 'function') {
                            func.call(this);
                        }
                    },
                    Html: "<li class=\"select\" id=\"WordSizeSelect\"><select><option value='large'>字体:大</option><option selected=\"selected\" value='middle'>字体:中</option><option value='small'>字体:小</option></select></li>",
                    fGetHtml: function (status) {
                        return "<li class=\"select\" id=\"WordSizeSelect\"><select><option value='large'>字体:大</option><option selected=\"selected\" value='middle'>字体:中</option><option value='small'>字体:小</option></select></li>";
                    }
                },
                ExpansionButton: {
                    Id: "ExpansionButton",
                    BtnType: "button",
                    Status: 0,
                    Display: false, //是否显示该按钮
                    Handler: function (func) {
                        if (typeof (func) === 'function') {
                            func.call(this);
                        }
                    },
                    Html: "<li id=\"ExpansionButton\" class=\"restore\" state=\"hide\"><span><input type=\"button\" value=\"一键展开\"></span></li>",
                    fGetHtml: function (status) {
                        return "<li id=\"ExpansionButton\" class=\"restore\" state=\"hide\"><span><input type=\"button\" value=\"一键展开\"></span></li>";
                    }
                }
            }
        };

        //$.extend(true,{},extendButtons,options)

        for (var key in options.Buttons) {
            options.Buttons[key] = $.extend({}, extendButtons.Buttons[key]||{}, options.Buttons[key] || {});
        }
        //options = $.extend({},extendButtons,options || {});
        //console.log(options);
        function F9ControlExtend(){
            
        }
        F9ControlExtend.prototype = new F9Control(this,options);
        //var extendObject = new F9ControlExtend();
        F9ControlExtend.prototype.fGetData = function(){
            var _self = this;
            var url = _self.options.Url;
            var data = {
                rotate: _self.options.Buttons.RotateButton ? _self.options.Buttons.RotateButton.Status : 0,
                seperate: _self.options.Buttons.SeparateButton ? _self.options.Buttons.SeparateButton.Status : 0,
                order: _self.options.Buttons.OrderButton ? (_self.options.Buttons.OrderButton.Status === 0 ? "desc" : "asc") : "desc",
                cashType: _self.options.Buttons.UnitSelect ? _self.options.Buttons.UnitSelect.Value : 0,
                exchangeValue: _self.options.Buttons.ExchangeSelect ? _self.options.Buttons.ExchangeSelect.Value : 0
            };

            /**
             * Add 2015-3-16 Meric 获取数据前将当前控件状态保存到控件缓存中
             */
            _self.options.Cache.RotateButton=data.rotate;
            _self.options.Cache.SeparateButton=data.seperate;
            _self.options.Cache.OrderButton=_self.options.Buttons.OrderButton.Status;
            _self.options.Cache.UnitSelect=data.cashType;
            _self.options.Cache.ExchangeSelect=data.exchangeValue;


            if (_self.options.Buttons.ScopeButton) {
                if (url.indexOf("?") > 0) {
                    url += _self.options.Buttons.ScopeButton.ReportScopeObj.getRequestParams();
                } else {
                    // url += _self.options.Buttons.ScopeButton.ReportScopeObj.getRequestParams().url.substring(1);
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
                _self.options.Cache.ReportScope=_self.options.Buttons.ScopeButton.ReportScopeObj.options.Cache;
            }
            if (_self.options.Buttons.CustomSelect) {
                if (url.indexOf("?") > 0) {
                    url += "&" + _self.options.Buttons.CustomSelect.paramName + "=" + _self.options.Buttons.CustomSelect.Value;
                } else {
                    url += _self.options.Buttons.CustomSelect.paramName + "=" + _self.options.Buttons.CustomSelect.Value;
                }
            }
            if (_self.options.Buttons.PeriodSelect) {
                if (url.indexOf("?") > 0) {
                    url += "&" + _self.options.Buttons.PeriodSelect.paramName + "=" + _self.options.Buttons.PeriodSelect.Value;
                } else {
                    url += _self.options.Buttons.PeriodSelect.paramName + "=" + _self.options.Buttons.PeriodSelect.Value;
                }
            }
            $.getJSON(url, data, function (json) {
                if (_self.options.Buttons.SeparateButton.Status === 0) {
                    if (_self.options.Buttons.RotateButton.Status === 0) {
                        if (typeof (_self.options.CallbackFunc.UnSeparateAndUnRotate) == "function") {
                            _self.options.CallbackFunc.UnSeparateAndUnRotate(json);
                        }
                    } else {
                        if (typeof (_self.options.CallbackFunc.UnSeparateAndRotate) == "function") {
                            _self.options.CallbackFunc.UnSeparateAndRotate(json);
                        }
                    }
                } else {
                    if (_self.options.Buttons.RotateButton.Status === 0) {
                        if (typeof (_self.options.CallbackFunc.SeparateAndUnRotate) == "function") {
                            _self.options.CallbackFunc.SeparateAndUnRotate(json);
                        }
                    } else {
                        if (typeof (_self.options.CallbackFunc.SeparateAndRotate) == "function") {
                            _self.options.CallbackFunc.SeparateAndRotate(json);
                        }
                    }
                }

                /**
                 * Add 2015-3-13 Meric 传递了回调函数则调用回调函数    
                 * Add 2015-3-16 Meric 将缓存回传给回调函数         
                 */
                if (_self.options.CallbackFunc.Custom && typeof(_self.options.CallbackFunc.Custom) == 'function') {
                    _self.options.CallbackFunc.Custom(json,_self.options.Cache);
                }

            });
        };
        
        //console.log(extendObject.options.Buttons);
        return new F9ControlExtend();
    };
})(jQuery);