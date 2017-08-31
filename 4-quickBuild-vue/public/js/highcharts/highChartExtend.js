window.highChartExtend = {
    Config:{
        chartColorType: ['#FCD183', '#FF7300', '#2C7EDF', '#AA4741', '#88A44D', '#8F82BC', '#3D97AF', '#92A8CD', '#7ECEF4', '#55377A', '#F8B551', '#EB6C7A', '#A47D7C', '#92C424', '#B5CA92']
    },
    /*
    add by glw 
    common highchart options   move
    */
    fChartBaseOption: function (type, width, height) {
        var _ChartBaseOption = {
            chart: {
                //renderTo: typeof (renderTo) === "undefined" ? "" : renderTo,
                width: typeof (width) === "undefined" ? "" : width,
                height: typeof (height) === "undefined" ? "" : height,
                type: typeof (type) === "undefined" ? "line" : type
            },
            colors: this.Config.chartColorType,
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                labels: {
                    step: 1,
                    style: {
                        color: '#333333'
                    }
                }
            },
            yAxis: {
                //min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    step: 1,
                    style: {
                        color: '#333333'
                    }
                }
            },
            credits: {
                href: '',
                text: ''
            },
            tooltip: {
                formatter: function () {
                    return this.x + "--" + this.series.name + ': ' + this.y;
                }
            },
            legend: {
                layout: 'horizontal', //layout: 'vertical',
                align: 'center',
                verticalAlign: "bottom", // verticalAlign: 'top',
                // x: -100,
                // y: 100,
                // floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true,
                itemStyle: {
                    fontSize: 11
                }
            },
            series: [{
                name: '',
                type: "",
                data: []
            }]
        };
        return _ChartBaseOption;
    },
    //生成图表参数的方法  by LYM   不能删除  -----------> 原来f9 common的
    GetChartBaseOption: function (type, width, height) {
        var _ChartBaseOption = {
            chart: {
                width: typeof (width) === "undefined" ? "" : width,
                height: typeof (height) === "undefined" ? "" : height,
                type: typeof (type) === "undefined" ? "line" : type,
                reflow: true
            },
            colors: highChartExtend.Config.chartColorType,
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                labels: {
                    step: 1
                }
            },
            yAxis: {
                title: {
                    text: '',
                    align: 'high'
                }
            },
            credits: {
                href: '',
                text: ''
            },
            tooltip: {
                formatter: function () {
                    return this.x + "--" + this.series.name + ': ' + this.y;
                }
            },
            legend: {
                layout: 'horizontal', //layout: 'vertical',
                align: 'center',
                verticalAlign: "bottom", // verticalAlign: 'top',
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            series: [{
                name: '',
                type: "",
                data: []
            }],
            plotOptions: {
                series: {
                    turboThreshold: 1000
                }
            }
        };
        return _ChartBaseOption;
    },
};