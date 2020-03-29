/**
 * @author kt
 * @description 柱形进度条组件
 * @date 2017-7-20
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/progress_bar/js/base',
    'cssFile!modules/progress_bar/css/columnar_progress_bar'
], function($, Base) {
    var ColumnarProgressBar = Base.extend({
        /*柱形私有参数配置*/
        ownParameterSetting: function() {
            var _this = ColumnarProgressBar;
            /*进度条初始值*/
            _this.setInitValue = false;
            /*实时进度*/
            _this.currentValue = false;
            return {
                //type:'columnar',//当前进度条的样式是柱状columnar
                outerStyle: { //进度条外层相关样式设置
                    'width': '300px', //外环宽度
                    'height': '24px', //外环高度
                    'background': '#eee', //外环背景
                    'color': '#666', //外环字体颜色，当进度条没有到达文字时的颜色
                    'border-radius': '15px' //外环圆角
                },
                innerStyle: { //进度条里面的相关样式设置,
                    // 条形不能设置宽度，设置了也没有用的
                    //圆形的宽高必须一致，高度会跟宽度强制统一
                    'background': '#00adee', //内环背景
                    'color': '#fff', //内环字体颜色，当进度条到文本时的颜色
                    'height': '18px', //内环高度，宽度是不能设置的，设置也没有用，我会强行转换的
                    'border-radius': '15px' //内环圆角
                }
            }
        },
        /*私有的class*/
        ownClass: 'progress-columnar-bar',
        /* 创建进度条*/
        createProgressBar: function() {
            var _this = this;
            _this.opts.element
                .addClass('progress-bar  ' + _this.ownClass + ' ' + _this.opts.addClass)
                .html('<div class="progress-bar-done"></div>'+
                            '<div class="progress-bar-assist"></div>');
        },
        /*元素设置
         * $outer：最外层元素
         * $inner：当前进度元素
         * $assist：下面层进度条，当前进度未到时显示文本
         */
        elementSetting: function() {
            var _this = this;
            _this.$outer = _this.opts.element;
            _this.$inner = _this.opts.element.find('.progress-bar-done');
            _this.$assist = _this.opts.element.find('.progress-bar-assist');
        },
        /*设置当前进度条的样式*/
        styleSetting: function() {
            var _this = this;
            //背景层相关样式设置
            _this.$outer.css({
                'width': _this.opts.outerStyle.width, //外环宽度
                'height': _this.opts.outerStyle.height, //外环高度
                'background': _this.opts.outerStyle.background, //外环背景
                'color': _this.opts.outerStyle.color, //外环字体颜色，当进度条没有到达文字时的颜色
                'border-radius': _this.opts.outerStyle['border-radius'] //外环圆角
            });
            //进度层相关样式设置
            _this.outerWidth = _this.$outer.outerWidth();
            _this.outerHeight = _this.$outer.outerHeight();
            var pw = _this.outerWidth / 60; //左右填充宽
            var ph = _this.opts.innerStyle.height != '18px' ? (_this.outerHeight - parseFloat(_this.opts.innerStyle.height)) / 2 : _this.outerHeight / 8; //上下填充宽
            _this.innerHeight = _this.outerHeight - 2 * ph;
            _this.innerWidth = _this.outerWidth - 2 * pw;
            _this.$inner.css({
                'background': _this.opts.innerStyle.background, //内环背景
                'color': _this.opts.innerStyle.color, //内环字体颜色，当进度条到文本时的颜色
                'border-radius': _this.opts.innerStyle['border-radius'], //内环圆角
                'width': _this.innerWidth, //宽度强行转换，跟设置没有任何关系
                'height': _this.innerHeight,
                'left': pw + 'px',
                'top': ph + 'px',
                'line-height': _this.innerHeight + 'px',
                'clip': 'rect(0px 0px ' + _this.innerHeight + 'px 0px)',
                /*IE<8*/
                'clip': 'rect(0px,0px,' + _this.innerHeight + 'px,0px)' /*用right来控制进度*/
            });
            _this.$assist.css({
                'width': _this.innerWidth,
                'height': _this.innerHeight,
                'left': pw + 'px',
                'top': ph + 'px',
                'line-height': _this.innerHeight + 'px'
            });
        },
        //把值展现在进度条上
        setValueToBar: function(val, _this) {
            _this.maxValueFn(val, 'all', function(maxVal, maxWidth, barVal, barWidth) {
                _this.$inner.css({
                    'clip': 'rect(0px ' + barWidth + 'px ' + _this.innerHeight + 'px 0px)',
                    /*IE<8*/
                    'clip': 'rect(0px,' + barWidth + 'px,' + _this.innerHeight + 'px,0px)' /*用right来控制进度*/
                });
                _this.endAndGetAndTxtFn(barVal, maxVal);
            });
        },
        /*把文本显示在页面上*/
        setTxtToPage: function(txt) {
            var _this = this;
            _this.$inner.html(txt);
            _this.$assist.html(txt);
        }
    });
    return ColumnarProgressBar;
});