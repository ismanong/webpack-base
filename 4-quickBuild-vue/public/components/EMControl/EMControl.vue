<template>
    <div id="Div_Control">
        <div class="ui-f9-search">
            <ul class="left_btn">
                <li v-show="options.restoreButton.display" class="restore" id="RestoreButton">
                    <span>
                        <i class="icon-restore"></i>
                        <input type="button" value="还原">
                    </span>
                </li>
                <li v-show="options.rotateButton.display" :class="[options.rotateButton.status===1?'active':'', spin]"
                    id="RotateButton">
                    <span>
                        <i class="icon-spin"></i>
                        <input type="button" value="旋转" @click="rotateClick">
                    </span>
                </li>
                <li v-show="options.excelButton.display" class="export-xls " id="ExcelButton">
                    <span>
                        <i class="icon-export-xls"></i>
                        <input type="button" value="导出到excel" @click="excelClick">
                    </span>
                </li>
                <li v-show="options.separateButton.display"
                    :class="[options.separateButton.status===1?'active':'', separator]" id="SeparateButton">
                    <span>
                        <i class="icon-split"></i>
                        <input type="button" value="分隔" @click="separateClick">
                    </span>
                </li>
                <li v-show="options.orderButton.display" :class="[options.orderButton.status===1?'active':'', sort]"
                    id="OrderButton">
                    <span>
                        <i class="icon-sort-desc"></i>
                        <input type="button" value="时间排序" @click="orderClick">
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'EMControl',
        data(){
            return {
                // 默认参数
                defaultOptions: {
                    restoreButton: {
                        display: true,
                        handler: ''//Global.fReset
                    },
                    rotateButton: {
                        status: 0,
                        display: true
                    },
                    scopeButton: {
                        status: 0,
                        display: true,
                        reportScopeOptions: {
                            templateMode: "1"
                        }
                    },
                    separateButton: {
                        status: 0,
                        display: true
                    },
                    orderButton: {
                        status: 0, //0：正序 2：倒序
                        display: false
                    },
                    excelButton: {
                        status: -1,
                        display: true,
                        handler: $.noop
                    },
                    CallbackFunc: { //请求数据后的回调方法
                        UnSeparateAndRotate: $.noop,
                        UnSeparateAndUnRotate: $.noop,
                        SeparateAndRotate: $.noop,
                        SeparateAndUnRotate: $.noop,
                        Custom: $.noop
                    }
                },

                //options: $.extend({}, this.defaultOptions, this.controlOptions),

            }
        },
        props: {
            controlOptions: {
                type: Object,
                require: true
            }
        },
        computed:{
            options(){
                return $.extend({}, this.defaultOptions, this.controlOptions)
            }
        },
        methods: {
            rotateClick(){
                this.options.rotateButton.status = this.options.rotateButton.status === 0 ? 1 : 0;
            },
            excelClick(){
                this.options.excelButton.handler();
            },
            separateClick(){
                this.options.separateButton.status = this.options.separateButton.status === 0 ? 1 : 0;
            },
            orderClick(){
                this.options.orderButton.status = this.options.orderButton.status === 0 ? 1 : 0;

                this.options.CallbackFunc.UnSeparateAndRotate(111)
            }
        }
    }
</script>