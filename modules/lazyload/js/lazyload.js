/**
 * @name lazyload
 * @description lazyload
 * @author kt
 * @since 2017-12-6
 */
/**
 * @name preload
 * @description preload图片预加载
 * @author kt
 * @since 2017-11-28
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min'
    }
});
define([
    'jquery'
], function($) {
    function LazyLoad(opts) {
        this.init(opts);
    }
    LazyLoad.prototype = {
        /*初始化*/
        init:function(opts){
            var _this = this;
            _this._parameterSetting(opts);
        },
        /*参数设置*/
        _parameterSetting: function(opts) {
            var _this = this;
            opts = $.extend(true, {
            }, opts);
            _this.opts = opts;
        },
    };
    //直接返回
    //return LazyLoad;

    //jquery插件
    //$.fn.extend->$('#img'
    // ).lazyload();
    //$.extend->$.extend();->工具函数，根据情况我们是不需要选择元素的，所有选择使用工具方法
    $.extend({
        lazyload:function(opts){
            new LazyLoad(opts);
        }
    });
});
