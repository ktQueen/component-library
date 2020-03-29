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
    function PreLoad(opts) {
        this.init(opts);
    }
    PreLoad.prototype = {
        /*初始化*/
        init:function(opts){
            var _this = this;
            /*计数标识*/
            _this.count=0;
            _this._parameterSetting(opts);
            if(_this.opts.order){
                _this._ordered();//有序加载
            }else{
                _this._unordered();//无序加载
            }
        },
        /*参数设置*/
        _parameterSetting: function(opts) {
            var _this = this;
            opts = $.extend(true, {
                imgs:[],//图片数组
                each:null,//每一张图片加载完毕后执行
                all:null,//所有图片加载完毕后执行
                order:false//默认是无序预加载
            }, opts);
            //图片传入的是数组，如果是一张图可以直接传递一个字符串进来
            _this.imgs=(typeof opts.imgs==='string')?[opts.imgs]:opts.imgs;
            _this.opts = opts;
        },
        /*无序加载*/
        //下划线表示只在内部使用，不提供对外调用
        _unordered:function(){
            var _this=this;
            var len=_this.opts.imgs.length;
            $.each(_this.opts.imgs,function(i,src){
                //如果图片路径不是字符串直接返回，不然会报错的
                if(typeof src!='string') return;
                //为什么要new 一个对象 new Image()
                //用new操作符 就是创建一个构造函数的实例，Image是内置的一个构造函数
                //得到Image的实例后，就可以在这个实例上监听事件，这里用到的事件是load 和 error。
                //https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image
                var imgObj=new Image();
                //为了程序能执行下去，不管图片是否成功加载所以图片要多一个error监听事件
                $(imgObj).on('load error',function(){
                    console.log(_this.count);
                    _this.opts.each && _this.opts.each(_this.count);//每一张图片执行完要干啥
                    if(_this.count>=len-1){//最后一张加载完成
                        _this.opts.all && _this.opts.all();//全部加载完要干啥
                    }
                    _this.count++;
                });
                imgObj.src=src;
            });
        },
        /*有序预加载*/
        _ordered:function(){
            var _this=this;
            var len=_this.opts.imgs.length;
            var imgObj = new Image();
            $(imgObj).on('load error', function (evt) {
                _this.opts.each && _this.opts.each(_this.count);//每一张图片执行完要干啥
                if (_this.count >= len) {
                    _this.opts.all && _this.opts.all();//全部加载完要干啥
                } else {
                    _this._ordered();
                }
                _this.count++;
            });
            imgObj.src = _this.opts.imgs[_this.count];
        },
    };
    //直接返回
    //return PreLoad;

    //jquery插件
    //$.fn.extend->$('#img').preload();
    //$.extend->$.extend();->工具函数，根据情况我们是不需要选择元素的，所有选择使用工具方法
    $.extend({
        preload:function(opts){
            new PreLoad(opts);
        }
    });
});
