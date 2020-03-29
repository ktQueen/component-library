/**
 * @author kt
 * @description 圆形进度条组件
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
    'cssFile!modules/progress_bar/css/circle_progress_bar'
], function($, Base) {
    var CircleProgressBar = Base.extend({
        /*圆形私有参数配置*/
        ownParameterSetting: function() {
            var _this = CircleProgressBar;
            /*进度条初始值*/
            _this.setInitValue = false;
            /*实时进度*/
            _this.currentValue = false;
            return {
                //type:'circle',//当前进度条的样式是圆形circle
                outerStyle: { //进度条外层相关样式设置
                    //圆形的宽高必须一致，高度会跟宽度强制统一
                    'width': '200px', //外环宽度
                    'background': '#eee', //外环背景
                    'color': '#666' //外环字体颜色，当进度条没有到达文字时的颜色
                },
                innerStyle: { //进度条里面的相关样式设置,
                    'background': '#00adee', //内环背景
                    'width': '18px' //内环高度
                }
            }
        },
        /*私有的class*/
        ownClass: 'progress-circle-bar',
        /* 创建进度条*/
        createProgressBar: function() {
            var _this = this;
            _this.opts.element
                .addClass('progress-bar ' + _this.ownClass + ' ' + _this.opts.addClass)
                .html('<div class="progress-circle-txt"></div>'+
                    '<div class="circle-right">'+
                        '<div class="circle-bar circle-right-bar"></div>'+
                    '</div>'+
                    '<div class="circle-left">'+
                        '<div class="circle-bar circle-left-bar"></div>'+
                    '</div>');
        },
        /*元素设置
         * $outer：最外层元素
         * $inner：当前进度元素，圆形分为左和右两个部分
         * $txt：当前进度显示文本
         */
        elementSetting: function() {
            var _this = this;
            _this.$outer = _this.opts.element;
            _this.$inner = _this.opts.element.find('.circle-bar');
            _this.$innerRight = _this.opts.element.find('.circle-right-bar');
            _this.$innerLeft = _this.opts.element.find('.circle-left-bar');
            _this.$txt = _this.opts.element.find('.progress-circle-txt');
        },
        /*设置当前进度条的样式*/
        styleSetting: function() {
            var _this = this;
            /*外环的相关设置映射到具体设置*/
            _this.$outer.css({
                'width': _this.opts.outerStyle.width, //外环宽度
                'height': _this.opts.outerStyle.width //外环高度，强行和宽度一致
            });
            _this.$inner.css({
                'border': _this.opts.innerStyle.width + ' solid ' + _this.opts.outerStyle.background, //外环背景
            });
            _this.$txt.css({
                'color': _this.opts.outerStyle.color, //外环字体颜色，当进度条没有到达文字时的颜色
                'margin-top': -_this.$txt.height() / 2 + 'px'
            });
            console.log(_this.opts.innerStyle.width);
            /*内环相关设置*/
            _this.$innerRight.css({
                'border-top': _this.opts.innerStyle.width + ' solid ' + _this.opts.innerStyle.background,
                'border-right': _this.opts.innerStyle.width + ' solid ' + _this.opts.innerStyle.background,
            });
            _this.$innerLeft.css({
                'border-bottom': _this.opts.innerStyle.width + ' solid ' + _this.opts.innerStyle.background,
                'border-left': _this.opts.innerStyle.width + ' solid ' + _this.opts.innerStyle.background,
            });
        },
        //把值展现在进度条上
        setValueToBar: function(val, _this) {
            _this.maxValueFn(val, 'all', function(maxVal, maxWidth, barVal, barWidth) {
                /*内环相关设置*/
                if (parseFloat(barVal) <= 50) {
                    _this.$innerRight.css({
                        '-webkit-transform': 'rotate(' + ((180 * Math.PI / 180) * parseFloat(barVal) / 50 - (135 * Math.PI / 180)) * (180 / Math.PI) + 'deg)'
                    });
                    _this.$innerLeft.css({
                        '-webkit-transform': 'rotate(-135deg)'
                    });
                } else {
                    _this.$innerRight.css({
                        '-webkit-transform': 'rotate(45deg)'
                    });
                    _this.$innerLeft.css({
                        '-webkit-transform': 'rotate(' + ((180 * Math.PI / 180) * (parseFloat(barVal) - 50) / 50 - (135 * Math.PI / 180)) * (180 / Math.PI) + 'deg)'
                    });
                }
                _this.$txt.css({
                    'margin-top': -_this.$txt.height() / 2 + 'px'
                });
                _this.endAndGetAndTxtFn(barVal, maxVal);
            });
        },
        /*把文本显示在页面上*/
        setTxtToPage: function(txt) {
            var _this = this;
            _this.$txt.html(txt);
        }
    });
    return CircleProgressBar;
});