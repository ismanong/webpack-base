<template>
    <div class="tableHandle clearfix" style="margin-top: 20px">
        <div class="input-prepend">
            <div class="btn-group">
                <div class="btn dropdown-toggle" data-toggle="dropdown" @click="show = !show">
                    <span id="js-spankeywordType">{{ showSelect }}</span> <span class="caret"></span>
                </div>
                <transition name="fade">
                    <ul  v-show="!show" class="dropdown-menu hidden">
                        <li v-for="tit in select" @click="selectTitle(tit)">{{ tit }}</li>
                    </ul>
                </transition>
            </div>
            <input v-model="message" type="text" id="Search_Text" placeholder="请输入关键字">
           <!-- <div class="btn-group">
                <div class="btn dropdown-toggle dropdown-toggle-right" data-toggle="dropdown" @click="show = !show">
                    <span key="F005">全部公告</span> <span class="caret"></span>
                </div>
                <transition name="fade">
                    <ul  v-show="!show" class="dropdown-menu hidden">
                        <li><span @click="selectTitle(tit)" key="F005">全部公告</a></li>
                        <li><span @click="selectTitle(tit)" key="S005001">定期报告</a></li>
                        <li><span @click="selectTitle(tit)" key="S005002">基金招募</a></li>
                        <li><span @click="selectTitle(tit)" key="T005003001">收益分配</a></li>
                        <li><span @click="selectTitle(tit)" key="S005003">一般公告</a></li>
                    </ul>
                </transition>
            </div>-->
            <ul class="left_btn" style="float: left">
                <li class="selected"><span><input type="button" value="搜索" @click="Search_Simple"></span></li>
                <li><span><input type="button" value="重置" @click="Reset_Simple"></span></li>
            </ul>
        </div>

        <div class="box">
            <button class="boxBtn"><i class="icon-restore"></i>还原</button>
        </div>
        <div class="box">
            <button class="boxBtn"><i class="icon-export-xls"></i>导出到excel</button>
        </div>

        <!--范围选择-->
        <div class="box">
            <button class="boxBtn" @click="rangeShow = !rangeShow"><i class="icon-range"></i>范围选择</button>
            <div class="alert" v-show="rangeShow">
                <div>
                    <h4>常用日期查询</h4>
                    <div>
                        <h5>变动日期</h5>
                        <input type="radio" name="n1" value="" id="radio1-1"><label for="radio1-1">今年</label>
                        <input type="radio" name="n1" value="" id="radio1-2"><label for="radio1-2">去年</label>
                        <input type="radio" name="n1" value="" id="radio1-3"><label for="radio1-3">近两年</label>
                        <input type="radio" name="n1" value="" id="radio1-4"><label for="radio1-4">近三年</label>
                        <input type="radio" name="n1" value="" id="radio1-5"><label for="radio1-5">近五年</label>
                        <input type="radio" name="n1" value="" id="radio1-6"><label for="radio1-6">全部</label>
                    </div>
                    <div>
                        <h5>报告期</h5>
                        <input type="checkbox" name="" value="" id="checkbox1-1"><label for="checkbox1-1">一季报</label>
                        <input type="checkbox" name="" value="" id="checkbox1-2"><label for="checkbox1-2">中报</label>
                        <input type="checkbox" name="" value="" id="checkbox1-3"><label for="checkbox1-3">三季报</label>
                        <input type="checkbox" name="" value="" id="checkbox1-4"><label for="checkbox1-4">年报</label>
                    </div>
                    <div>
                        <h5>上市前后</h5>
                        <input type="checkbox" name="" value="" id="checkbox2-1"><label for="checkbox2-1">上市前</label>
                        <input type="checkbox" name="" value="" id="checkbox2-2"><label for="checkbox2-2">上市后</label>
                    </div>
                    <div>
                        <h5>报告类型</h5>
                        <input type="checkbox" name="" value="" id="checkbox3-1"><label for="checkbox3-1">合并报表</label>
                        <input type="checkbox" name="" value="" id="checkbox3-2"><label for="checkbox3-2">合并报表(调整)</label>
                        <input type="checkbox" name="" value="" id="checkbox3-3"><label for="checkbox3-3">母公司报表</label>
                        <input type="checkbox" name="" value="" id="checkbox3-4"><label for="checkbox3-4">母公司报表(调整)</label>
                    </div>
                </div>
                <div>
                    <h4>常用日期查询</h4>
                    <div>
                        <h5>时间范围：</h5>
                        <input type="radio" name="radio-n1" :value="true" id="radio2-1" v-model="picked"><label for="radio2-1">全部</label>
                        <input type="radio" name="radio-n1" :value="false" id="radio2-2" v-model="picked"><label for="radio2-2">自定义</label>
                        <span v-show="!picked">
                            <input size="5" id="userDefine-start-window" type="number" :min="minAge" :max="Xval" v-model="Sval"> 年到
                            <input size="5" id="userDefine-start-window" type="number" :min="Sval" :max="maxAge" v-model="Xval"> 年
                        </span>
                        <h5>报告期：</h5>
                        <input type="checkbox" name="" value="" id="checkbox4-1" @click="screenSelect(1)"><label for="checkbox4-1">一季报</label>
                        <input type="checkbox" name="" value="" id="checkbox4-2" @click="screenSelect(2)"><label for="checkbox4-2">中报</label>
                        <input type="checkbox" name="" value="" id="checkbox4-3" @click="screenSelect(3)"><label for="checkbox4-3">三季报</label>
                        <input type="checkbox" name="" value="" id="checkbox4-4" @click="screenSelect(4)"><label for="checkbox4-4">年报</label>
                    </div>
                    <ul style="border: 1px solid red;height: 300px;overflow: auto;margin: 10px 0">
                        <li v-for="(item,index) in C_timeRange">
                            <input type="checkbox" name="" value="" :id="'check-'+ index " @click="allSelect"><label :for="'check-'+ index ">{{ item }}</label>
                            <br/>---<input type="checkbox" name="" value="0331" :id="'check-'+ index +'-1'" @click="clickSelect"><label :for="'check-'+ index +'-1'"> 0331 （一季报）</label>
                            <br/>---<input type="checkbox" name="" value="0630" :id="'check-'+ index +'-2'" @click="clickSelect"><label :for="'check-'+ index +'-2'"> 0630 （中报）</label>
                            <br/>---<input type="checkbox" name="" value="0930" :id="'check-'+ index +'-3'" @click="clickSelect"><label :for="'check-'+ index +'-3'"> 0930 （三季报）</label>
                            <br/>---<input type="checkbox" name="" value="1231" :id="'check-'+ index +'-4'" @click="clickSelect"><label :for="'check-'+ index +'-4'"> 1231 （年报）</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>



        <span class="boxBtn"><i class="icon-sort-desc"></i>时间排序</span>

    </div>
</template>
<style>
    .tableHandle h4{padding: 10px 5px}
    .tableHandle h5{padding: 10px 5px}
    .box{display: inline-block;position: relative;}
    .alert{position: absolute;top: 40px;left: 0;border: 1px solid #ddd;width: 300px;user-select:none;}
    .boxBtn{border: 1px solid #ddd;padding: 10px;cursor: pointer;background-color: transparent}
    input + label{cursor: pointer;}
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
<script>

    export default {
        data() {
          return {
              //检索目标
              show: true,
              select:['标题检索','内容检索'],
              showSelect: '',
              //检索要求
              //--------
              message:'',

              //范围
              rangeShow: true,
              maxAge: 2016,
              minAge: 1992,
              customShow: false,
              picked: false,//是否全部范围
              Sval:2012, //非配置 保存变量
              Xval:2016, //非配置 保存变量
              checked:'',//非配置 保存变量
          }
        },
        props: {
            search:{
                select:['标题检索','内容检索'],
            },
            configure:{
                type: Object,
                required: true,
                default: {

                }
            },
        },
        computed: {
            C_showSelect : function () {
                return this.select[0]
            },
            C_timeRange:function () {
//                console.log(this.picked)
                var num, startTime,startTimeArray=[];
                if(this.picked){
                    num = this.maxAge-this.minAge;
                    startTime = this.minAge;
                }else{
                    num = this.maxAge === this.Xval ? this.maxAge-this.Sval : this.Xval-this.Sval;
                    startTime = this.Sval;
                }
                for(var i=0;i<=num;i++){
                    startTimeArray.push(startTime+i);
                }
                return startTimeArray
            },

        },
        methods: {
            test:function (a) {
              console.log(a)
            },
            selectTitle: function (tit) {
                this.showSelect = tit
                this.show = true;
            },
            Search_Simple:function () {
                console.log(this.message)
            },
            Reset_Simple:function () {
                this.message = ''
                this.showSelect = this.select[0]
            },
            allSelect:function(event){
                var input = event.target.parentNode.getElementsByTagName('input');
                var flag = input[0].checked;
                if(flag){
                    for(var i=1;i<input.length;i++){
                        input[i].checked = true;
                    }
                }else {
                    for(var m=1;m<input.length;m++){
                        input[m].checked = false;
                    }
                }
                //input2.style.checked = true;
            },
            screenSelect: function (n) {
                var li = event.target.parentNode.parentNode.getElementsByTagName('li');
                var flag = event.target.checked;
                if(flag){
                    for(var i=0;i<li.length;i++){
                        li[i].getElementsByTagName('input')[n].checked = true;
                        var che = li[i].getElementsByTagName('input')[0];
                        if(!che.checked){
                            che.checked = true;
                        }
                    }
                }else{
                    for(var i=0;i<li.length;i++){
                        li[i].getElementsByTagName('input')[n].checked = false;
                        var che = li[i].getElementsByTagName('input')[0];
                        var arr = li[i].getElementsByTagName('input');
                        this.checkFn(che,arr)
                    }
                }
                //var flag = input[0].getElementsByTagName('input')[0].checked;
            },
            checkFn:function (che,arr) {
                for(var j=1;j<arr.length;j++){
                    if(arr[j].checked){
                        che.checked = true;
                        break;
                    }
                    if(j==4 && !arr[j].checked){
                        che.checked = false;
                    }
                    //this.checked = '';
                }
            },
            clickSelect:function(){
                var me = event.target;
                var all = event.target.parentNode.getElementsByTagName('input');
                if(me.checked){
                    me.checked = true;
                }else{
                    me.checked = false;
                }
                this.checkFn(all[0],all)
            }
//            showFunc:function (showState) {
//                this[showState] = !showState
//            },
        },
        watch:{
            arraychecked:function (val) {
//                console.log('watch')
//                console.log(val)
                this.showSelect = this.select[0]
            },
        },
        created(){
//            console.log('created')
            this.showSelect = this.select[0]
        },
        mounted: function(){
            //console.log(this.configure)
        }
    }
</script>