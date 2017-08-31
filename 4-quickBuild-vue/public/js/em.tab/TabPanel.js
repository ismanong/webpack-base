/*
* @author LYM 简单标签页& 带左右滚动的tabpanel
*/
(function($) {
    //IsFixtable 默认为undefined 或则flase 则不需要调用fixtable方法  如果为true则要调用
    //callbackArray 回调方法   
    $.fn.EMSimpleTab = function (FixtableOptions, ulParentCss, callbackArray) {
        var _parentDiv = this;
        var _ulParentCss = ".tab_box";
        if (typeof (ulParentCss) != 'undefined') {
            _ulParentCss = ulParentCss;
        }
        var _options = FixtableOptions || {};
        //tab切换
        _parentDiv.find(_ulParentCss + ">ul>li").live("click", function () {
            var index = _parentDiv.find(_ulParentCss + ">ul>li").index(this);
            _parentDiv.find(_ulParentCss + ">ul>li").removeClass("tabSelect");
            $(this).addClass("tabSelect");
            _parentDiv.find(".tab_content").hide(); //全部隐藏
            var tabcontent = _parentDiv.find(".tab_content").eq(index);
            tabcontent.show(); //显示当前
            //为了解决多个tabpanle 从第二个开始调用fixtable显示问题
            //console.log("20");
            if (_options.IsFixtable === true) {
                var _Fixoptions = _options.Fix[index];
                Base.FixTable(_Fixoptions.tableId, _Fixoptions.colNum, _Fixoptions.width, _Fixoptions.height);
            }
            //-------------------执行回调函数--------------------------
            if (typeof (callbackArray) != 'undefined') {
                try {
                    if (typeof (callbackArray[index]) == 'function') {
                        callbackArray[index]();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            //-------------------执行回调函数--------------------------
            //console.log("26");	
            //index = null;
            //tabcontent = null;
        });
        //_parentDiv = null;
    };

})(jQuery);    