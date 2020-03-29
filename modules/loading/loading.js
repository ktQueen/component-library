require.config({
    baseUrl: "http://localhost:63342/github/component-library/",
    paths: {
        "jquery": "modules/libs/jq/jquery-2.1.1.min",
        "cssFile": "modules/libs/rq/css.min"
    }
});
/*
 * loading 组件，有显示，隐藏功能，可以自定义加载动画
 * */
define([
    'jquery',
    //'djoy2.0/process_metrics/common/js/getChart',
    //'djoy2.0/process_metrics/common/js/reportTable',
    'cssFile!modules/loading/css/loading'
], function($) {
    function loading(opts) {
        var that = this;
        that.init(opts);
    }
    loading.prototype = {
        init: function(opts) {
            var that = this;
            that.opt = {
                loadStyle: {
                    width: "50px",
                    height: "50px" //默认宽高
                },
                loadContentStyle: "fixed", //默认是body上挂着的，所以position是fixed
                isAutoClose: false, //默认不是自动关闭
                duration: "2000", //默认展示为以毫秒为单位,
                container: $('body'), //默认铺满整个屏幕
                loadImgUrl: "modules/loading/img/loading.gif", //默认有个加载图标
            };
            if (opts && opts.container) {
                that.opt.loadContentStyle = "absolute";
            }
            that.opt = $.extend(that.opt, opts);

        },
        show: function() {
            var that = this;
            if (that.opt.container.find('.iui-load').length <= 0) {
                that.opt.container.append('<div class="iui-load"><div class="iui-load-img"></div></div>');
                that.opt.loadStyle = $.extend(that.opt.loadStyle, {
                    "background": "url(" + that.opt.loadImgUrl + ")",
                    "background-size": "cover",
                    "top": 'calc(50% - ' + (parseInt(that.opt.loadStyle.height)) / 2 + 'px)',
                    "left": 'calc(50% - ' + (parseInt(that.opt.loadStyle.width)) / 2 + 'px)'
                });
                that.opt.container.find('.iui-load').css({
                    'position': that.opt.loadContentStyle
                })
                that.opt.container.find('.iui-load-img').css(that.opt.loadStyle);
            }
            if (that.opt.isAutoClose) {
                setTimeout(function() {
                    that.hide();
                }, that.opt.duration);
            }
        },
        hide: function() {

            var that = this;
            that.opt.container.find('.iui-load').remove();
        }
    };
    return loading;
});
